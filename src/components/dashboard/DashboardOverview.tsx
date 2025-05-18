
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
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { ClientList } from "@/components/clients/ClientList";

interface DashboardOverviewProps {
  period: string;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ period }) => {
  // Data based on period
  const statsData = {
    day: {
      clients: { value: "18", trend: 15, description: "2 new today" },
      sessions: { value: "5", trend: 25, description: "1 more than yesterday" },
      completion: { value: "82%", trend: 3, description: "Daily completion rate" },
      revenue: { value: "$850", trend: 12, description: "$90 more than yesterday" }
    },
    week: {
      clients: { value: "21", trend: 20, description: "4 new this week" },
      sessions: { value: "12", trend: 18, description: "3 more than last week" },
      completion: { value: "84%", trend: 4, description: "Weekly completion rate" },
      revenue: { value: "$3,250", trend: 15, description: "$430 more than last week" }
    },
    month: {
      clients: { value: "24", trend: 33, description: "From 18 clients last month" },
      sessions: { value: "45", trend: 28, description: "12 more than last month" },
      completion: { value: "86%", trend: 5, description: "Monthly completion rate" },
      revenue: { value: "$4,280", trend: 23, description: "$820 more than last month" }
    }
  };

  const data = statsData[period as keyof typeof statsData] || statsData.month;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Clients"
          value={data.clients.value}
          icon={<Users className="h-4 w-4" />}
          description={data.clients.description}
          trend={{ value: data.clients.trend, isPositive: true }}
        />
        <StatsCard
          title="Sessions This Period"
          value={data.sessions.value}
          icon={<Calendar className="h-4 w-4" />}
          description={data.sessions.description}
          trend={{ value: data.sessions.trend, isPositive: true }}
        />
        <StatsCard
          title="Program Completion"
          value={data.completion.value}
          icon={<FileText className="h-4 w-4" />}
          description={data.completion.description}
          trend={{ value: data.completion.trend, isPositive: true }}
        />
        <StatsCard
          title={`${period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : 'Monthly'} Revenue`}
          value={data.revenue.value}
          icon={<BarChart className="h-4 w-4" />}
          description={data.revenue.description}
          trend={{ value: data.revenue.trend, isPositive: true }}
        />
      </div>

      <div className="pt-4">
        <ClientList />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart period={period} />
        <ClientRetentionChart period={period} />
      </div>

      {/* Combined Client Health and Upcoming Sessions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Client Dashboard</CardTitle>
          <CardDescription>Health scores and upcoming sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Health Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Client Health</h3>
              {[
                { name: "High Performers", value: 45, color: "bg-forest-500" },
                { name: "On Track", value: 32, color: "bg-forest-300" },
                { name: "Needs Attention", value: 15, color: "bg-yellow-400" },
                { name: "At Risk", value: 8, color: "bg-red-500" }
              ].map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className={item.color} />
                </div>
              ))}
            </div>
            
            {/* Upcoming Sessions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upcoming Sessions</h3>
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
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
