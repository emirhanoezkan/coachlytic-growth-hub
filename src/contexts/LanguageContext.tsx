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
    },
    tr: {
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
