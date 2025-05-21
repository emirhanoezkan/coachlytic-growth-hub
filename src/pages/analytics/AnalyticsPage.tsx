
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">{t('analytics.title')}</h1>
                  <p className="text-gray-500 mt-1">{t('analytics.subtitle')}</p>
                </div>
                <div>
                  <Tabs value={period} onValueChange={setPeriod} className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="day">{t('analytics.day')}</TabsTrigger>
                      <TabsTrigger value="week">{t('analytics.week')}</TabsTrigger>
                      <TabsTrigger value="month">{t('analytics.month')}</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
