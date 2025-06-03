
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
import { usePrograms } from "@/services/programsService";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClientFormProps {
  onSubmit: () => void;
  initialData?: ClientFormData;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { mutate: addClient, isPending } = useAddClient();
  const { data: programs = [], isLoading: programsLoading } = usePrograms();
  
  const { register, handleSubmit, setValue, watch } = useForm<ClientFormData>({
    defaultValues: initialData || {
      name: '',
      email: '',
      phone: '',
      program: '',
      notes: ''
    }
  });
  
  const selectedProgram = watch('program');
  
  const onFormSubmit = (data: ClientFormData) => {
    addClient(data, {
      onSuccess: () => {
        toast({
          title: t('client.success'),
          description: t('client.clientAdded')
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
          {isPending ? t('action.saving') : t('action.save')}
        </Button>
      </div>
    </form>
  );
};
