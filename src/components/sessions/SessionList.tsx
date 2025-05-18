
import React from 'react';
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

// Sample data for sessions
const sessions = [
  {
    id: 1,
    client: "Sarah Johnson",
    type: "Career Coaching",
    date: "May 19, 2025",
    time: "10:00 AM",
    duration: "45 min",
    status: "Upcoming"
  },
  {
    id: 2,
    client: "Michael Chen",
    type: "Business Strategy",
    date: "May 20, 2025",
    time: "11:30 AM",
    duration: "60 min",
    status: "Upcoming"
  },
  {
    id: 3,
    client: "Emma Davis",
    type: "Life Coaching",
    date: "May 18, 2025",
    time: "2:00 PM",
    duration: "45 min",
    status: "Completed"
  },
  {
    id: 4,
    client: "Robert Wilson",
    type: "Executive Coaching",
    date: "May 15, 2025",
    time: "3:30 PM",
    duration: "60 min",
    status: "Cancelled"
  },
  {
    id: 5,
    client: "Jennifer Lopez",
    type: "Career Development",
    date: "May 22, 2025",
    time: "9:00 AM",
    duration: "45 min",
    status: "Upcoming"
  }
];

export const SessionList: React.FC = () => {
  return (
    <div className="rounded-md border overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Session Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.client}</TableCell>
              <TableCell>{session.type}</TableCell>
              <TableCell>{session.date}</TableCell>
              <TableCell>{session.time}</TableCell>
              <TableCell>{session.duration}</TableCell>
              <TableCell>
                <Badge className={
                  session.status === "Upcoming" ? "bg-lavender-100 text-lavender-800 hover:bg-lavender-200" :
                  session.status === "Completed" ? "bg-forest-100 text-forest-800 hover:bg-forest-200" :
                  "bg-red-100 text-red-800 hover:bg-red-200"
                }>
                  {session.status}
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Session</DropdownMenuItem>
                    <DropdownMenuItem>Cancel Session</DropdownMenuItem>
                    <DropdownMenuItem>Add Notes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
