
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
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      {/* Stats Row - Mobile: 2x2 grid, Tablet+: 4 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={<stat.icon className="h-3 w-3 sm:h-4 sm:w-4" />}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Revenue and Retention Charts - Mobile: stacked, Desktop: side by side */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 sm:pb-3 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">{t('analytics.revenue')}</CardTitle> 
            <CardDescription className="text-xs sm:text-sm">{t('dashboard.revenueDescription')} {translatedPeriod}</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <div className="h-48 sm:h-64 md:h-80">
              <RevenueChart period={period} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">{t('dashboard.clientRetentionCardTitle')}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{t('dashboard.clientRetentionCardDescription')} {translatedPeriod}</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <div className="h-48 sm:h-64 md:h-80">
              <ClientRetentionChart period={period} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Dashboard Sections - Mobile: stacked, Desktop: side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-3 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">{t('dashboard.clientHealthCardTitle')}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{t('dashboard.clientStatusDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <ClientHealthSection />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 sm:pb-3 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">{t('dashboard.upcomingSessionsCardTitle')}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{t('dashboard.todayAppointmentsCardDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-4 md:p-6 pt-0">
            <UpcomingSessionsSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
