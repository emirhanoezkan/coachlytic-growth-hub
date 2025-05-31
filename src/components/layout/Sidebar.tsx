
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
import { useSidebar } from "@/components/ui/sidebar-animated"; // Added import
import { 
  SidebarBody, 
  SidebarLink,
} from "@/components/ui/sidebar-animated";
import { motion } from "framer-motion";

export function Sidebar() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const { open, setOpen } = useSidebar(); // Accessed sidebar state

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

  const sidebarBodyBaseClasses = "justify-between gap-10 h-full bg-background"; // Added bg-background
  const responsiveClasses = `${
    open
      ? "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 w-[200px]"
      : "fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full w-[200px]"
  } sm:translate-x-0 sm:static sm:h-auto sm:z-auto sm:p-0 sm:overflow-y-visible sm:w-auto sm:max-w-[200px] md:max-w-[250px] sm:border-r sm:border-neutral-200 sm:dark:border-neutral-700`;
  const overlayClasses = open ? "fixed inset-0 bg-black/50 z-30 sm:hidden" : "hidden";

  return (
    <>
      <div onClick={() => setOpen(false)} className={overlayClasses}></div>
      <SidebarBody className={`${sidebarBodyBaseClasses} ${responsiveClasses}`}>
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
    </>
  );
}
