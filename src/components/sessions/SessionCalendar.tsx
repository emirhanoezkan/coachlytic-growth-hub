
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SessionCalendar = () => {
  // Sample data for upcoming sessions
  const sessions = [
    { date: new Date(2025, 4, 19), count: 3 }, // May 19, 2025
    { date: new Date(2025, 4, 20), count: 2 }, // May 20, 2025
    { date: new Date(2025, 4, 22), count: 1 }, // May 22, 2025
    { date: new Date(2025, 4, 25), count: 2 }  // May 25, 2025
  ];

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Session Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single"
            selected={new Date()}
            className="rounded-md border"
            modifiers={{
              hasSessions: sessions.map(session => session.date),
            }}
            modifiersStyles={{
              hasSessions: {
                fontWeight: 'bold',
                backgroundColor: '#E0F5FE',
                color: '#0EA5E9',
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
                        <div className="bg-ocean-500 w-5 h-5 rounded-full flex items-center justify-center">
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
        <CardHeader>
          <CardTitle>Today's Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySessions.map((session, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg border border-gray-200">
                <div className="bg-vivid-100 text-vivid-600 px-3 py-2 rounded-md text-center min-w-16">
                  <div className="text-xs font-semibold">MAY</div>
                  <div className="text-lg font-bold">18</div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{session.time}</div>
                    <Badge className="bg-ocean-100 text-ocean-700 hover:bg-ocean-200">
                      {session.duration}
                    </Badge>
                  </div>
                  <div className="font-medium mt-1">{session.client}</div>
                  <div className="text-sm text-gray-500">{session.type}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
