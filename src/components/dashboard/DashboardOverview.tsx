
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

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Clients"
          value="24"
          icon={<Users className="h-4 w-4" />}
          description="From 18 clients last month"
          trend={{ value: 33, isPositive: true }}
        />
        <StatsCard
          title="Sessions This Week"
          value="12"
          icon={<Calendar className="h-4 w-4" />}
          description="3 more than last week"
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Program Completion"
          value="86%"
          icon={<FileText className="h-4 w-4" />}
          description="Average across all clients"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="$4,280"
          icon={<BarChart className="h-4 w-4" />}
          description="$820 more than last month"
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Health Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Health</CardTitle>
            <CardDescription>Average progress score across all clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Upcoming Sessions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
