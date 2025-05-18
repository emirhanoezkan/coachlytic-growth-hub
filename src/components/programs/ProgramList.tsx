
import React from 'react';
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
import { Clock, Users, DollarSign, Edit, Trash2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
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

// Sample data for programs
const programs = [
  {
    id: 1,
    name: "Career Development",
    description: "A comprehensive program to help clients advance their career goals, create action plans, and build professional skills.",
    sessions: 8,
    duration: "12 weeks",
    price: 1200,
    clients: 5
  },
  {
    id: 2,
    name: "Business Strategy",
    description: "Strategic coaching for entrepreneurs and small business owners focusing on growth, operations, and leadership development.",
    sessions: 10,
    duration: "14 weeks",
    price: 1800,
    clients: 3
  },
  {
    id: 3,
    name: "Life Coaching",
    description: "Holistic personal development program addressing work-life balance, relationships, personal goals, and well-being.",
    sessions: 12,
    duration: "16 weeks",
    price: 1500,
    clients: 8
  },
  {
    id: 4,
    name: "Executive Coaching",
    description: "Specialized program for C-suite executives focusing on leadership, strategic thinking, decision making, and team building.",
    sessions: 6,
    duration: "8 weeks",
    price: 2400,
    clients: 2
  }
];

interface ProgramListProps {
  onEdit?: (program: any) => void;
  onDelete?: (id: number) => void;
}

export const ProgramList: React.FC<ProgramListProps> = ({ onEdit, onDelete }) => {
  const { t, locale } = useI18n();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [programToDelete, setProgramToDelete] = React.useState<number | null>(null);

  const handleEditClick = (program: any) => {
    onEdit?.(program);
  };

  const handleDeleteClick = (id: number) => {
    setProgramToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (programToDelete !== null) {
      onDelete?.(programToDelete);
      setProgramToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((program) => (
        <Card key={program.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{program.name}</CardTitle>
              <Badge className="bg-forest-100 text-forest-800 hover:bg-forest-200">
                {program.clients} {t('clients')}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 h-10">
              {program.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{program.sessions} {t('sessions')}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                <span>{locale === 'en' ? `$${program.price}` : `₺${program.price * 30}`}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEditClick(program)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {t('edit')}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={() => handleDeleteClick(program.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {t('delete')}
            </Button>
          </CardFooter>
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program
              and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
