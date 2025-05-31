
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { EnhancedHeader } from "@/components/layout/EnhancedHeader";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { MobileInvoiceList } from "@/components/billing/MobileInvoiceList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const BillingPage = () => {
  const [isAddInvoiceDialogOpen, setIsAddInvoiceDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <EnhancedHeader />
          
          <main className="flex-1 overflow-auto p-3 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-display font-semibold text-gray-900">{t('billing.title')}</h1>
                  <p className="text-gray-500 text-sm md:text-base">{t('billing.subtitle')}</p>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => setIsAddInvoiceDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600 w-full md:w-auto min-h-[44px]"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('billing.createInvoice')}
                  </Button>
                </div>
              </div>
              
              {/* Show mobile list on small screens, desktop table on larger screens */}
              <div className="md:hidden">
                <MobileInvoiceList />
              </div>
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <InvoiceList />
                </div>
              </div>
            </div>
          </main>
          
          <Dialog open={isAddInvoiceDialogOpen} onOpenChange={setIsAddInvoiceDialogOpen}>
            <DialogContent className="mx-4 max-w-[calc(100vw-2rem)] md:mx-auto md:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('billing.newInvoice')}</DialogTitle>
              </DialogHeader>
              <InvoiceForm onSubmit={() => setIsAddInvoiceDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BillingPage;
