
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, FileText, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvoiceDetails } from "./InvoiceDetails";
import { useInvoices, useDeleteInvoice, useUpdateInvoice } from "@/services/invoicesService";
import { format } from "date-fns";

export const InvoiceList: React.FC = () => {
  const { t } = useLanguage();
  const { data: invoices = [], isLoading } = useInvoices();
  const deleteInvoiceMutation = useDeleteInvoice();
  const updateInvoiceMutation = useUpdateInvoice();
  
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };
  
  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    updateInvoiceMutation.mutate({
      id: invoiceId,
      invoiceData: { status: newStatus }
    });
  };

  const handleDeleteClick = (invoiceId: string) => {
    setInvoiceToDelete(invoiceId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      deleteInvoiceMutation.mutate(invoiceToDelete);
      setDeleteDialogOpen(false);
      setInvoiceToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-md border shadow-sm p-8 text-center">
        <p className="text-gray-500">{t('common.loading')}</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-md border shadow-sm p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 mb-2">{t('billing.noInvoices')}</p>
        <p className="text-sm text-gray-400">{t('billing.createFirstInvoice')}</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('billing.invoice')}</TableHead>
              <TableHead>{t('billing.client')}</TableHead>
              <TableHead>{t('billing.issueDate')}</TableHead>
              <TableHead>{t('billing.dueDate')}</TableHead>
              <TableHead>{t('billing.amount')}</TableHead>
              <TableHead>{t('billing.statusLabel')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  INV-{invoice.id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell>{invoice.clients?.name || 'Unknown Client'}</TableCell>
                <TableCell>{format(new Date(invoice.issue_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  {invoice.due_date ? format(new Date(invoice.due_date), 'MMM dd, yyyy') : '-'}
                </TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={
                    invoice.status === "paid" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                    invoice.status === "pending" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                    "bg-red-100 text-red-800 hover:bg-red-200"
                  }>
                    {t(`billing.statuses.${invoice.status}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                        {t('billing.viewInvoice')}
                      </DropdownMenuItem>
                      {invoice.status !== "paid" && (
                        <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "paid")}>
                          {t('billing.markAsPaid')}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(invoice.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('billing.deleteInvoice')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <InvoiceDetails 
        invoice={selectedInvoice} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteClick}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('billing.deleteConfirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('billing.deleteWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
