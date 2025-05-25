
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface InvoiceDetailsProps {
  invoice: {
    id: string;
    clients?: { name: string } | null;
    issue_date: string;
    amount: number;
    status: string;
    due_date: string | null;
    notes?: string | null;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (invoiceId: string, newStatus: string) => void;
  onDelete: (invoiceId: string) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  open,
  onOpenChange,
  onStatusChange,
  onDelete
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  if (!invoice) return null;

  const handleMarkAsPaid = () => {
    onStatusChange(invoice.id, "paid");
    toast({
      title: t('billing.statusUpdated'),
      description: t('billing.invoiceMarkedAsPaid'),
    });
  };

  const handleDelete = () => {
    onDelete(invoice.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            {t('billing.invoice')} INV-{invoice.id.slice(-6).toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.client')}</h3>
              <p className="mt-1 text-lg font-medium">{invoice.clients?.name || 'Unknown Client'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.statusLabel')}</h3>
              <div className="mt-1">
                <Badge className={
                  invoice.status === "paid" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                  invoice.status === "pending" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                  "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {t(`billing.statuses.${invoice.status}`)}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.issueDate')}</h3>
              <p className="mt-1">{format(new Date(invoice.issue_date), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.dueDate')}</h3>
              <p className="mt-1">
                {invoice.due_date ? format(new Date(invoice.due_date), 'MMM dd, yyyy') : '-'}
              </p>
            </div>
          </div>

          {invoice.notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.notes')}</h3>
              <p className="mt-1 text-sm text-gray-700">{invoice.notes}</p>
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">{t('billing.total')}</h3>
              <p className="text-xl font-bold">${invoice.amount.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button 
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t('billing.deleteInvoice')}
            </Button>
            
            {invoice.status !== "paid" && (
              <Button 
                onClick={handleMarkAsPaid}
                className="bg-forest-500 hover:bg-forest-600"
              >
                {t('billing.markAsPaid')}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
