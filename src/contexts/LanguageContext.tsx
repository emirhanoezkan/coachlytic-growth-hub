import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

type Language = 'en' | 'tr';

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
  
  const translations = {
    en: {
      // App general translations
      "app.name": "Coachlytic",
      "app.dashboard": "Dashboard",
      "app.clients": "Clients",
      "app.sessions": "Sessions",
      "app.programs": "Programs",
      "app.documents": "Documents",
      "app.analytics": "Analytics",
      "app.billing": "Billing",
      "app.settings": "Settings",
      "app.logout": "Logout",
      "app.language": "Language",
      "app.description": "Coach management platform",
      "language.english": "English",
      "language.turkish": "Turkish",
      
      // Auth translations
      "auth.welcome_back": "Welcome Back",
      "auth.enter_credentials": "Enter your credentials to sign in",
      "auth.email": "Email",
      "auth.email_placeholder": "coach@example.com",
      "auth.password": "Password",
      "auth.forgot_password": "Forgot Password?",
      "auth.sign_in": "Sign In",
      "auth.signing_in": "Signing in...",
      "auth.login": "Login",
      "auth.signup": "Sign Up",
      "auth.create_account": "Create Account",
      "auth.enter_information": "Enter your information to create an account",
      "auth.first_name": "First Name",
      "auth.first_name_placeholder": "John",
      "auth.last_name": "Last Name",
      "auth.last_name_placeholder": "Doe",
      "auth.confirm_password": "Confirm Password",
      "auth.create_account_button": "Create Account",
      "auth.creating_account": "Creating account...",
      "auth.error": "Error",
      "auth.fill_all_fields": "Please fill in all fields",
      "auth.passwords_dont_match": "Passwords don't match",
      "auth.password_length": "Password must be at least 6 characters",
    },
    tr: {
      // App general translations
      "app.name": "Coachlytic",
      "app.dashboard": "Gösterge Paneli",
      "app.clients": "Müşteriler",
      "app.sessions": "Oturumlar",
      "app.programs": "Programlar",
      "app.documents": "Belgeler",
      "app.analytics": "Analiz",
      "app.billing": "Faturalama",
      "app.settings": "Ayarlar",
      "app.logout": "Çıkış Yap",
      "app.language": "Dil",
      "app.description": "Koç yönetim platformu",
      "language.english": "İngilizce",
      "language.turkish": "Türkçe",
      
      // Auth translations
      "auth.welcome_back": "Tekrar Hoşgeldiniz",
      "auth.enter_credentials": "Giriş yapmak için bilgilerinizi girin",
      "auth.email": "E-posta",
      "auth.email_placeholder": "coach@example.com",
      "auth.password": "Şifre",
      "auth.forgot_password": "Şifremi Unuttum?",
      "auth.sign_in": "Giriş Yap",
      "auth.signing_in": "Giriş yapılıyor...",
      "auth.login": "Giriş",
      "auth.signup": "Kayıt Ol",
      "auth.create_account": "Hesap Oluştur",
      "auth.enter_information": "Hesap oluşturmak için bilgilerinizi girin",
      "auth.first_name": "Ad",
      "auth.first_name_placeholder": "Ahmet",
      "auth.last_name": "Soyad",
      "auth.last_name_placeholder": "Yılmaz",
      "auth.confirm_password": "Şifreyi Onayla",
      "auth.create_account_button": "Hesap Oluştur",
      "auth.creating_account": "Hesap oluşturuluyor...",
      "auth.error": "Hata",
      "auth.fill_all_fields": "Lütfen tüm alanları doldurun",
      "auth.passwords_dont_match": "Şifreler eşleşmiyor",
      "auth.password_length": "Şifre en az 6 karakter olmalıdır",
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

  const t = (key: string) => {
    return translations[language][key] || key;
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
