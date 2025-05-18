
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { useSessions, useUpdateSession, useDeleteSession } from "@/services/sessionsService";
import { format } from "date-fns";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Session Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              hasSessions: sessionDates.map(session => session.date),
            }}
            modifiersStyles={{
              hasSessions: {
                fontWeight: 'bold',
                backgroundColor: '#EBF2ED',
                color: '#2F5D3E',
                position: 'relative',
              }
            }}
            components={{
              DayContent: (props) => {
                const matchingDate = sessionDates.find(s => 
                  s.date.getDate() === props.date.getDate() && 
                  s.date.getMonth() === props.date.getMonth() &&
                  s.date.getFullYear() === props.date.getFullYear()
                );
                
                return (
                  <div className="relative">
                    <span>{props.date.getDate()}</span>
                    {matchingDate && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="bg-forest-500 w-5 h-5 rounded-full flex items-center justify-center">
                          <span className="text-[10px] text-white font-bold">{matchingDate.count}</span>
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
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">
            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : "No date selected"}
          </h3>
          
          <div className="space-y-3">
            {sessionsForSelectedDate.length > 0 ? (
              sessionsForSelectedDate.map((session, idx) => {
                const sessionDate = new Date(session.date);
                return (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <p className="font-medium">{formatTime(sessionDate)}</p>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleEditSession(session.id)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{session.duration} min</p>
                    <p className="text-sm mt-1">{session.clients?.name || "Client"}</p>
                    <p className="text-xs text-gray-500">{session.title}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm py-3">No sessions scheduled for this date</p>
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
