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

export interface UpdateInvoiceData {
  client_id?: string;
  due_date?: string;
  status?: string;
  notes?: string;
  tax_rate?: number;
  includes_tax?: boolean;
  items?: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
}

export const invoicesService = {
  async getInvoices(): Promise<InvoiceWithItems[]> {
    try {
      const { data: invoices, error } = await supabase
        .from("invoices")
        .select(`
          *,
          clients!inner(id, name)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching invoices:", error);
        throw new Error(`Failed to fetch invoices: ${error.message}`);
      }

      return invoices.map(invoice => ({
        ...invoice,
        client: Array.isArray(invoice.clients) ? invoice.clients[0] : invoice.clients
      }));
    } catch (error) {
      console.error("Error in getInvoices:", error);
      throw error;
    }
  },

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Creating invoice with data:", data);

      // Validate required fields
      if (!data.client_id || data.client_id === 'no-clients') {
        throw new Error("Please select a valid client");
      }

      if (!data.items || data.items.length === 0) {
        throw new Error("Please add at least one item to the invoice");
      }

      // Validate items
      for (const item of data.items) {
        if (!item.description || item.description.trim() === '') {
          throw new Error("All items must have a description");
        }
        if (item.quantity <= 0) {
          throw new Error("Item quantity must be greater than 0");
        }
        if (item.rate < 0) {
          throw new Error("Item rate cannot be negative");
        }
      }

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

      console.log("Calculated amounts:", { subtotal, taxAmount, totalAmount });

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
        throw new Error(`Failed to create invoice: ${invoiceError.message}`);
      }

      console.log("Invoice created successfully:", invoice);

      // Create invoice items
      const itemsToInsert = data.items.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.quantity * item.rate,
      }));

      console.log("Creating invoice items:", itemsToInsert);

      // Insert invoice items
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsToInsert);

      if (itemsError) {
        console.error("Error creating invoice items:", itemsError);
        // Try to clean up the invoice if items creation failed
        await supabase.from("invoices").delete().eq("id", invoice.id);
        throw new Error(`Failed to create invoice items: ${itemsError.message}`);
      }

      console.log("Invoice items created successfully");
      return invoice;
    } catch (error) {
      console.error("Error in createInvoice:", error);
      throw error;
    }
  },

  async updateInvoice(invoiceId: string, data: UpdateInvoiceData): Promise<Invoice> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Updating invoice with data:", data);

      // Calculate amounts if items are provided
      let updateData: any = {
        client_id: data.client_id,
        due_date: data.due_date,
        status: data.status,
        notes: data.notes,
        tax_rate: data.tax_rate,
        includes_tax: data.includes_tax,
      };

      if (data.items) {
        // Calculate amounts based on tax inclusion
        let subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
        let taxAmount: number;
        let totalAmount: number;

        if (data.includes_tax) {
          totalAmount = subtotal;
          const netAmount = subtotal / (1 + (data.tax_rate || 0) / 100);
          taxAmount = subtotal - netAmount;
          subtotal = netAmount;
        } else {
          taxAmount = subtotal * ((data.tax_rate || 0) / 100);
          totalAmount = subtotal + taxAmount;
        }

        updateData.amount = totalAmount;
      }

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      // Update the invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from("invoices")
        .update(updateData)
        .eq("id", invoiceId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (invoiceError) {
        console.error("Error updating invoice:", invoiceError);
        throw new Error(`Failed to update invoice: ${invoiceError.message}`);
      }

      // Update invoice items if provided
      if (data.items) {
        // Delete existing items
        const { error: deleteError } = await supabase
          .from('invoice_items')
          .delete()
          .eq('invoice_id', invoiceId);

        if (deleteError) {
          console.error("Error deleting invoice items:", deleteError);
          throw new Error(`Failed to delete invoice items: ${deleteError.message}`);
        }

        // Insert new items
        const itemsToInsert = data.items.map(item => ({
          invoice_id: invoiceId,
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.quantity * item.rate,
        }));

        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemsToInsert);

        if (itemsError) {
          console.error("Error updating invoice items:", itemsError);
          throw new Error(`Failed to update invoice items: ${itemsError.message}`);
        }
      }

      console.log("Invoice updated successfully:", invoice);
      return invoice;
    } catch (error) {
      console.error("Error in updateInvoice:", error);
      throw error;
    }
  },

  async deleteInvoice(invoiceId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Deleting invoice:", invoiceId);

      // Delete the invoice (items will be cascade deleted due to foreign key)
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoiceId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting invoice:", error);
        throw new Error(`Failed to delete invoice: ${error.message}`);
      }

      console.log("Invoice deleted successfully");
    } catch (error) {
      console.error("Error in deleteInvoice:", error);
      throw error;
    }
  },

  async updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ 
          status,
          payment_date: status === "paid" ? new Date().toISOString() : null
        })
        .eq("id", invoiceId);

      if (error) {
        console.error("Error updating invoice status:", error);
        throw new Error(`Failed to update invoice status: ${error.message}`);
      }
    } catch (error) {
      console.error("Error in updateInvoiceStatus:", error);
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Use raw update to avoid type issues with new column
      const { error } = await supabase
        .from("profiles")
        .update({ default_tax_rate: rate } as any)
        .eq("id", user.id);

      if (error) {
        console.error("Error updating default tax rate:", error);
        throw new Error(`Failed to update default tax rate: ${error.message}`);
      }
    } catch (error) {
      console.error("Error in updateUserDefaultTaxRate:", error);
      throw error;
    }
  }
};
