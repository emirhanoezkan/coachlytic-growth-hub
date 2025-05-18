
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SessionCalendar } from "@/components/sessions/SessionCalendar";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionForm } from "@/components/sessions/SessionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SessionList } from "@/components/sessions/SessionList";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

const SessionsPage = () => {
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [view, setView] = useState("calendar");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Sample data for sessions on the selected date
  const sessionsForSelectedDate = [
    {
      time: "10:00 AM",
      client: "Sarah Johnson",
      type: "Career Coaching",
      duration: "45 min"
    },
    {
      time: "2:00 PM",
      client: "Emma Davis",
      type: "Life Coaching",
      duration: "45 min"
    }
  ];

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-semibold text-gray-900">Session Calendar</h1>
                  <p className="text-gray-500 mt-1">Schedule and manage your coaching sessions</p>
                </div>
                <div className="flex gap-3">
                  <Tabs value={view} onValueChange={setView} className="w-[200px]">
                    <TabsList>
                      <TabsTrigger value="calendar" className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        Calendar
                      </TabsTrigger>
                      <TabsTrigger value="list" className="flex items-center gap-1">
                        <List className="h-4 w-4" />
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button 
                    onClick={() => setIsAddSessionDialogOpen(true)} 
                    className="bg-forest-500 hover:bg-forest-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>
              </div>
              
              {view === "calendar" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <SessionCalendar />
                  </div>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border shadow-sm mb-6"
                      />
                      
                      {selectedDate && (
                        <div>
                          <h4 className="text-md font-medium mb-3">
                            Sessions on {selectedDate.toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </h4>
                          <div className="space-y-3">
                            {sessionsForSelectedDate.length > 0 ? (
                              sessionsForSelectedDate.map((session, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                                  <div className="flex justify-between">
                                    <p className="font-medium">{session.time}</p>
                                    <p className="text-sm text-gray-500">{session.duration}</p>
                                  </div>
                                  <p className="text-sm mt-1">{session.client}</p>
                                  <p className="text-xs text-gray-500">{session.type}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500 text-sm py-3">No sessions scheduled for this date</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <SessionList />
              )}
            </div>
          </main>
          
          <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Session</DialogTitle>
              </DialogHeader>
              <SessionForm onSubmit={() => setIsAddSessionDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SessionsPage;
