
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
    "time.24h": "24-hour",
    "time.12h": "12-hour",
    "common.search": "Search",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.save": "Save",
    "action.add": "Add",
    "dashboard.clientHealth": "Client Health",
    "dashboard.clientStatus": "Current client status distribution",
    "dashboard.upcomingSessions": "Upcoming Sessions",
    "dashboard.todayAppointments": "Today's coaching appointments",
    "dashboard.welcomeTitle": "Welcome to Coachlytic",
    "dashboard.welcomeSubtitle": "Your coaching analytics dashboard",
    "client.directory": "Client Directory",
    "client.manage": "Manage and track your coaching clients",
    "client.add": "Add Client",
    "client.filter": "Filter",
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
    "sessions.title": "Session Management",
    "sessions.subtitle": "Schedule and manage your coaching sessions",
    "sessions.calendar": "Calendar",
    "sessions.list": "List",
    "sessions.add": "Add Session",
    "sessions.new": "Schedule New Session",
    "sessions.createDesc": "Create a new coaching session with a client",
    "documents.title": "Document Management",
    "documents.subtitle": "Upload, manage, and share coaching documents",
    "documents.upload": "Upload Document",
    "documents.uploadDesc": "Upload coaching materials, client resources, or other documents",
    "documents.library": "Document Library",
    "documents.access": "Access and manage your uploaded documents",
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
    "time.24h": "24 saat",
    "time.12h": "12 saat",
    "common.search": "Ara",
    "action.edit": "Düzenle",
    "action.delete": "Sil",
    "action.save": "Kaydet",
    "action.add": "Ekle",
    "dashboard.clientHealth": "Müşteri Sağlığı",
    "dashboard.clientStatus": "Güncel müşteri durumu dağılımı",
    "dashboard.upcomingSessions": "Yaklaşan Oturumlar",
    "dashboard.todayAppointments": "Bugünkü koçluk randevuları",
    "dashboard.welcomeTitle": "Coachlytic'e Hoş Geldiniz",
    "dashboard.welcomeSubtitle": "Koçluk analitik paneliniz",
    "client.directory": "Müşteri Rehberi",
    "client.manage": "Koçluk müşterilerinizi yönetin ve takip edin",
    "client.add": "Müşteri Ekle",
    "client.filter": "Filtrele",
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
    "sessions.title": "Oturum Yönetimi",
    "sessions.subtitle": "Koçluk oturumlarınızı planlayın ve yönetin",
    "sessions.calendar": "Takvim",
    "sessions.list": "Liste",
    "sessions.add": "Oturum Ekle",
    "sessions.new": "Yeni Oturum Planla",
    "sessions.createDesc": "Bir müşteriyle yeni bir koçluk oturumu oluşturun",
    "documents.title": "Döküman Yönetimi",
    "documents.subtitle": "Koçluk dökümanlarını yükleyin, yönetin ve paylaşın",
    "documents.upload": "Döküman Yükle",
    "documents.uploadDesc": "Koçluk materyalleri, müşteri kaynakları veya diğer dökümanları yükleyin",
    "documents.library": "Döküman Kütüphanesi",
    "documents.access": "Yüklenen dökümanlarınıza erişin ve yönetin",
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
