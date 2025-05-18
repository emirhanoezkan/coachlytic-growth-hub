
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for revenue chart - later we can make this dynamic based on period
const dailyData = [
  { name: 'Mon', revenue: 800, sessions: 8 },
  { name: 'Tue', revenue: 1200, sessions: 12 },
  { name: 'Wed', revenue: 900, sessions: 9 },
  { name: 'Thu', revenue: 1400, sessions: 15 },
  { name: 'Fri', revenue: 1100, sessions: 11 }
];

const weeklyData = [
  { name: 'Week 1', revenue: 3500, sessions: 36 },
  { name: 'Week 2', revenue: 4200, sessions: 42 },
  { name: 'Week 3', revenue: 3800, sessions: 38 },
  { name: 'Week 4', revenue: 4600, sessions: 47 }
];

const monthlyData = [
  { name: 'Jan', revenue: 2400, sessions: 24 },
  { name: 'Feb', revenue: 2800, sessions: 28 },
  { name: 'Mar', revenue: 3200, sessions: 35 },
  { name: 'Apr', revenue: 3600, sessions: 39 },
  { name: 'May', revenue: 4320, sessions: 45 }
];

interface RevenueChartProps {
  period: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ period }) => {
  // Select data based on the period
  const data = period === 'day' 
    ? dailyData 
    : period === 'week' 
      ? weeklyData 
      : monthlyData;
      
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" name="Revenue ($)" fill="#2F5D3E" />
              <Bar yAxisId="right" dataKey="sessions" name="Sessions" fill="#B39BC8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
