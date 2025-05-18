
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { enUS } from '../i18n/en-US';
import { trTR } from '../i18n/tr-TR';

type Locale = 'en' | 'tr';
type Translations = typeof enUS;

interface I18nContextType {
  locale: Locale;
  t: (key: keyof typeof enUS) => string;
  changeLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  t: (key) => key as string,
  changeLocale: () => {},
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedLocale = localStorage.getItem('locale') as Locale;
  const [locale, setLocale] = useState<Locale>(savedLocale || 'en');
  const [translations, setTranslations] = useState<Translations>(locale === 'tr' ? trTR : enUS);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    setTranslations(newLocale === 'tr' ? trTR : enUS);
  }, []);

  const t = useCallback((key: keyof typeof enUS) => {
    return translations[key] || key;
  }, [translations]);

  useEffect(() => {
    // Set document language attribute
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
};
