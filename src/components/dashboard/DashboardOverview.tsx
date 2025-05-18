
import React from 'react';
import { StatsCard } from "@/components/ui/StatsCard";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Users, Calendar, FileText, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DashboardOverviewProps {
  timeFilter: "day" | "week" | "month";
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ timeFilter }) => {
  const { t } = useI18n();
  const { toast } = useToast();

  // Sample data based on time filter
  const getFilteredData = () => {
    switch (timeFilter) {
      case 'day':
        return {
          activeClients: { value: 15, trend: 25 },
          sessions: { value: 4, trend: 33 },
          completion: { value: 82, trend: 3 },
          revenue: { value: '$580', trend: 15 }
        };
      case 'week':
        return {
          activeClients: { value: 24, trend: 33 },
          sessions: { value: 12, trend: 25 },
          completion: { value: 86, trend: 5 },
          revenue: { value: '$4,280', trend: 23 }
        };
      case 'month':
        return {
          activeClients: { value: 32, trend: 42 },
          sessions: { value: 45, trend: 18 },
          completion: { value: 84, trend: 2 },
          revenue: { value: '$15,840', trend: 28 }
        };
    }
  };

  const data = getFilteredData();
  
  const handleViewSession = (time: string, client: string) => {
    toast({
      title: "Session Details",
      description: `${time} session with ${client}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('activeClients')}
          value={data.activeClients.value.toString()}
          icon={<Users className="h-4 w-4" />}
          description={`${t('fromLastMonth')}`}
          trend={{ value: data.activeClients.trend, isPositive: true }}
        />
        <StatsCard
          title={t('sessionsThisWeek')}
          value={data.sessions.value.toString()}
          icon={<Calendar className="h-4 w-4" />}
          description={`${data.sessions.trend} ${t('moreLastWeek')}`}
          trend={{ value: data.sessions.trend, isPositive: true }}
        />
        <StatsCard
          title={t('programCompletion')}
          value={`${data.completion.value}%`}
          icon={<FileText className="h-4 w-4" />}
          description={t('averageClients')}
          trend={{ value: data.completion.trend, isPositive: true }}
        />
        <StatsCard
          title={t('monthlyRevenue')}
          value={data.revenue.value}
          icon={<BarChart className="h-4 w-4" />}
          description={`${data.revenue.value} ${t('moreThanLastMonth')}`}
          trend={{ value: data.revenue.trend, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Health Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('clientHealth')}</CardTitle>
            <CardDescription>{t('averageProgress')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "highPerformers", value: 45, color: "bg-forest-500" },
                { name: "onTrack", value: 32, color: "bg-forest-300" },
                { name: "needsAttention", value: 15, color: "bg-yellow-400" },
                { name: "atRisk", value: 8, color: "bg-red-500" }
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t(item.name as any)}</span>
                    <span className="text-sm text-gray-500">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('upcomingSessions')}</CardTitle>
                <CardDescription>{t('scheduleToday')}</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "10:00 AM",
                  client: "Sarah Johnson",
                  type: "Career Coaching",
                  duration: "45 min"
                },
                {
                  time: "11:30 AM",
                  client: "Michael Chen",
                  type: "Business Strategy",
                  duration: "60 min"
                },
                {
                  time: "2:00 PM",
                  client: "Emma Davis",
                  type: "Life Coaching",
                  duration: "45 min"
                },
                {
                  time: "4:30 PM",
                  client: "Robert Wilson",
                  type: "Executive Coaching",
                  duration: "60 min"
                }
              ].map((session, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleViewSession(session.time, session.client)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-lavender-100 text-lavender-500 p-2 rounded-full">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{session.client}</p>
                      <p className="text-sm text-gray-500">{session.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{session.time}</p>
                    <p className="text-sm text-gray-500">{session.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
