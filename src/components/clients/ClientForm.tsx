
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ClientFormProps {
  onSubmit: () => void;
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    program?: string;
    notes?: string;
  };
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission would happen here
    // For now, just show a success toast
    toast({
      title: "Success",
      description: "Client has been successfully added.",
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            defaultValue={initialData?.name || ''} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="client@example.com" 
            defaultValue={initialData?.email || ''} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1 (555) 123-4567" 
            defaultValue={initialData?.phone || ''} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">Assigned Program</Label>
          <Select defaultValue={initialData?.program || ''}>
            <SelectTrigger id="program">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="career">Career Development</SelectItem>
                <SelectItem value="business">Business Strategy</SelectItem>
                <SelectItem value="life">Life Coaching</SelectItem>
                <SelectItem value="executive">Executive Coaching</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Add any relevant information about this client" 
            className="min-h-[100px]"
            defaultValue={initialData?.notes || ''}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>Cancel</Button>
        <Button type="submit" className="bg-forest-500 hover:bg-forest-600">Save Client</Button>
      </div>
    </form>
  );
};
