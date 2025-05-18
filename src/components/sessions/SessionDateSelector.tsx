
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useSessions } from "@/services/sessionsService";
import { format } from "date-fns";
import { useTimeFormat } from "@/contexts/TimeFormatContext";

export const SessionDateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { data: sessions = [] } = useSessions();
  const { timeFormat, formatTime } = useTimeFormat();

  // Extract dates with sessions
  const datesWithSessions = sessions.reduce((acc, session) => {
    const sessionDate = new Date(session.date);
    const dateStr = format(sessionDate, 'yyyy-MM-dd');
    
    if (!acc[dateStr]) {
      acc[dateStr] = { date: sessionDate, count: 1 };
    } else {
      acc[dateStr].count++;
    }
    
    return acc;
  }, {} as Record<string, { date: Date, count: number }>);

  // Convert to array for easier rendering
  const sessionDates = Object.values(datesWithSessions);

  // Filter sessions for the selected date
  const sessionsForSelectedDate = selectedDate 
    ? sessions.filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate.getFullYear() === selectedDate.getFullYear() &&
               sessionDate.getMonth() === selectedDate.getMonth() &&
               sessionDate.getDate() === selectedDate.getDate();
      })
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Session Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              hasSessions: sessionDates.map(session => session.date),
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
                const matchingDate = sessionDates.find(s => 
                  s.date.getDate() === props.date.getDate() && 
                  s.date.getMonth() === props.date.getMonth() &&
                  s.date.getFullYear() === props.date.getFullYear()
                );
                
                return (
                  <div className="relative">
                    <span>{props.date.getDate()}</span>
                    {matchingDate && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-forest-500 w-5 h-5 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{matchingDate.count}</span>
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
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : "No date selected"}
          </h3>
          
          <div className="space-y-3">
            {sessionsForSelectedDate.length > 0 ? (
              sessionsForSelectedDate.map((session, idx) => {
                const sessionDate = new Date(session.date);
                return (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <p className="font-medium">{formatTime(sessionDate)}</p>
                      <p className="text-sm text-gray-500">{session.duration} min</p>
                    </div>
                    <p className="text-sm mt-1">{session.clients?.name || "Client"}</p>
                    <p className="text-xs text-gray-500">{session.title}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm py-3">No sessions scheduled for this date</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
