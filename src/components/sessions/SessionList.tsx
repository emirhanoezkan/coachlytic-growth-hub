
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { useDeleteSession, useSessions } from "@/services/sessionsService";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { SessionForm } from "@/components/sessions/SessionForm";
import { format } from "date-fns";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export const SessionList: React.FC = () => {
  const { data: sessions = [], isLoading } = useSessions();
  const deleteSession = useDeleteSession();
  const { formatTime } = useTimeFormat();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const sessionToEdit = sessions.find(s => s.id === editSessionId);
  
  const handleViewDetails = (sessionId: string) => {
    // In a real application, this might navigate to a session details page
    console.log("View details for session:", sessionId);
  };
  
  const handleEditSession = (sessionId: string) => {
    setEditSessionId(sessionId);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteSession = (sessionId: string) => {
    setDeleteSessionId(sessionId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteSession = async () => {
    if (deleteSessionId) {
      try {
        await deleteSession.mutateAsync(deleteSessionId);
        setIsDeleteDialogOpen(false);
        setDeleteSessionId(null);
      } catch (error) {
        toast({
          title: t('error.title'),
          description: t('error.sessionDelete'),
          variant: "destructive"
        });
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="rounded-md border overflow-hidden bg-white p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">{t('sessions.loading')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('sessions.client')}</TableHead>
              <TableHead>{t('sessions.title')}</TableHead>
              <TableHead>{t('sessions.date')}</TableHead>
              <TableHead>{t('sessions.time')}</TableHead>
              <TableHead>{t('sessions.duration')}</TableHead>
              <TableHead>{t('sessions.status')}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.length > 0 ? sessions.map((session) => {
              const sessionDate = new Date(session.date);
              return (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.clients?.name || "Unknown Client"}</TableCell>
                  <TableCell>{session.title}</TableCell>
                  <TableCell>{format(sessionDate, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{formatTime(sessionDate)}</TableCell>
                  <TableCell>{session.duration} {t('time.min')}</TableCell>
                  <TableCell>
                    <Badge className={
                      session.status === "scheduled" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                      session.status === "completed" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                      "bg-red-100 text-red-800 hover:bg-red-200"
                    }>
                      {t(`sessions.status.${session.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(session.id)}>
                          {t('sessions.viewDetails')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSession(session.id)}>
                          {t('sessions.editSession')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500" 
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          {t('sessions.cancelSession')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSession(session.id)}>
                          {t('sessions.addNotes')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            }) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  {t('sessions.noSessionsFound')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Session Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('sessions.editSession')}</DialogTitle>
            <DialogDescription>{t('sessions.createDesc')}</DialogDescription>
          </DialogHeader>
          {sessionToEdit && (
            <SessionForm 
              onSubmit={() => {
                setIsEditDialogOpen(false);
                setEditSessionId(null);
              }} 
              sessionToEdit={sessionToEdit}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('sessions.confirmDelete.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('sessions.confirmDelete.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteSessionId(null)}>
              {t('sessions.confirmDelete.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteSession}
              className="bg-red-500 hover:bg-red-600"
            >
              {t('sessions.confirmDelete.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
