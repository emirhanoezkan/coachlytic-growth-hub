import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/contexts/LanguageContext";

interface InvoiceFormProps {
  onSubmit: () => void;
  initialData?: {
    client?: string;
    items?: Array<{ description: string; quantity: number; rate: number; }>;
    dueDate?: Date;
    notes?: string;
    status?: string;
  };
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onSubmit, initialData = {} }) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [items, setItems] = React.useState(initialData.items || [
    { description: "", quantity: 1, rate: 0 }
  ]);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(initialData.dueDate || undefined);
  const [status, setStatus] = React.useState(initialData.status || "pending");
  
  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('billing.success'),
      description: t('billing.invoiceCreated'),
    });
    onSubmit();
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">{t('billing.client')}</Label>
          <Select defaultValue={initialData.client || ''}>
            <SelectTrigger id="client">
              <SelectValue placeholder={t('billing.selectClient')} />
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>{t('billing.dueDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>{t('billing.selectDueDate')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="status">{t('billing.status')}</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="mt-2">
                <SelectValue placeholder={t('billing.selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="pending">{t('billing.statuses.pending')}</SelectItem>
                  <SelectItem value="paid">{t('billing.statuses.paid')}</SelectItem>
                  <SelectItem value="overdue">{t('billing.statuses.overdue')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3 mt-3">
          <div className="flex justify-between items-center">
            <Label>{t('billing.invoiceItems')}</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleAddItem} 
              className="text-forest-600 border-forest-300 hover:bg-forest-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              {t('billing.addItem')}
            </Button>
          </div>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end border p-2 rounded-md">
                <div className="col-span-6">
                  <Label htmlFor={`item-desc-${index}`} className="text-xs">{t('billing.description')}</Label>
                  <Input 
                    id={`item-desc-${index}`} 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, "description", e.target.value)} 
                    placeholder={t('billing.serviceDescription')} 
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-qty-${index}`} className="text-xs">{t('billing.quantity')}</Label>
                  <Input 
                    id={`item-qty-${index}`} 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))} 
                    className="mt-1"
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`item-rate-${index}`} className="text-xs">{t('billing.rate')}</Label>
                  <Input 
                    id={`item-rate-${index}`} 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={item.rate} 
                    onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value))} 
                    className="mt-1"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  {items.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveItem(index)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3 mt-4">
            <div className="flex justify-between text-sm">
              <span>{t('billing.subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>{t('billing.tax')}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-lg">
              <span>{t('billing.total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t('billing.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder={t('billing.invoiceNotes')} 
            defaultValue={initialData.notes || ''}
            className="h-20"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <Button type="button" variant="outline" onClick={onSubmit}>{t('action.cancel')}</Button>
        <Button type="submit" className="bg-forest-500 hover:bg-forest-600">{t('billing.createInvoice')}</Button>
      </div>
    </form>
  );
};
