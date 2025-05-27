
import React from 'react';
import { useLocation, Link } from "react-router-dom"; // Added Link
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
  SidebarBody,
  // We will use a modified SidebarLink or handle click directly for SheetClose
} from "@/components/ui/sidebar-animated"; 
import { motion } from "framer-motion";

interface SidebarProps {
  onLinkClick?: () => void; // Callback for when a link is clicked
}

export function Sidebar({ onLinkClick }: SidebarProps) {
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
    // Added px-4 for alignment similar to links, and py-4 for a bit more space
    <div className="font-display flex space-x-2 items-center text-sm py-4 px-4 relative z-20"> 
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
  
  // Custom Link component to handle onLinkClick and active state
  const CustomSidebarLink = ({ link }: { link: typeof routes[0] }) => (
    <Link
      to={link.href}
      onClick={onLinkClick} // Close sheet on click
      className={`flex items-center space-x-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors
                  ${pathname === link.href 
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50" 
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 hover:text-neutral-900 dark:hover:text-neutral-50"}`}
    >
      {link.icon}
      <span>{link.label}</span>
    </Link>
  );

  return (
    // Removed max-w and w-auto for Sheet compatibility, added classes for hiding on mobile
    // The parent SheetContent will control the width on mobile.
    // Desktop width is controlled by the div wrapper in DashboardLayout.
    <SidebarBody className="flex flex-col justify-between gap-10 border-r border-neutral-200 dark:border-neutral-700 h-full">
      {/* Removed overflow-x-hidden as SheetContent might handle scrolling or it's not needed */}
      <div className="flex flex-col flex-1 overflow-y-auto"> 
        <Logo />
        <div className="mt-8 flex flex-col gap-1 px-2"> {/* Reduced gap slightly, added padding for links */}
          {routes.map((link, idx) => (
            <CustomSidebarLink key={idx} link={link} />
          ))}
        </div>
      </div>
      {/* User profile / settings link can be added here if needed in the future */}
      {/* Example:
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        User Profile Links
      </div>
      */}
    </SidebarBody>
  );
}
