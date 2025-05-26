
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
import { MoreHorizontal, FileText, Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvoiceDetails } from "./InvoiceDetails";
import { EditInvoiceDialog } from "./EditInvoiceDialog";
import { useInvoices } from "@/hooks/useInvoices";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/currency";

export const InvoiceList: React.FC = () => {
  const { t, language } = useLanguage();
  const { invoices, isLoading, updateStatus, deleteInvoice } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState<string | null>(null);
  
  const handleViewInvoice = (invoice: any) => {
    // Transform the invoice data to match the expected format
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-md border shadow-sm">
        <div className="p-8 text-center text-gray-500">
          Loading invoices...
        </div>
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
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  {t('billing.noInvoices')}
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    {invoice.id.split('-')[0]}
                  </TableCell>
                  <TableCell>{invoice.client?.name || 'Unknown Client'}</TableCell>
                  <TableCell>{format(new Date(invoice.issue_date), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    {invoice.due_date ? format(new Date(invoice.due_date), "MMM dd, yyyy") : 'No due date'}
                  </TableCell>
                  <TableCell>{formatCurrency(invoice.amount, language)}</TableCell>
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
                          <FileText className="mr-2 h-4 w-4" />
                          {t('billing.viewInvoice')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditInvoice(invoice)}>
                          <Edit className="mr-2 h-4 w-4" />
                          {t('billing.editInvoice')}
                        </DropdownMenuItem>
                        {invoice.status !== "paid" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(invoice.id, "paid")}>
                            {t('billing.markAsPaid')}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {t('billing.deleteInvoice')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
