import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAddSession, useUpdateSession, SessionFormData, Session } from "@/services/sessionsService";
import { useClients } from "@/services/clientsService";
import { usePrograms } from "@/services/programsService";
import { useTimeFormat } from "@/contexts/TimeFormatContext";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  program_id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes"),
  location_type: z.string().min(1, "Location type is required"),
  notes: z.string().optional(),
  status: z.string().optional(),
});

// Update the interface to include sessionToEdit and isEditing
interface SessionFormProps {
  onSubmit: () => void;
  preselectedClientId?: string;
  sessionToEdit?: Session & { clients: { name: string } };
  isEditing?: boolean;
}

export const SessionForm: React.FC<SessionFormProps> = ({ 
  onSubmit, 
  preselectedClientId,
  sessionToEdit,
  isEditing = false
}) => {
  const { data: clients = [] } = useClients();
  const { data: programs = [] } = usePrograms();
  const addSession = useAddSession();
  const updateSession = useUpdateSession();
  const { timeFormat } = useTimeFormat();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client_id: preselectedClientId || "",
      program_id: "none",
      title: "",
      location_type: "online",
      duration: 60,
      notes: "",
      status: "scheduled",
    },
  });

  // Populate form with session data when editing
  useEffect(() => {
    if (sessionToEdit && isEditing) {
      const sessionDate = new Date(sessionToEdit.date);
      form.reset({
        client_id: sessionToEdit.client_id,
        program_id: sessionToEdit.program_id || "none",
        title: sessionToEdit.title,
        date: sessionDate,
        duration: sessionToEdit.duration,
        location_type: sessionToEdit.location_type,
        notes: sessionToEdit.notes || "",
        status: sessionToEdit.status,
      });
    }
  }, [sessionToEdit, isEditing, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // If editing, update the session
    if (isEditing && sessionToEdit) {
      const sessionData: Partial<SessionFormData> = {
        client_id: preselectedClientId || values.client_id,
        title: values.title,
        date: values.date.toISOString(),
        duration: values.duration,
        location_type: values.location_type,
        notes: values.notes,
        status: values.status,
      };
      
      // Only add program_id if it's not "none"
      if (values.program_id && values.program_id !== "none") {
        sessionData.program_id = values.program_id;
      }

      updateSession.mutate({
        id: sessionToEdit.id,
        sessionData
      }, {
        onSuccess: () => {
          onSubmit();
        }
      });
    } else {
      // Add a new session
      const sessionData: SessionFormData = {
        client_id: preselectedClientId || values.client_id,
        title: values.title,
        date: values.date.toISOString(),
        duration: values.duration,
        location_type: values.location_type,
        notes: values.notes,
        status: values.status,
      };
      
      // Only add program_id if it's not "none"
      if (values.program_id && values.program_id !== "none") {
        sessionData.program_id = values.program_id;
      }

      addSession.mutate(sessionData, {
        onSuccess: () => {
          onSubmit();
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {!preselectedClientId && (
          <FormField
            control={form.control}
            name="client_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sessions.client')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('sessions.selectClient')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="program_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sessions.program')}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('sessions.selectProgram')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">{t('sessions.noProgram')}</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sessions.title')}</FormLabel>
              <FormControl>
                <Input placeholder={t('sessions.titlePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{t('sessions.dateTime')}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <>
                            {format(field.value, "PPP")} {' '}
                            {timeFormat === '12h'
                              ? format(field.value, "h:mm a")
                              : format(field.value, "HH:mm")
                            }
                          </>
                        ) : (
                          <span>{t('sessions.pickDate')}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date) {
                          const currentValue = field.value || new Date();
                          date.setHours(currentValue.getHours());
                          date.setMinutes(currentValue.getMinutes());
                          field.onChange(date);
                        }
                      }}
                      className="pointer-events-auto"
                    />
                    <div className="p-3 border-t border-border">
                      <div className="flex items-center justify-center">
                        <Clock className="h-4 w-4 mr-2 opacity-50" />
                        <Input
                          type="time"
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(":").map(Number);
                            const date = field.value || new Date();
                            date.setHours(hours);
                            date.setMinutes(minutes);
                            field.onChange(new Date(date));
                          }}
                          value={field.value ? format(field.value, "HH:mm") : ""}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sessions.duration')}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sessions.locationType')}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('sessions.selectLocationType')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="online">{t('online')}</SelectItem>
                  <SelectItem value="in-person">{t('in-person')}</SelectItem>
                  <SelectItem value="phone">{t('phone')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sessions.statusLabel')}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('sessions.selectStatus')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="scheduled">{t('sessions.status.scheduled')}</SelectItem>
                    <SelectItem value="completed">{t('sessions.status.completed')}</SelectItem>
                    <SelectItem value="cancelled">{t('sessions.status.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sessions.notes')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('sessions.notesPlaceholder')}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button 
            type="submit" 
            disabled={addSession.isPending || updateSession.isPending} 
            className="bg-forest-500 hover:bg-forest-600"
          >
            {isEditing 
              ? (updateSession.isPending ? t('sessions.updating') : t('sessions.update'))
              : (addSession.isPending ? t('sessions.scheduling') : t('sessions.schedule'))}
          </Button>
        </div>
      </form>
    </Form>
  );
};
