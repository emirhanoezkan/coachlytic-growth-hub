
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
      "app.language": "English",
      
      // Time related translations
      "time.day": "Day",
      "time.week": "Week",
      "time.month": "Month",
      "time.today": "Today",
      "time.tomorrow": "Tomorrow",
      "time.min": "min",
      
      // Chart translations
      "chart.clients": "Clients",
      "chart.completed": "Completed",
      "chart.inactive": "Inactive",
      "chart.at-risk": "At-Risk",
      "chart.revenue": "Revenue",
      "chart.sessions": "Sessions",
      
      // Dashboard translations
      "dashboard.totalRevenue": "Total Revenue",
      "dashboard.newClients": "New Clients",
      "dashboard.clientRetention": "Client Retention",
      "dashboard.avgSessionTime": "Avg. Session Time",
      "dashboard.welcomeTitle": "Welcome to Your Coaching Dashboard",
      "dashboard.welcomeSubtitle": "Track your performance, clients, and sessions at a glance",
      "dashboard.revenue": "Revenue Analysis",
      "dashboard.revenueDesc": "Your revenue performance for",
      "dashboard.clientRetentionTitle": "Client Retention",
      "dashboard.clientRetentionDesc": "Your client retention rates for",
      "dashboard.clientHealth": "Client Health Overview",
      "dashboard.clientStatus": "Status of your current client relationships",
      "dashboard.upcomingSessions": "Upcoming Sessions",
      "dashboard.todayAppointments": "Your next scheduled coaching sessions",
      "dashboard.noUpcomingSessions": "No upcoming sessions scheduled",
      "dashboard.errorLoading": "Error loading sessions",
      "dashboard.unnamed": "Unnamed client",
      
      // Client translations
      "client.directory": "Client Directory",
      "client.manage": "Manage and organize your coaching clients",
      "client.filter": "Filter",
      "client.add": "Add Client",
      
      // Session translations
      "sessions.title": "Sessions Schedule",
      "sessions.subtitle": "Manage your coaching sessions calendar",
      "sessions.calendar": "Calendar",
      "sessions.list": "List",
      "sessions.add": "New Session",
      "sessions.new": "New Session",
      "sessions.createDesc": "Schedule a new coaching session",
      
      // Program translations
      "programs.title": "Coaching Programs",
      "programs.subtitle": "Manage your coaching program packages",
      "programs.create": "Create Program",
      "programs.new": "New Program",
      
      // Document translations
      "documents.title": "Document Library",
      "documents.subtitle": "Manage coaching materials and client documents",
      "documents.upload": "Upload Document",
      "documents.uploadDesc": "Add new documents to your coaching library",
      "documents.library": "Document Library",
      "documents.access": "Access and manage your coaching materials",
      
      // Profile translations
      "profile.title": "My Profile",
      "profile.subtitle": "Manage your personal and business information",
      "profile.personal": "Personal Information",
      "profile.update": "Update your profile details",
      "profile.firstName": "First Name",
      "profile.lastName": "Last Name",
      "profile.email": "Email",
      "profile.company": "Company",
      "profile.phone": "Phone",
      "profile.save": "Save Changes",
      "profile.changePhoto": "Change Photo",
      
      // Authentication translations
      "auth.login": "Login",
      "auth.signup": "Sign Up",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.forgotPassword": "Forgot Password?",
      "auth.noAccount": "Don't have an account?",
      "auth.haveAccount": "Already have an account?",
      
      // Location types
      "online": "Online Session",
      "in-person": "In-Person Session",
      "phone": "Phone Session",
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
      "app.language": "Türkçe",
      
      // Time related translations
      "time.day": "Gün",
      "time.week": "Hafta",
      "time.month": "Ay",
      "time.today": "Bugün",
      "time.tomorrow": "Yarın",
      "time.min": "dk",
      
      // Chart translations
      "chart.clients": "Müşteriler",
      "chart.completed": "Tamamlanmış",
      "chart.inactive": "Pasif",
      "chart.at-risk": "Risk Altında",
      "chart.revenue": "Gelir",
      "chart.sessions": "Oturumlar",
      
      // Dashboard translations
      "dashboard.totalRevenue": "Toplam Gelir",
      "dashboard.newClients": "Yeni Müşteriler",
      "dashboard.clientRetention": "Müşteri Koruma",
      "dashboard.avgSessionTime": "Ort. Oturum Süresi",
      "dashboard.welcomeTitle": "Koçluk Gösterge Paneline Hoş Geldiniz",
      "dashboard.welcomeSubtitle": "Performansınızı, müşterilerinizi ve oturumlarınızı bir bakışta izleyin",
      "dashboard.revenue": "Gelir Analizi",
      "dashboard.revenueDesc": "Gelir performansınız:",
      "dashboard.clientRetentionTitle": "Müşteri Koruma",
      "dashboard.clientRetentionDesc": "Müşteri koruma oranlarınız:",
      "dashboard.clientHealth": "Müşteri Sağlığı Genel Bakışı",
      "dashboard.clientStatus": "Mevcut müşteri ilişkilerinizin durumu",
      "dashboard.upcomingSessions": "Yaklaşan Oturumlar",
      "dashboard.todayAppointments": "Planlanmış bir sonraki koçluk oturumlarınız",
      "dashboard.noUpcomingSessions": "Planlanmış yaklaşan oturum yok",
      "dashboard.errorLoading": "Oturumlar yüklenirken hata oluştu",
      "dashboard.unnamed": "İsimsiz müşteri",
      
      // Client translations
      "client.directory": "Müşteri Rehberi",
      "client.manage": "Koçluk müşterilerinizi yönetin ve düzenleyin",
      "client.filter": "Filtrele",
      "client.add": "Müşteri Ekle",
      
      // Session translations
      "sessions.title": "Oturum Takvimi",
      "sessions.subtitle": "Koçluk oturumları takviminizi yönetin",
      "sessions.calendar": "Takvim",
      "sessions.list": "Liste",
      "sessions.add": "Yeni Oturum",
      "sessions.new": "Yeni Oturum",
      "sessions.createDesc": "Yeni bir koçluk oturumu planlayın",
      
      // Program translations
      "programs.title": "Koçluk Programları",
      "programs.subtitle": "Koçluk program paketlerinizi yönetin",
      "programs.create": "Program Oluştur",
      "programs.new": "Yeni Program",
      
      // Document translations
      "documents.title": "Belge Kütüphanesi",
      "documents.subtitle": "Koçluk materyallerini ve müşteri belgelerini yönetin",
      "documents.upload": "Belge Yükle",
      "documents.uploadDesc": "Koçluk kütüphanenize yeni belgeler ekleyin",
      "documents.library": "Belge Kütüphanesi",
      "documents.access": "Koçluk materyallerinize erişin ve yönetin",
      
      // Profile translations
      "profile.title": "Profilim",
      "profile.subtitle": "Kişisel ve iş bilgilerinizi yönetin",
      "profile.personal": "Kişisel Bilgiler",
      "profile.update": "Profil detaylarınızı güncelleyin",
      "profile.firstName": "Ad",
      "profile.lastName": "Soyad",
      "profile.email": "E-posta",
      "profile.company": "Şirket",
      "profile.phone": "Telefon",
      "profile.save": "Değişiklikleri Kaydet",
      "profile.changePhoto": "Fotoğraf Değiştir",
      
      // Authentication translations
      "auth.login": "Giriş Yap",
      "auth.signup": "Kaydol",
      "auth.email": "E-posta",
      "auth.password": "Şifre",
      "auth.forgotPassword": "Şifremi Unuttum?",
      "auth.noAccount": "Hesabınız yok mu?",
      "auth.haveAccount": "Zaten hesabınız var mı?",
      
      // Location types
      "online": "Online Oturum",
      "in-person": "Yüz Yüze Oturum",
      "phone": "Telefon Oturumu",
    }
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
