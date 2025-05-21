
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

type Language = 'en' | 'tr';

interface Translations {
  [language: string]: {
    [key: string]: string | object;
  }
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
    en: {
      // App general translations
      "app": {
        "name": "Coachlytic",
        "dashboard": "Dashboard",
        "clients": "Clients",
        "sessions": "Sessions",
        "programs": "Programs",
        "documents": "Documents",
        "analytics": "Analytics",
        "billing": "Billing",
        "settings": "Settings",
        "logout": "Logout",
        "language": "Language",
        "description": "Coach management platform"
      },
      "language": {
        "english": "English",
        "turkish": "Turkish"
      },
      
      // Auth translations
      "auth": {
        "welcome_back": "Welcome Back",
        "enter_credentials": "Enter your credentials to sign in",
        "email": "Email",
        "email_placeholder": "coach@example.com",
        "password": "Password",
        "forgot_password": "Forgot Password?",
        "sign_in": "Sign In",
        "signing_in": "Signing in...",
        "login": "Login",
        "signup": "Sign Up",
        "create_account": "Create Account",
        "enter_information": "Enter your information to create an account",
        "first_name": "First Name",
        "first_name_placeholder": "John",
        "last_name": "Last Name",
        "last_name_placeholder": "Doe",
        "confirm_password": "Confirm Password",
        "create_account_button": "Create Account",
        "creating_account": "Creating account...",
        "error": "Error",
        "fill_all_fields": "Please fill in all fields",
        "passwords_dont_match": "Passwords don't match",
        "password_length": "Password must be at least 6 characters"
      },
      
      // Dashboard translations
      "dashboard": {
        "welcomeTitle": "Welcome to your Dashboard",
        "welcomeSubtitle": "Here's an overview of your coaching business"
      },
      "time": {
        "day": "Day",
        "week": "Week",
        "month": "Month"
      },
      "clientHealth": {
        "highPerformers": "High Performers",
        "onTrack": "On Track",
        "needsAttention": "Needs Attention",
        "atRisk": "At Risk"
      },
      
      // Client translations
      "client": {
        "directory": "Client Directory",
        "manage": "Manage your coaching clients",
        "filter": "Filter",
        "add": "Add Client",
        "firstName": "First Name",
        "firstNamePlaceholder": "Enter first name",
        "lastName": "Last Name",
        "lastNamePlaceholder": "Enter last name",
        "email": "Email Address",
        "emailPlaceholder": "client@example.com",
        "phone": "Phone Number",
        "phonePlaceholder": "Enter phone number",
        "notes": "Notes",
        "notesPlaceholder": "Add client notes here...",
        "save": "Save Client",
        "cancel": "Cancel"
      },
      
      // Program translations
      "programs": {
        "title": "Programs",
        "subtitle": "Create and manage your coaching programs",
        "create": "Create Program",
        "new": "New Program",
        "name": "Program Name",
        "namePlaceholder": "Enter program name",
        "description": "Description",
        "descriptionPlaceholder": "Enter program description",
        "duration": "Duration (Weeks)",
        "price": "Price",
        "pricePlaceholder": "$0.00",
        "save": "Save Program",
        "cancel": "Cancel",
        "status": "Status",
        "category": "Category",
        "categoryPlaceholder": "Select category",
        "sessions": "Sessions"
      },
      
      // Session translations
      "sessions": {
        "title": "Sessions",
        "subtitle": "Schedule and manage your coaching sessions",
        "calendar": "Calendar",
        "list": "List",
        "add": "Add Session",
        "new": "New Session",
        "createDesc": "Schedule a new coaching session",
        "client": "Client",
        "clientPlaceholder": "Select client",
        "date": "Date",
        "time": "Time",
        "duration": "Duration",
        "durationUnit": "minutes",
        "type": "Session Type",
        "typePlaceholder": "Select type",
        "location": "Location",
        "locationPlaceholder": "Enter location",
        "notes": "Session Notes",
        "notesPlaceholder": "Add session notes here...",
        "schedule": "Schedule Session",
        "cancel": "Cancel"
      },
      
      // Document translations
      "documents": {
        "title": "Documents",
        "subtitle": "Manage your coaching resources and materials",
        "upload": "Document Upload",
        "uploadDesc": "Upload coaching materials and resources for your clients",
        "library": "Document Library",
        "access": "Access and share your coaching documents",
        "dragDrop": "Drag and drop files here, or click to select",
        "uploadButton": "Upload Document",
        "searchPlaceholder": "Search documents..."
      },
      
      // Settings translations
      "settings": {
        "title": "Settings",
        "subtitle": "Manage your account and application preferences",
        "tabs": {
          "notifications": "Notifications",
          "preferences": "Preferences",
          "integrations": "Integrations",
          "security": "Security"
        },
        "notifications": {
          "title": "Notification Preferences",
          "description": "Manage how and when you receive notifications",
          "email": "Email Notifications",
          "emailDesc": "Receive notifications via email",
          "reminders": "Session Reminders",
          "remindersDesc": "Get reminded about upcoming sessions",
          "marketing": "Marketing Communications",
          "marketingDesc": "Receive updates about new features and offers"
        },
        "preferences": {
          "title": "System Preferences",
          "description": "Customize your application experience",
          "timezone": "Time Zone",
          "reminderTime": "Session Reminder Time",
          "darkMode": "Dark Mode",
          "darkModeDesc": "Use dark theme for the application"
        },
        "integrations": {
          "title": "Service Integrations",
          "description": "Connect to third-party services",
          "connect": "Connect {integration} to your account",
          "connectButton": "Connect"
        },
        "security": {
          "title": "Security Settings",
          "description": "Manage your account security preferences",
          "changePassword": "Change Password",
          "changePasswordDesc": "Update your account password",
          "2fa": "Two-Factor Authentication",
          "2faDesc": "Add an extra layer of security to your account",
          "sessions": "Active Sessions",
          "sessionsDesc": "Manage your active login sessions",
          "currentDevice": "Current Device",
          "lastActive": "Last active: {time}",
          "signOut": "Sign Out All Devices"
        },
        "saveChanges": "Save Changes"
      },
      
      // Profile translations
      "profile": {
        "title": "Profile",
        "subtitle": "Manage your personal information",
        "personal": "Personal Information",
        "update": "Update your personal details",
        "firstName": "First Name",
        "lastName": "Last Name",
        "email": "Email Address",
        "company": "Company",
        "phone": "Phone Number",
        "changePhoto": "Change Photo",
        "save": "Save Changes"
      },
      
      // Analytics translations
      "analytics": {
        "title": "Analytics",
        "subtitle": "View insights and metrics for your coaching business",
        "day": "Day",
        "week": "Week",
        "month": "Month",
        "revenue": "Revenue",
        "clients": "Clients",
        "sessions": "Sessions",
        "retention": "Client Retention"
      },
      
      // Billing translations
      "billing": {
        "title": "Billing",
        "subtitle": "Manage invoices and payment information",
        "createInvoice": "Create Invoice",
        "newInvoice": "New Invoice",
        "client": "Client",
        "clientPlaceholder": "Select client",
        "invoiceDate": "Invoice Date",
        "dueDate": "Due Date",
        "amount": "Amount",
        "amountPlaceholder": "$0.00",
        "description": "Description",
        "descriptionPlaceholder": "Enter invoice description",
        "items": "Invoice Items",
        "addItem": "Add Item",
        "itemName": "Item Name",
        "itemDescription": "Description",
        "quantity": "Quantity",
        "price": "Price",
        "subtotal": "Subtotal",
        "tax": "Tax",
        "taxRate": "Tax Rate",
        "total": "Total",
        "notes": "Notes",
        "notesPlaceholder": "Add invoice notes here...",
        "save": "Save Invoice",
        "cancel": "Cancel",
        "status": "Status",
        "paid": "Paid",
        "unpaid": "Unpaid"
      },
      
      // Action translations
      "action": {
        "add": "Add",
        "edit": "Edit",
        "delete": "Delete",
        "save": "Save",
        "cancel": "Cancel",
        "update": "Update",
        "create": "Create",
        "search": "Search",
        "filter": "Filter",
        "clear": "Clear",
        "apply": "Apply",
        "confirm": "Confirm",
        "back": "Back",
        "next": "Next",
        "previous": "Previous",
        "finish": "Finish",
        "continue": "Continue",
        "submit": "Submit",
        "loading": "Loading...",
        "processing": "Processing...",
        "saving": "Saving..."
      },
      
      // Validation translations
      "validation": {
        "required": "This field is required",
        "email": "Please enter a valid email address",
        "minLength": "Must be at least {length} characters",
        "maxLength": "Must be at most {length} characters",
        "passwordMatch": "Passwords must match",
        "validNumber": "Please enter a valid number",
        "positiveNumber": "Please enter a positive number",
        "date": "Please enter a valid date",
        "phone": "Please enter a valid phone number"
      },
      
      // Landing page translations
      "landing": {
        "hero": {
          "badge": "Coach Management Platform",
          "title": {
            "part1": "Elevate Your Coaching Practice",
            "part2": "with Smart Tools"
          },
          "description": "Streamline client management, schedule sessions easily, create personalized programs, and grow your coaching business with our all-in-one platform.",
          "button": {
            "primary": "Get Started",
            "secondary": "Learn More"
          },
          "feature1": "No credit card required",
          "feature2": "Free 14-day trial"
        },
        "features": {
          "title": "Features",
          "heading": "Everything you need to manage your coaching business",
          "subheading": "Designed specifically for coaches to help them deliver exceptional service to their clients.",
          "clientManagement": {
            "title": "Client Management",
            "description": "Organize client information, track progress, and maintain detailed notes for personalized coaching."
          },
          "scheduling": {
            "title": "Smart Scheduling",
            "description": "Easily book sessions, send automatic reminders, and manage your calendar in one place."
          },
          "program": {
            "title": "Program Builder",
            "description": "Create customized coaching programs with structured modules, resources, and tracking."
          },
          "analytics": {
            "title": "Business Analytics",
            "description": "Gain insights into your coaching practice with revenue tracking and client retention metrics."
          }
        },
        "testimonials": {
          "badge": "Success Stories",
          "heading": "Trusted by coaches worldwide",
          "person1": {
            "name": "Alexandra Johnson",
            "role": "Life Coach",
            "quote": "Since using Coachlytic, I've doubled my client base while spending less time on admin tasks. The platform has transformed my business."
          },
          "person2": {
            "name": "Samuel Liu",
            "role": "Business Coach",
            "quote": "The program builder feature helps me create structured journeys for my clients. It's made a massive difference in client outcomes and satisfaction."
          },
          "person3": {
            "name": "Maria Torres",
            "role": "Health Coach",
            "quote": "The client tracking and analytics features help me deliver more personalized coaching services. My clients love the professional experience."
          }
        },
        "cta": {
          "heading": "Ready to grow your coaching business?",
          "subheading": "Join thousands of coaches who are scaling their practice with our powerful platform.",
          "button": "Start your journey"
        },
        "footer": {
          "slogan": "Empowering coaches worldwide",
          "product": "Product",
          "features": "Features",
          "pricing": "Pricing",
          "support": "Support",
          "helpCenter": "Help Center",
          "contact": "Contact Us",
          "legal": "Legal",
          "privacy": "Privacy Policy",
          "terms": "Terms of Service",
          "copyright": "© 2025 Coachlytic. All rights reserved."
        }
      }
    },
    tr: {
      // App general translations
      "app": {
        "name": "Coachlytic",
        "dashboard": "Gösterge Paneli",
        "clients": "Müşteriler",
        "sessions": "Oturumlar",
        "programs": "Programlar",
        "documents": "Belgeler",
        "analytics": "Analiz",
        "billing": "Faturalama",
        "settings": "Ayarlar",
        "logout": "Çıkış Yap",
        "language": "Dil",
        "description": "Koç yönetim platformu"
      },
      "language": {
        "english": "İngilizce",
        "turkish": "Türkçe"
      },
      
      // Auth translations
      "auth": {
        "welcome_back": "Tekrar Hoşgeldiniz",
        "enter_credentials": "Giriş yapmak için bilgilerinizi girin",
        "email": "E-posta",
        "email_placeholder": "coach@example.com",
        "password": "Şifre",
        "forgot_password": "Şifremi Unuttum?",
        "sign_in": "Giriş Yap",
        "signing_in": "Giriş yapılıyor...",
        "login": "Giriş",
        "signup": "Kayıt Ol",
        "create_account": "Hesap Oluştur",
        "enter_information": "Hesap oluşturmak için bilgilerinizi girin",
        "first_name": "Ad",
        "first_name_placeholder": "Ahmet",
        "last_name": "Soyad",
        "last_name_placeholder": "Yılmaz",
        "confirm_password": "Şifreyi Onayla",
        "create_account_button": "Hesap Oluştur",
        "creating_account": "Hesap oluşturuluyor...",
        "error": "Hata",
        "fill_all_fields": "Lütfen tüm alanları doldurun",
        "passwords_dont_match": "Şifreler eşleşmiyor",
        "password_length": "Şifre en az 6 karakter olmalıdır"
      },
      
      // Dashboard translations
      "dashboard": {
        "welcomeTitle": "Gösterge Panelinize Hoş Geldiniz",
        "welcomeSubtitle": "Koçluk işletmenize genel bir bakış"
      },
      "time": {
        "day": "Gün",
        "week": "Hafta",
        "month": "Ay"
      },
      "clientHealth": {
        "highPerformers": "Yüksek Performans Gösterenler",
        "onTrack": "Yolunda Gidenler",
        "needsAttention": "İlgi Gerektiren",
        "atRisk": "Risk Altında"
      },
      
      // Client translations
      "client": {
        "directory": "Müşteri Rehberi",
        "manage": "Koçluk müşterilerinizi yönetin",
        "filter": "Filtrele",
        "add": "Müşteri Ekle",
        "firstName": "Ad",
        "firstNamePlaceholder": "Ad girin",
        "lastName": "Soyad",
        "lastNamePlaceholder": "Soyad girin",
        "email": "E-posta Adresi",
        "emailPlaceholder": "musteri@ornek.com",
        "phone": "Telefon Numarası",
        "phonePlaceholder": "Telefon numarası girin",
        "notes": "Notlar",
        "notesPlaceholder": "Müşteri notlarını buraya ekleyin...",
        "save": "Müşteriyi Kaydet",
        "cancel": "İptal"
      },
      
      // Program translations
      "programs": {
        "title": "Programlar",
        "subtitle": "Koçluk programlarınızı oluşturun ve yönetin",
        "create": "Program Oluştur",
        "new": "Yeni Program",
        "name": "Program Adı",
        "namePlaceholder": "Program adı girin",
        "description": "Açıklama",
        "descriptionPlaceholder": "Program açıklaması girin",
        "duration": "Süre (Hafta)",
        "price": "Fiyat",
        "pricePlaceholder": "₺0,00",
        "save": "Programı Kaydet",
        "cancel": "İptal",
        "status": "Durum",
        "category": "Kategori",
        "categoryPlaceholder": "Kategori seçin",
        "sessions": "Oturumlar"
      },
      
      // Session translations
      "sessions": {
        "title": "Oturumlar",
        "subtitle": "Koçluk oturumlarınızı planlayın ve yönetin",
        "calendar": "Takvim",
        "list": "Liste",
        "add": "Oturum Ekle",
        "new": "Yeni Oturum",
        "createDesc": "Yeni bir koçluk oturumu planlayın",
        "client": "Müşteri",
        "clientPlaceholder": "Müşteri seçin",
        "date": "Tarih",
        "time": "Saat",
        "duration": "Süre",
        "durationUnit": "dakika",
        "type": "Oturum Türü",
        "typePlaceholder": "Tür seçin",
        "location": "Konum",
        "locationPlaceholder": "Konum girin",
        "notes": "Oturum Notları",
        "notesPlaceholder": "Oturum notlarını buraya ekleyin...",
        "schedule": "Oturumu Planla",
        "cancel": "İptal"
      },
      
      // Document translations
      "documents": {
        "title": "Belgeler",
        "subtitle": "Koçluk kaynaklarınızı ve materyallerinizi yönetin",
        "upload": "Belge Yükleme",
        "uploadDesc": "Müşterileriniz için koçluk materyalleri ve kaynakları yükleyin",
        "library": "Belge Kütüphanesi",
        "access": "Koçluk belgelerinize erişin ve paylaşın",
        "dragDrop": "Dosyaları buraya sürükleyip bırakın veya seçmek için tıklayın",
        "uploadButton": "Belge Yükle",
        "searchPlaceholder": "Belgeleri ara..."
      },
      
      // Settings translations
      "settings": {
        "title": "Ayarlar",
        "subtitle": "Hesabınızı ve uygulama tercihlerinizi yönetin",
        "tabs": {
          "notifications": "Bildirimler",
          "preferences": "Tercihler",
          "integrations": "Entegrasyonlar",
          "security": "Güvenlik"
        },
        "notifications": {
          "title": "Bildirim Tercihleri",
          "description": "Bildirimleri nasıl ve ne zaman alacağınızı yönetin",
          "email": "E-posta Bildirimleri",
          "emailDesc": "Bildirimleri e-posta yoluyla alın",
          "reminders": "Oturum Hatırlatıcıları",
          "remindersDesc": "Yaklaşan oturumlar hakkında hatırlatıcılar alın",
          "marketing": "Pazarlama İletişimleri",
          "marketingDesc": "Yeni özellikler ve teklifler hakkında güncellemeler alın"
        },
        "preferences": {
          "title": "Sistem Tercihleri",
          "description": "Uygulama deneyiminizi özelleştirin",
          "timezone": "Saat Dilimi",
          "reminderTime": "Oturum Hatırlatıcı Zamanı",
          "darkMode": "Karanlık Mod",
          "darkModeDesc": "Uygulama için karanlık tema kullanın"
        },
        "integrations": {
          "title": "Hizmet Entegrasyonları",
          "description": "Üçüncü taraf hizmetlere bağlanın",
          "connect": "{integration} hesabınıza bağlayın",
          "connectButton": "Bağlan"
        },
        "security": {
          "title": "Güvenlik Ayarları",
          "description": "Hesap güvenlik tercihlerinizi yönetin",
          "changePassword": "Şifre Değiştir",
          "changePasswordDesc": "Hesap şifrenizi güncelleyin",
          "2fa": "İki Faktörlü Kimlik Doğrulama",
          "2faDesc": "Hesabınıza ekstra bir güvenlik katmanı ekleyin",
          "sessions": "Aktif Oturumlar",
          "sessionsDesc": "Aktif giriş oturumlarınızı yönetin",
          "currentDevice": "Mevcut Cihaz",
          "lastActive": "Son aktif: {time}",
          "signOut": "Tüm Cihazlardan Çıkış Yap"
        },
        "saveChanges": "Değişiklikleri Kaydet"
      },
      
      // Profile translations
      "profile": {
        "title": "Profil",
        "subtitle": "Kişisel bilgilerinizi yönetin",
        "personal": "Kişisel Bilgiler",
        "update": "Kişisel bilgilerinizi güncelleyin",
        "firstName": "Ad",
        "lastName": "Soyad",
        "email": "E-posta Adresi",
        "company": "Şirket",
        "phone": "Telefon Numarası",
        "changePhoto": "Fotoğrafı Değiştir",
        "save": "Değişiklikleri Kaydet"
      },
      
      // Analytics translations
      "analytics": {
        "title": "Analitikler",
        "subtitle": "Koçluk işletmenize ait içgörüleri ve metrikleri görüntüleyin",
        "day": "Gün",
        "week": "Hafta",
        "month": "Ay",
        "revenue": "Gelir",
        "clients": "Müşteriler",
        "sessions": "Oturumlar",
        "retention": "Müşteri Sadakati"
      },
      
      // Billing translations
      "billing": {
        "title": "Faturalama",
        "subtitle": "Faturaları ve ödeme bilgilerini yönetin",
        "createInvoice": "Fatura Oluştur",
        "newInvoice": "Yeni Fatura",
        "client": "Müşteri",
        "clientPlaceholder": "Müşteri seçin",
        "invoiceDate": "Fatura Tarihi",
        "dueDate": "Son Ödeme Tarihi",
        "amount": "Tutar",
        "amountPlaceholder": "₺0,00",
        "description": "Açıklama",
        "descriptionPlaceholder": "Fatura açıklaması girin",
        "items": "Fatura Kalemleri",
        "addItem": "Kalem Ekle",
        "itemName": "Kalem Adı",
        "itemDescription": "Açıklama",
        "quantity": "Miktar",
        "price": "Fiyat",
        "subtotal": "Ara Toplam",
        "tax": "Vergi",
        "taxRate": "Vergi Oranı",
        "total": "Toplam",
        "notes": "Notlar",
        "notesPlaceholder": "Fatura notlarını buraya ekleyin...",
        "save": "Faturayı Kaydet",
        "cancel": "İptal",
        "status": "Durum",
        "paid": "Ödendi",
        "unpaid": "Ödenmedi"
      },
      
      // Action translations
      "action": {
        "add": "Ekle",
        "edit": "Düzenle",
        "delete": "Sil",
        "save": "Kaydet",
        "cancel": "İptal",
        "update": "Güncelle",
        "create": "Oluştur",
        "search": "Ara",
        "filter": "Filtrele",
        "clear": "Temizle",
        "apply": "Uygula",
        "confirm": "Onayla",
        "back": "Geri",
        "next": "İleri",
        "previous": "Önceki",
        "finish": "Bitir",
        "continue": "Devam Et",
        "submit": "Gönder",
        "loading": "Yükleniyor...",
        "processing": "İşleniyor...",
        "saving": "Kaydediliyor..."
      },
      
      // Validation translations
      "validation": {
        "required": "Bu alan zorunludur",
        "email": "Lütfen geçerli bir e-posta adresi girin",
        "minLength": "En az {length} karakter olmalıdır",
        "maxLength": "En fazla {length} karakter olmalıdır",
        "passwordMatch": "Şifreler eşleşmelidir",
        "validNumber": "Lütfen geçerli bir sayı girin",
        "positiveNumber": "Lütfen pozitif bir sayı girin",
        "date": "Lütfen geçerli bir tarih girin",
        "phone": "Lütfen geçerli bir telefon numarası girin"
      },
      
      // Landing page translations
      "landing": {
        "hero": {
          "badge": "Koç Yönetim Platformu",
          "title": {
            "part1": "Koçluk Uygulamanızı",
            "part2": "Akıllı Araçlarla Yükseltin"
          },
          "description": "Müşteri yönetimini kolaylaştırın, oturumları kolayca planlayın, kişiselleştirilmiş programlar oluşturun ve koçluk işletmenizi hepsi bir arada platformumuzla büyütün.",
          "button": {
            "primary": "Başlayın",
            "secondary": "Daha Fazla Bilgi"
          },
          "feature1": "Kredi kartı gerekmiyor",
          "feature2": "14 gün ücretsiz deneme"
        },
        "features": {
          "title": "Özellikler",
          "heading": "Koçluk işletmenizi yönetmek için ihtiyacınız olan her şey",
          "subheading": "Özellikle koçların müşterilerine olağanüstü hizmet sunmalarına yardımcı olmak için tasarlanmıştır.",
          "clientManagement": {
            "title": "Müşteri Yönetimi",
            "description": "Müşteri bilgilerini düzenleyin, ilerlemeyi takip edin ve kişiselleştirilmiş koçluk için detaylı notlar tutun."
          },
          "scheduling": {
            "title": "Akıllı Planlama",
            "description": "Kolayca oturum ayarlayın, otomatik hatırlatıcılar gönderin ve takviminizi tek bir yerden yönetin."
          },
          "program": {
            "title": "Program Oluşturucu",
            "description": "Yapılandırılmış modüller, kaynaklar ve takip ile özelleştirilmiş koçluk programları oluşturun."
          },
          "analytics": {
            "title": "İşletme Analitiği",
            "description": "Gelir izleme ve müşteri sadakati metrikleri ile koçluk uygulamanız hakkında içgörüler elde edin."
          }
        },
        "testimonials": {
          "badge": "Başarı Hikayeleri",
          "heading": "Dünya çapında koçlar tarafından güvenilir",
          "person1": {
            "name": "Ayşe Yılmaz",
            "role": "Yaşam Koçu",
            "quote": "Coachlytic'i kullanmaya başladıktan sonra, idari görevlere daha az zaman harcayarak müşteri tabanımı ikiye katladım. Platform işletmemi dönüştürdü."
          },
          "person2": {
            "name": "Mehmet Kaya",
            "role": "İş Koçu",
            "quote": "Program oluşturucular özelliği, müşterilerim için yapılandırılmış yolculuklar oluşturmama yardımcı oluyor. Müşteri sonuçları ve memnuniyeti konusunda büyük bir fark yarattı."
          },
          "person3": {
            "name": "Zeynep Demir",
            "role": "Sağlık Koçu",
            "quote": "Müşteri izleme ve analitik özellikleri, daha kişiselleştirilmiş koçluk hizmetleri sunmama yardımcı oluyor. Müşterilerim profesyonel deneyimi seviyorlar."
          }
        },
        "cta": {
          "heading": "Koçluk işletmenizi büyütmeye hazır mısınız?",
          "subheading": "Güçlü platformumuzla uygulamalarını ölçeklendiren binlerce koça katılın.",
          "button": "Yolculuğunuza başlayın"
        },
        "footer": {
          "slogan": "Dünya çapında koçları güçlendiriyoruz",
          "product": "Ürün",
          "features": "Özellikler",
          "pricing": "Fiyatlandırma",
          "support": "Destek",
          "helpCenter": "Yardım Merkezi",
          "contact": "Bize Ulaşın",
          "legal": "Yasal",
          "privacy": "Gizlilik Politikası",
          "terms": "Kullanım Koşulları",
          "copyright": "© 2025 Coachlytic. Tüm hakları saklıdır."
        }
      }
    }
  };

  // Enhanced translation function that handles nested paths and provides better fallbacks
  const t = (key: string): string => {
    try {
      // Split the key by dots to handle nested translations
      const parts = key.split('.');
      let result: any = translations[language];
      
      // Navigate through the nested structure
      for (const part of parts) {
        if (!result || typeof result !== 'object') {
          console.warn(`Translation path broken at '${part}' for key '${key}'`);
          // Return the original key as fallback if we lost the path
          return key;
        }
        result = result[part];
      }
      
      // If we found a string, return it
      if (typeof result === 'string') {
        return result;
      }
      
      // If we found an object or undefined/null, return the original key
      console.warn(`No string found for key '${key}', got: ${typeof result}`);
      return key;
    } catch (error) {
      // Log the error and return the original key as fallback
      console.error(`Error getting translation for key '${key}':`, error);
      return key;
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
