
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SessionCalendar } from "@/components/sessions/SessionCalendar";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionForm } from "@/components/sessions/SessionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SessionList } from "@/components/sessions/SessionList";

const SessionsPage = () => {
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [view, setView] = useState("calendar");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Sessions" />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">Session Calendar</h1>
                  <p className="text-gray-500 mt-1">Schedule and manage your coaching sessions</p>
                </div>
                <div className="flex gap-3">
                  <Tabs value={view} onValueChange={setView} className="w-[200px]">
                    <TabsList>
                      <TabsTrigger value="calendar" className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        Calendar
                      </TabsTrigger>
                      <TabsTrigger value="list" className="flex items-center gap-1">
                        <List className="h-4 w-4" />
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button 
                    onClick={() => setIsAddSessionDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </div>
              
              <div>
                {view === "calendar" ? <SessionCalendar /> : <SessionList />}
              </div>
            </div>
          </main>
          
          <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
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
