
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClients, Client } from "@/services/clientsService";
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SessionForm } from "@/components/sessions/SessionForm";
import { ClientForm } from "@/components/clients/ClientForm";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateClient } from "@/services/clientsService";

export const ClientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: clients = [], isLoading, error } = useClients();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const updateClient = useUpdateClient();
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.program && client.program.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleScheduleSession = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsAddSessionDialogOpen(true);
  };

  const handleAddNote = (clientId: string) => {
    setSelectedClientId(clientId);
    setIsAddNoteDialogOpen(true);
    setNote("");
  };

  const handleSaveNote = () => {
    if (!selectedClientId || !note.trim()) {
      toast({
        variant: "destructive",
        title: "Note cannot be empty",
        description: "Please enter a note before saving."
      });
      return;
    }

    const client = clients.find(c => c.id === selectedClientId);
    if (!client) return;

    let updatedNotes = client.notes || "";
    const dateStamp = format(new Date(), "MMM dd, yyyy HH:mm");
    const newNote = `[${dateStamp}] ${note}\n\n`;
    updatedNotes = newNote + updatedNotes;

    updateClient.mutate({
      id: selectedClientId,
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

  const handleViewProfile = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-48 text-red-500">
            Error loading clients: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Client Directory</CardTitle>
            <CardDescription>Manage your coaching clients</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-forest-400"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredClients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No clients found. Add your first client to get started.</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead>Next Session</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium cursor-pointer hover:underline" onClick={() => handleViewProfile(client.id)}>
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{client.program || "-"}</TableCell>
                    <TableCell>
                      <div className="w-full max-w-24">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">{client.progress}%</span>
                        </div>
                        <Progress value={client.progress} className={
                          client.progress >= 75 ? "bg-forest-500" :
                          client.progress >= 50 ? "bg-forest-300" :
                          client.progress >= 25 ? "bg-yellow-400" :
                          "bg-red-500"
                        } />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={
                        client.status === "Active" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                        client.status === "At Risk" ? "bg-red-100 text-red-800 hover:bg-red-200" :
                        "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.sessions}</TableCell>
                    <TableCell>{formatDate(client.next_session)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewProfile(client.id)}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleScheduleSession(client.id)}>
                            Schedule Session
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddNote(client.id)}>
                            Add Notes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Schedule Session Dialog */}
      <Dialog open={isAddSessionDialogOpen} onOpenChange={setIsAddSessionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Session</DialogTitle>
          </DialogHeader>
          <SessionForm 
            onSubmit={() => setIsAddSessionDialogOpen(false)} 
            preselectedClientId={selectedClientId || undefined}
          />
        </DialogContent>
      </Dialog>
      
      {/* Add Note Dialog */}
      <Dialog open={isAddNoteDialogOpen} onOpenChange={setIsAddNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <DialogDescription>
              Add a note about {clients.find(c => c.id === selectedClientId)?.name}. Notes help track client progress and important information.
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
              <Button onClick={handleSaveNote} className="bg-forest-500 hover:bg-forest-600">
                Save Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
