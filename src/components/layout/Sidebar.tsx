
import React from 'react';
import { useLocation } from "react-router-dom";
import { 
  AreaChart, 
  Users, 
  CalendarDays, 
  Layers, 
  CreditCard, 
  Home,
  FileText
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  SidebarProvider,
  SidebarBody, 
  SidebarLink,
} from "@/components/ui/sidebar-animated";
import { motion } from "framer-motion";

export function Sidebar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  
  const routes = [
    {
      label: t('app.dashboard'),
      href: "/dashboard",
      icon: <Home className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.clients'),
      href: "/clients",
      icon: <Users className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.sessions'),
      href: "/sessions",
      icon: <CalendarDays className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.programs'),
      href: "/programs",
      icon: <Layers className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.documents'),
      href: "/documents",
      icon: <FileText className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.analytics'),
      href: "/analytics",
      icon: <AreaChart className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
    {
      label: t('app.billing'),
      href: "/billing",
      icon: <CreditCard className="h-5 w-5 text-neutral-700 dark:text-neutral-200 flex-shrink-0" />,
    },
  ];

  const LogoIcon = () => (
    <div className="h-5 w-6 bg-forest-500 dark:bg-lavender-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  );

  const Logo = () => (
    <div className="font-display flex space-x-2 items-center text-sm py-1 relative z-20">
      <LogoIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-forest-600 dark:text-white whitespace-pre"
      >
        {t('app.name')}
      </motion.span>
    </div>
  );

  return (
    <div className="hidden md:block">
      <SidebarProvider>
        <SidebarBody className="justify-between gap-10 border-r border-neutral-200 dark:border-neutral-700 w-auto max-w-[200px] lg:max-w-[250px]">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {routes.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className={pathname === link.href ? "bg-neutral-200 dark:bg-neutral-700 rounded-md px-2" : "px-2"}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </SidebarProvider>
    </div>
  );
}
