"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';
import { Menu, X, Sprout, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleDownload = (type: 'mobile' | 'desktop') => {
    const fileUrls = {
      mobile: '/downloads/agrobyte-mobile.apk',
      desktop: '/downloads/agrobyte-desktop.exe'
    };
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrls[type];
    link.download = type === 'mobile' ? 'AgroByte-Mobile.apk' : 'AgroByte-Desktop.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">AgroByte</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          <Link href="/marketplace" className="text-foreground hover:text-primary transition-colors">
            {t('nav.marketplace')}
          </Link>
          <Link href="/learning" className="text-foreground hover:text-primary transition-colors">
            {t('nav.learning')}
          </Link>
          <Link href="/chat" className="text-foreground hover:text-primary transition-colors">
            {t('nav.chat')}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload('mobile')}>
                Mobile App (APK)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('desktop')}>
                Desktop App
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">{t('cta.login')}</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth/signup">{t('cta.signup')}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-in bg-background border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              href="/marketplace" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.marketplace')}
            </Link>
            <Link 
              href="/learning" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.learning')}
            </Link>
            <Link 
              href="/chat" 
              className="text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.chat')}
            </Link>
            {/* Mobile Download Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDownload('mobile')}>
                  Mobile App (APK)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('desktop')}>
                  Desktop App
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center space-x-2 pt-2">
              <LanguageToggle />
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('cta.login')}
                </Link>
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('cta.signup')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}