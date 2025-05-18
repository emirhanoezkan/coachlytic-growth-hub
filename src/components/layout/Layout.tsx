
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't render the dashboard layout on the landing page
  if (location.pathname === '/landing' || location.pathname === '/login' || location.pathname === '/signup') {
    return <>{children}</>;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto bg-slate-50">
            {/* Mobile sidebar toggle that's always visible */}
            <div className="md:hidden fixed top-4 left-4 z-50">
              <SidebarTrigger />
            </div>
            
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
