
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Invoice = Tables<"invoices">;
export type InvoiceItem = Tables<"invoice_items">;
export type InvoiceInsert = TablesInsert<"invoices">;
export type InvoiceItemInsert = TablesInsert<"invoice_items">;

export interface InvoiceWithItems extends Invoice {
  items?: InvoiceItem[];
  client?: { id: string; name: string };
}

export interface CreateInvoiceData {
  client_id: string;
  due_date?: string;
  status: string;
  notes?: string;
  tax_rate: number;
  includes_tax: boolean;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
}

export const invoicesService = {
  async getInvoices(): Promise<InvoiceWithItems[]> {
    const { data: invoices, error } = await supabase
      .from("invoices")
      .select(`
        *,
        clients!inner(id, name)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }

    return invoices.map(invoice => ({
      ...invoice,
      client: Array.isArray(invoice.clients) ? invoice.clients[0] : invoice.clients
    }));
  },

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Calculate amounts based on tax inclusion
    let subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    let taxAmount: number;
    let totalAmount: number;

    if (data.includes_tax) {
      // Price includes tax: derive net amount and tax
      totalAmount = subtotal;
      const netAmount = subtotal / (1 + data.tax_rate / 100);
      taxAmount = subtotal - netAmount;
      subtotal = netAmount;
    } else {
      // Price excludes tax: calculate tax on net amount
      taxAmount = subtotal * (data.tax_rate / 100);
      totalAmount = subtotal + taxAmount;
    }

    // Create the invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        user_id: user.id,
        client_id: data.client_id,
        amount: totalAmount,
        due_date: data.due_date,
        status: data.status,
        notes: data.notes,
        tax_rate: data.tax_rate,
        includes_tax: data.includes_tax,
      })
      .select()
      .single();

    if (invoiceError) {
      console.error("Error creating invoice:", invoiceError);
      throw invoiceError;
    }

    // Create invoice items
    const itemsToInsert = data.items.map(item => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    }));

    const { error: itemsError } = await supabase
      .from("invoice_items")
      .insert(itemsToInsert);

    if (itemsError) {
      console.error("Error creating invoice items:", itemsError);
      throw itemsError;
    }

    return invoice;
  },

  async updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
    const { error } = await supabase
      .from("invoices")
      .update({ 
        status,
        payment_date: status === "paid" ? new Date().toISOString() : null
      })
      .eq("id", invoiceId);

    if (error) {
      console.error("Error updating invoice status:", error);
      throw error;
    }
  },

  async getUserDefaultTaxRate(): Promise<number> {
    const { data: profile } = await supabase
      .from("profiles")
      .select("default_tax_rate")
      .single();

    return profile?.default_tax_rate || 10.00;
  },

  async updateUserDefaultTaxRate(rate: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({ default_tax_rate: rate })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating default tax rate:", error);
      throw error;
    }
  }
};
