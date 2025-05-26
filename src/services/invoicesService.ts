
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Invoice = Tables<"invoices">;
export type InvoiceInsert = TablesInsert<"invoices">;

// Define invoice item types manually since they're not in generated types yet
export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItemInsert {
  invoice_id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

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

    // Create invoice items using raw SQL to avoid type issues
    const itemsToInsert = data.items.map(item => ({
      invoice_id: invoice.id,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    }));

    // Use raw SQL for invoice_items until types are updated
    for (const item of itemsToInsert) {
      const { error: itemError } = await supabase.rpc('exec_sql', {
        sql: `
          INSERT INTO invoice_items (invoice_id, description, quantity, rate, amount)
          VALUES ($1, $2, $3, $4, $5)
        `,
        params: [item.invoice_id, item.description, item.quantity, item.rate, item.amount]
      }).catch(async () => {
        // Fallback: use direct insert if rpc doesn't work
        const { error } = await supabase
          .schema('public')
          .from('invoice_items' as any)
          .insert(item);
        if (error) throw error;
      });

      if (itemError) {
        console.error("Error creating invoice item:", itemError);
        throw itemError;
      }
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
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .single();

      // Access default_tax_rate using bracket notation to avoid type errors
      return (profile as any)?.default_tax_rate || 10.00;
    } catch (error) {
      console.error("Error fetching default tax rate:", error);
      return 10.00;
    }
  },

  async updateUserDefaultTaxRate(rate: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    // Use raw update to avoid type issues with new column
    const { error } = await supabase
      .from("profiles")
      .update({ default_tax_rate: rate } as any)
      .eq("id", user.id);

    if (error) {
      console.error("Error updating default tax rate:", error);
      throw error;
    }
  }
};
