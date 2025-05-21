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
      "clients.name": "Name",
      "clients.email": "Email",
      "clients.phone": "Phone",
      "clients.program": "Program",
      "clients.notes": "Notes",
      "clients.namePlaceholder": "John Doe",
      "clients.emailPlaceholder": "client@example.com",
      "clients.phonePlaceholder": "+1 (555) 123-4567",
      "clients.selectProgram": "Select program",
      "clients.notesPlaceholder": "Add any relevant information about this client",
      "clients.success": "Success",
      "clients.clientAdded": "Client has been successfully added.",
      "clients.programs.career": "Career Development",
      "clients.programs.business": "Business Strategy",
      "clients.programs.life": "Life Coaching",
      "clients.programs.executive": "Executive Coaching",
      
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
      "programs.name": "Name",
      "programs.namePlaceholder": "Program name",
      "programs.description": "Description",
      "programs.descriptionPlaceholder": "Program description",
      "programs.sessions": "Sessions",
      "programs.duration": "Duration (weeks)",
      "programs.price": "Price",
      
      // Billing translations
      "billing.title": "Billing & Invoices",
      "billing.subtitle": "Manage invoices and payment information",
      "billing.createInvoice": "Create Invoice",
      "billing.newInvoice": "New Invoice",
      "billing.invoice": "Invoice",
      "billing.client": "Client",
      "billing.issueDate": "Issue Date",
      "billing.dueDate": "Due Date",
      "billing.amount": "Amount",
      "billing.status": "Status",
      "billing.status.paid": "Paid",
      "billing.status.pending": "Pending",
      "billing.status.overdue": "Overdue",
      "billing.viewInvoice": "View Invoice",
      "billing.downloadPDF": "Download PDF",
      "billing.markAsPaid": "Mark as Paid",
      "billing.sendReminder": "Send Reminder",
      "billing.selectClient": "Select a client",
      "billing.selectDueDate": "Select a due date",
      "billing.invoiceItems": "Invoice Items",
      "billing.addItem": "Add Item",
      "billing.description": "Description",
      "billing.serviceDescription": "Service description",
      "billing.quantity": "Qty",
      "billing.rate": "Rate ($)",
      "billing.subtotal": "Subtotal",
      "billing.tax": "Tax (10%)",
      "billing.total": "Total",
      "billing.notes": "Notes",
      "billing.invoiceNotes": "Additional notes for the invoice",
      "billing.success": "Success",
      "billing.invoiceCreated": "Invoice has been successfully created.",
      
      // Analytics translations
      "analytics.title": "Performance Analytics",
      "analytics.subtitle": "Track your coaching business metrics",
      "analytics.day": "Day",
      "analytics.week": "Week",
      "analytics.month": "Month",
      "analytics.revenue": "Revenue",
      "analytics.clients": "Clients",
      "analytics.sessions": "Sessions",
      "analytics.retention": "Retention",
      
      // Settings translations
      "settings.title": "Settings",
      "settings.subtitle": "Manage your account and application preferences",
      "settings.tabs.notifications": "Notifications",
      "settings.tabs.preferences": "Preferences",
      "settings.tabs.integrations": "Integrations",
      "settings.tabs.security": "Security",
      "settings.saveChanges": "Save Changes",
      
      "settings.notifications.title": "Notification Settings",
      "settings.notifications.description": "Configure how you receive notifications",
      "settings.notifications.email": "Email Notifications",
      "settings.notifications.emailDesc": "Receive notifications via email",
      "settings.notifications.reminders": "Session Reminders",
      "settings.notifications.remindersDesc": "Receive reminders about upcoming sessions",
      "settings.notifications.marketing": "Marketing Communications",
      "settings.notifications.marketingDesc": "Receive updates about new features and promotions",
      
      "settings.preferences.title": "User Preferences",
      "settings.preferences.description": "Customize your coaching platform experience",
      "settings.preferences.timezone": "Timezone",
      "settings.preferences.reminderTime": "Session Reminder Time",
      "settings.preferences.darkMode": "Dark Mode",
      "settings.preferences.darkModeDesc": "Switch to dark theme",
      
      "settings.integrations.title": "Integrations",
      "settings.integrations.description": "Connect with other services",
      "settings.integrations.connect": "Connect your {integration} account",
      "settings.integrations.connectButton": "Connect",
      
      "settings.security.title": "Security Settings",
      "settings.security.description": "Manage your account security",
      "settings.security.changePassword": "Change Password",
      "settings.security.changePasswordDesc": "Update your account password",
      "settings.security.2fa": "Two-Factor Authentication",
      "settings.security.2faDesc": "Add an extra layer of security",
      "settings.security.sessions": "Active Sessions",
      "settings.security.sessionsDesc": "Manage your active sessions",
      "settings.security.currentDevice": "Current Device",
      "settings.security.lastActive": "Last active: {time}",
      "settings.security.signOut": "Sign Out All Devices",
      
      // Action translations
      "action.cancel": "Cancel",
      "action.save": "Save",
      "action.saving": "Saving...",
      "action.add": "Add",
      "action.update": "Update",
      
      // Validation translations
      "validation.required": "This field is required",
      "validation.validNumber": "Valid number required",
      
      // ... keep existing code (remaining translations)
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
      "clients.name": "İsim",
      "clients.email": "E-posta",
      "clients.phone": "Telefon",
      "clients.program": "Program",
      "clients.notes": "Notlar",
      "clients.namePlaceholder": "John Doe",
      "clients.emailPlaceholder": "musteri@ornek.com",
      "clients.phonePlaceholder": "+90 (555) 123-4567",
      "clients.selectProgram": "Program seçin",
      "clients.notesPlaceholder": "Bu müşteri hakkında ilgili bilgileri ekleyin",
      "clients.success": "Başarılı",
      "clients.clientAdded": "Müşteri başarıyla eklendi.",
      "clients.programs.career": "Kariyer Gelişimi",
      "clients.programs.business": "İş Stratejisi",
      "clients.programs.life": "Yaşam Koçluğu",
      "clients.programs.executive": "Yönetici Koçluğu",
      
      // Program translations
      "programs.title": "Koçluk Programları",
      "programs.subtitle": "Koçluk program paketlerinizi yönetin",
      "programs.create": "Program Oluştur",
      "programs.new": "Yeni Program",
      "programs.name": "İsim",
      "programs.namePlaceholder": "Program adı",
      "programs.description": "Açıklama",
      "programs.descriptionPlaceholder": "Program açıklaması",
      "programs.sessions": "Oturumlar",
      "programs.duration": "Süre (hafta)",
      "programs.price": "Fiyat",
      
      // Billing translations
      "billing.title": "Faturalama ve Faturalar",
      "billing.subtitle": "Faturaları ve ödeme bilgilerini yönetin",
      "billing.createInvoice": "Fatura Oluştur",
      "billing.newInvoice": "Yeni Fatura",
      "billing.invoice": "Fatura",
      "billing.client": "Müşteri",
      "billing.issueDate": "Düzenleme Tarihi",
      "billing.dueDate": "Son Ödeme Tarihi",
      "billing.amount": "Tutar",
      "billing.status": "Durum",
      "billing.status.paid": "Ödendi",
      "billing.status.pending": "Beklemede",
      "billing.status.overdue": "Gecikmiş",
      "billing.viewInvoice": "Faturayı Görüntüle",
      "billing.downloadPDF": "PDF İndir",
      "billing.markAsPaid": "Ödendi Olarak İşaretle",
      "billing.sendReminder": "Hatırlatma Gönder",
      "billing.selectClient": "Müşteri seçin",
      "billing.selectDueDate": "Son ödeme tarihi seçin",
      "billing.invoiceItems": "Fatura Kalemleri",
      "billing.addItem": "Kalem Ekle",
      "billing.description": "Açıklama",
      "billing.serviceDescription": "Hizmet açıklaması",
      "billing.quantity": "Miktar",
      "billing.rate": "Ücret (TL)",
      "billing.subtotal": "Ara Toplam",
      "billing.tax": "Vergi (%10)",
      "billing.total": "Toplam",
      "billing.notes": "Notlar",
      "billing.invoiceNotes": "Fatura için ek notlar",
      "billing.success": "Başarılı",
      "billing.invoiceCreated": "Fatura başarıyla oluşturuldu.",
      
      // Analytics translations
      "analytics.title": "Performans Analizleri",
      "analytics.subtitle": "Koçluk işletmenizin metriklerini takip edin",
      "analytics.day": "Gün",
      "analytics.week": "Hafta",
      "analytics.month": "Ay",
      "analytics.revenue": "Gelir",
      "analytics.clients": "Müşteriler",
      "analytics.sessions": "Oturumlar",
      "analytics.retention": "Koruma",
      
      // Settings translations
      "settings.title": "Ayarlar",
      "settings.subtitle": "Hesabınızı ve uygulama tercihlerinizi yönetin",
      "settings.tabs.notifications": "Bildirimler",
      "settings.tabs.preferences": "Tercihler",
      "settings.tabs.integrations": "Entegrasyonlar",
      "settings.tabs.security": "Güvenlik",
      "settings.saveChanges": "Değişiklikleri Kaydet",
      
      "settings.notifications.title": "Bildirim Ayarları",
      "settings.notifications.description": "Bildirimleri nasıl alacağınızı yapılandırın",
      "settings.notifications.email": "E-posta Bildirimleri",
      "settings.notifications.emailDesc": "Bildirimleri e-posta yoluyla alın",
      "settings.notifications.reminders": "Oturum Hatırlatmaları",
      "settings.notifications.remindersDesc": "Yaklaşan oturumlar hakkında hatırlatmalar alın",
      "settings.notifications.marketing": "Pazarlama İletişimleri",
      "settings.notifications.marketingDesc": "Yeni özellikler ve promosyonlar hakkında güncellemeler alın",
      
      "settings.preferences.title": "Kullanıcı Tercihleri",
      "settings.preferences.description": "Koçluk platform deneyiminizi özelleştirin",
      "settings.preferences.timezone": "Saat Dilimi",
      "settings.preferences.reminderTime": "Oturum Hatırlatma Zamanı",
      "settings.preferences.darkMode": "Karanlık Mod",
      "settings.preferences.darkModeDesc": "Karanlık temaya geçin",
      
      "settings.integrations.title": "Entegrasyonlar",
      "settings.integrations.description": "Diğer hizmetlerle bağlantı kurun",
      "settings.integrations.connect": "{integration} hesabınızı bağlayın",
      "settings.integrations.connectButton": "Bağlan",
      
      "settings.security.title": "Güvenlik Ayarları",
      "settings.security.description": "Hesap güvenliğinizi yönetin",
      "settings.security.changePassword": "Şifre Değiştir",
      "settings.security.changePasswordDesc": "Hesap şifrenizi güncelleyin",
      "settings.security.2fa": "İki Faktörlü Kimlik Doğrulama",
      "settings.security.2faDesc": "Ekstra bir güvenlik katmanı ekleyin",
      "settings.security.sessions": "Aktif Oturumlar",
      "settings.security.sessionsDesc": "Aktif oturumlarınızı yönetin",
      "settings.security.currentDevice": "Mevcut Cihaz",
      "settings.security.lastActive": "Son aktif: {time}",
      "settings.security.signOut": "Tüm Cihazlardan Çıkış Yap",
      
      // Action translations
      "action.cancel": "İptal",
      "action.save": "Kaydet",
      "action.saving": "Kaydediliyor...",
      "action.add": "Ekle",
      "action.update": "Güncelle",
      
      // Validation translations
      "validation.required": "Bu alan gereklidir",
      "validation.validNumber": "Geçerli bir numara gereklidir",
      
      // ... keep existing code (remaining translations)
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
