
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
import { MoreHorizontal, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample data for invoices
const invoices = [
  {
    id: "INV-001",
    client: "Sarah Johnson",
    date: "May 01, 2025",
    amount: "$450.00",
    status: "Paid",
    dueDate: "May 15, 2025"
  },
  {
    id: "INV-002",
    client: "Michael Chen",
    date: "May 05, 2025",
    amount: "$800.00",
    status: "Pending",
    dueDate: "May 20, 2025"
  },
  {
    id: "INV-003",
    client: "Emma Davis",
    date: "Apr 28, 2025",
    amount: "$600.00",
    status: "Paid",
    dueDate: "May 12, 2025"
  },
  {
    id: "INV-004",
    client: "Robert Wilson",
    date: "Apr 15, 2025",
    amount: "$1,200.00",
    status: "Overdue",
    dueDate: "Apr 30, 2025"
  },
  {
    id: "INV-005",
    client: "Jennifer Lopez",
    date: "May 10, 2025",
    amount: "$450.00",
    status: "Pending",
    dueDate: "May 25, 2025"
  }
];

export const InvoiceList: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('billing.invoice')}</TableHead>
            <TableHead>{t('billing.client')}</TableHead>
            <TableHead>{t('billing.issueDate')}</TableHead>
            <TableHead>{t('billing.dueDate')}</TableHead>
            <TableHead>{t('billing.amount')}</TableHead>
            <TableHead>{t('billing.status')}</TableHead>
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
              <TableCell>{invoice.amount}</TableCell>
              <TableCell>
                <Badge className={
                  invoice.status === "Paid" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                  invoice.status === "Pending" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                  "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {t(`billing.status.${invoice.status.toLowerCase()}`)}
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
                    <DropdownMenuItem>{t('billing.viewInvoice')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('billing.downloadPDF')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('billing.markAsPaid')}</DropdownMenuItem>
                    <DropdownMenuItem>{t('billing.sendReminder')}</DropdownMenuItem>
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
