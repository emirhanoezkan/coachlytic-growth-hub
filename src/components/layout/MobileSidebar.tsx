
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { 
  AreaChart, 
  Users, 
  CalendarDays, 
  Layers, 
  CreditCard, 
  Home,
  FileText,
  X
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  
  const routes = [
    {
      label: t('app.dashboard'),
      href: "/dashboard",
      icon: Home,
    },
    {
      label: t('app.clients'),
      href: "/clients",
      icon: Users,
    },
    {
      label: t('app.sessions'),
      href: "/sessions",
      icon: CalendarDays,
    },
    {
      label: t('app.programs'),
      href: "/programs",
      icon: Layers,
    },
    {
      label: t('app.documents'),
      href: "/documents",
      icon: FileText,
    },
    {
      label: t('app.analytics'),
      href: "/analytics",
      icon: AreaChart,
    },
    {
      label: t('app.billing'),
      href: "/billing",
      icon: CreditCard,
    },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-neutral-900 z-50 shadow-xl md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-7 bg-forest-500 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
                <span className="font-display font-medium text-forest-600 dark:text-white text-lg">
                  {t('app.name')}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-10 w-10 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    to={route.href}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors
                      ${pathname === route.href 
                        ? 'bg-forest-100 text-forest-800 dark:bg-forest-800 dark:text-forest-100' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    <route.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
