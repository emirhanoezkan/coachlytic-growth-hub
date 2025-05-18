
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useLanguage } from "@/contexts/LanguageContext";

// Sample data for client retention chart for different periods
const dailyData = [
  { name: 'Active Clients', value: 12 },
  { name: 'Completed', value: 3 },
  { name: 'Inactive', value: 2 },
  { name: 'At-Risk', value: 1 },
];

const weeklyData = [
  { name: 'Active Clients', value: 15 },
  { name: 'Completed', value: 4 },
  { name: 'Inactive', value: 3 },
  { name: 'At-Risk', value: 2 },
];

const monthlyData = [
  { name: 'Active Clients', value: 18 },
  { name: 'Completed', value: 5 },
  { name: 'Inactive', value: 3 },
  { name: 'At-Risk', value: 2 },
];

const COLORS = ['#2F5D3E', '#B39BC8', '#A3A3A3', '#FF6B6B'];

interface ClientRetentionChartProps {
  period: string;
}

export const ClientRetentionChart: React.FC<ClientRetentionChartProps> = ({ period }) => {
  const { t } = useLanguage();
  
  // Select data based on the period
  const data = period === 'day' 
    ? dailyData 
    : period === 'week' 
      ? weeklyData 
      : monthlyData;
      
  // Translate chart data labels
  const translatedData = data.map(item => ({
    ...item,
    name: t(`chart.${item.name.toLowerCase().replace(' ', '_')}`)
  }));
      
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={translatedData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {translatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
