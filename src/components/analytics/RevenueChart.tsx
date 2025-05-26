
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
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
  const { t, language } = useLanguage();
  
  // Select data based on the period
  const data = period === 'day' 
    ? dailyData 
    : period === 'week' 
      ? weeklyData 
      : monthlyData;
  
  // Translate day names for daily data
  const translateDayName = (day: string) => {
    const dayMap: Record<string, string> = {
      'Mon': 'day.mon',
      'Tue': 'day.tue',
      'Wed': 'day.wed',
      'Thu': 'day.thu',
      'Fri': 'day.fri',
      'Sat': 'day.sat',
      'Sun': 'day.sun',
    };
    
    return dayMap[day] ? t(dayMap[day]) : day;
  };
  
  // Translate month names
  const translateMonthName = (month: string) => {
    const monthMap: Record<string, string> = {
      'Jan': 'month.jan',
      'Feb': 'month.feb',
      'Mar': 'month.mar',
      'Apr': 'month.apr',
      'May': 'month.may',
      'Jun': 'month.jun',
      'Jul': 'month.jul',
      'Aug': 'month.aug',
      'Sep': 'month.sep',
      'Oct': 'month.oct',
      'Nov': 'month.nov',
      'Dec': 'month.dec',
    };
    
    return monthMap[month] ? t(monthMap[month]) : month;
  };
  
  // Translating names based on period
  const translatedData = data.map(item => {
    if (period === 'day') {
      return { ...item, name: translateDayName(item.name) };
    } else if (period === 'month') {
      return { ...item, name: translateMonthName(item.name) };
    } else {
      // For weekly data, we translate "Week" part
      return { ...item, name: item.name.replace('Week', t('time.week')) };
    }
  });

  // Custom tooltip with currency formatting
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'revenue' ? (
                `${t('chart.revenue')}: ${formatCurrency(entry.value, language)}`
              ) : (
                `${t('chart.sessions')}: ${entry.value}`
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={translatedData}
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="revenue" 
            name={t('chart.revenue')} 
            fill="#2F5D3E" 
          />
          <Bar 
            yAxisId="right" 
            dataKey="sessions" 
            name={t('chart.sessions')} 
            fill="#B39BC8" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
