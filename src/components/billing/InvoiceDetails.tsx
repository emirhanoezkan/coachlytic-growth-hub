
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
import { FileText } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: {
    id: string;
    client: string;
    date: string;
    amount: string;
    status: string;
    dueDate: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (invoiceId: string, newStatus: string) => void;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  open,
  onOpenChange,
  onStatusChange
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            {t('billing.invoice')} {invoice.id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.client')}</h3>
              <p className="mt-1 text-lg font-medium">{invoice.client}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.status')}</h3>
              <div className="mt-1">
                <Badge className={
                  invoice.status === "paid" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                  invoice.status === "pending" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                  "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {t(`billing.status.${invoice.status}`)}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.issueDate')}</h3>
              <p className="mt-1">{invoice.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t('billing.dueDate')}</h3>
              <p className="mt-1">{invoice.dueDate}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">{t('billing.total')}</h3>
              <p className="text-xl font-bold">{invoice.amount}</p>
            </div>
          </div>
          
          {invoice.status !== "paid" && (
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleMarkAsPaid}
                className="bg-forest-500 hover:bg-forest-600"
              >
                {t('billing.markAsPaid')}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
