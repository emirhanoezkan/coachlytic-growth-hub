
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useSessions, useUpdateSession, useDeleteSession } from "@/services/sessionsService";
import { format } from "date-fns";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { SessionForm } from "@/components/sessions/SessionForm";
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

export const SessionDateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { data: sessions = [] } = useSessions();
  const { timeFormat, formatTime } = useTimeFormat();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();
  
  // Dialog state
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    
  // Find the session being edited
  const sessionToEdit = sessions.find(s => s.id === editSessionId);

  // Handle edit session
  const handleEditSession = (sessionId: string) => {
    setEditSessionId(sessionId);
    setIsEditDialogOpen(true);
  };

  // Handle delete session
  const handleDeleteSession = (sessionId: string) => {
    setDeleteSessionId(sessionId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSession = async () => {
    if (deleteSessionId) {
      await deleteSession.mutateAsync(deleteSessionId);
      setIsDeleteDialogOpen(false);
      setDeleteSessionId(null);
    }
  };

  // Custom day content for session indicators
  const renderDayContent = (day: Date) => {
    const matchingDate = sessionDates.find(s => 
      s.date.getDate() === day.getDate() && 
      s.date.getMonth() === day.getMonth() &&
      s.date.getFullYear() === day.getFullYear()
    );
    
    if (matchingDate) {
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <span>{day.getDate()}</span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            {Array.from({ length: Math.min(matchingDate.count, 3) }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-forest-500" />
            ))}
            {matchingDate.count > 3 && (
              <div className="h-1 w-1 rounded-full bg-forest-500 opacity-70" />
            )}
          </div>
        </div>
      );
    }
    
    return <span>{day.getDate()}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 overflow-hidden border-border/40 shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle>Session Calendar</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border shadow-sm mx-auto"
            components={{
              DayContent: ({ date }) => renderDayContent(date)
            }}
          />
        </CardContent>
      </Card>

      <Card className="border-border/40 shadow-sm">
        <CardHeader className="bg-muted/30 pb-2">
          <CardTitle className="text-lg">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : "No date selected"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
            {sessionsForSelectedDate.length > 0 ? (
              sessionsForSelectedDate.map((session, idx) => {
                const sessionDate = new Date(session.date);
                return (
                  <div 
                    key={idx} 
                    className="border border-border/50 rounded-lg p-3 hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="bg-forest-100 p-1.5 rounded-full">
                          <Clock className="h-3.5 w-3.5 text-forest-600" />
                        </div>
                        <p className="font-medium text-sm">{formatTime(sessionDate)}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 rounded-full"
                          onClick={() => handleEditSession(session.id)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700 rounded-full"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <Badge className="mt-2 bg-lavender-100 text-lavender-800 hover:bg-lavender-200 font-normal">
                      {session.duration} min
                    </Badge>
                    <p className="text-sm mt-2 font-medium">{session.clients?.name || "Client"}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{session.title}</p>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="rounded-full bg-muted/50 p-3 mb-2">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No sessions scheduled for this date</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Session Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogDescription>Make changes to the session details</DialogDescription>
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this session and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteSessionId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteSession}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
