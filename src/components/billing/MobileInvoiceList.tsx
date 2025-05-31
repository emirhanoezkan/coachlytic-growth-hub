
import React, { useState } from 'react';
import { MobileCard } from "@/components/ui/mobile-card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvoiceDetails } from "./InvoiceDetails";
import { EditInvoiceDialog } from "./EditInvoiceDialog";
import { useInvoices } from "@/hooks/useInvoices";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/currency";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const MobileInvoiceList: React.FC = () => {
  const { t, language } = useLanguage();
  const { invoices, isLoading, updateStatus, deleteInvoice } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState<string | null>(null);
  
  const handleViewInvoice = (invoice: any) => {
    const transformedInvoice = {
      id: invoice.id,
      client: invoice.client?.name || 'Unknown Client',
      date: format(new Date(invoice.issue_date), "MMM dd, yyyy"),
      amount: formatCurrency(invoice.amount, language),
      status: invoice.status,
      dueDate: invoice.due_date ? format(new Date(invoice.due_date), "MMM dd, yyyy") : 'No due date',
    };
    setSelectedInvoice(transformedInvoice);
    setIsDetailsOpen(true);
  };

  const handleEditInvoice = (invoice: any) => {
    setEditingInvoice(invoice);
    setIsEditOpen(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setDeleteInvoiceId(invoiceId);
  };

  const confirmDelete = () => {
    if (deleteInvoiceId) {
      deleteInvoice(deleteInvoiceId);
      setDeleteInvoiceId(null);
    }
  };
  
  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    updateStatus({ invoiceId, status: newStatus });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      default:
        return "destructive";
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading invoices...</p>
      </div>
    );
  }
  
  if (invoices.length === 0) {
    return (
      <div className="py-10 text-center">
        <FileText className="h-16 w-16 mx-auto text-gray-300" />
        <p className="mt-2 text-gray-500">{t('billing.noInvoices')}</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <MobileCard
            key={invoice.id}
            title={`#${invoice.id.split('-')[0]}`}
            subtitle={invoice.client?.name || 'Unknown Client'}
            icon={<FileText className="h-5 w-5 text-gray-500" />}
            status={t(`billing.statuses.${invoice.status}`)}
            statusVariant={getStatusVariant(invoice.status)}
            primaryInfo={
              <div className="flex justify-between text-sm">
                <span>{formatCurrency(invoice.amount, language)}</span>
                <span>{format(new Date(invoice.issue_date), "MMM dd")}</span>
              </div>
            }
            secondaryInfo={
              invoice.due_date ? `Due: ${format(new Date(invoice.due_date), "MMM dd")}` : 'No due date'
            }
            onClick={() => handleViewInvoice(invoice)}
            actions={[
              {
                label: t('billing.viewInvoice'),
                onClick: () => handleViewInvoice(invoice)
              },
              {
                label: t('billing.editInvoice'),
                onClick: () => handleEditInvoice(invoice)
              },
              ...(invoice.status !== "paid" ? [{
                label: t('billing.markAsPaid'),
                onClick: () => handleStatusChange(invoice.id, "paid")
              }] : []),
              {
                label: t('billing.deleteInvoice'),
                onClick: () => handleDeleteInvoice(invoice.id),
                variant: "destructive" as const
              }
            ]}
          />
        ))}
      </div>
      
      <InvoiceDetails 
        invoice={selectedInvoice} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen}
        onStatusChange={handleStatusChange}
      />

      <EditInvoiceDialog
        invoice={editingInvoice}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <AlertDialog open={!!deleteInvoiceId} onOpenChange={() => setDeleteInvoiceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('billing.deleteInvoice')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('billing.deleteInvoiceConfirmation')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {t('action.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
