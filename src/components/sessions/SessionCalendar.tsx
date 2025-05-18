
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface SessionCalendarProps {
  onDateSelect?: (date: Date | null) => void;
  initialDate?: Date | null;
}

export const SessionCalendar: React.FC<SessionCalendarProps> = ({ onDateSelect, initialDate }) => {
  const { t } = useI18n();
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || new Date());

  // Sample data for upcoming sessions
  const sessions = [
    { date: new Date(2025, 4, 19), count: 3 }, // May 19, 2025
    { date: new Date(2025, 4, 20), count: 2 }, // May 20, 2025
    { date: new Date(2025, 4, 22), count: 1 }, // May 22, 2025
    { date: new Date(2025, 4, 25), count: 2 }  // May 25, 2025
  ];

  // Get sessions for selected date
  const todaySessions = [
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
    }
  ];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{t('sessionCalendar')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
            modifiers={{
              hasSessions: sessions.map(session => session.date),
            }}
            modifiersStyles={{
              hasSessions: {
                fontWeight: 'bold',
                backgroundColor: '#EBF2ED',
                color: '#2F5D3E',
                position: 'relative',
              }
            }}
            components={{
              DayContent: (props) => {
                const session = sessions.find(s => 
                  s.date.getDate() === props.date.getDate() && 
                  s.date.getMonth() === props.date.getMonth() &&
                  s.date.getFullYear() === props.date.getFullYear()
                );
                
                return (
                  <div className="relative">
                    <span>{props.date.getDate()}</span>
                    {session && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-forest-500 w-5 h-5 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{session.count}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : t('todaySessions')}
          </CardTitle>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={() => handleDateSelect(new Date())}>
              <span className="sr-only">Today</span>
              <span>Today</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No sessions scheduled for this day
              </div>
            ) : (
              todaySessions.map((session, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg border border-gray-200 hover:border-forest-300 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="bg-lavender-100 text-lavender-600 px-3 py-2 rounded-md text-center min-w-16">
                    <div className="text-xs font-semibold">
                      {selectedDate ? format(selectedDate, "MMM").toUpperCase() : "MAY"}
                    </div>
                    <div className="text-lg font-bold">
                      {selectedDate ? format(selectedDate, "d") : "18"}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900">{session.time}</div>
                      <Badge className="bg-forest-100 text-forest-800 hover:bg-forest-200">
                        {session.duration}
                      </Badge>
                    </div>
                    <div className="font-medium mt-1">{session.client}</div>
                    <div className="text-sm text-gray-500">{session.type}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
