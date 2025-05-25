
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-forest-500 rounded-lg mr-3 shadow-lg shadow-forest-500/30"></div>
              <span className="text-xl font-bold text-gray-900">{t('app.name')}</span>
            </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {t('navigation.features')}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {t('navigation.pricing')}
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {t('navigation.benefits')}
            </a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/auth">{t('navigation.login')}</Link>
            </Button>
            <Button asChild className="bg-forest-600 hover:bg-forest-700">
              <Link to="/auth">{t('navigation.getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
