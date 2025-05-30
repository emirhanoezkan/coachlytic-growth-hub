
import React from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientHealthSection } from "@/components/dashboard/ClientHealthSection";
import { UpcomingSessionsSection } from "@/components/dashboard/UpcomingSessionsSection";
import { Users, Wallet, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LucideIcon } from "lucide-react";

interface DashboardOverviewProps {
  period: string;
}

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "increase" | "decrease";
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ period }) => {
  const { t } = useLanguage();
  
  const stats: StatItem[] = [
    {
      title: t('dashboard.totalRevenueStat'),
      value: "$45,000",
      icon: Wallet,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: t('dashboard.newClientsStat'),
      value: "235",
      icon: Users,
      change: "+9%",
      changeType: "increase",
    },
    {
      title: t('analytics.retention'),
      value: "85%",
      icon: User,
      change: "-3%",
      changeType: "decrease",
    },
    {
      title: t('dashboard.avgSessionTimeStat'),
      value: "52 min",
      icon: Users,
      change: "+5%",
      changeType: "increase",
    },
  ];

  const translatedPeriod = t(`time.${period}`);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Row - Mobile: 2x2 grid, Desktop: 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={<stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Revenue and Retention Charts - Mobile: stacked, Desktop: side by side */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg md:text-xl">{t('analytics.revenue')}</CardTitle> 
            <CardDescription className="text-sm">{t('dashboard.revenueDescription')} {translatedPeriod}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="h-64 sm:h-72 md:h-80 w-full">
              <RevenueChart period={period} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg md:text-xl">{t('dashboard.clientRetentionCardTitle')}</CardTitle>
            <CardDescription className="text-sm">{t('dashboard.clientRetentionCardDescription')} {translatedPeriod}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="h-64 sm:h-72 md:h-80 w-full">
              <ClientRetentionChart period={period} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Dashboard Sections - Mobile: stacked, Desktop: side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg md:text-xl">{t('dashboard.clientHealthCardTitle')}</CardTitle>
            <CardDescription className="text-sm">{t('dashboard.clientStatusDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ClientHealthSection />
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg md:text-xl">{t('dashboard.upcomingSessionsCardTitle')}</CardTitle>
            <CardDescription className="text-sm">{t('dashboard.todayAppointmentsCardDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <UpcomingSessionsSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
