
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

export const ClientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Button className="bg-forest-500 hover:bg-forest-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                        <DropdownMenuItem>Add Notes</DropdownMenuItem>
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
