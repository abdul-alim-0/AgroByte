"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simple translation map for demonstration
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.marketplace': 'Marketplace',
    'nav.learning': 'Learning',
    'nav.chat': 'Messages',
    'cta.signup': 'Sign Up',
    'cta.login': 'Login',
    // Add more translations as needed
  },
  bn: {
    'nav.home': 'হোম',
    'nav.marketplace': 'বাজার',
    'nav.learning': 'শিক্ষা',
    'nav.chat': 'বার্তা',
    'cta.signup': 'নিবন্ধন করুন',
    'cta.login': 'লগইন',
    // Add more translations as needed
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.marketplace': 'السوق',
    'nav.learning': 'التعلم',
    'nav.chat': 'الرسائل',
    'cta.signup': 'التسجيل',
    'cta.login': 'تسجيل الدخول',
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Apply RTL for Arabic
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Store the language preference
    localStorage.setItem('language', language);
  }, [language]);

  // Load language preference on initial mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'bn', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Translation function
  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}