
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useI18n } from "@/contexts/I18nContext";

interface RevenueChartProps {
  timeFilter?: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ timeFilter = 'month' }) => {
  const { t } = useI18n();
  
  // Sample data based on timeFilter
  const getChartData = () => {
    switch(timeFilter) {
      case 'week':
        return [
          { name: 'Mon', revenue: 150 },
          { name: 'Tue', revenue: 230 },
          { name: 'Wed', revenue: 180 },
          { name: 'Thu', revenue: 340 },
          { name: 'Fri', revenue: 290 },
          { name: 'Sat', revenue: 120 },
          { name: 'Sun', revenue: 80 },
        ];
      case 'month':
        return [
          { name: 'Week 1', revenue: 980 },
          { name: 'Week 2', revenue: 1200 },
          { name: 'Week 3', revenue: 850 },
          { name: 'Week 4', revenue: 1290 },
        ];
      case 'quarter':
        return [
          { name: 'Jan', revenue: 3800 },
          { name: 'Feb', revenue: 4200 },
          { name: 'Mar', revenue: 4800 },
        ];
      default:
        return [
          { name: 'Week 1', revenue: 980 },
          { name: 'Week 2', revenue: 1200 },
          { name: 'Week 3', revenue: 850 },
          { name: 'Week 4', revenue: 1290 },
        ];
    }
  };
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{t('monthlyRevenue')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getChartData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
