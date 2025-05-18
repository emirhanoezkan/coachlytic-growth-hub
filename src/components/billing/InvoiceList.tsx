
import React from 'react';
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
import { MoreHorizontal, FileText, Eye, Download, CheckCircle, Send } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

// Sample data for invoices
const invoices = [
  {
    id: "INV-001",
    client: "Sarah Johnson",
    date: "May 01, 2025",
    amount: "$450.00",
    amountTRY: "₺13,500",
    status: "Paid",
    dueDate: "May 15, 2025"
  },
  {
    id: "INV-002",
    client: "Michael Chen",
    date: "May 05, 2025",
    amount: "$800.00",
    amountTRY: "₺24,000",
    status: "Pending",
    dueDate: "May 20, 2025"
  },
  {
    id: "INV-003",
    client: "Emma Davis",
    date: "Apr 28, 2025",
    amount: "$600.00",
    amountTRY: "₺18,000",
    status: "Paid",
    dueDate: "May 12, 2025"
  },
  {
    id: "INV-004",
    client: "Robert Wilson",
    date: "Apr 15, 2025",
    amount: "$1,200.00",
    amountTRY: "₺36,000",
    status: "Overdue",
    dueDate: "Apr 30, 2025"
  },
  {
    id: "INV-005",
    client: "Jennifer Lopez",
    date: "May 10, 2025",
    amount: "$450.00",
    amountTRY: "₺13,500",
    status: "Pending",
    dueDate: "May 25, 2025"
  }
];

interface InvoiceListProps {
  onInvoiceAction?: (action: string, id: string) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({ onInvoiceAction }) => {
  const { t, locale } = useI18n();

  const handleInvoiceAction = (action: string, id: string) => {
    onInvoiceAction?.(action, id);
  };

  return (
    <div className="bg-white rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('invoice')}</TableHead>
            <TableHead>{t('client')}</TableHead>
            <TableHead>{t('issueDate')}</TableHead>
            <TableHead>{t('dueDate')}</TableHead>
            <TableHead>{t('amount')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                {invoice.id}
              </TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>{locale === 'en' ? invoice.amount : invoice.amountTRY}</TableCell>
              <TableCell>
                <Badge className={
                  invoice.status === "Paid" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                  invoice.status === "Pending" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                  "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {invoice.status === "Paid" ? t('paid') : 
                   invoice.status === "Pending" ? t('pending') : 
                   t('overdue')}
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
                    <DropdownMenuItem onClick={() => handleInvoiceAction(t('viewInvoice'), invoice.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      {t('viewInvoice')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleInvoiceAction(t('downloadPDF'), invoice.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('downloadPDF')}
                    </DropdownMenuItem>
                    {invoice.status !== "Paid" && (
                      <DropdownMenuItem onClick={() => handleInvoiceAction(t('markAsPaid'), invoice.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {t('markAsPaid')}
                      </DropdownMenuItem>
                    )}
                    {invoice.status !== "Paid" && (
                      <DropdownMenuItem onClick={() => handleInvoiceAction(t('sendReminder'), invoice.id)}>
                        <Send className="h-4 w-4 mr-2" />
                        {t('sendReminder')}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
