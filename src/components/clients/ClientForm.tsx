
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
import { useAddClient, ClientFormData } from "@/services/clientsService";
import { useForm } from "react-hook-form";

interface ClientFormProps {
  onSubmit: () => void;
  initialData?: ClientFormData;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  const { mutate: addClient, isPending } = useAddClient();
  
  const { register, handleSubmit, setValue, watch } = useForm<ClientFormData>({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      program: '',
      notes: ''
    }
  });
  
  // For the select component which isn't directly compatible with react-hook-form
  const selectedProgram = watch('program');
  
  const onFormSubmit = (data: ClientFormData) => {
    addClient(data, {
      onSuccess: () => {
        onSubmit();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            {...register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="client@example.com" 
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="+1 (555) 123-4567" 
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">Assigned Program</Label>
          <Select 
            value={selectedProgram} 
            onValueChange={(value) => setValue('program', value)}
          >
            <SelectTrigger id="program">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Career Development">Career Development</SelectItem>
                <SelectItem value="Business Strategy">Business Strategy</SelectItem>
                <SelectItem value="Life Coaching">Life Coaching</SelectItem>
                <SelectItem value="Executive Coaching">Executive Coaching</SelectItem>
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
            {...register('notes')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>Cancel</Button>
        <Button 
          type="submit" 
          className="bg-forest-500 hover:bg-forest-600"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Client"}
        </Button>
      </div>
    </form>
  );
};
