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
  },
  es: {
    "app.name": "Coachlytic",
    "app.dashboard": "Panel",
    "app.clients": "Clientes",
    "app.sessions": "Sesiones",
    "app.programs": "Programas",
    "app.analytics": "Analítica",
    "app.billing": "Facturación",
    "app.documents": "Documentos",
    "app.profile": "Perfil",
    "app.settings": "Configuración",
    "auth.signin": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.name": "Nombre",
    "form.submit": "Enviar",
    "form.cancel": "Cancelar",
    "time.24h": "24 horas",
    "time.12h": "12 horas",
    "common.search": "Buscar",
  },
  fr: {
    "app.name": "Coachlytic",
    "app.dashboard": "Tableau de bord",
    "app.clients": "Clients",
    "app.sessions": "Séances",
    "app.programs": "Programmes",
    "app.analytics": "Analytique",
    "app.billing": "Facturation",
    "app.documents": "Documents",
    "app.profile": "Profil",
    "app.settings": "Paramètres",
    "auth.signin": "Connexion",
    "auth.signup": "S'inscrire",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.name": "Nom",
    "form.submit": "Soumettre",
    "form.cancel": "Annuler",
    "time.24h": "24 heures",
    "time.12h": "12 heures",
    "common.search": "Rechercher",
  },
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
