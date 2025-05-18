
import React, { useState } from 'react';
import { StatsCard } from "@/components/ui/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, DollarSign, BarChart, TrendingUp } from "lucide-react";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";

const AnalyticsPage = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState("month");

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    toast({
      description: `Analytics view switched to ${value} view`,
    });
  };

  // Sample data based on time filter
  const getMetrics = () => {
    switch (timeFilter) {
      case 'week':
        return {
          clients: { value: 18, trend: 8 },
          sessions: { value: 28, trend: 5 },
          revenue: { value: '$1,250', trend: 3 },
          completion: { value: '84%', trend: 1 }
        };
      case 'month':
        return {
          clients: { value: 24, trend: 12 },
          sessions: { value: 87, trend: 8 },
          revenue: { value: '$4,320', trend: 5 },
          completion: { value: '86%', trend: 2, isPositive: false }
        };
      case 'quarter':
        return {
          clients: { value: 42, trend: 15 },
          sessions: { value: 215, trend: 12 },
          revenue: { value: '$12,840', trend: 8 },
          completion: { value: '88%', trend: 4 }
        };
      default:
        return {
          clients: { value: 24, trend: 12 },
          sessions: { value: 87, trend: 8 },
          revenue: { value: '$4,320', trend: 5 },
          completion: { value: '86%', trend: 2, isPositive: false }
        };
    }
  };

  const metrics = getMetrics();

  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-gray-900">{t('performanceAnalytics')}</h1>
            <p className="text-gray-500 mt-1">{t('trackAnalytics')}</p>
          </div>
          <div>
            <Tabs defaultValue={timeFilter} onValueChange={handleTimeFilterChange} className="w-[230px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="week">{t('week')}</TabsTrigger>
                <TabsTrigger value="month">{t('month')}</TabsTrigger>
                <TabsTrigger value="quarter">{t('quarter')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title={t('totalClients')}
            value={metrics.clients.value.toString()} 
            icon={<Users className="h-5 w-5" />}
            trend={{ value: metrics.clients.trend, isPositive: true }}
            description={t('vsPreviousPeriod')}
          />
          <StatsCard 
            title={t('totalSessions')}
            value={metrics.sessions.value.toString()} 
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: metrics.sessions.trend, isPositive: true }}
            description={t('vsPreviousPeriod')}
          />
          <StatsCard 
            title={t('monthlyRevenue')}
            value={metrics.revenue.value} 
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: metrics.revenue.trend, isPositive: true }}
            description={t('vsPreviousPeriod')}
          />
          <StatsCard 
            title={t('completionRate')}
            value={metrics.completion.value} 
            icon={<TrendingUp className="h-5 w-5" />}
            trend={{ 
              value: metrics.completion.trend, 
              isPositive: metrics.completion.isPositive !== false
            }}
            description={t('vsPreviousPeriod')}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart timeFilter={timeFilter} />
          <ClientRetentionChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
