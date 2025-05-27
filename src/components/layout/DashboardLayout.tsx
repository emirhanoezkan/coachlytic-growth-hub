import React, { useState, ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react'; // Renamed to avoid conflict if Menu component is used
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Determine if the current path is part of the settings or profile page
  // to potentially use a different layout or hide sidebar elements.
  // For now, all dashboard routes will use this layout with the sidebar.
  const isUserSettingsPage = location.pathname.startsWith('/profile') || location.pathname.startsWith('/settings');

  // Define paths where the sidebar should not be shown by default (e.g. landing, auth)
  // This logic is mostly handled by ProtectedRoute now, but this can be an additional check if needed.
  const noSidebarPaths = ['/', '/auth'];
  if (noSidebarPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
      {/* Desktop Sidebar (visible on md and up) */}
      {/* The actual hiding/showing for md:block will be handled in Sidebar.tsx */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar (via Sheet) */}
      <div className="md:hidden">
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetTrigger asChild>
            {/* Positioned fixed to be on top of content, may need a container with specific height if header is added */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700"
              aria-label={t('navigation.openMenu')}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/3 p-0 pt-10 bg-white dark:bg-neutral-800 border-r dark:border-neutral-700">
            {/* Sidebar content will go here */}
            {/* Wrap Sidebar with SheetClose if clicking links should close it */}
            {/* We might need to pass a callback to Sidebar to close the sheet on link click */}
            <Sidebar onLinkClick={() => setIsMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Optional: Mobile Header Bar (if hamburger is not fixed/absolute) */}
        {/* <div className="md:hidden p-4 border-b dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-between">
          <span className="text-lg font-semibold">{t('app.name')}</span>
        </div> */}
        
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
