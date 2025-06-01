
import React, { useState } from 'react';
import { ResponsiveLayout } from "@/components/layout/ResponsiveLayout";
import { ProgramList } from "@/components/programs/ProgramList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProgramForm } from "@/components/programs/ProgramForm";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const ProgramsPage = () => {
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <ResponsiveLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gray-900">
              {t('programs.title')}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">
              {t('programs.subtitle')}
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Button 
              onClick={() => setIsAddProgramDialogOpen(true)} 
              className="bg-forest-500 hover:bg-forest-600 w-full sm:w-auto h-12 sm:h-10"
              size="default"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('programs.create')}
            </Button>
          </div>
        </div>
        
        <ProgramList />
      </div>
      
      <ResponsiveDialog
        open={isAddProgramDialogOpen}
        onOpenChange={setIsAddProgramDialogOpen}
        title={t('programs.new')}
      >
        <ProgramForm onSubmit={() => setIsAddProgramDialogOpen(false)} />
      </ResponsiveDialog>
    </ResponsiveLayout>
  );
};

export default ProgramsPage;
