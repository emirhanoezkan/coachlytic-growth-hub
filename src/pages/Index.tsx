
import React, { useState } from "react";
import { Sidebar as AnimatedSidebarWrapper, SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ClientList } from "@/components/clients/ClientList";
import { SessionCalendar } from "@/components/sessions/SessionCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Dashboard" />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display font-semibold text-gray-900">Welcome to Coachlytic</h1>
                  <p className="text-gray-500 mt-1">Your coaching analytics dashboard</p>
                </div>
                <div className="flex gap-3">
                  <Tabs defaultValue="day" className="w-[230px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <DashboardOverview />
              
              <div className="pt-6">
                <SessionCalendar />
              </div>
              
              <div className="pt-6">
                <ClientList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
