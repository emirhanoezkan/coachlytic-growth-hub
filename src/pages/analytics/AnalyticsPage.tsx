
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/ui/StatsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, DollarSign, BarChart, TrendingUp } from "lucide-react";
import { ClientRetentionChart } from "@/components/analytics/ClientRetentionChart";
import { RevenueChart } from "@/components/analytics/RevenueChart";

const AnalyticsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title="Analytics" />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">Performance Analytics</h1>
                  <p className="text-gray-500 mt-1">Track and analyze your coaching business metrics</p>
                </div>
                <div>
                  <Tabs defaultValue="month" className="w-[230px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                      <TabsTrigger value="quarter">Quarter</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard 
                  title="Total Clients"
                  value="24" 
                  icon={<Users className="h-5 w-5" />}
                  trend={{ value: 12, isPositive: true }}
                  description="vs previous period"
                />
                <StatsCard 
                  title="Total Sessions"
                  value="87" 
                  icon={<Clock className="h-5 w-5" />}
                  trend={{ value: 8, isPositive: true }}
                  description="vs previous period"
                />
                <StatsCard 
                  title="Monthly Revenue"
                  value="$4,320" 
                  icon={<DollarSign className="h-5 w-5" />}
                  trend={{ value: 5, isPositive: true }}
                  description="vs previous period"
                />
                <StatsCard 
                  title="Completion Rate"
                  value="86%" 
                  icon={<TrendingUp className="h-5 w-5" />}
                  trend={{ value: 2, isPositive: false }}
                  description="vs previous period"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart />
                <ClientRetentionChart />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AnalyticsPage;
