
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

type Language = 'en' | 'tr';

interface Translations {
  [language: string]: {
    [key: string]: string;
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
      
      // Dashboard translations
      "dashboard.welcomeTitle": "Welcome to your Dashboard",
      "dashboard.welcomeSubtitle": "Here's an overview of your coaching business",
      "time.day": "Day",
      "time.week": "Week",
      "time.month": "Month",
      "clientHealth.highPerformers": "High Performers",
      "clientHealth.onTrack": "On Track",
      "clientHealth.needsAttention": "Needs Attention",
      "clientHealth.atRisk": "At Risk",
      
      // Client translations
      "client.directory": "Client Directory",
      "client.manage": "Manage your coaching clients",
      "client.filter": "Filter",
      "client.add": "Add Client",
      "client.firstName": "First Name",
      "client.firstNamePlaceholder": "Enter first name",
      "client.lastName": "Last Name",
      "client.lastNamePlaceholder": "Enter last name",
      "client.email": "Email Address",
      "client.emailPlaceholder": "client@example.com",
      "client.phone": "Phone Number",
      "client.phonePlaceholder": "Enter phone number",
      "client.notes": "Notes",
      "client.notesPlaceholder": "Add client notes here...",
      "client.save": "Save Client",
      "client.cancel": "Cancel",
      
      // Program translations
      "programs.title": "Programs",
      "programs.subtitle": "Create and manage your coaching programs",
      "programs.create": "Create Program",
      "programs.new": "New Program",
      "programs.name": "Program Name",
      "programs.namePlaceholder": "Enter program name",
      "programs.description": "Description",
      "programs.descriptionPlaceholder": "Enter program description",
      "programs.duration": "Duration (Weeks)",
      "programs.price": "Price",
      "programs.pricePlaceholder": "$0.00",
      "programs.save": "Save Program",
      "programs.cancel": "Cancel",
      "programs.status": "Status",
      "programs.category": "Category",
      "programs.categoryPlaceholder": "Select category",
      
      // Session translations
      "sessions.title": "Sessions",
      "sessions.subtitle": "Schedule and manage your coaching sessions",
      "sessions.calendar": "Calendar",
      "sessions.list": "List",
      "sessions.add": "Add Session",
      "sessions.new": "New Session",
      "sessions.createDesc": "Schedule a new coaching session",
      "sessions.client": "Client",
      "sessions.clientPlaceholder": "Select client",
      "sessions.date": "Date",
      "sessions.time": "Time",
      "sessions.duration": "Duration",
      "sessions.durationUnit": "minutes",
      "sessions.type": "Session Type",
      "sessions.typePlaceholder": "Select type",
      "sessions.location": "Location",
      "sessions.locationPlaceholder": "Enter location",
      "sessions.notes": "Session Notes",
      "sessions.notesPlaceholder": "Add session notes here...",
      "sessions.schedule": "Schedule Session",
      "sessions.cancel": "Cancel",
      
      // Document translations
      "documents.title": "Documents",
      "documents.subtitle": "Manage your coaching resources and materials",
      "documents.upload": "Document Upload",
      "documents.uploadDesc": "Upload coaching materials and resources for your clients",
      "documents.library": "Document Library",
      "documents.access": "Access and share your coaching documents",
      "documents.dragDrop": "Drag and drop files here, or click to select",
      "documents.uploadButton": "Upload Document",
      "documents.searchPlaceholder": "Search documents...",
      
      // Settings translations
      "settings.title": "Settings",
      "settings.subtitle": "Manage your account and application preferences",
      "settings.tabs.notifications": "Notifications",
      "settings.tabs.preferences": "Preferences",
      "settings.tabs.integrations": "Integrations",
      "settings.tabs.security": "Security",
      "settings.notifications.title": "Notification Preferences",
      "settings.notifications.description": "Manage how and when you receive notifications",
      "settings.notifications.email": "Email Notifications",
      "settings.notifications.emailDesc": "Receive notifications via email",
      "settings.notifications.reminders": "Session Reminders",
      "settings.notifications.remindersDesc": "Get reminded about upcoming sessions",
      "settings.notifications.marketing": "Marketing Communications",
      "settings.notifications.marketingDesc": "Receive updates about new features and offers",
      "settings.preferences.title": "System Preferences",
      "settings.preferences.description": "Customize your application experience",
      "settings.preferences.timezone": "Time Zone",
      "settings.preferences.reminderTime": "Session Reminder Time",
      "settings.preferences.darkMode": "Dark Mode",
      "settings.preferences.darkModeDesc": "Use dark theme for the application",
      "settings.integrations.title": "Service Integrations",
      "settings.integrations.description": "Connect to third-party services",
      "settings.integrations.connect": "Connect {integration} to your account",
      "settings.integrations.connectButton": "Connect",
      "settings.security.title": "Security Settings",
      "settings.security.description": "Manage your account security preferences",
      "settings.security.changePassword": "Change Password",
      "settings.security.changePasswordDesc": "Update your account password",
      "settings.security.2fa": "Two-Factor Authentication",
      "settings.security.2faDesc": "Add an extra layer of security to your account",
      "settings.security.sessions": "Active Sessions",
      "settings.security.sessionsDesc": "Manage your active login sessions",
      "settings.security.currentDevice": "Current Device",
      "settings.security.lastActive": "Last active: {time}",
      "settings.security.signOut": "Sign Out All Devices",
      "settings.saveChanges": "Save Changes",
      
      // Profile translations
      "profile.title": "Profile",
      "profile.subtitle": "Manage your personal information",
      "profile.personal": "Personal Information",
      "profile.update": "Update your personal details",
      "profile.firstName": "First Name",
      "profile.lastName": "Last Name",
      "profile.email": "Email Address",
      "profile.company": "Company",
      "profile.phone": "Phone Number",
      "profile.changePhoto": "Change Photo",
      "profile.save": "Save Changes",
      
      // Analytics translations
      "analytics.title": "Analytics",
      "analytics.subtitle": "View insights and metrics for your coaching business",
      "analytics.day": "Day",
      "analytics.week": "Week",
      "analytics.month": "Month",
      "analytics.revenue": "Revenue",
      "analytics.clients": "Clients",
      "analytics.sessions": "Sessions",
      "analytics.retention": "Client Retention",
      
      // Billing translations
      "billing.title": "Billing",
      "billing.subtitle": "Manage invoices and payment information",
      "billing.createInvoice": "Create Invoice",
      "billing.newInvoice": "New Invoice",
      "billing.client": "Client",
      "billing.clientPlaceholder": "Select client",
      "billing.invoiceDate": "Invoice Date",
      "billing.dueDate": "Due Date",
      "billing.amount": "Amount",
      "billing.amountPlaceholder": "$0.00",
      "billing.description": "Description",
      "billing.descriptionPlaceholder": "Enter invoice description",
      "billing.items": "Invoice Items",
      "billing.addItem": "Add Item",
      "billing.itemName": "Item Name",
      "billing.itemDescription": "Description",
      "billing.quantity": "Quantity",
      "billing.price": "Price",
      "billing.subtotal": "Subtotal",
      "billing.tax": "Tax",
      "billing.taxRate": "Tax Rate",
      "billing.total": "Total",
      "billing.notes": "Notes",
      "billing.notesPlaceholder": "Add invoice notes here...",
      "billing.save": "Save Invoice",
      "billing.cancel": "Cancel",
      "billing.status": "Status",
      "billing.paid": "Paid",
      "billing.unpaid": "Unpaid",
      
      // Landing page translations
      "landing.hero.badge": "Coach Management Platform",
      "landing.hero.title.part1": "Elevate Your Coaching Practice",
      "landing.hero.title.part2": "with Smart Tools",
      "landing.hero.description": "Streamline client management, schedule sessions easily, create personalized programs, and grow your coaching business with our all-in-one platform.",
      "landing.hero.button.primary": "Get Started",
      "landing.hero.button.secondary": "Learn More",
      "landing.hero.feature1": "No credit card required",
      "landing.hero.feature2": "Free 14-day trial",
      "landing.features.title": "Features",
      "landing.features.heading": "Everything you need to manage your coaching business",
      "landing.features.subheading": "Designed specifically for coaches to help them deliver exceptional service to their clients.",
      "landing.features.clientManagement.title": "Client Management",
      "landing.features.clientManagement.description": "Organize client information, track progress, and maintain detailed notes for personalized coaching.",
      "landing.features.scheduling.title": "Smart Scheduling",
      "landing.features.scheduling.description": "Easily book sessions, send automatic reminders, and manage your calendar in one place.",
      "landing.features.program.title": "Program Builder",
      "landing.features.program.description": "Create customized coaching programs with structured modules, resources, and tracking.",
      "landing.features.analytics.title": "Business Analytics",
      "landing.features.analytics.description": "Gain insights into your coaching practice with revenue tracking and client retention metrics.",
      "landing.testimonials.badge": "Success Stories",
      "landing.testimonials.heading": "Trusted by coaches worldwide",
      "landing.testimonials.person1.name": "Alexandra Johnson",
      "landing.testimonials.person1.role": "Life Coach",
      "landing.testimonials.person1.quote": "Since using Coachlytic, I've doubled my client base while spending less time on admin tasks. The platform has transformed my business.",
      "landing.testimonials.person2.name": "Samuel Liu",
      "landing.testimonials.person2.role": "Business Coach",
      "landing.testimonials.person2.quote": "The program builder feature helps me create structured journeys for my clients. It's made a massive difference in client outcomes and satisfaction.",
      "landing.testimonials.person3.name": "Maria Torres",
      "landing.testimonials.person3.role": "Health Coach",
      "landing.testimonials.person3.quote": "The client tracking and analytics features help me deliver more personalized coaching services. My clients love the professional experience.",
      "landing.cta.heading": "Ready to grow your coaching business?",
      "landing.cta.subheading": "Join thousands of coaches who are scaling their practice with our powerful platform.",
      "landing.cta.button": "Start your journey",
      "landing.footer.slogan": "Empowering coaches worldwide",
      "landing.footer.product": "Product",
      "landing.footer.features": "Features",
      "landing.footer.pricing": "Pricing",
      "landing.footer.support": "Support",
      "landing.footer.helpCenter": "Help Center",
      "landing.footer.contact": "Contact Us",
      "landing.footer.legal": "Legal",
      "landing.footer.privacy": "Privacy Policy",
      "landing.footer.terms": "Terms of Service",
      "landing.footer.copyright": "© 2025 Coachlytic. All rights reserved."
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
      
      // Dashboard translations
      "dashboard.welcomeTitle": "Gösterge Panelinize Hoş Geldiniz",
      "dashboard.welcomeSubtitle": "Koçluk işletmenize genel bir bakış",
      "time.day": "Gün",
      "time.week": "Hafta",
      "time.month": "Ay",
      "clientHealth.highPerformers": "Yüksek Performans Gösterenler",
      "clientHealth.onTrack": "Yolunda Gidenler",
      "clientHealth.needsAttention": "İlgi Gerektiren",
      "clientHealth.atRisk": "Risk Altında",
      
      // Client translations
      "client.directory": "Müşteri Rehberi",
      "client.manage": "Koçluk müşterilerinizi yönetin",
      "client.filter": "Filtrele",
      "client.add": "Müşteri Ekle",
      "client.firstName": "Ad",
      "client.firstNamePlaceholder": "Ad girin",
      "client.lastName": "Soyad",
      "client.lastNamePlaceholder": "Soyad girin",
      "client.email": "E-posta Adresi",
      "client.emailPlaceholder": "musteri@ornek.com",
      "client.phone": "Telefon Numarası",
      "client.phonePlaceholder": "Telefon numarası girin",
      "client.notes": "Notlar",
      "client.notesPlaceholder": "Müşteri notlarını buraya ekleyin...",
      "client.save": "Müşteriyi Kaydet",
      "client.cancel": "İptal",
      
      // Program translations
      "programs.title": "Programlar",
      "programs.subtitle": "Koçluk programlarınızı oluşturun ve yönetin",
      "programs.create": "Program Oluştur",
      "programs.new": "Yeni Program",
      "programs.name": "Program Adı",
      "programs.namePlaceholder": "Program adı girin",
      "programs.description": "Açıklama",
      "programs.descriptionPlaceholder": "Program açıklaması girin",
      "programs.duration": "Süre (Hafta)",
      "programs.price": "Fiyat",
      "programs.pricePlaceholder": "₺0,00",
      "programs.save": "Programı Kaydet",
      "programs.cancel": "İptal",
      "programs.status": "Durum",
      "programs.category": "Kategori",
      "programs.categoryPlaceholder": "Kategori seçin",
      
      // Session translations
      "sessions.title": "Oturumlar",
      "sessions.subtitle": "Koçluk oturumlarınızı planlayın ve yönetin",
      "sessions.calendar": "Takvim",
      "sessions.list": "Liste",
      "sessions.add": "Oturum Ekle",
      "sessions.new": "Yeni Oturum",
      "sessions.createDesc": "Yeni bir koçluk oturumu planlayın",
      "sessions.client": "Müşteri",
      "sessions.clientPlaceholder": "Müşteri seçin",
      "sessions.date": "Tarih",
      "sessions.time": "Saat",
      "sessions.duration": "Süre",
      "sessions.durationUnit": "dakika",
      "sessions.type": "Oturum Türü",
      "sessions.typePlaceholder": "Tür seçin",
      "sessions.location": "Konum",
      "sessions.locationPlaceholder": "Konum girin",
      "sessions.notes": "Oturum Notları",
      "sessions.notesPlaceholder": "Oturum notlarını buraya ekleyin...",
      "sessions.schedule": "Oturumu Planla",
      "sessions.cancel": "İptal",
      
      // Document translations
      "documents.title": "Belgeler",
      "documents.subtitle": "Koçluk kaynaklarınızı ve materyallerinizi yönetin",
      "documents.upload": "Belge Yükleme",
      "documents.uploadDesc": "Müşterileriniz için koçluk materyalleri ve kaynakları yükleyin",
      "documents.library": "Belge Kütüphanesi",
      "documents.access": "Koçluk belgelerinize erişin ve paylaşın",
      "documents.dragDrop": "Dosyaları buraya sürükleyip bırakın veya seçmek için tıklayın",
      "documents.uploadButton": "Belge Yükle",
      "documents.searchPlaceholder": "Belgeleri ara...",
      
      // Settings translations
      "settings.title": "Ayarlar",
      "settings.subtitle": "Hesabınızı ve uygulama tercihlerinizi yönetin",
      "settings.tabs.notifications": "Bildirimler",
      "settings.tabs.preferences": "Tercihler",
      "settings.tabs.integrations": "Entegrasyonlar",
      "settings.tabs.security": "Güvenlik",
      "settings.notifications.title": "Bildirim Tercihleri",
      "settings.notifications.description": "Bildirimleri nasıl ve ne zaman alacağınızı yönetin",
      "settings.notifications.email": "E-posta Bildirimleri",
      "settings.notifications.emailDesc": "Bildirimleri e-posta yoluyla alın",
      "settings.notifications.reminders": "Oturum Hatırlatıcıları",
      "settings.notifications.remindersDesc": "Yaklaşan oturumlar hakkında hatırlatıcılar alın",
      "settings.notifications.marketing": "Pazarlama İletişimleri",
      "settings.notifications.marketingDesc": "Yeni özellikler ve teklifler hakkında güncellemeler alın",
      "settings.preferences.title": "Sistem Tercihleri",
      "settings.preferences.description": "Uygulama deneyiminizi özelleştirin",
      "settings.preferences.timezone": "Saat Dilimi",
      "settings.preferences.reminderTime": "Oturum Hatırlatıcı Zamanı",
      "settings.preferences.darkMode": "Karanlık Mod",
      "settings.preferences.darkModeDesc": "Uygulama için karanlık tema kullanın",
      "settings.integrations.title": "Hizmet Entegrasyonları",
      "settings.integrations.description": "Üçüncü taraf hizmetlere bağlanın",
      "settings.integrations.connect": "{integration} hesabınıza bağlayın",
      "settings.integrations.connectButton": "Bağlan",
      "settings.security.title": "Güvenlik Ayarları",
      "settings.security.description": "Hesap güvenlik tercihlerinizi yönetin",
      "settings.security.changePassword": "Şifre Değiştir",
      "settings.security.changePasswordDesc": "Hesap şifrenizi güncelleyin",
      "settings.security.2fa": "İki Faktörlü Kimlik Doğrulama",
      "settings.security.2faDesc": "Hesabınıza ekstra bir güvenlik katmanı ekleyin",
      "settings.security.sessions": "Aktif Oturumlar",
      "settings.security.sessionsDesc": "Aktif giriş oturumlarınızı yönetin",
      "settings.security.currentDevice": "Mevcut Cihaz",
      "settings.security.lastActive": "Son aktif: {time}",
      "settings.security.signOut": "Tüm Cihazlardan Çıkış Yap",
      "settings.saveChanges": "Değişiklikleri Kaydet",
      
      // Profile translations
      "profile.title": "Profil",
      "profile.subtitle": "Kişisel bilgilerinizi yönetin",
      "profile.personal": "Kişisel Bilgiler",
      "profile.update": "Kişisel bilgilerinizi güncelleyin",
      "profile.firstName": "Ad",
      "profile.lastName": "Soyad",
      "profile.email": "E-posta Adresi",
      "profile.company": "Şirket",
      "profile.phone": "Telefon Numarası",
      "profile.changePhoto": "Fotoğrafı Değiştir",
      "profile.save": "Değişiklikleri Kaydet",
      
      // Analytics translations
      "analytics.title": "Analitikler",
      "analytics.subtitle": "Koçluk işletmenize ait içgörüleri ve metrikleri görüntüleyin",
      "analytics.day": "Gün",
      "analytics.week": "Hafta",
      "analytics.month": "Ay",
      "analytics.revenue": "Gelir",
      "analytics.clients": "Müşteriler",
      "analytics.sessions": "Oturumlar",
      "analytics.retention": "Müşteri Sadakati",
      
      // Billing translations
      "billing.title": "Faturalama",
      "billing.subtitle": "Faturaları ve ödeme bilgilerini yönetin",
      "billing.createInvoice": "Fatura Oluştur",
      "billing.newInvoice": "Yeni Fatura",
      "billing.client": "Müşteri",
      "billing.clientPlaceholder": "Müşteri seçin",
      "billing.invoiceDate": "Fatura Tarihi",
      "billing.dueDate": "Son Ödeme Tarihi",
      "billing.amount": "Tutar",
      "billing.amountPlaceholder": "₺0,00",
      "billing.description": "Açıklama",
      "billing.descriptionPlaceholder": "Fatura açıklaması girin",
      "billing.items": "Fatura Kalemleri",
      "billing.addItem": "Kalem Ekle",
      "billing.itemName": "Kalem Adı",
      "billing.itemDescription": "Açıklama",
      "billing.quantity": "Miktar",
      "billing.price": "Fiyat",
      "billing.subtotal": "Ara Toplam",
      "billing.tax": "Vergi",
      "billing.taxRate": "Vergi Oranı",
      "billing.total": "Toplam",
      "billing.notes": "Notlar",
      "billing.notesPlaceholder": "Fatura notlarını buraya ekleyin...",
      "billing.save": "Faturayı Kaydet",
      "billing.cancel": "İptal",
      "billing.status": "Durum",
      "billing.paid": "Ödendi",
      "billing.unpaid": "Ödenmedi",
      
      // Landing page translations
      "landing.hero.badge": "Koç Yönetim Platformu",
      "landing.hero.title.part1": "Koçluk Uygulamanızı",
      "landing.hero.title.part2": "Akıllı Araçlarla Yükseltin",
      "landing.hero.description": "Müşteri yönetimini kolaylaştırın, oturumları kolayca planlayın, kişiselleştirilmiş programlar oluşturun ve koçluk işletmenizi hepsi bir arada platformumuzla büyütün.",
      "landing.hero.button.primary": "Başlayın",
      "landing.hero.button.secondary": "Daha Fazla Bilgi",
      "landing.hero.feature1": "Kredi kartı gerekmiyor",
      "landing.hero.feature2": "14 gün ücretsiz deneme",
      "landing.features.title": "Özellikler",
      "landing.features.heading": "Koçluk işletmenizi yönetmek için ihtiyacınız olan her şey",
      "landing.features.subheading": "Özellikle koçların müşterilerine olağanüstü hizmet sunmalarına yardımcı olmak için tasarlanmıştır.",
      "landing.features.clientManagement.title": "Müşteri Yönetimi",
      "landing.features.clientManagement.description": "Müşteri bilgilerini düzenleyin, ilerlemeyi takip edin ve kişiselleştirilmiş koçluk için detaylı notlar tutun.",
      "landing.features.scheduling.title": "Akıllı Planlama",
      "landing.features.scheduling.description": "Kolayca oturum ayarlayın, otomatik hatırlatıcılar gönderin ve takviminizi tek bir yerden yönetin.",
      "landing.features.program.title": "Program Oluşturucu",
      "landing.features.program.description": "Yapılandırılmış modüller, kaynaklar ve takip ile özelleştirilmiş koçluk programları oluşturun.",
      "landing.features.analytics.title": "İşletme Analitiği",
      "landing.features.analytics.description": "Gelir izleme ve müşteri sadakati metrikleri ile koçluk uygulamanız hakkında içgörüler elde edin.",
      "landing.testimonials.badge": "Başarı Hikayeleri",
      "landing.testimonials.heading": "Dünya çapında koçlar tarafından güvenilir",
      "landing.testimonials.person1.name": "Ayşe Yılmaz",
      "landing.testimonials.person1.role": "Yaşam Koçu",
      "landing.testimonials.person1.quote": "Coachlytic'i kullanmaya başladıktan sonra, idari görevlere daha az zaman harcayarak müşteri tabanımı ikiye katladım. Platform işletmemi dönüştürdü.",
      "landing.testimonials.person2.name": "Mehmet Kaya",
      "landing.testimonials.person2.role": "İş Koçu",
      "landing.testimonials.person2.quote": "Program oluşturucular özelliği, müşterilerim için yapılandırılmış yolculuklar oluşturmama yardımcı oluyor. Müşteri sonuçları ve memnuniyeti konusunda büyük bir fark yarattı.",
      "landing.testimonials.person3.name": "Zeynep Demir",
      "landing.testimonials.person3.role": "Sağlık Koçu",
      "landing.testimonials.person3.quote": "Müşteri izleme ve analitik özellikleri, daha kişiselleştirilmiş koçluk hizmetleri sunmama yardımcı oluyor. Müşterilerim profesyonel deneyimi seviyorlar.",
      "landing.cta.heading": "Koçluk işletmenizi büyütmeye hazır mısınız?",
      "landing.cta.subheading": "Güçlü platformumuzla uygulamalarını ölçeklendiren binlerce koça katılın.",
      "landing.cta.button": "Yolculuğunuza başlayın",
      "landing.footer.slogan": "Dünya çapında koçları güçlendiriyoruz",
      "landing.footer.product": "Ürün",
      "landing.footer.features": "Özellikler",
      "landing.footer.pricing": "Fiyatlandırma",
      "landing.footer.support": "Destek",
      "landing.footer.helpCenter": "Yardım Merkezi",
      "landing.footer.contact": "Bize Ulaşın",
      "landing.footer.legal": "Yasal",
      "landing.footer.privacy": "Gizlilik Politikası",
      "landing.footer.terms": "Kullanım Koşulları",
      "landing.footer.copyright": "© 2025 Coachlytic. Tüm hakları saklıdır."
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
    // Fix here: Check if the key exists in translations and return it, otherwise return the key itself
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
