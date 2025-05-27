
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
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header />
          
          <main className="flex-1 overflow-auto p-3 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-semibold text-gray-900">{t('dashboard.welcomeTitle')}</h1>
                  <p className="text-gray-500 text-sm md:text-base">{t('dashboard.welcomeSubtitle')}</p>
                </div>
                <div className="flex-shrink-0">
                  <Tabs value={period} onValueChange={setPeriod} className="w-full md:w-[200px]">
                    <TabsList className="grid w-full grid-cols-3 h-9">
                      <TabsTrigger value="day" className="text-xs">{t('time.day')}</TabsTrigger>
                      <TabsTrigger value="week" className="text-xs">{t('time.week')}</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs">{t('time.month')}</TabsTrigger>
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
