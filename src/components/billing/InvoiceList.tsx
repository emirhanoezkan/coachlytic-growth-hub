
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InvoiceDetails } from "./InvoiceDetails";
import { useInvoices } from "@/hooks/useInvoices";
import { format } from "date-fns";

export const InvoiceList: React.FC = () => {
  const { t } = useLanguage();
  const { invoices, isLoading, updateStatus } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleViewInvoice = (invoice: any) => {
    // Transform the invoice data to match the expected format
    const transformedInvoice = {
      id: invoice.id,
      client: invoice.client?.name || 'Unknown Client',
      date: format(new Date(invoice.issue_date), "MMM dd, yyyy"),
      amount: `$${invoice.amount.toFixed(2)}`,
      status: invoice.status,
      dueDate: invoice.due_date ? format(new Date(invoice.due_date), "MMM dd, yyyy") : 'No due date',
    };
    setSelectedInvoice(transformedInvoice);
    setIsDetailsOpen(true);
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
    </>
  );
};
