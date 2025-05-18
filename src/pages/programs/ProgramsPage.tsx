
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ProgramList } from "@/components/programs/ProgramList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProgramForm } from "@/components/programs/ProgramForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const ProgramsPage = () => {
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">{t('programs.title')}</h1>
                  <p className="text-gray-500 mt-1">{t('programs.subtitle')}</p>
                </div>
                <div>
                  <Button 
                    onClick={() => setIsAddProgramDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('programs.create')}
                  </Button>
                </div>
              </div>
              
              <ProgramList />
            </div>
          </main>
          
          <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('programs.new')}</DialogTitle>
              </DialogHeader>
              <ProgramForm onSubmit={() => setIsAddProgramDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProgramsPage;
