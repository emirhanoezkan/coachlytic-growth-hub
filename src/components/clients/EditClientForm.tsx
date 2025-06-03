
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
import { useUpdateClient, Client, ClientFormData } from "@/services/clientsService";
import { usePrograms } from "@/services/programsService";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

interface EditClientFormProps {
  client: Client;
  onSubmit: () => void;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({ client, onSubmit }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { mutate: updateClient, isPending } = useUpdateClient();
  const { data: programs = [], isLoading: programsLoading } = usePrograms();
  
  const { register, handleSubmit, setValue, watch } = useForm<ClientFormData>({
    defaultValues: {
      name: client.name,
      email: client.email || '',
      phone: client.phone || '',
      program: client.program || '',
      notes: client.notes || ''
    }
  });
  
  const selectedProgram = watch('program');
  
  const onFormSubmit = (data: ClientFormData) => {
    updateClient({
      id: client.id,
      clientData: data
    }, {
      onSuccess: () => {
        toast({
          title: t('client.success'),
          description: t('client.clientUpdated')
        });
        onSubmit();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">{t('client.name')}</Label>
          <Input 
            id="name" 
            placeholder={t('client.namePlaceholder')}
            className="h-11"
            {...register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">{t('client.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t('client.emailPlaceholder')}
            className="h-11"
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">{t('client.phone')}</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t('client.phonePlaceholder')}
            className="h-11"
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program" className="text-sm font-medium">{t('client.program')}</Label>
          <Select 
            value={selectedProgram} 
            onValueChange={(value) => setValue('program', value)}
            disabled={programsLoading}
          >
            <SelectTrigger id="program" className="h-11">
              <SelectValue placeholder={programsLoading ? t('action.loading') : `${t('client.selectProgram')}...`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {programs.length === 0 && !programsLoading ? (
                  <SelectItem value="no-programs" disabled>
                    {t('programs.noPrograms')}
                  </SelectItem>
                ) : (
                  programs.map((program) => (
                    <SelectItem key={program.id} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">{t('client.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder={t('client.notesPlaceholder')}
            className="min-h-[80px] resize-none"
            {...register('notes')}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onSubmit} className="h-11">
          {t('action.cancel')}
        </Button>
        <Button 
          type="submit" 
          className="bg-forest-500 hover:bg-forest-600 h-11"
          disabled={isPending}
        >
          {isPending ? t('action.updating') : t('action.update')}
        </Button>
      </div>
    </form>
  );
};
