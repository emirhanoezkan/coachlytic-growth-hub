
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SessionDateSelector } from "@/components/sessions/SessionDateSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("day");
  const { t } = useLanguage();
  
  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display font-semibold text-gray-900">{t('dashboard.welcomeTitle')}</h1>
                  <p className="text-gray-500 mt-1">{t('dashboard.welcomeSubtitle')}</p>
                </div>
                <div className="flex gap-3">
                  <Tabs value={period} onValueChange={setPeriod} className="w-[230px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <DashboardOverview period={period} />
              
              <div className="w-full">
                <SessionDateSelector />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
