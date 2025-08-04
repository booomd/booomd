'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">NuviaMind</h3>
            <p className="text-gray-300 mb-4">
              {t('footer.company')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quick-links')}</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">{t('nav.faq')}</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-white transition-colors">{t('nav.business')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors">{t('nav.blog')} / Wellness Tips</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.privacy')}</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.terms')}</Link></li>
              <li><Link href="/medical-disclaimer" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.medical')}</Link></li>
              <li><Link href="/cookies" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.cookies')}</Link></li>
              <li><Link href="/refund" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.refund')}</Link></li>
              <li><Link href="/data-deletion" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.data-deletion')}</Link></li>
              <li><Link href="/eula" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.eula')}</Link></li>
              <li><Link href="/accessibility" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.accessibility')}</Link></li>
              <li><Link href="/security-practices" className="text-gray-300 hover:text-white transition-colors">{t('footer.legal.security-practices')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.tiktok.com/@nuviamind?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              
              <a
                href="https://x.com/NuviaMind"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              <a
                href="https://www.facebook.com/profile.php?id=61577080371650"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="https://www.instagram.com/nuviamind/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.926 1.365 2.077 1.365 3.374s-.49 2.448-1.365 3.323c-.875.875-2.026 1.167-3.323 1.167zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.926-1.365-2.077-1.365-3.374s.49-2.448 1.365-3.323c.875-.926 2.026-1.416 3.323-1.416s2.448.49 3.323 1.416c.875.926 1.365 2.077 1.365 3.374s-.49 2.448-1.365 3.323c-.875.875-2.026 1.167-3.323 1.167z"/>
                  <path d="M12 7.377c-2.747 0-4.971 2.224-4.971 4.971S9.253 17.319 12 17.319s4.971-2.224 4.971-4.971S14.747 7.377 12 7.377zm0 8.195c-1.78 0-3.224-1.444-3.224-3.224S10.22 8.624 12 8.624s3.224 1.444 3.224 3.224-1.444 3.224-3.224 3.224zM16.806 5.595c-.72 0-1.304.584-1.304 1.304s.584 1.304 1.304 1.304 1.304-.584 1.304-1.304-.584-1.304-1.304-1.304z"/>
                </svg>
              </a>
              
              <a
                href="https://www.linkedin.com/company/nuviamind/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-400 text-center">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}