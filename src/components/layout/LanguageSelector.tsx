
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  // Define languages with their codes, names, and flags
  const languages = [
    { code: 'en', name: 'English', localName: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Turkish', localName: 'Türkçe', flag: '🇹🇷' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          {languages.find(lang => lang.code === language)?.flag}
          <span className="hidden md:inline">
            {t('app.language')}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'tr')}
            className={`flex items-center gap-2 ${language === lang.code ? 'font-bold' : ''}`}
          >
            <span>{lang.flag}</span>
            <span>{language === 'en' ? lang.name : lang.localName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
