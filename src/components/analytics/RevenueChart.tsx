
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for revenue chart
const data = [
  { month: 'Jan', revenue: 2400, sessions: 24 },
  { month: 'Feb', revenue: 2800, sessions: 28 },
  { month: 'Mar', revenue: 3200, sessions: 35 },
  { month: 'Apr', revenue: 3600, sessions: 39 },
  { month: 'May', revenue: 4320, sessions: 45 }
];

export const RevenueChart: React.FC = () => {
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
              <XAxis dataKey="month" />
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
