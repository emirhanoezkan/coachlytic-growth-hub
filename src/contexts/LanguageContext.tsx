
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import enTranslations from '@/locales/en.json';
import trTranslations from '@/locales/tr.json';

type Language = 'en' | 'tr';

// Define a more specific type for the translation files
type TranslationFile = {
  [key: string]: string | TranslationFile; // Allow nested objects
};

interface Translations {
  [language: string]: TranslationFile;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'coachlytic_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    const loadLanguage = async () => {
      // First try localStorage
      const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
        setLanguage(savedLanguage);
      }
      
      // Then try to get from Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('language')
          .eq('id', user.id)
          .single();
        
        if (data?.language && !error) {
          const dbLanguage = data.language as Language;
          setLanguage(dbLanguage);
          localStorage.setItem(STORAGE_KEY, dbLanguage);
        }
      }
    };
    
    loadLanguage();
  }, []);
  
  const translations: Translations = {
    en: enTranslations,
    tr: trTranslations,
  };

  // Enhanced translation function with fallback and development warnings
  const t = (key: string): string => {
    try {
      const currentTranslations = translations[language];
      if (!currentTranslations) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`No translations loaded for language: ${language}, falling back to English`);
        }
        const fallbackTranslations = translations['en'];
        if (!fallbackTranslations) {
          return `[MISSING_TRANSLATION: ${key}]`;
        }
        return getNestedTranslation(fallbackTranslations, key) || `[MISSING_TRANSLATION: ${key}]`;
      }

      const result = getNestedTranslation(currentTranslations, key);
      if (result) {
        return result;
      }

      // Fallback to English
      const fallbackResult = getNestedTranslation(translations['en'], key);
      if (fallbackResult) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Translation missing for key '${key}' in ${language}, using English fallback`);
        }
        return fallbackResult;
      }
      
      // Log missing translations in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation for key '${key}' in both ${language} and English`);
      }
      
      return `[MISSING_TRANSLATION: ${key}]`;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error getting translation for key '${key}':`, error);
      }
      return `[MISSING_TRANSLATION: ${key}]`;
    }
  };

  const getNestedTranslation = (translations: TranslationFile, key: string): string | null => {
    const parts = key.split('.');
    let result: string | TranslationFile | undefined = translations;
    
    for (const part of parts) {
      if (typeof result !== 'object' || result === null || !result.hasOwnProperty(part)) {
        return null;
      }
      result = result[part] as string | TranslationFile;
    }
    
    return typeof result === 'string' ? result : null;
  };

  const saveLanguagePreference = async (newLanguage: Language) => {
    // Save to localStorage immediately
    localStorage.setItem(STORAGE_KEY, newLanguage);
    setLanguage(newLanguage);
    
    // Try to save to Supabase if user is logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            language: newLanguage,
            updated_at: new Date().toISOString(),
          });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to save language preference to Supabase:', error);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: saveLanguagePreference, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
