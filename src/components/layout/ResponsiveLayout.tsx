
import React from 'react';
import { ResponsiveMobileHeader } from './ResponsiveMobileHeader';
import { Sidebar } from './Sidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <ResponsiveMobileHeader />
        
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 pt-4 sm:pt-4 md:pt-6">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
