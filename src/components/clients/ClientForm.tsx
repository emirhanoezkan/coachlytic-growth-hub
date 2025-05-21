
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
import { useLanguage } from "@/contexts/LanguageContext";

interface ClientFormProps {
  onSubmit: () => void;
  initialData?: ClientFormData;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const { t } = useLanguage();
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
        toast({
          title: t('clients.success'),
          description: t('clients.clientAdded')
        });
        onSubmit();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('clients.name')}</Label>
          <Input 
            id="name" 
            placeholder={t('clients.namePlaceholder')}
            {...register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('clients.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder={t('clients.emailPlaceholder')}
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t('clients.phone')}</Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder={t('clients.phonePlaceholder')}
            {...register('phone')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="program">{t('clients.program')}</Label>
          <Select 
            value={selectedProgram} 
            onValueChange={(value) => setValue('program', value)}
          >
            <SelectTrigger id="program">
              <SelectValue placeholder={`${t('clients.selectProgram')}...`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Career Development">{t('clients.programs.career')}</SelectItem>
                <SelectItem value="Business Strategy">{t('clients.programs.business')}</SelectItem>
                <SelectItem value="Life Coaching">{t('clients.programs.life')}</SelectItem>
                <SelectItem value="Executive Coaching">{t('clients.programs.executive')}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t('clients.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder={t('clients.notesPlaceholder')}
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
          {isPending ? t('action.saving') : t('action.save')}
        </Button>
      </div>
    </form>
  );
};
