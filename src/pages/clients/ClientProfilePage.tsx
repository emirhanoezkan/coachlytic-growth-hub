
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar-animated";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  Clock, 
  FileText, 
  Plus, 
  Tag, 
  Edit, 
  Trash2 
} from "lucide-react";
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useClient, useUpdateClient } from "@/services/clientsService";
import { SessionForm } from "@/components/sessions/SessionForm";
import { useSessions, useUpdateSession, useDeleteSession } from '@/services/sessionsService';
import { useLanguage } from "@/contexts/LanguageContext";
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
import { useTimeFormat } from "@/contexts/TimeFormatContext";

const ClientProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [isDeleteNoteDialogOpen, setIsDeleteNoteDialogOpen] = useState(false);
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [isEditSessionDialogOpen, setIsEditSessionDialogOpen] = useState(false);
  const [isDeleteSessionDialogOpen, setIsDeleteSessionDialogOpen] = useState(false);
  const [note, setNote] = useState("");
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [deletingSessionId, setDeletingSessionId] = useState<string | null>(null);
  
  const { data: client, isLoading, error } = useClient(id || "");
  const { data: sessions = [] } = useSessions();
  const updateClient = useUpdateClient();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();
  const { formatTime } = useTimeFormat();

  // Filter sessions for this client
  const clientSessions = sessions.filter(
    session => session.client_id === id
  );

  if (isLoading) {
    return (
      <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-6 bg-slate-50">
              <div className="max-w-7xl mx-auto flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500"></div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (error || !client) {
    return (
      <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
        <div className="min-h-screen flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto p-6 bg-slate-50">
              <div className="max-w-7xl mx-auto flex items-center justify-center h-48">
                <div className="text-red-500">
                  Error loading client: {error?.message || "Client not found"}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const handleAddNote = () => {
    if (!note.trim()) {
      toast({
        variant: "destructive",
        title: "Note cannot be empty",
        description: "Please enter a note before saving."
      });
      return;
    }

    let updatedNotes = client.notes || "";
    const dateStamp = format(new Date(), "MMM dd, yyyy HH:mm");
    const newNote = `[${dateStamp}] ${note}\n\n`;
    updatedNotes = newNote + updatedNotes;

    updateClient.mutate({
      id: client.id,
      clientData: {
        notes: updatedNotes
      }
    }, {
      onSuccess: () => {
        setNote("");
        setIsAddNoteDialogOpen(false);
        toast({
          title: "Note added",
          description: "The client note has been added successfully."
        });
      }
    });
  };

  const handleEditNote = () => {
    if (!note.trim() || editingNoteIndex === null) {
      toast({
        variant: "destructive",
        title: "Note cannot be empty",
        description: "Please enter a note before saving."
      });
      return;
    }

    // Parse client notes
    const parsedNotes = parseNotes(client.notes);
    
    // Update the specific note
    const dateStamp = parsedNotes[editingNoteIndex].date;
    parsedNotes[editingNoteIndex] = {
      date: dateStamp,
      content: note
    };
    
    // Reconstruct the notes string
    const updatedNotes = parsedNotes.map(n => `[${n.date}] ${n.content}\n\n`).join('');

    updateClient.mutate({
      id: client.id,
      clientData: {
        notes: updatedNotes
      }
    }, {
      onSuccess: () => {
        setNote("");
        setIsEditNoteDialogOpen(false);
        setEditingNoteIndex(null);
        toast({
          title: "Note updated",
          description: "The client note has been updated successfully."
        });
      }
    });
  };

  const handleDeleteNote = () => {
    if (editingNoteIndex === null) return;
    
    // Parse client notes
    const parsedNotes = parseNotes(client.notes);
    
    // Remove the specific note
    parsedNotes.splice(editingNoteIndex, 1);
    
    // Reconstruct the notes string
    const updatedNotes = parsedNotes.map(n => `[${n.date}] ${n.content}\n\n`).join('');

    updateClient.mutate({
      id: client.id,
      clientData: {
        notes: updatedNotes
      }
    }, {
      onSuccess: () => {
        setIsDeleteNoteDialogOpen(false);
        setEditingNoteIndex(null);
        toast({
          title: "Note deleted",
          description: "The client note has been deleted successfully."
        });
      }
    });
  };

  const handleEditSession = (sessionId: string) => {
    setEditingSessionId(sessionId);
    setIsEditSessionDialogOpen(true);
  };

  const handleDeleteSession = (sessionId: string) => {
    setDeletingSessionId(sessionId);
    setIsDeleteSessionDialogOpen(true);
  };

  const confirmDeleteSession = async () => {
    if (deletingSessionId) {
      await deleteSession.mutateAsync(deletingSessionId);
      setIsDeleteSessionDialogOpen(false);
      setDeletingSessionId(null);
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Parse client notes into array of note objects
  const parseNotes = (notesText?: string | null) => {
    if (!notesText) return [];
    
    const noteRegex = /\[(.*?)\] ([\s\S]*?)(?=\n\n\[|$)/g;
    const notes = [];
    let match;
    
    while ((match = noteRegex.exec(notesText + "\n\n")) !== null) {
      notes.push({
        date: match[1],
        content: match[2].trim()
      });
    }
    
    return notes;
  };
  
  const clientNotes = parseNotes(client.notes);
  
  // Get the session being edited
  const sessionToEdit = sessions.find(s => s.id === editingSessionId);

  return (
    <SidebarProvider open={sidebarOpen} setOpen={setSidebarOpen}>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/clients')}
                    className="h-9"
                  >
                    Back to Clients
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsAddSessionDialogOpen(true)}
                    className="h-9"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button 
                    onClick={() => setIsAddNoteDialogOpen(true)} 
                    size="sm"
                    className="bg-forest-500 hover:bg-forest-600 h-9"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Client Profile</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center mb-6">
                      <div className="h-24 w-24 rounded-full bg-forest-100 text-forest-500 flex items-center justify-center mb-4">
                        <User size={36} />
                      </div>
                      <h2 className="text-xl font-semibold">{client.name}</h2>
                      <Badge className={
                        client.status === "Active" ? "bg-forest-100 text-forest-800 hover:bg-forest-200 mt-2" :
                        client.status === "At Risk" ? "bg-red-100 text-red-800 hover:bg-red-200 mt-2" :
                        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 mt-2"
                      }>
                        {client.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4 pt-2">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{client.email || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p>{client.phone || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Program</p>
                          <p>{client.program || "Not assigned"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Next Session</p>
                          <p>{formatDate(client.next_session) || "Not scheduled"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Joined</p>
                          <p>{formatDate(client.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm font-medium mb-2">Progress</p>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">{client.progress}% Complete</span>
                      </div>
                      <Progress value={client.progress} className={
                        client.progress >= 75 ? "bg-forest-500" :
                        client.progress >= 50 ? "bg-forest-300" :
                        client.progress >= 25 ? "bg-yellow-400" :
                        "bg-red-500"
                      } />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2 border-b">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                        <TabsTrigger value="notes">Notes</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsContent value="overview" className="mt-0">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Client Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-50 border rounded-lg p-4">
                                <p className="text-sm text-gray-500">Total Sessions</p>
                                <p className="text-2xl font-semibold">{client.sessions}</p>
                              </div>
                              <div className="bg-gray-50 border rounded-lg p-4">
                                <p className="text-sm text-gray-500">Program Progress</p>
                                <p className="text-2xl font-semibold">{client.progress}%</p>
                              </div>
                              <div className="bg-gray-50 border rounded-lg p-4">
                                <p className="text-sm text-gray-500">Client Since</p>
                                <p className="text-lg font-semibold">{formatDate(client.created_at)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">Upcoming Sessions</h3>
                            {clientSessions.filter(s => new Date(s.date) >= new Date()).length > 0 ? (
                              <div className="space-y-3">
                                {clientSessions
                                  .filter(s => new Date(s.date) >= new Date())
                                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                  .slice(0, 3)
                                  .map((session) => (
                                    <div key={session.id} className="bg-gray-50 border rounded-lg p-4">
                                      <div className="flex justify-between">
                                        <div>
                                          <p className="font-medium">{session.title}</p>
                                          <p className="text-sm text-gray-500">
                                            {format(new Date(session.date), 'MMM dd, yyyy - HH:mm')} · {session.duration} min
                                          </p>
                                        </div>
                                        <Badge className={
                                          session.status === "scheduled" ? "bg-lavender-100 text-lavender-800" :
                                          session.status === "completed" ? "bg-forest-100 text-forest-800" :
                                          "bg-red-100 text-red-800"
                                        }>
                                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <p className="text-gray-500">No upcoming sessions scheduled</p>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">Recent Notes</h3>
                            {clientNotes.length > 0 ? (
                              <div className="space-y-3">
                                {clientNotes.slice(0, 3).map((note, index) => (
                                  <div key={index} className="bg-gray-50 border rounded-lg p-4">
                                    <p className="text-sm text-gray-500 mb-1">{note.date}</p>
                                    <p className="whitespace-pre-wrap">{note.content}</p>
                                  </div>
                                ))}
                                {clientNotes.length > 3 && (
                                  <Button 
                                    variant="ghost" 
                                    onClick={() => setActiveTab("notes")}
                                    className="text-forest-600 hover:text-forest-700"
                                  >
                                    View all notes
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-500">No notes added yet</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="sessions" className="mt-0">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Session History</h3>
                          <Button 
                            size="sm" 
                            onClick={() => setIsAddSessionDialogOpen(true)} 
                            className="bg-forest-500 hover:bg-forest-600"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Schedule Session
                          </Button>
                        </div>
                        
                        {clientSessions.length > 0 ? (
                          <div className="space-y-3">
                            {clientSessions
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .map((session) => (
                                <div key={session.id} className="bg-white border rounded-lg p-4 hover:bg-gray-50">
                                  <div className="flex justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{session.title}</h4>
                                        <Badge className={
                                          session.status === "scheduled" ? "bg-lavender-100 text-lavender-800" :
                                          session.status === "completed" ? "bg-forest-100 text-forest-800" :
                                          "bg-red-100 text-red-800"
                                        }>
                                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                        </Badge>
                                      </div>
                                      <p className="text-sm text-gray-500">
                                        {format(new Date(session.date), 'MMM dd, yyyy')} - {formatTime(new Date(session.date))} · {session.duration} min · {session.location_type.charAt(0).toUpperCase() + session.location_type.slice(1)}
                                      </p>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleEditSession(session.id)}
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteSession(session.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                  {session.notes && (
                                    <div className="mt-2 pt-2 border-t text-sm">
                                      <p className="whitespace-pre-wrap">{session.notes}</p>
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No sessions found for this client</p>
                            <Button 
                              onClick={() => setIsAddSessionDialogOpen(true)} 
                              className="mt-4 bg-forest-500 hover:bg-forest-600"
                            >
                              Schedule First Session
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="notes" className="mt-0">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Client Notes</h3>
                          <Button 
                            size="sm" 
                            onClick={() => setIsAddNoteDialogOpen(true)} 
                            className="bg-forest-500 hover:bg-forest-600"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Note
                          </Button>
                        </div>
                        
                        {clientNotes.length > 0 ? (
                          <div className="space-y-4">
                            {clientNotes.map((note, index) => (
                              <div key={index} className="bg-white border rounded-lg p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                  <p className="text-sm text-gray-500 mb-1">{note.date}</p>
                                  <div className="flex gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => {
                                        setEditingNoteIndex(index);
                                        setNote(note.content);
                                        setIsEditNoteDialogOpen(true);
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                      onClick={() => {
                                        setEditingNoteIndex(index);
                                        setIsDeleteNoteDialogOpen(true);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <p className="whitespace-pre-wrap">{note.content}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No notes added yet</p>
                            <Button 
                              onClick={() => setIsAddNoteDialogOpen(true)} 
                              className="mt-4 bg-forest-500 hover:bg-forest-600"
                            >
                              Add First Note
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Add Note Dialog */}
      <Dialog open={isAddNoteDialogOpen} onOpenChange={setIsAddNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add a note about {client.name}. Notes help track client progress and important information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Write your note here..." 
              className="min-h-[150px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddNoteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddNote} className="bg-forest-500 hover:bg-forest-600">
                Save Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Note Dialog */}
      <Dialog open={isEditNoteDialogOpen} onOpenChange={setIsEditNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Edit your note about {client.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea 
              value={note} 
              onChange={(e) => setNote(e.target.value)} 
              placeholder="Edit your note here..." 
              className="min-h-[150px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditNoteDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditNote} className="bg-forest-500 hover:bg-forest-600">
                Update Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Note Confirmation */}
      <AlertDialog open={isDeleteNoteDialogOpen} onOpenChange={setIsDeleteNoteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this note and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditingNoteIndex(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteNote}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Session Dialog */}
      <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a Session</DialogTitle>
            <DialogDescription>
              Schedule a new session with {client.name}.
            </DialogDescription>
          </DialogHeader>
          <SessionForm 
            onSubmit={() => setIsAddSessionDialogOpen(false)} 
            preselectedClientId={client.id}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Session Dialog */}
      <Dialog open={isEditSessionDialogOpen} onOpenChange={setIsEditSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogDescription>
              Edit session details for {client.name}.
            </DialogDescription>
          </DialogHeader>
          {sessionToEdit && (
            <SessionForm 
              onSubmit={() => {
                setIsEditSessionDialogOpen(false);
                setEditingSessionId(null);
              }} 
              sessionToEdit={sessionToEdit}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Session Confirmation */}
      <AlertDialog open={isDeleteSessionDialogOpen} onOpenChange={setIsDeleteSessionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this session and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingSessionId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteSession}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
};

export default ClientProfilePage;
