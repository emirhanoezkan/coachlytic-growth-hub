
import React, { useState } from "react";
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SessionDateSelector } from "@/components/sessions/SessionDateSelector";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [period, setPeriod] = useState("day");
  const { t } = useLanguage();
  
  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
              {t('dashboard.welcomeTitle')}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('dashboard.welcomeSubtitle')}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-[200px]">
              <TabsList className="grid w-full grid-cols-3 h-10">
                <TabsTrigger value="day" className="text-xs sm:text-sm">{t('time.day')}</TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm">{t('time.week')}</TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">{t('time.month')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <DashboardOverview period={period} />
        
        <div className="w-full">
          <SessionDateSelector />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default Index;
