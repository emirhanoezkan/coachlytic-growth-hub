
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SessionFormProps {
  onSubmit: () => void;
  initialData?: {
    client?: string;
    date?: Date;
    time?: string;
    duration?: string;
    type?: string;
    notes?: string;
  };
}

export const SessionForm: React.FC<SessionFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(initialData?.date || undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form validation and submission would happen here
    // For now, just show a success toast
    toast({
      title: "Success",
      description: "Session has been successfully scheduled.",
    });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">Select Client</Label>
          <Select defaultValue={initialData?.client || ''}>
            <SelectTrigger id="client">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="client1">Sarah Johnson</SelectItem>
                <SelectItem value="client2">Michael Chen</SelectItem>
                <SelectItem value="client3">Emma Davis</SelectItem>
                <SelectItem value="client4">Robert Wilson</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Session Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="time">Start Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                id="time" 
                type="time" 
                className="pl-9"
                defaultValue={initialData?.time || '09:00'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select defaultValue={initialData?.duration || '60'}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Session Type</Label>
          <Select defaultValue={initialData?.type || ''}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="intro">Introductory Meeting</SelectItem>
                <SelectItem value="regular">Regular Session</SelectItem>
                <SelectItem value="review">Progress Review</SelectItem>
                <SelectItem value="goal">Goal Setting</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Session Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Add notes about this session" 
            className="min-h-[100px]"
            defaultValue={initialData?.notes || ''}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>Cancel</Button>
        <Button type="submit" className="bg-forest-500 hover:bg-forest-600">Schedule Session</Button>
      </div>
    </form>
  );
};
