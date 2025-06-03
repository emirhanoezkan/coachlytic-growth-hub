
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { SessionDateSelector } from "@/components/sessions/SessionDateSelector";
import { Button } from "@/components/ui/button";
import { Plus, CalendarDays, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SessionForm } from "@/components/sessions/SessionForm";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { SessionList } from "@/components/sessions/SessionList";
import { useLanguage } from "@/contexts/LanguageContext";

const SessionsPage = () => {
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [view, setView] = useState("calendar");
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">{t('sessions.title')}</h1>
            <p className="text-gray-500 text-sm sm:text-base">{t('sessions.subtitle')}</p>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:gap-3 sm:space-y-0">
            <Tabs value={view} onValueChange={setView} className="w-full sm:w-[160px]">
              <TabsList className="grid w-full grid-cols-2 h-10">
                <TabsTrigger value="calendar" className="flex items-center gap-1 text-xs sm:text-sm">
                  <CalendarDays className="h-3 w-3" />
                  <span className="hidden sm:inline">{t('sessions.calendar')}</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-1 text-xs sm:text-sm">
                  <List className="h-3 w-3" />
                  <span className="hidden sm:inline">{t('sessions.list')}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              onClick={() => setIsAddSessionDialogOpen(true)} 
              className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10"
              size="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('sessions.add')}
            </Button>
          </div>
        </div>
        
        <Tabs value={view} className="w-full">
          <TabsContent value="calendar" className="w-full mt-0">
            <SessionDateSelector />
          </TabsContent>
          <TabsContent value="list" className="w-full mt-0">
            <SessionList />
          </TabsContent>
        </Tabs>
      </div>
      
      <ResponsiveDialog
        open={isAddSessionDialogOpen}
        onOpenChange={setIsAddSessionDialogOpen}
        title={t('sessions.new')}
        description={t('sessions.createDesc')}
        size="lg"
      >
        <SessionForm onSubmit={() => setIsAddSessionDialogOpen(false)} />
      </ResponsiveDialog>
    </ResponsiveLayout>
  );
};

export default SessionsPage;
