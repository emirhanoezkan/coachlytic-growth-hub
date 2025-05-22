
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ClientFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  status?: string;
  program?: string;
  search?: string;
}

export const ClientFilter: React.FC<ClientFilterProps> = ({ onFilter }) => {
  const { t } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<string>("");
  const [program, setProgram] = React.useState<string>("");
  const [search, setSearch] = React.useState<string>("");
  
  const handleApplyFilter = () => {
    onFilter({
      status: status || undefined,
      program: program || undefined,
      search: search || undefined
    });
    setOpen(false);
  };
  
  const handleReset = () => {
    setStatus("");
    setProgram("");
    setSearch("");
    onFilter({});
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-4 w-4" />
          {t('client.filter')}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('client.filterClients')}</SheetTitle>
          <SheetDescription>{t('client.filterDescription')}</SheetDescription>
        </SheetHeader>
        
        <div className="space-y-5 py-6">
          <div className="space-y-2">
            <Label htmlFor="search">{t('client.search')}</Label>
            <Input 
              id="search" 
              placeholder={t('client.searchPlaceholder')} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">{t('client.status')}</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder={t('client.selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('client.all')}</SelectItem>
                <SelectItem value="Active">{t('client.statuses.active')}</SelectItem>
                <SelectItem value="Inactive">{t('client.statuses.inactive')}</SelectItem>
                <SelectItem value="At Risk">{t('client.statuses.atRisk')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="program">{t('client.program')}</Label>
            <Select value={program} onValueChange={setProgram}>
              <SelectTrigger id="program">
                <SelectValue placeholder={t('client.selectProgram')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t('client.all')}</SelectItem>
                <SelectItem value="Career Development">{t('client.programs.career')}</SelectItem>
                <SelectItem value="Business Strategy">{t('client.programs.business')}</SelectItem>
                <SelectItem value="Life Coaching">{t('client.programs.life')}</SelectItem>
                <SelectItem value="Executive Coaching">{t('client.programs.executive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleReset}
            >
              {t('action.reset')}
            </Button>
            <Button 
              className="flex-1 bg-forest-500 hover:bg-forest-600" 
              onClick={handleApplyFilter}
            >
              {t('action.applyFilter')}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
