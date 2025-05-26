
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesService, CreateInvoiceData } from "@/services/invoicesService";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const useInvoices = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: invoices = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: invoicesService.getInvoices,
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (data: CreateInvoiceData) => invoicesService.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast({
        title: t('billing.success'),
        description: t('billing.invoiceCreated'),
      });
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ invoiceId, status }: { invoiceId: string; status: string }) =>
      invoicesService.updateInvoiceStatus(invoiceId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (error) => {
      console.error("Error updating invoice status:", error);
      toast({
        title: "Error",
        description: "Failed to update invoice status.",
        variant: "destructive",
      });
    },
  });

  return {
    invoices,
    isLoading,
    error,
    createInvoice: createInvoiceMutation.mutate,
    isCreating: createInvoiceMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};

export const useDefaultTaxRate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: defaultTaxRate = 10,
    isLoading
  } = useQuery({
    queryKey: ["defaultTaxRate"],
    queryFn: invoicesService.getUserDefaultTaxRate,
  });

  const updateMutation = useMutation({
    mutationFn: invoicesService.updateUserDefaultTaxRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["defaultTaxRate"] });
      toast({
        title: "Settings saved",
        description: "Default tax rate updated successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating default tax rate:", error);
      toast({
        title: "Error",
        description: "Failed to update default tax rate.",
        variant: "destructive",
      });
    },
  });

  return {
    defaultTaxRate,
    isLoading,
    updateDefaultTaxRate: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};
