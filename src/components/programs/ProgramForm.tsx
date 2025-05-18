
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ProgramFormProps {
  onSubmit: () => void;
  initialData?: {
    name?: string;
    description?: string;
    sessions?: string;
    price?: string;
    duration?: string;
  };
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission would happen here
    // For now, just show a success toast
    toast({
      title: "Success",
      description: "Program has been successfully created.",
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Program Name</Label>
          <Input 
            id="name" 
            placeholder="Career Development Program" 
            defaultValue={initialData?.name || ''} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Describe the program and its benefits" 
            className="min-h-[100px]"
            defaultValue={initialData?.description || ''}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sessions">Number of Sessions</Label>
            <Input 
              id="sessions" 
              type="number" 
              placeholder="8" 
              defaultValue={initialData?.sessions || ''} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (weeks)</Label>
            <Input 
              id="duration" 
              type="number" 
              placeholder="12" 
              defaultValue={initialData?.duration || ''} 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input 
            id="price" 
            type="number" 
            placeholder="1200" 
            defaultValue={initialData?.price || ''} 
            required 
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>Cancel</Button>
        <Button type="submit" className="bg-forest-500 hover:bg-forest-600">Save Program</Button>
      </div>
    </form>
  );
};
