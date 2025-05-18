
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
import { useI18n } from "@/contexts/I18nContext";

const clients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    program: "Career Development",
    progress: 75,
    status: "Active",
    sessions: 8,
    nextSession: "May 22, 2025"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    program: "Business Strategy",
    progress: 45,
    status: "Active",
    sessions: 4,
    nextSession: "May 19, 2025"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma.d@example.com",
    program: "Life Coaching",
    progress: 90,
    status: "Active",
    sessions: 12,
    nextSession: "May 20, 2025"
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    program: "Executive Coaching",
    progress: 30,
    status: "At Risk",
    sessions: 2,
    nextSession: "May 25, 2025"
  },
  {
    id: 5,
    name: "Jennifer Lopez",
    email: "jennifer.l@example.com",
    program: "Career Development",
    progress: 60,
    status: "Active",
    sessions: 6,
    nextSession: "May 21, 2025"
  }
];

interface ClientListProps {
  onAddClient?: () => void;
  onViewProfile?: (id: number) => void;
  onScheduleSession?: (id: number) => void;
  onAddNote?: (name: string) => void;
}

export const ClientList: React.FC<ClientListProps> = ({
  onAddClient,
  onViewProfile,
  onScheduleSession,
  onAddNote
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: 'view' | 'schedule' | 'notes', client: typeof clients[0]) => {
    switch (action) {
      case 'view':
        onViewProfile?.(client.id);
        break;
      case 'schedule':
        onScheduleSession?.(client.id);
        break;
      case 'notes':
        onAddNote?.(client.name);
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>{t('clientDirectory')}</CardTitle>
            <CardDescription>{t('manageClients')}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder={`${t('search')} ${t('clients')}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-forest-400"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {t('filter')}
            </Button>
            <Button 
              className="bg-forest-500 hover:bg-forest-600"
              onClick={onAddClient}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('addClient')}
            </Button>
          </div>
        </div>
        
        {isFiltersOpen && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Status</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="at-risk">At Risk</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Program</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Programs</option>
                  <option value="career">Career Development</option>
                  <option value="business">Business Strategy</option>
                  <option value="life">Life Coaching</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Progress</label>
                <select className="w-full rounded-md border p-2">
                  <option value="">All Progress Levels</option>
                  <option value="high">High (75-100%)</option>
                  <option value="medium">Medium (50-74%)</option>
                  <option value="low">Low (0-49%)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('client')}</TableHead>
                <TableHead>{t('program')}</TableHead>
                <TableHead>{t('progress')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('sessions')}</TableHead>
                <TableHead>{t('nextSession')}</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{client.program}</TableCell>
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
                  <TableCell>{client.nextSession}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction('view', client)}>
                          {t('viewProfile')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('schedule', client)}>
                          {t('scheduleSession')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('notes', client)}>
                          {t('addNotes')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
