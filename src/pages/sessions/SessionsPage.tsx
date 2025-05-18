
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SessionDateSelector } from "@/components/sessions/SessionDateSelector";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionForm } from "@/components/sessions/SessionForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SessionList } from "@/components/sessions/SessionList";
import { useLanguage } from "@/contexts/LanguageContext";

const SessionsPage = () => {
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [view, setView] = useState("calendar");
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
                  <h1 className="text-2xl font-display font-semibold text-gray-900">{t('sessions.title')}</h1>
                  <p className="text-gray-500 mt-1">{t('sessions.subtitle')}</p>
                </div>
                <div className="flex gap-3">
                  <Tabs value={view} onValueChange={setView} className="w-[200px]">
                    <TabsList>
                      <TabsTrigger value="calendar" className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {t('sessions.calendar')}
                      </TabsTrigger>
                      <TabsTrigger value="list" className="flex items-center gap-1">
                        <List className="h-4 w-4" />
                        {t('sessions.list')}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button 
                    onClick={() => setIsAddSessionDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('sessions.add')}
                  </Button>
                </div>
              </div>
              
              <Tabs value={view} className="w-full">
                <TabsContent value="calendar" className="w-full mt-0">
                  <SessionDateSelector />
                </TabsContent>
                <TabsContent value="list" className="w-full mt-0">
                  <SessionList />
                </TabsContent>
              </Tabs>
            </div>
          </main>
          
          <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t('sessions.new')}</DialogTitle>
                <DialogDescription>{t('sessions.createDesc')}</DialogDescription>
              </DialogHeader>
              <SessionForm onSubmit={() => setIsAddSessionDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SessionsPage;
