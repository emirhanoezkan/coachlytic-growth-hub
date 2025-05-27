
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
import { Switch } from "@/components/ui/switch";
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClients } from "@/hooks/useClients";
import { useInvoices, useDefaultTaxRate } from "@/hooks/useInvoices";
import { CreateInvoiceData } from "@/services/invoicesService";
import { formatCurrency, getCurrencySymbol } from "@/utils/currency";

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
  const { t, language } = useLanguage();
  const { clients, isLoading: isLoadingClients } = useClients();
  const { createInvoice, isCreating } = useInvoices();
  const { defaultTaxRate } = useDefaultTaxRate();
  
  const [selectedClient, setSelectedClient] = React.useState(initialData.client || '');
  const [items, setItems] = React.useState(initialData.items || [
    { description: "", quantity: 1, rate: 0 }
  ]);
  const [dueDate, setDueDate] = React.useState<Date | undefined>(initialData.dueDate || undefined);
  const [status, setStatus] = React.useState(initialData.status || "pending");
  const [notes, setNotes] = React.useState(initialData.notes || '');
  const [taxRate, setTaxRate] = React.useState(defaultTaxRate);
  const [includesTax, setIncludesTax] = React.useState(false);
  
  React.useEffect(() => {
    if (defaultTaxRate) {
      setTaxRate(defaultTaxRate);
    }
  }, [defaultTaxRate]);
  
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
    
    if (!selectedClient || selectedClient === 'no-clients') {
      return;
    }

    const formData: CreateInvoiceData = {
      client_id: selectedClient,
      due_date: dueDate?.toISOString(),
      status,
      notes: notes || undefined,
      tax_rate: taxRate,
      includes_tax: includesTax,
      items: items.filter(item => item.description.trim() !== ''),
    };

    createInvoice(formData, {
      onSuccess: () => {
        onSubmit();
      }
    });
  };

  // Calculate display amounts
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  let displaySubtotal: number;
  let displayTax: number;
  let displayTotal: number;

  if (includesTax) {
    displayTotal = subtotal;
    displaySubtotal = subtotal / (1 + taxRate / 100);
    displayTax = subtotal - displaySubtotal;
  } else {
    displaySubtotal = subtotal;
    displayTax = subtotal * (taxRate / 100);
    displayTotal = subtotal + displayTax;
  }

  const currencySymbol = getCurrencySymbol(language);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client">{t('billing.client')}</Label>
          <Select value={selectedClient} onValueChange={setSelectedClient} required>
            <SelectTrigger id="client">
              <SelectValue placeholder={t('billing.selectClient')} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoadingClients ? (
                  <SelectItem value="loading" disabled>Loading clients...</SelectItem>
                ) : clients.length === 0 ? (
                  <SelectItem value="no-clients" disabled>No clients found</SelectItem>
                ) : (
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Stack on small screens */}
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
            <Label htmlFor="status">{t('billing.statusLabel')}</Label>
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

        {/* Tax Configuration */}
        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Stack on small screens */}
            <div>
              <Label htmlFor="taxRate">{t('billing.taxRate')}</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                className="mt-2"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="includesTax"
                  checked={includesTax}
                  onCheckedChange={setIncludesTax}
                />
                <Label htmlFor="includesTax">{t('billing.priceIncludesTax')}</Label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {includesTax ? t('billing.taxIncludedInPrices') : t('billing.taxAddedToPrices')}
              </p>
            </div>
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
              <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-x-2 gap-y-3 items-end border p-3 rounded-md">
                {/* Description takes full width on mobile, then configured span on sm+ */}
                <div className="col-span-full sm:col-span-6">
                  <Label htmlFor={`item-desc-${index}`} className="text-xs">{t('billing.description')}</Label>
                  <Input 
                    id={`item-desc-${index}`} 
                    value={item.description} 
                    onChange={(e) => handleItemChange(index, "description", e.target.value)} 
                    placeholder={t('billing.serviceDescription')} 
                    className="mt-1"
                  />
                </div>
                {/* Quantity and Rate in a subgrid for mobile, then configured span on sm+ */}
                <div className="col-span-full sm:col-span-2 grid">
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
                <div className="col-span-full sm:col-span-3 grid">
                  <Label htmlFor={`item-rate-${index}`} className="text-xs">{t('billing.rate')} ({currencySymbol})</Label>
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
                {/* Delete button takes full width on mobile, then configured span on sm+ and different alignment */}
                <div className="col-span-full sm:col-span-1 flex justify-end sm:justify-center">
                  {items.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveItem(index)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-9 w-full sm:w-9 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sm:hidden ml-2">{t('action.remove')}</span> {/* Show text on mobile */}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3 mt-4">
            <div className="flex justify-between text-sm">
              <span>{t('billing.subtotal')}</span>
              <span>{formatCurrency(displaySubtotal, language)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>{t('billing.tax')} ({taxRate}%)</span>
              <span>{formatCurrency(displayTax, language)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-lg">
              <span>{t('billing.total')}</span>
              <span>{formatCurrency(displayTotal, language)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">{t('billing.notes')}</Label>
          <Textarea 
            id="notes" 
            placeholder={t('billing.invoiceNotes')} 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="h-20"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <Button type="button" variant="outline" onClick={onSubmit}>{t('action.cancel')}</Button>
        <Button 
          type="submit" 
          className="bg-forest-500 hover:bg-forest-600"
          disabled={isCreating || !selectedClient || selectedClient === 'no-clients'}
        >
          {isCreating ? "Creating..." : t('billing.createInvoice')}
        </Button>
      </div>
    </form>
  );
};
