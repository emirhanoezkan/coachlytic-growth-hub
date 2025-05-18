
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const BillingPage = () => {
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Billing" />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">Billing & Invoices</h1>
                  <p className="text-gray-500 mt-1">Manage invoices and track payments</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button 
                    onClick={() => setIsCreateInvoiceOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BillingStatCard title="Total Revenue" value="$36,420" trend={{ value: 12, isPositive: true }} />
                <BillingStatCard title="Outstanding" value="$5,840" trend={{ value: 8, isPositive: false }} />
                <BillingStatCard title="Overdue" value="$1,250" trend={{ value: 5, isPositive: false }} />
                <BillingStatCard title="Paid this month" value="$4,320" trend={{ value: 15, isPositive: true }} />
              </div>
              
              <InvoiceList />
            </div>
          </main>
          
          <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
              </DialogHeader>
              <InvoiceForm onSubmit={() => setIsCreateInvoiceOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
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
