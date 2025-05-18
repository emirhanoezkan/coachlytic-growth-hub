
import React, { useState } from "react";
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

const Index = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [timeFilter, setTimeFilter] = useState<"day" | "week" | "month">("day");
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    // Here we would update the dashboard data based on the new time filter
    toast({
      description: `Dashboard view switched to ${value} view`,
    });
  };

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      toast({
        description: `Selected ${new Intl.DateTimeFormat().format(date)}`,
      });
    }
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
        
        <div className="pt-6">
          <SessionCalendar onDateSelect={handleDateSelect} />
        </div>
        
        <div className="pt-6">
          <ClientList 
            onAddClient={handleAddClient}
            onViewProfile={(id) => toast({ description: `Viewing client ${id} profile` })}
            onScheduleSession={handleScheduleSession}
            onAddNote={handleAddNote}
          />
        </div>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('addClient')}</DialogTitle>
          </DialogHeader>
          <ClientForm onSubmit={() => setIsAddClientDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Add Session Dialog */}
      <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Session</DialogTitle>
          </DialogHeader>
          <SessionForm onSubmit={() => setIsAddSessionDialogOpen(false)} initialDate={selectedDate} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
