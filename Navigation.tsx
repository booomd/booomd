'use client';

import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { analytics } from '@/lib/analytics';

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/business', label: t('nav.business') },
  ];

  const handleNavClick = (href: string, label: string) => {
    analytics.trackButtonClick(`Nav: ${label}`, 'Navigation');
    analytics.trackNavigation(window.location.pathname, href);
  };

  const handleLanguageChange = (newLang: string) => {
    analytics.trackLanguageChange(language, newLang);
    setLanguage(newLang as 'en' | 'ar' | 'es');
  };

  const handleGetStartedClick = () => {
    analytics.trackButtonClick('Get Started', 'Navigation');
    analytics.trackConversion('Get Started Click', 'Navigation');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div onClick={() => handleNavClick('/', 'Logo')}>
              <div className="flex items-center space-x-2">
                <Image
                  src="/image copy copy copy copy.png"
                  alt="NuviaMind Logo"
                  width={55}
                  height={55}
                />
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  NuviaMind
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
         <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
               className="text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium text-sm xl:text-base whitespace-nowrap"
                onClick={() => handleNavClick(link.href, link.label)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
         <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
               className="flex items-center space-x-1 px-2 xl:px-3 py-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
              >
               <Globe size={14} className="xl:w-4 xl:h-4" />
               <span className="text-xs xl:text-sm font-medium">
                  {languages.find(lang => lang.code === language)?.flag} {language.toUpperCase()}
                </span>
               <ChevronDown size={12} className="xl:w-3.5 xl:h-3.5" />
              </button>
              
              {isLanguageOpen && (
               <div className="absolute right-0 mt-2 w-40 xl:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsLanguageOpen(false);
                      }}
                     className="w-full text-left px-3 xl:px-4 py-2 text-xs xl:text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Get Started Button */}
            <Link
              href="/pricing"
             className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1.5 xl:px-6 xl:py-2 rounded-full font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg text-xs xl:text-base whitespace-nowrap"
              onClick={handleGetStartedClick}
            >
              {t('nav.get-started')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
         <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
             {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
         <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                 className="text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium px-2 py-1 text-base"
                  onClick={() => setIsMenuOpen(false)}
                  onClick={() => {
                    handleNavClick(link.href, link.label);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="border-t border-gray-100 pt-4">
               <div className="text-sm font-medium text-gray-500 mb-2 px-2">Language</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full text-left px-2 py-2 text-sm flex items-center space-x-2 rounded-md transition-colors duration-200 ${
                      language === lang.code 
                        ? 'bg-teal-50 text-teal-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Mobile Get Started Button */}
              <Link
                href="/pricing"
               className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-200 shadow-md text-center text-base mx-2"
                onClick={() => setIsMenuOpen(false)}
                onClick={() => {
                  handleGetStartedClick();
                  setIsMenuOpen(false);
                }}
              >
                {t('nav.get-started')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}