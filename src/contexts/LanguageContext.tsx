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
      "language.turkish": "Türkçe",
      
      // Landing page translations
      "landing.hero.badge": "Simplified coaching management",
      "landing.hero.title.part1": "Elevate Your Coaching Business with",
      "landing.hero.title.part2": "Coachlytic",
      "landing.hero.description": "The all-in-one platform for professional coaches to manage clients, schedule sessions, and track performance — all in one beautiful dashboard.",
      "landing.hero.button.primary": "Get Started",
      "landing.hero.button.secondary": "Learn More",
      "landing.hero.feature1": "No credit card required",
      "landing.hero.feature2": "14-day free trial",
      "landing.features.title": "Features",
      "landing.features.heading": "Everything You Need to Succeed",
      "landing.features.subheading": "Coachlytic brings all your coaching tools together in one seamless experience",
      "landing.features.clientManagement.title": "Client Management",
      "landing.features.clientManagement.description": "Organize client information, track progress, and manage communication in one place.",
      "landing.features.scheduling.title": "Smart Scheduling",
      "landing.features.scheduling.description": "Interactive calendar that makes booking sessions and managing your time effortless.",
      "landing.features.program.title": "Program Builder",
      "landing.features.program.description": "Create and manage coaching programs with customizable packages and pricing.",
      "landing.features.analytics.title": "Insightful Analytics",
      "landing.features.analytics.description": "Track performance metrics and gain valuable insights to grow your coaching practice.",
      "landing.testimonials.badge": "Testimonials",
      "landing.testimonials.heading": "Loved by coaches worldwide",
      "landing.testimonials.person1.name": "Alex Johnson",
      "landing.testimonials.person1.role": "Business Coach",
      "landing.testimonials.person1.quote": "Coachlytic transformed my coaching practice. The client management system is intuitive and the analytics help me make better decisions.",
      "landing.testimonials.person2.name": "Sarah Lee",
      "landing.testimonials.person2.role": "Life Coach",
      "landing.testimonials.person2.quote": "The scheduling features saved me hours every week. My clients appreciate the professional experience, and I can focus on coaching instead of admin work.",
      "landing.testimonials.person3.name": "Mark Thompson", 
      "landing.testimonials.person3.role": "Executive Coach",
      "landing.testimonials.person3.quote": "I've tried many coaching platforms, but Coachlytic offers the perfect balance of features without being overwhelming. It's become essential to my business.",
      "landing.cta.heading": "Ready to take your coaching to the next level?",
      "landing.cta.subheading": "Join thousands of coaches who trust Coachlytic to manage their business.",
      "landing.cta.button": "Get Started Now",
      "landing.footer.slogan": "Empowering coaches, transforming practices.",
      "landing.footer.product": "Product",
      "landing.footer.features": "Features",
      "landing.footer.pricing": "Pricing",
      "landing.footer.support": "Support",
      "landing.footer.helpCenter": "Help Center",
      "landing.footer.contact": "Contact",
      "landing.footer.legal": "Legal",
      "landing.footer.privacy": "Privacy",
      "landing.footer.terms": "Terms",
      "landing.footer.copyright": "© 2025 Coachlytic. All rights reserved.",
      
      // Time related translations
      "time.day": "Day",
      "time.week": "Week",
      "time.month": "Month",
      "time.today": "Today",
      "time.tomorrow": "Tomorrow",
      "time.min": "min",
      
      // Day names
      "day.mon": "Monday",
      "day.tue": "Tuesday",
      "day.wed": "Wednesday",
      "day.thu": "Thursday",
      "day.fri": "Friday",
      "day.sat": "Saturday",
      "day.sun": "Sunday",
      
      // Month names
      "month.jan": "January",
      "month.feb": "February",
      "month.mar": "March",
      "month.apr": "April",
      "month.may": "May",
      "month.jun": "June",
      "month.jul": "July",
      "month.aug": "August",
      "month.sep": "September",
      "month.oct": "October",
      "month.nov": "November",
      "month.dec": "December",
      
      // Chart translations
      "chart.clients": "Clients",
      "chart.completed": "Completed",
      "chart.inactive": "Inactive",
      "chart.at_risk": "At-Risk",
      "chart.revenue": "Revenue",
      "chart.sessions": "Sessions",
      "chart.active_clients": "Active Clients",
      
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
      
      // Client health categories
      "clientHealth.highPerformers": "High Performers",
      "clientHealth.onTrack": "On Track",
      "clientHealth.needsAttention": "Needs Attention",
      "clientHealth.atRisk": "At Risk",
      
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
      "app.language": "Dil",
      "app.description": "Koç yönetim platformu",
      "language.english": "İngilizce",
      "language.turkish": "Türkçe",
      
      // Landing page translations
      "landing.hero.badge": "Basitleştirilmiş koçluk yönetimi",
      "landing.hero.title.part1": "Koçluk İşinizi",
      "landing.hero.title.part2": "Coachlytic ile Yükseltin",
      "landing.hero.description": "Profesyonel koçların müşterilerini yönetmesi, oturumları planlaması ve performansı takip etmesi için tek bir güzel gösterge panelinde tüm ihtiyaçlarınız için tek platform.",
      "landing.hero.button.primary": "Hemen Başla",
      "landing.hero.button.secondary": "Daha Fazla Bilgi",
      "landing.hero.feature1": "Kredi kartı gerekmez",
      "landing.hero.feature2": "14 gün ücretsiz deneme",
      "landing.features.title": "Özellikler",
      "landing.features.heading": "Başarılı Olmanız için İhtiyacınız Olan Her Şey",
      "landing.features.subheading": "Coachlytic, tüm koçluk araçlarınızı tek bir sorunsuz deneyimde bir araya getirir",
      "landing.features.clientManagement.title": "Müşteri Yönetimi",
      "landing.features.clientManagement.description": "Müşteri bilgilerini düzenleyin, ilerlemeyi takip edin ve iletişimi tek bir yerde yönetin.",
      "landing.features.scheduling.title": "Akıllı Planlama",
      "landing.features.scheduling.description": "Oturumları ayarlamayı ve zamanınızı yönetmeyi zahmetsiz hale getiren etkileşimli takvim.",
      "landing.features.program.title": "Program Oluşturucu",
      "landing.features.program.description": "Özelleştirilebilir paketler ve fiyatlandırma ile koçluk programları oluşturun ve yönetin.",
      "landing.features.analytics.title": "Derinlemesine Analitik",
      "landing.features.analytics.description": "Koçluk uygulamanızı büyütmek için performans metriklerini takip edin ve değerli bilgiler edinin.",
      "landing.testimonials.badge": "Müşteri Görüşleri",
      "landing.testimonials.heading": "Dünya genelinde koçlar tarafından seviliyor",
      "landing.testimonials.person1.name": "Alex Johnson",
      "landing.testimonials.person1.role": "İş Koçu",
      "landing.testimonials.person1.quote": "Coachlytic koçluk uygulamalarımı dönüştürdü. Müşteri yönetim sistemi sezgisel ve analizler daha iyi kararlar vermeme yardımcı oluyor.",
      "landing.testimonials.person2.name": "Sarah Lee",
      "landing.testimonials.person2.role": "Yaşam Koçu",
      "landing.testimonials.person2.quote": "Planlama özellikleri her hafta saatlerimi kurtardı. Müşterilerim profesyonel deneyimi takdir ediyor ve ben idari işler yerine koçluğa odaklanabiliyorum.",
      "landing.testimonials.person3.name": "Mark Thompson",
      "landing.testimonials.person3.role": "Yönetici Koçu",
      "landing.testimonials.person3.quote": "Birçok koçluk platformu denedim, ancak Coachlytic bunaltıcı olmadan özelliklerin mükemmel dengesini sunuyor. İşimin vazgeçilmez bir parçası haline geldi.",
      "landing.cta.heading": "Koçluğunuzu bir sonraki seviyeye taşımaya hazır mısınız?",
      "landing.cta.subheading": "İşlerini yönetmek için Coachlytic'e güvenen binlerce koça katılın.",
      "landing.cta.button": "Hemen Başlayın",
      "landing.footer.slogan": "Koçları güçlendirmek, uygulamaları dönüştürmek.",
      "landing.footer.product": "Ürün",
      "landing.footer.features": "Özellikler",
      "landing.footer.pricing": "Fiyatlandırma",
      "landing.footer.support": "Destek",
      "landing.footer.helpCenter": "Yardım Merkezi",
      "landing.footer.contact": "İletişim",
      "landing.footer.legal": "Yasal",
      "landing.footer.privacy": "Gizlilik",
      "landing.footer.terms": "Şartlar",
      "landing.footer.copyright": "© 2025 Coachlytic. Tüm hakları saklıdır.",
      
      // Time related translations
      "time.day": "Gün",
      "time.week": "Hafta",
      "time.month": "Ay",
      "time.today": "Bugün",
      "time.tomorrow": "Yarın",
      "time.min": "dk",
      
      // Day names
      "day.mon": "Pazartesi",
      "day.tue": "Salı",
      "day.wed": "Çarşamba",
      "day.thu": "Perşembe",
      "day.fri": "Cuma",
      "day.sat": "Cumartesi",
      "day.sun": "Pazar",
      
      // Month names
      "month.jan": "Ocak",
      "month.feb": "Şubat",
      "month.mar": "Mart",
      "month.apr": "Nisan",
      "month.may": "Mayıs",
      "month.jun": "Haziran",
      "month.jul": "Temmuz",
      "month.aug": "Ağustos",
      "month.sep": "Eylül",
      "month.oct": "Ekim",
      "month.nov": "Kasım",
      "month.dec": "Aralık",
      
      // Chart translations
      "chart.clients": "Müşteriler",
      "chart.completed": "Tamamlanmış",
      "chart.inactive": "Pasif",
      "chart.at_risk": "Risk Altında",
      "chart.revenue": "Gelir",
      "chart.sessions": "Oturumlar",
      "chart.active_clients": "Aktif Müşteriler",
      
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
      
      // Client health categories
      "clientHealth.highPerformers": "Yüksek Performanslı",
      "clientHealth.onTrack": "Yolunda",
      "clientHealth.needsAttention": "Dikkat Gerekli",
      "clientHealth.atRisk": "Risk Altında",
      
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
