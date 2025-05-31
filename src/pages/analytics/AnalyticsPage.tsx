
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { EnhancedHeader } from "@/components/layout/EnhancedHeader";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const AnalyticsPage = () => {
  const [period, setPeriod] = useState("month");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <EnhancedHeader />
          
          <main className="flex-1 overflow-auto p-3 md:p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
              <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-display font-semibold text-gray-900">{t('analytics.title')}</h1>
                  <p className="text-gray-500 text-sm md:text-base">{t('analytics.subtitle')}</p>
                </div>
                <div className="flex-shrink-0">
                  <Tabs value={period} onValueChange={setPeriod} className="w-full md:w-[240px]">
                    <TabsList className="grid w-full grid-cols-3 h-9">
                      <TabsTrigger value="day" className="text-xs">{t('analytics.day')}</TabsTrigger>
                      <TabsTrigger value="week" className="text-xs">{t('analytics.week')}</TabsTrigger>
                      <TabsTrigger value="month" className="text-xs">{t('analytics.month')}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <RevenueChart period={period} />
                <ClientRetentionChart period={period} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AnalyticsPage;
