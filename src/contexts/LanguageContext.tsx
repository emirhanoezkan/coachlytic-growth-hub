
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  useEffect(() => {
    const loadLanguage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('language')
          .eq('id', user.id)
          .single();
        
        if (data?.language && !error) {
          setLanguage(data.language as Language);
        }
      }
    };
    
    loadLanguage();
  }, []);
  
  const translations: Translations = {
    en: enTranslations,
    tr: trTranslations,
  };

  // Enhanced translation function that handles nested paths and provides better fallbacks
  const t = (key: string): string => {
    try {
      const currentTranslations = translations[language];
      if (!currentTranslations) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`No translations loaded for language: ${language}`);
        }
        return `[MISSING_TRANSLATION: ${key}]`;
      }

      // Split the key by dots to handle nested translations
      const parts = key.split('.');
      let result: string | TranslationFile | undefined = currentTranslations;
      
      // Navigate through the nested structure
      for (const part of parts) {
        if (typeof result !== 'object' || result === null || !result.hasOwnProperty(part)) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation path broken at '${part}' for key '${key}'. Expected an object with property '${part}', but got ${typeof result}.`);
          }
          return `[MISSING_TRANSLATION: ${key}]`;
        }
        result = result[part] as string | TranslationFile; // Type assertion
      }
      
      // If we found a string, return it
      if (typeof result === 'string') {
        return result;
      }
      
      // If we found an object or undefined/null, return the missing translation string
      if (process.env.NODE_ENV === 'development') {
        console.warn(`No string found for key '${key}'. Expected a string, but got ${typeof result}.`);
      }
      return `[MISSING_TRANSLATION: ${key}]`;
    } catch (error) {
      // Log the error and return the missing translation string
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error getting translation for key '${key}':`, error);
      }
      return `[MISSING_TRANSLATION: ${key}]`;
    }
  };

  const saveLanguagePreference = async (newLanguage: Language) => {
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
    
    setLanguage(newLanguage);
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
