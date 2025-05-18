
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Sample data for client retention chart
const data = [
  { name: 'Active Clients', value: 18 },
  { name: 'Completed', value: 5 },
  { name: 'Inactive', value: 3 },
  { name: 'At-Risk', value: 2 },
];

const COLORS = ['#2F5D3E', '#B39BC8', '#A3A3A3', '#FF6B6B'];

export const ClientRetentionChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Retention</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
