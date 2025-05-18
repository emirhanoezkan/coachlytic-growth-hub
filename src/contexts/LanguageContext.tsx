
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define available languages
export type LanguageType = 'en' | 'tr';

// Define the context shape
type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => Promise<void>;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: async () => {},
  t: () => '',
});

// Translations data structure
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// English translations
const enTranslations = {
  // Common
  'app.name': 'Coachlytic',
  'app.dashboard': 'Dashboard',
  'app.clients': 'Clients',
  'app.sessions': 'Sessions',
  'app.programs': 'Programs',
  'app.analytics': 'Analytics',
  'app.billing': 'Billing',
  'app.settings': 'Settings',
  'app.logout': 'Logout',
  'app.search': 'Search',
  'app.language': 'Language',
  
  // Actions
  'action.save': 'Save',
  'action.cancel': 'Cancel',
  'action.add': 'Add',
  'action.edit': 'Edit',
  'action.delete': 'Delete',
  'action.submit': 'Submit',
  
  // Clients
  'clients.title': 'Client Directory',
  'clients.subtitle': 'Manage and track your coaching clients',
  'clients.add': 'Add Client',
  'clients.name': 'Full Name',
  'clients.email': 'Email',
  'clients.phone': 'Phone',
  'clients.program': 'Assigned Program',
  'clients.notes': 'Notes',
  
  // Programs
  'programs.title': 'Coaching Programs',
  'programs.subtitle': 'Manage your coaching packages and programs',
  'programs.add': 'Create Program',
  'programs.name': 'Program Name',
  'programs.description': 'Description',
  'programs.sessions': 'Number of Sessions',
  'programs.duration': 'Duration (weeks)',
  'programs.price': 'Price ($)',
  
  // Sessions
  'sessions.title': 'Session Calendar',
  'sessions.subtitle': 'Schedule and manage your coaching sessions',
  'sessions.add': 'Add Session',
  'sessions.client': 'Select Client',
  'sessions.date': 'Session Date',
  'sessions.time': 'Start Time',
  'sessions.duration': 'Duration',
  'sessions.type': 'Session Type',
  'sessions.notes': 'Session Notes',
  'sessions.location': 'Location Type',
  'sessions.online': 'Online',
  'sessions.inperson': 'In Person',
};

// Turkish translations
const trTranslations = {
  // Common
  'app.name': 'Coachlytic',
  'app.dashboard': 'Gösterge Paneli',
  'app.clients': 'Danışanlar',
  'app.sessions': 'Seanslar',
  'app.programs': 'Programlar',
  'app.analytics': 'Analitik',
  'app.billing': 'Faturalama',
  'app.settings': 'Ayarlar',
  'app.logout': 'Çıkış',
  'app.search': 'Ara',
  'app.language': 'Dil',
  
  // Actions
  'action.save': 'Kaydet',
  'action.cancel': 'İptal',
  'action.add': 'Ekle',
  'action.edit': 'Düzenle',
  'action.delete': 'Sil',
  'action.submit': 'Gönder',
  
  // Clients
  'clients.title': 'Danışan Dizini',
  'clients.subtitle': 'Koçluk danışanlarınızı yönetin ve takip edin',
  'clients.add': 'Danışan Ekle',
  'clients.name': 'Tam Adı',
  'clients.email': 'E-posta',
  'clients.phone': 'Telefon',
  'clients.program': 'Atanan Program',
  'clients.notes': 'Notlar',
  
  // Programs
  'programs.title': 'Koçluk Programları',
  'programs.subtitle': 'Koçluk paketlerinizi ve programlarınızı yönetin',
  'programs.add': 'Program Oluştur',
  'programs.name': 'Program Adı',
  'programs.description': 'Açıklama',
  'programs.sessions': 'Seans Sayısı',
  'programs.duration': 'Süre (hafta)',
  'programs.price': 'Fiyat (₺)',
  
  // Sessions
  'sessions.title': 'Seans Takvimi',
  'sessions.subtitle': 'Koçluk seanslarınızı planlayın ve yönetin',
  'sessions.add': 'Seans Ekle',
  'sessions.client': 'Danışan Seç',
  'sessions.date': 'Seans Tarihi',
  'sessions.time': 'Başlangıç Zamanı',
  'sessions.duration': 'Süre',
  'sessions.type': 'Seans Tipi',
  'sessions.notes': 'Seans Notları',
  'sessions.location': 'Konum Tipi',
  'sessions.online': 'Online',
  'sessions.inperson': 'Yüz Yüze',
};

// Combine all translations
const translations: Translations = {
  en: enTranslations,
  tr: trTranslations,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  // Load language preference from Supabase on initial load
  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Fetch the user profile to get language preference
          const { data: profile } = await supabase
            .from('profiles')
            .select('language')
            .eq('id', user.id)
            .single();
            
          if (profile && profile.language) {
            setLanguage(profile.language as LanguageType);
          }
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    
    loadLanguagePreference();
  }, []);

  // Save language preference to Supabase
  const changeLanguage = async (lang: LanguageType) => {
    setLanguage(lang);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Update the user profile with the new language preference
        await supabase
          .from('profiles')
          .update({ language: lang })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Translation function
  const t = (key: string): string => {
    // Return the key itself if translation not found
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
