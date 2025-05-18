
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { 
  AreaChart, 
  Users, 
  CalendarDays, 
  Layers, 
  CreditCard, 
  Menu, 
  Home 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const { t } = useLanguage();
  const { pathname } = useLocation();
  
  const routes = [
    {
      title: t('app.dashboard'),
      path: "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      title: t('app.clients'),
      path: "/clients",
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      title: t('app.sessions'),
      path: "/sessions",
      icon: <CalendarDays className="h-4 w-4 mr-2" />,
    },
    {
      title: t('app.programs'),
      path: "/programs",
      icon: <Layers className="h-4 w-4 mr-2" />,
    },
    {
      title: t('app.analytics'),
      path: "/analytics",
      icon: <AreaChart className="h-4 w-4 mr-2" />,
    },
    {
      title: t('app.billing'),
      path: "/billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <>
      <div 
        className={cn(
          "fixed top-0 z-40 h-16 items-center border-b bg-background px-4 md:hidden",
          collapsed ? "left-0 w-16" : "left-0 right-0"
        )}
      >
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="inline-flex h-10 w-10 items-center justify-center"
        >
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      <div
        className={cn(
          "fixed z-30 h-full border-r bg-background transition-all duration-300",
          collapsed ? "w-16" : "w-56",
          "md:pt-0"
        )}
        style={{ paddingTop: "4rem" }}
      >
        <div className="flex h-16 items-center justify-center border-b px-4">
          <div 
            className={cn(
              "font-display text-xl font-semibold transition-opacity",
              collapsed ? "opacity-0" : "opacity-100"
            )}
          >
            {t('app.name')}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="absolute right-4 top-5 inline-flex h-8 w-8 items-center justify-center md:hidden"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
        <div className="py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route, i) => (
              <Link
                key={i}
                to={route.path}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "justify-start px-4 py-2",
                  pathname === route.path && "bg-muted hover:bg-muted",
                  collapsed && "justify-center px-0"
                )}
              >
                {route.icon}
                <span
                  className={cn("transition-opacity", collapsed && "opacity-0")}
                >
                  {route.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-4 left-0 right-0 mx-auto px-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-8 w-full justify-center",
              collapsed ? "px-0" : "px-4"
            )}
          >
            <Menu
              className={cn("h-4 w-4 transition-transform", collapsed && "rotate-90")}
            />
            <span
              className={cn("ml-2 transition-opacity", collapsed && "opacity-0")}
            >
              {collapsed ? "Expand" : "Collapse"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
