
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { ClientList } from "@/components/clients/ClientList";
import { MobileClientList } from "@/components/clients/MobileClientList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientForm } from "@/components/clients/ClientForm";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientsPage = () => {
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
              {t('client.directory')}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('client.manage')}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button 
              onClick={() => setIsAddClientDialogOpen(true)} 
              className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10"
              size="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('client.add')}
            </Button>
          </div>
        </div>
        
        {/* Show mobile list on small screens, desktop list on larger screens */}
        <div className="sm:hidden">
          <MobileClientList />
        </div>
        <div className="hidden sm:block">
          <ClientList />
        </div>
      </div>
      
      <ResponsiveDialog
        open={isAddClientDialogOpen}
        onOpenChange={setIsAddClientDialogOpen}
        title={t('client.add')}
      >
        <ClientForm onSubmit={() => setIsAddClientDialogOpen(false)} />
      </ResponsiveDialog>
    </ResponsiveLayout>
  );
};

export default ClientsPage;
