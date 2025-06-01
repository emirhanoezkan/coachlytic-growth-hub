
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const AnalyticsPage = () => {
  const [period, setPeriod] = useState("month");
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
              {t('analytics.title')}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('analytics.subtitle')}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-[240px]">
              <TabsList className="grid w-full grid-cols-3 h-10">
                <TabsTrigger value="day" className="text-xs sm:text-sm">
                  {t('analytics.day')}
                </TabsTrigger>
                <TabsTrigger value="week" className="text-xs sm:text-sm">
                  {t('analytics.week')}
                </TabsTrigger>
                <TabsTrigger value="month" className="text-xs sm:text-sm">
                  {t('analytics.month')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <RevenueChart period={period} />
          <ClientRetentionChart period={period} />
        </div>
      </div>
    </ResponsiveLayout>
  );
};

export default AnalyticsPage;
