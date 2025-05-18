
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
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm, Controller } from "react-hook-form";
import { useAddSession, SessionFormData } from "@/services/sessionsService";

interface SessionFormProps {
  onSubmit: () => void;
  initialData?: {
    client_id?: string;
    program_id?: string;
    title?: string;
    date?: Date;
    time?: string;
    duration?: string;
    location_type?: string;
    notes?: string;
  };
}

export const SessionForm: React.FC<SessionFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(initialData?.date || undefined);
  const { mutate: addSession, isPending } = useAddSession();
  
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      client_id: initialData?.client_id || '',
      program_id: initialData?.program_id || '',
      title: initialData?.title || 'Coaching Session',
      time: initialData?.time || '09:00',
      duration: initialData?.duration || '60',
      location_type: initialData?.location_type || 'online',
      notes: initialData?.notes || '',
    }
  });
  
  const onFormSubmit = (data: any) => {
    if (!date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a session date",
      });
      return;
    }
    
    // Combine date and time
    const [hours, minutes] = data.time.split(':').map(Number);
    const sessionDate = new Date(date);
    sessionDate.setHours(hours, minutes, 0, 0);
    
    // Create session data
    const sessionData: SessionFormData = {
      client_id: data.client_id,
      program_id: data.program_id || undefined,
      title: data.title,
      date: sessionDate.toISOString(),
      duration: parseInt(data.duration),
      location_type: data.location_type,
      notes: data.notes,
    };
    
    addSession(sessionData, {
      onSuccess: () => {
        onSubmit();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_id">{t('sessions.client')}</Label>
          <Controller
            name="client_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger id="client_id">
                  <SelectValue placeholder={t('sessions.client')} />
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
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Session Title</Label>
          <Input 
            id="title" 
            {...register('title', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">{t('sessions.date')}</Label>
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
            <Label htmlFor="time">{t('sessions.time')}</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                id="time" 
                type="time" 
                className="pl-9"
                {...register('time', { required: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">{t('sessions.duration')}</Label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder={t('sessions.duration')} />
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
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location_type">{t('sessions.location')}</Label>
          <Controller
            name="location_type"
            control={control}
            render={({ field }) => (
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <SelectTrigger id="location_type">
                  <SelectValue placeholder={t('sessions.location')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="online">{t('sessions.online')}</SelectItem>
                    <SelectItem value="in_person">{t('sessions.inperson')}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t('sessions.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder="Add notes about this session" 
            className="min-h-[100px]"
            {...register('notes')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onSubmit}>
          {t('action.cancel')}
        </Button>
        <Button 
          type="submit" 
          className="bg-forest-500 hover:bg-forest-600"
          disabled={isPending}
        >
          {isPending ? "Saving..." : t('action.save')}
        </Button>
      </div>
    </form>
  );
};
