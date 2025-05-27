
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ClientList } from "@/components/clients/ClientList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientForm } from "@/components/clients/ClientForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
          <Header />
          
          <main className="flex-1 overflow-auto p-3 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-display font-semibold text-gray-900">{t('client.directory')}</h1>
                  <p className="text-gray-500 text-sm md:text-base">{t('client.manage')}</p>
                </div>
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => setIsAddClientDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600 w-full md:w-auto"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('client.add')}
                  </Button>
                </div>
              </div>
              
              <ClientList />
            </div>
          </main>
          
          <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
            <DialogContent className="mx-4 max-w-[calc(100vw-2rem)] md:mx-auto md:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('client.add')}</DialogTitle>
              </DialogHeader>
              <ClientForm onSubmit={() => setIsAddClientDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ClientsPage;
