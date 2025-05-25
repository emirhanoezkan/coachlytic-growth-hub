
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;
  program_id: string | null;
  amount: number;
  issue_date: string;
  due_date: string | null;
  payment_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type InvoiceFormData = {
  client_id: string;
  program_id?: string;
  amount: number;
  issue_date: string;
  due_date?: string;
  status?: string;
  notes?: string;
}

// Get all invoices for the current user
export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients(name),
          programs(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data as (Invoice & { clients: { name: string } | null; programs: { name: string } | null })[];
    }
  });
};

// Get a single invoice by ID
export const useInvoice = (invoiceId: string) => {
  return useQuery({
    queryKey: ['invoices', invoiceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients(name),
          programs(name)
        `)
        .eq('id', invoiceId)
        .single();
      
      if (error) throw new Error(error.message);
      return data as Invoice & { clients: { name: string } | null; programs: { name: string } | null };
    },
    enabled: !!invoiceId
  });
};

// Add a new invoice
export const useAddInvoice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (invoiceData: InvoiceFormData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('invoices')
        .insert([{
          ...invoiceData,
          user_id: user.id
        }])
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Invoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to create invoice: ${error.message}`,
      });
    }
  });
};

// Update an existing invoice
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, invoiceData }: { id: string, invoiceData: Partial<InvoiceFormData> }) => {
      const { data, error } = await supabase
        .from('invoices')
        .update({
          ...invoiceData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw new Error(error.message);
      return data as Invoice;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoices', variables.id] });
      toast({
        title: "Success",
        description: "Invoice has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to update invoice: ${error.message}`,
      });
    }
  });
};

// Delete an invoice
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId);
      
      if (error) throw new Error(error.message);
      return invoiceId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to delete invoice: ${error.message}`,
      });
    }
  });
};
