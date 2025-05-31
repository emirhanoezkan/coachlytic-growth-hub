
import React, { useState } from 'react';
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useClients, Client } from "@/services/clientsService";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { SessionForm } from "@/components/sessions/SessionForm";
import { EditClientForm } from "@/components/clients/EditClientForm";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateClient } from "@/services/clientsService";
import { ClientFilter, FilterOptions } from './ClientFilter';
import { useLanguage } from "@/contexts/LanguageContext";

export const MobileClientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: clients = [], isLoading, error } = useClients();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isAddSessionDialogOpen, setIsAddSessionDialogOpen] = useState(false);
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  const [isEditClientDialogOpen, setIsEditClientDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [note, setNote] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [showFilters, setShowFilters] = useState(false);
  const updateClient = useUpdateClient();
  
  const filteredClients = clients.filter(client => {
    const searchFilter = filterOptions.search 
      ? client.name.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(filterOptions.search.toLowerCase())) ||
        (client.program && client.program.toLowerCase().includes(filterOptions.search.toLowerCase()))
      : true;
    
    const statusFilter = filterOptions.status 
      ? filterOptions.status === "all" ? true : client.status === filterOptions.status
      : true;
    
    const programFilter = filterOptions.program 
      ? filterOptions.program === "all" ? true : client.program === filterOptions.program
      : true;
    
    const quickSearch = searchQuery
      ? client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (client.program && client.program.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    
    return searchFilter && statusFilter && programFilter && quickSearch;
  });

  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), 'MMM dd');
    } catch (e) {
      return dateString;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "At Risk":
        return "destructive";
      default:
        return "warning";
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

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditClientDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (!selectedClientId || !note.trim()) {
      toast({
        variant: "destructive",
        title: t('error.title'),
        description: t('client.noteCannotBeEmpty')
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
          title: t('client.noteAdded'),
          description: t('client.noteAddedSuccess')
        });
      }
    });
  };

  const handleViewProfile = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-500 text-sm">
        {t('error.title')}: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Mobile search and filter */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder={t('client.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="px-3"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {showFilters && (
          <div className="p-3 border rounded-md bg-gray-50">
            <ClientFilter onFilter={handleFilterChange} />
          </div>
        )}
      </div>

      {/* Client cards */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            {t('client.noClientsFound')}
          </p>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {filteredClients.map((client) => (
            <MobileCard
              key={client.id}
              title={client.name}
              subtitle={client.email}
              status={client.status}
              statusVariant={getStatusVariant(client.status)}
              progress={client.progress}
              primaryInfo={
                <div className="flex justify-between text-xs">
                  <span>{client.program || "-"}</span>
                  <span>{client.sessions} sessions</span>
                </div>
              }
              secondaryInfo={`Next: ${formatDate(client.next_session)}`}
              onClick={() => handleViewProfile(client.id)}
              actions={[
                {
                  label: t('client.viewProfile'),
                  onClick: () => handleViewProfile(client.id)
                },
                {
                  label: t('client.edit'),
                  onClick: () => handleEditClient(client)
                },
                {
                  label: t('sessions.schedule'),
                  onClick: () => handleScheduleSession(client.id)
                },
                {
                  label: t('sessions.addNotes'),
                  onClick: () => handleAddNote(client.id)
                }
              ]}
            />
          ))}
        </div>
      )}

      {/* Dialogs */}
      <ResponsiveDialog
        open={isAddSessionDialogOpen}
        onOpenChange={setIsAddSessionDialogOpen}
        title={t('sessions.new')}
      >
        <SessionForm 
          onSubmit={() => setIsAddSessionDialogOpen(false)} 
          preselectedClientId={selectedClientId || undefined}
        />
      </ResponsiveDialog>
      
      <ResponsiveDialog
        open={isAddNoteDialogOpen}
        onOpenChange={setIsAddNoteDialogOpen}
        title={t('sessions.addNotes')}
        description={`${t('client.addNoteDescription')} ${clients.find(c => c.id === selectedClientId)?.name}`}
        footer={
          <div className="flex gap-2 w-full">
            <Button variant="outline" onClick={() => setIsAddNoteDialogOpen(false)} className="flex-1">
              {t('action.cancel')}
            </Button>
            <Button onClick={handleSaveNote} className="bg-forest-500 hover:bg-forest-600 flex-1">
              {t('action.save')}
            </Button>
          </div>
        }
      >
        <Textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)} 
          placeholder={t('client.notesPlaceholder')}
          className="min-h-[120px] text-sm"
        />
      </ResponsiveDialog>

      <ResponsiveDialog
        open={isEditClientDialogOpen}
        onOpenChange={setIsEditClientDialogOpen}
        title={t('client.edit')}
      >
        {selectedClient && (
          <EditClientForm 
            client={selectedClient}
            onSubmit={() => setIsEditClientDialogOpen(false)} 
          />
        )}
      </ResponsiveDialog>
    </div>
  );
};
