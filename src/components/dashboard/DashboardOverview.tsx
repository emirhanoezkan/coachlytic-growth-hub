
import React from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientHealthSection } from "@/components/dashboard/ClientHealthSection";
import { UpcomingSessionsSection } from "@/components/dashboard/UpcomingSessionsSection";
import { Users, Wallet, ArrowUp, ArrowDown, User } from "lucide-react";
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
      title: t('dashboard.totalRevenue'),
      value: "$45,000",
      icon: Wallet,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: t('dashboard.newClients'),
      value: "235",
      icon: Users,
      change: "+9%",
      changeType: "increase",
    },
    {
      title: t('dashboard.clientRetention'),
      value: "85%",
      icon: User,
      change: "-3%",
      changeType: "decrease",
    },
    {
      title: t('dashboard.avgSessionTime'),
      value: "52 min",
      icon: Users,
      change: "+5%",
      changeType: "increase",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={<stat.icon className="h-4 w-4" />}
            change={stat.change}
            changeType={stat.changeType}
          />
        ))}
      </div>

      {/* Revenue and Retention Charts */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.revenue')}</CardTitle>
            <CardDescription>{t('dashboard.revenueDesc', { period })}</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart period={period} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.clientRetentionTitle')}</CardTitle>
            <CardDescription>{t('dashboard.clientRetentionDesc', { period })}</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientRetentionChart period={period} />
          </CardContent>
        </Card>
      </div>

      {/* Client Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.clientHealth')}</CardTitle>
            <CardDescription>{t('dashboard.clientStatus')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientHealthSection />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.upcomingSessions')}</CardTitle>
            <CardDescription>{t('dashboard.todayAppointments')}</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingSessionsSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

