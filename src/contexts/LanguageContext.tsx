
import React, { createContext, useContext, useState } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const translations: Record<string, Record<string, string>> = {
  en: {
    "app.name": "Coachlytic",
    "app.dashboard": "Dashboard",
    "app.clients": "Clients",
    "app.sessions": "Sessions",
    "app.programs": "Programs",
    "app.analytics": "Analytics",
    "app.billing": "Billing",
    "app.documents": "Documents",
    "app.profile": "Profile",
    "app.settings": "Settings",
    "app.language": "Language",
    "app.logout": "Log Out",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    "form.submit": "Submit",
    "form.cancel": "Cancel",
    "common.search": "Search",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.save": "Save",
    "action.add": "Add",
    
    "time.24h": "24-hour",
    "time.12h": "12-hour",
    "time.day": "Day",
    "time.week": "Week", 
    "time.month": "Month",
    
    // Days
    "day.mon": "Mon",
    "day.tue": "Tue",
    "day.wed": "Wed", 
    "day.thu": "Thu",
    "day.fri": "Fri",
    "day.sat": "Sat",
    "day.sun": "Sun",
    
    // Months
    "month.jan": "Jan",
    "month.feb": "Feb",
    "month.mar": "Mar",
    "month.apr": "Apr",
    "month.may": "May",
    "month.jun": "Jun",
    "month.jul": "Jul",
    "month.aug": "Aug",
    "month.sep": "Sep",
    "month.oct": "Oct",
    "month.nov": "Nov",
    "month.dec": "Dec",
    
    // Chart translations
    "chart.active_clients": "Active Clients",
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
    "dashboard.revenue": "Revenue",
    "dashboard.revenueDesc": "Revenue analysis for",
    "dashboard.clientRetentionTitle": "Client Retention",
    "dashboard.clientRetentionDesc": "Retention rate for",
    "dashboard.clientHealth": "Client Health",
    "dashboard.clientStatus": "Current client status distribution",
    "dashboard.upcomingSessions": "Upcoming Sessions",
    "dashboard.todayAppointments": "Today's coaching appointments",
    "dashboard.welcomeTitle": "Welcome to Coachlytic",
    "dashboard.welcomeSubtitle": "Your coaching analytics dashboard",
    
    // Client Health
    "clientHealth.highPerformers": "High Performers",
    "clientHealth.onTrack": "On Track",
    "clientHealth.needsAttention": "Needs Attention",
    "clientHealth.atRisk": "At Risk",
    
    // Session Types
    "sessionType.career": "Career Coaching",
    "sessionType.business": "Business Strategy",
    "sessionType.life": "Life Coaching",
    "sessionType.executive": "Executive Coaching",
    
    // Client
    "client.directory": "Client Directory",
    "client.manage": "Manage and track your coaching clients",
    "client.add": "Add Client",
    "client.filter": "Filter",
    
    // Programs
    "programs.title": "Coaching Programs",
    "programs.subtitle": "Manage your coaching packages and programs",
    "programs.create": "Create Program",
    "programs.new": "Create New Program",
    "programs.edit": "Edit",
    "programs.delete": "Delete",
    "programs.name": "Program Name",
    "programs.description": "Description",
    "programs.sessions": "Sessions",
    "programs.duration": "Duration",
    "programs.price": "Price",
    
    // Sessions
    "sessions.title": "Session Management",
    "sessions.subtitle": "Schedule and manage your coaching sessions",
    "sessions.calendar": "Calendar",
    "sessions.list": "List",
    "sessions.add": "Add Session",
    "sessions.new": "Schedule New Session",
    "sessions.createDesc": "Create a new coaching session with a client",
    
    // Documents
    "documents.title": "Document Management",
    "documents.subtitle": "Upload, manage, and share coaching documents",
    "documents.upload": "Upload Document",
    "documents.uploadDesc": "Upload coaching materials, client resources, or other documents",
    "documents.library": "Document Library",
    "documents.access": "Access and manage your uploaded documents",
    
    // Profile
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your account information",
    "profile.personal": "Personal Information",
    "profile.update": "Update your personal details",
    "profile.firstName": "First name",
    "profile.lastName": "Last name",
    "profile.email": "Email address",
    "profile.company": "Company name",
    "profile.phone": "Phone number",
    "profile.save": "Save Changes",
    "profile.changePhoto": "Change Photo"
  },
  tr: {
    "app.name": "Coachlytic",
    "app.dashboard": "Panel",
    "app.clients": "Müşteriler",
    "app.sessions": "Oturumlar",
    "app.programs": "Programlar",
    "app.analytics": "Analitik",
    "app.billing": "Faturalama",
    "app.documents": "Dökümanlar",
    "app.profile": "Profil",
    "app.settings": "Ayarlar",
    "app.language": "Dil",
    "app.logout": "Çıkış Yap",
    "auth.signin": "Giriş Yap",
    "auth.signup": "Kayıt Ol",
    "auth.email": "E-posta",
    "auth.password": "Şifre",
    "auth.name": "Ad",
    "form.submit": "Gönder",
    "form.cancel": "İptal",
    "common.search": "Ara",
    "action.edit": "Düzenle",
    "action.delete": "Sil",
    "action.save": "Kaydet",
    "action.add": "Ekle",
    
    "time.24h": "24 saat",
    "time.12h": "12 saat",
    "time.day": "Gün",
    "time.week": "Hafta",
    "time.month": "Ay",
    
    // Days
    "day.mon": "Pzt",
    "day.tue": "Sal",
    "day.wed": "Çar", 
    "day.thu": "Per",
    "day.fri": "Cum",
    "day.sat": "Cmt",
    "day.sun": "Paz",
    
    // Months
    "month.jan": "Oca",
    "month.feb": "Şub",
    "month.mar": "Mar",
    "month.apr": "Nis",
    "month.may": "May",
    "month.jun": "Haz",
    "month.jul": "Tem",
    "month.aug": "Ağu",
    "month.sep": "Eyl",
    "month.oct": "Eki",
    "month.nov": "Kas",
    "month.dec": "Ara",
    
    // Chart translations
    "chart.active_clients": "Aktif Müşteriler",
    "chart.completed": "Tamamlanmış",
    "chart.inactive": "Pasif",
    "chart.at-risk": "Risk Altında",
    "chart.revenue": "Gelir",
    "chart.sessions": "Oturumlar",
    
    // Dashboard translations
    "dashboard.totalRevenue": "Toplam Gelir",
    "dashboard.newClients": "Yeni Müşteriler",
    "dashboard.clientRetention": "Müşteri Bağlılığı",
    "dashboard.avgSessionTime": "Ort. Oturum Süresi",
    "dashboard.revenue": "Gelir",
    "dashboard.revenueDesc": "Gelir analizi:",
    "dashboard.clientRetentionTitle": "Müşteri Bağlılığı",
    "dashboard.clientRetentionDesc": "Bağlılık oranı:",
    "dashboard.clientHealth": "Müşteri Sağlığı",
    "dashboard.clientStatus": "Güncel müşteri durumu dağılımı",
    "dashboard.upcomingSessions": "Yaklaşan Oturumlar",
    "dashboard.todayAppointments": "Bugünkü koçluk randevuları",
    "dashboard.welcomeTitle": "Coachlytic'e Hoş Geldiniz",
    "dashboard.welcomeSubtitle": "Koçluk analitik paneliniz",
    
    // Client Health
    "clientHealth.highPerformers": "Yüksek Performanslılar",
    "clientHealth.onTrack": "Yolunda Gidenler",
    "clientHealth.needsAttention": "İlgi Gerektirenler",
    "clientHealth.atRisk": "Risk Altındakiler",
    
    // Session Types
    "sessionType.career": "Kariyer Koçluğu",
    "sessionType.business": "İş Stratejisi",
    "sessionType.life": "Yaşam Koçluğu",
    "sessionType.executive": "Yönetici Koçluğu",
    
    // Client
    "client.directory": "Müşteri Rehberi",
    "client.manage": "Koçluk müşterilerinizi yönetin ve takip edin",
    "client.add": "Müşteri Ekle",
    "client.filter": "Filtrele",
    
    // Programs
    "programs.title": "Koçluk Programları",
    "programs.subtitle": "Koçluk paketlerinizi ve programlarınızı yönetin",
    "programs.create": "Program Oluştur",
    "programs.new": "Yeni Program Oluştur",
    "programs.edit": "Düzenle",
    "programs.delete": "Sil",
    "programs.name": "Program Adı",
    "programs.description": "Açıklama",
    "programs.sessions": "Oturumlar",
    "programs.duration": "Süre",
    "programs.price": "Fiyat",
    
    // Sessions
    "sessions.title": "Oturum Yönetimi",
    "sessions.subtitle": "Koçluk oturumlarınızı planlayın ve yönetin",
    "sessions.calendar": "Takvim",
    "sessions.list": "Liste",
    "sessions.add": "Oturum Ekle",
    "sessions.new": "Yeni Oturum Planla",
    "sessions.createDesc": "Bir müşteriyle yeni bir koçluk oturumu oluşturun",
    
    // Documents
    "documents.title": "Döküman Yönetimi",
    "documents.subtitle": "Koçluk dökümanlarını yükleyin, yönetin ve paylaşın",
    "documents.upload": "Döküman Yükle",
    "documents.uploadDesc": "Koçluk materyalleri, müşteri kaynakları veya diğer dökümanları yükleyin",
    "documents.library": "Döküman Kütüphanesi",
    "documents.access": "Yüklenen dökümanlarınıza erişin ve yönetin",
    
    // Profile
    "profile.title": "Profilim",
    "profile.subtitle": "Hesap bilgilerinizi yönetin",
    "profile.personal": "Kişisel Bilgiler",
    "profile.update": "Kişisel bilgilerinizi güncelleyin",
    "profile.firstName": "Ad",
    "profile.lastName": "Soyad",
    "profile.email": "E-posta adresi",
    "profile.company": "Şirket adı",
    "profile.phone": "Telefon numarası",
    "profile.save": "Değişiklikleri Kaydet",
    "profile.changePhoto": "Fotoğrafı Değiştir"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");

  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
