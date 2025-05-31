
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { ClientList } from "@/components/clients/ClientList";
import { MobileClientList } from "@/components/clients/MobileClientList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientForm } from "@/components/clients/ClientForm";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const ClientsPage = () => {
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <MobileHeader />
          
          <main className="flex-1 overflow-auto p-2 sm:p-4 md:p-6 bg-slate-50 pt-12 sm:pt-14">
            <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-gray-900">
                    {t('client.directory')}
                  </h1>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base">
                    {t('client.manage')}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => setIsAddClientDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-10 sm:h-9"
                    size="sm"
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
          </main>
          
          <ResponsiveDialog
            open={isAddClientDialogOpen}
            onOpenChange={setIsAddClientDialogOpen}
            title={t('client.add')}
          >
            <ClientForm onSubmit={() => setIsAddClientDialogOpen(false)} />
          </ResponsiveDialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClientsPage;
