
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
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('client.name')}</Label>
          <Input 
            id="name" 
            placeholder={t('client.namePlaceholder')}
            {...register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('client.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t('client.emailPlaceholder')}
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t('client.phone')}</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t('client.phonePlaceholder')}
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">{t('client.program')}</Label>
          <Select 
            value={selectedProgram} 
            onValueChange={(value) => setValue('program', value)}
          >
            <SelectTrigger id="program">
              <SelectValue placeholder={`${t('client.selectProgram')}...`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Career Development">{t('client.programs.career')}</SelectItem>
                <SelectItem value="Business Strategy">{t('client.programs.business')}</SelectItem>
                <SelectItem value="Life Coaching">{t('client.programs.life')}</SelectItem>
                <SelectItem value="Executive Coaching">{t('client.programs.executive')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t('client.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder={t('client.notesPlaceholder')}
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
          {isPending ? t('action.updating') : t('action.update')}
        </Button>
      </div>
    </form>
  );
};
