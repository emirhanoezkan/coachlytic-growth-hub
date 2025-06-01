
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceForm } from "@/components/billing/InvoiceForm";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const BillingPage = () => {
  const [isAddInvoiceDialogOpen, setIsAddInvoiceDialogOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
              {t('billing.title')}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('billing.subtitle')}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button 
              onClick={() => setIsAddInvoiceDialogOpen(true)} 
              className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10"
              size="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('billing.createInvoice')}
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <InvoiceList />
        </div>
      </div>
      
      <ResponsiveDialog
        open={isAddInvoiceDialogOpen}
        onOpenChange={setIsAddInvoiceDialogOpen}
        title={t('billing.newInvoice')}
      >
        <InvoiceForm onSubmit={() => setIsAddInvoiceDialogOpen(false)} />
      </ResponsiveDialog>
    </ResponsiveLayout>
  );
};

export default BillingPage;
