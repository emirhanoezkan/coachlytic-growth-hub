
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProgramForm } from "@/components/programs/ProgramForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/contexts/I18nContext";
import { useToast } from "@/hooks/use-toast";
import { ProgramList } from "@/components/programs/ProgramList";

const ProgramsPage = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const [isEditProgramDialogOpen, setIsEditProgramDialogOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<any>(null);

  const handleAddProgram = () => {
    setIsAddProgramDialogOpen(true);
  };

  const handleEditProgram = (program: any) => {
    setCurrentProgram(program);
    setIsEditProgramDialogOpen(true);
  };

  const handleDeleteProgram = (id: number) => {
    toast({
      title: t('success'),
      description: `Program #${id} has been deleted.`,
    });
  };

  const handleProgramSubmit = () => {
    toast({
      title: t('success'),
      description: t('programCreated'),
    });
    setIsAddProgramDialogOpen(false);
    setIsEditProgramDialogOpen(false);
  };

  return (
    <div className="p-6 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-gray-900">{t('coachingPrograms')}</h1>
            <p className="text-gray-500 mt-1">{t('managePrograms')}</p>
          </div>
          <div>
            <Button 
              onClick={handleAddProgram} 
              className="bg-forest-500 hover:bg-forest-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('createProgram')}
            </Button>
          </div>
        </div>
        
        <ProgramList onEdit={handleEditProgram} onDelete={handleDeleteProgram} />
      </div>
      
      <Dialog open={isAddProgramDialogOpen} onOpenChange={setIsAddProgramDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('createProgram')}</DialogTitle>
          </DialogHeader>
          <ProgramForm onSubmit={handleProgramSubmit} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditProgramDialogOpen} onOpenChange={setIsEditProgramDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
          </DialogHeader>
          <ProgramForm 
            onSubmit={handleProgramSubmit}
            initialData={currentProgram}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramsPage;
