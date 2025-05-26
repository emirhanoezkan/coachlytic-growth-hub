import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useInvoices } from "@/hooks/useInvoices";
import { UpdateInvoiceData } from "@/services/invoicesService";
import { formatCurrency, getCurrencySymbol } from "@/utils/currency";

interface EditInvoiceDialogProps {
  invoice: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditInvoiceDialog: React.FC<EditInvoiceDialogProps> = ({
  invoice,
  open,
  onOpenChange
}) => {
  const { t, language } = useLanguage();
  const { clients, isLoading: isLoadingClients } = useClients();
  const { updateInvoice, isUpdating } = useInvoices();
  
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState([{ description: "", quantity: 1, rate: 0 }]);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(10);
  const [includesTax, setIncludesTax] = useState(false);

  useEffect(() => {
    if (invoice && open) {
      setSelectedClient(invoice.client_id || '');
      setStatus(invoice.status || 'pending');
      setNotes(invoice.notes || '');
      setTaxRate(invoice.tax_rate || 10);
      setIncludesTax(invoice.includes_tax || false);
      setDueDate(invoice.due_date ? new Date(invoice.due_date) : undefined);
      
      // For now, set default items since we don't have items loaded
      // In a real app, you'd fetch invoice items
      setItems([{ description: "Service", quantity: 1, rate: invoice.amount || 0 }]);
    }
  }, [invoice, open]);

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
    
    if (!invoice?.id || !selectedClient || selectedClient === 'no-clients') {
      return;
    }

    const formData: UpdateInvoiceData = {
      client_id: selectedClient,
      due_date: dueDate?.toISOString(),
      status,
      notes: notes || undefined,
      tax_rate: taxRate,
      includes_tax: includesTax,
      items: items.filter(item => item.description.trim() !== ''),
    };

    updateInvoice({ invoiceId: invoice.id, data: formData }, {
      onSuccess: () => {
        onOpenChange(false);
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

  if (!invoice) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('billing.editInvoice')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
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
                  <Label htmlFor="includesTax">Price includes tax</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>{t('billing.invoiceItems')}</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddItem}
              >
                <Plus className="h-4 w-4 mr-1" />
                {t('billing.addItem')}
              </Button>
            </div>
            
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end border p-2 rounded-md">
                  <div className="col-span-6">
                    <Label className="text-xs">{t('billing.description')}</Label>
                    <Input 
                      value={item.description} 
                      onChange={(e) => handleItemChange(index, "description", e.target.value)} 
                      placeholder={t('billing.serviceDescription')} 
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">{t('billing.quantity')}</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))} 
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">{t('billing.rate')} ({currencySymbol})</Label>
                    <Input 
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

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('action.cancel')}
            </Button>
            <Button 
              type="submit" 
              className="bg-forest-500 hover:bg-forest-600"
              disabled={isUpdating || !selectedClient || selectedClient === 'no-clients'}
            >
              {isUpdating ? "Updating..." : t('billing.updateInvoice')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
