
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Banknote, Edit, Trash2 } from "lucide-react";
import { usePrograms, useDeleteProgram, Program } from "@/services/programsService";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProgramForm } from "@/components/programs/ProgramForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatCurrency } from "@/utils/currency";

export const ProgramList: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: programs = [], isLoading, error } = usePrograms();
  const { mutate: deleteProgram } = useDeleteProgram();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = (program: Program) => {
    setSelectedProgram(program);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedProgram) {
      deleteProgram(selectedProgram.id);
    }
    setIsDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((skeleton) => (
          <Card key={skeleton} className="animate-pulse">
            <CardHeader className="h-32 bg-gray-100"></CardHeader>
            <CardContent className="h-24 mt-2 bg-gray-100"></CardContent>
            <CardFooter className="h-10 mt-2 bg-gray-100"></CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="py-8">
        <CardContent>
          <div className="text-center text-red-500">
            {t('action.loading')} {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (programs.length === 0) {
    return (
      <Card className="py-8">
        <CardContent>
          <div className="text-center text-muted-foreground">
            {t('programs.noPrograms')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="truncate">{program.name}</CardTitle> {/* Added truncate */}
                <Badge className="bg-forest-100 text-forest-800 hover:bg-forest-200 flex-shrink-0"> {/* Added flex-shrink-0 to badge */}
                  {program.sessions_count} {t('programs.sessions')}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 h-10">
                {program.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Changed to flex layout for better wrapping on small screens */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center min-w-[calc(50%-0.5rem)] sm:min-w-0"> {/* Ensure items can take ~half width on xs */}
                  <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{program.sessions_count} {t('programs.sessions')}</span>
                </div>
                <div className="flex items-center min-w-[calc(50%-0.5rem)] sm:min-w-0">
                  <Users className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{program.duration || "-"} {t('time.week')}</span>
                </div>
                <div className="flex items-center min-w-[calc(50%-0.5rem)] sm:min-w-0">
                  <Banknote className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{program.price ? formatCurrency(program.price, language) : "-"}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEdit(program)}>
                <Edit className="h-4 w-4 mr-1" />
                {t('action.edit')}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={() => handleDelete(program)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {t('action.delete')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('action.edit')} {selectedProgram?.name}</DialogTitle>
          </DialogHeader>
          {selectedProgram && (
            <ProgramForm 
              onSubmit={() => setIsEditDialogOpen(false)} 
              initialData={{
                id: selectedProgram.id,
                name: selectedProgram.name,
                description: selectedProgram.description || '',
                sessions_count: selectedProgram.sessions_count,
                duration: selectedProgram.duration || undefined,
                price: selectedProgram.price || undefined,
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('action.confirm')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('programs.deleteConfirm')} "{selectedProgram?.name}". {t('programs.deleteWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('action.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {t('action.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
