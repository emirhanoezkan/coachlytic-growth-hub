
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAddProgram, useUpdateProgram, ProgramFormData } from "@/services/programsService";
import { useForm } from "react-hook-form";

interface ProgramFormProps {
  onSubmit: () => void;
  initialData?: ProgramFormData & { id?: string };
}

export const ProgramForm: React.FC<ProgramFormProps> = ({ onSubmit, initialData }) => {
  const { t, language } = useLanguage();
  const { mutate: addProgram, isPending: isAddPending } = useAddProgram();
  const { mutate: updateProgram, isPending: isUpdatePending } = useUpdateProgram();
  
  const isEditing = !!initialData?.id;
  const isPending = isAddPending || isUpdatePending;
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProgramFormData>({
    defaultValues: initialData || {
      name: '',
      description: '',
      sessions_count: 0,
      duration: 0,
      price: 0
    }
  });

  const onFormSubmit = (data: ProgramFormData) => {
    if (isEditing && initialData?.id) {
      updateProgram({ id: initialData.id, programData: data }, {
        onSuccess: () => {
          onSubmit();
        }
      });
    } else {
      addProgram(data, {
        onSuccess: () => {
          onSubmit();
        }
      });
    }
  };

  const getCurrencyPlaceholder = () => {
    return language === 'tr' ? '₺0,00' : '$0.00';
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('programs.name')}</Label>
          <Input 
            id="name" 
            placeholder={t('programs.namePlaceholder')} 
            {...register('name', { required: true })} 
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500">{t('validation.required')}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{t('programs.description')}</Label>
          <Textarea 
            id="description" 
            placeholder={t('programs.descriptionPlaceholder')} 
            className="min-h-[100px]"
            {...register('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sessions_count">{t('programs.sessions')}</Label>
            <Input 
              id="sessions_count" 
              type="number" 
              placeholder="8" 
              {...register('sessions_count', { 
                required: true,
                valueAsNumber: true,
                min: 1
              })}
              className={errors.sessions_count ? "border-red-500" : ""}
            />
            {errors.sessions_count && <p className="text-sm text-red-500">{t('validation.validNumber')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">{t('programs.duration')}</Label>
            <Input 
              id="duration" 
              type="number" 
              placeholder="12" 
              {...register('duration', { 
                valueAsNumber: true,
                min: 1
              })} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">{t('programs.price')}</Label>
          <Input 
            id="price" 
            type="number" 
            step="0.01"
            placeholder={getCurrencyPlaceholder()} 
            {...register('price', { 
              valueAsNumber: true,
              min: 0
            })} 
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
          {isPending ? t('action.saving') : (isEditing ? t('action.update') : t('action.add'))}
        </Button>
      </div>
    </form>
  );
};
