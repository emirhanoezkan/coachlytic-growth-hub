
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Users, Calendar, FileText, BarChart, CreditCard, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, isActive }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link to={href} className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md w-full",
          isActive ? "bg-forest-100 text-forest-600" : "text-gray-600 hover:bg-gray-100"
        )}>
          <Icon className={cn("h-5 w-5", isActive ? "text-forest-500" : "text-gray-500")} />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const Sidebar = () => {
  const location = useLocation();

  return (
    <ShadcnSidebar>
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center">
            <div className="bg-forest-500 text-white rounded-lg p-2 flex items-center justify-center">
              <span className="text-lg font-bold">C</span>
            </div>
            <h1 className="text-xl font-display font-semibold ml-2 text-forest-600">Coachlytic</h1>
          </div>
          <SidebarTrigger />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem 
                icon={Home} 
                label="Dashboard" 
                href="/" 
                isActive={location.pathname === '/'} 
              />
              <NavItem 
                icon={Users} 
                label="Clients" 
                href="/clients" 
                isActive={location.pathname.startsWith('/clients')} 
              />
              <NavItem 
                icon={Calendar} 
                label="Sessions" 
                href="/sessions" 
                isActive={location.pathname.startsWith('/sessions')} 
              />
              <NavItem 
                icon={FileText} 
                label="Programs" 
                href="/programs" 
                isActive={location.pathname.startsWith('/programs')} 
              />
              <NavItem 
                icon={BarChart} 
                label="Analytics" 
                href="/analytics" 
                isActive={location.pathname.startsWith('/analytics')} 
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem 
                icon={CreditCard} 
                label="Billing" 
                href="/billing" 
                isActive={location.pathname.startsWith('/billing')} 
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
};
