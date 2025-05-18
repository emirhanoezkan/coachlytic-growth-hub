
import React, { useState } from 'react';
import { InvoiceList } from "@/components/billing/InvoiceList";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const BillingPage = () => {
  const { t, locale } = useI18n();
  const { toast } = useToast();
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleCreateInvoice = () => {
    setIsCreateInvoiceOpen(true);
  };

  const handleInvoiceSubmit = () => {
    toast({
      title: t('success'),
      description: t('invoiceCreated'),
    });
    setIsCreateInvoiceOpen(false);
  };

  const handleInvoiceAction = (action: string, id: string) => {
    toast({
      title: action,
      description: `${action} invoice ${id}`,
    });
  };

  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-gray-900">{t('billingInvoices')}</h1>
            <p className="text-gray-500 mt-1">{t('manageInvoices')}</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4" />
              {t('filter')}
            </Button>
            <Button 
              onClick={handleCreateInvoice} 
              className="bg-forest-500 hover:bg-forest-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('createInvoice')}
            </Button>
          </div>
        </div>
        
        {isFiltersOpen && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Status</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Client</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Clients</option>
                  <option value="sarah">Sarah Johnson</option>
                  <option value="michael">Michael Chen</option>
                  <option value="emma">Emma Davis</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Date Range</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Dates</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                </select>
              </div>
            </div>
          </Card>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BillingStatCard 
            title={t('totalRevenue')} 
            value={locale === 'en' ? "$36,420" : "₺1,092,600"} 
            trend={{ value: 12, isPositive: true }} 
          />
          <BillingStatCard 
            title={t('outstanding')} 
            value={locale === 'en' ? "$5,840" : "₺175,200"} 
            trend={{ value: 8, isPositive: false }} 
          />
          <BillingStatCard 
            title={t('overdue')} 
            value={locale === 'en' ? "$1,250" : "₺37,500"} 
            trend={{ value: 5, isPositive: false }} 
          />
          <BillingStatCard 
            title={t('paidThisMonth')} 
            value={locale === 'en' ? "$4,320" : "₺129,600"} 
            trend={{ value: 15, isPositive: true }} 
          />
        </div>
        
        <InvoiceList onInvoiceAction={handleInvoiceAction} />
      </div>
      
      <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('createInvoice')}</DialogTitle>
          </DialogHeader>
          <InvoiceForm onSubmit={handleInvoiceSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface BillingStatCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const BillingStatCard: React.FC<BillingStatCardProps> = ({ title, value, trend }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <DollarSign className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </span>
          <span className="ml-1">from last month</span>
        </p>
      )}
    </CardContent>
  </Card>
);

export default BillingPage;
