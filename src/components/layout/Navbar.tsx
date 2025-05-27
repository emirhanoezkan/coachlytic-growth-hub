
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: t('navigation.features') },
    { href: "#pricing", label: t('navigation.pricing') },
    { href: "#benefits", label: t('navigation.benefits') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-8 w-8 bg-forest-500 rounded-lg mr-3 shadow-lg shadow-forest-500/30"></div>
            <span className="text-xl font-bold text-gray-900">{t('app.name')}</span>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Right side buttons & Language Selector (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Button asChild variant="ghost">
              <Link to="/auth">{t('navigation.login')}</Link>
            </Button>
            <Button asChild className="bg-forest-600 hover:bg-forest-700">
              <Link to="/auth">{t('navigation.getStarted')}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('navigation.openMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-3/4">
                <SheetHeader className="mb-4">
                  <SheetTitle className="text-left">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-forest-500 rounded-lg mr-3 shadow-lg shadow-forest-500/30"></div>
                      <span className="text-xl font-bold text-gray-900">{t('app.name')}</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <a
                        href={link.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="space-y-2">
                      <SheetClose asChild>
                        <Button asChild variant="ghost" className="w-full justify-start text-base">
                          <Link to="/auth">{t('navigation.login')}</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="w-full bg-forest-600 hover:bg-forest-700 text-base">
                          <Link to="/auth">{t('navigation.getStarted')}</Link>
                        </Button>
                      </SheetClose>
                      <div className="pt-2">
                        <LanguageSelector />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
