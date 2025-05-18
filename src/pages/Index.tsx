
import React, { useState, useEffect } from "react";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ClientList } from "@/components/clients/ClientList";
import { SessionCalendar } from "@/components/sessions/SessionCalendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/contexts/I18nContext";
import { ClientForm } from "@/components/clients/ClientForm";
import { SessionForm } from "@/components/sessions/SessionForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarCheck, Users } from "lucide-react";

const Index = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month">("day");
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todaySessionsVisible, setTodaySessionsVisible] = useState(false);
  
  // Example sessions for demo purposes
  const todaySessions = [
    { id: 1, client: "Sarah Johnson", time: "10:00 AM", duration: "60 min", type: "Career Development" },
    { id: 2, client: "Michael Chen", time: "2:30 PM", duration: "45 min", type: "Business Strategy" }
  ];

  const handleAddClient = () => {
    setIsAddClientDialogOpen(true);
  };

  const handleScheduleSession = () => {
    setIsAddSessionDialogOpen(true);
  };

  const handleAddNote = (clientName: string) => {
    toast({
      title: "Note Added",
      description: `Note added for ${clientName}`,
    });
  };

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value as "day" | "week" | "month");
    // Update the dashboard data based on the new time filter
    toast({
      description: `Dashboard view switched to ${value} view`,
    });
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setTodaySessionsVisible(true);
      toast({
        description: `Selected ${new Intl.DateTimeFormat().format(date)}`,
      });
    }
  };
  
  const handleSessionSubmit = () => {
    toast({
      title: "Success",
      description: t("sessionScheduled"),
    });
    setIsAddSessionDialogOpen(false);
  };
  
  const handleClientSubmit = () => {
    toast({
      title: "Success",
      description: t("clientAdded"),
    });
    setIsAddClientDialogOpen(false);
  };

  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-gray-900">{t('welcomeTo')}</h1>
            <p className="text-gray-500 mt-1">{t('coachingAnalytics')}</p>
          </div>
          <div className="flex gap-3">
            <Tabs value={timeFilter} onValueChange={handleTimeFilterChange} className="w-[230px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">{t('day')}</TabsTrigger>
                <TabsTrigger value="week">{t('week')}</TabsTrigger>
                <TabsTrigger value="month">{t('month')}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <DashboardOverview timeFilter={timeFilter} />
        
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SessionCalendar onDateSelect={handleDateSelect} />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">{t('todaySessions')}</CardTitle>
                  <CardDescription>{selectedDate ? new Intl.DateTimeFormat().format(selectedDate) : t('scheduleToday')}</CardDescription>
                </div>
                <CalendarCheck className="h-4 w-4 text-forest-500" />
              </CardHeader>
              <CardContent>
                {todaySessionsVisible ? (
                  <div className="space-y-4">
                    {todaySessions.map((session) => (
                      <div key={session.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{session.client}</p>
                          <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <span>{session.time}</span>
                            <span className="text-gray-400">•</span>
                            <span>{session.duration}</span>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                    <Button 
                      className="w-full bg-forest-500 hover:bg-forest-600 mt-2" 
                      onClick={handleScheduleSession}
                    >
                      {t('addSession')}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">{t('selectDateMessage')}</p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDateSelect(new Date())}
                    >
                      {t('viewToday')}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="pt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl font-medium">{t('clientDirectory')}</CardTitle>
                <CardDescription>{t('manageClients')}</CardDescription>
              </div>
              <Users className="h-5 w-5 text-forest-500" />
            </CardHeader>
            <CardContent>
              <ClientList 
                onAddClient={handleAddClient}
                onViewProfile={(id) => toast({ description: `Viewing client ${id} profile` })}
                onScheduleSession={handleScheduleSession}
                onAddNote={handleAddNote}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('addClient')}</DialogTitle>
          </DialogHeader>
          <ClientForm onSubmit={handleClientSubmit} />
        </DialogContent>
      </Dialog>

      {/* Add Session Dialog */}
      <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('scheduleSession')}</DialogTitle>
          </DialogHeader>
          <SessionForm 
            onSubmit={handleSessionSubmit}
            initialData={selectedDate ? { date: selectedDate } : undefined} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
