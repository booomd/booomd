'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X, Shield, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      // Load analytics if previously accepted
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Load Plausible Analytics script
    if (!document.querySelector('script[data-domain]')) {
      const script = document.createElement('script');
      script.defer = true;
      script.setAttribute('data-domain', 'nuviamind.com');
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);

      // Track custom events
      window.plausible = window.plausible || function() {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    loadAnalytics();
    setIsVisible(false);
    
    // Track consent acceptance
    if (window.plausible) {
      window.plausible('Cookie Consent Accepted');
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    
    // Remove any existing analytics scripts
    const existingScript = document.querySelector('script[data-domain]');
    if (existingScript) {
      existingScript.remove();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Cookie className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t('cookie-consent.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('cookie-consent.subtitle')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('cookie-consent.description')}
            </p>
            
            {isExpanded && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Eye className="mr-2" size={16} />
                  {t('cookie-consent.what-we-track')}
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('cookie-consent.track.page-views')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('cookie-consent.track.button-clicks')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('cookie-consent.track.navigation')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {t('cookie-consent.track.referrers')}
                  </li>
                </ul>
                
                <h4 className="font-semibold text-gray-900 mb-3 mt-4 flex items-center">
                  <Shield className="mr-2" size={16} />
                  {t('cookie-consent.what-we-dont-track')}
                </h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {t('cookie-consent.no-track.personal-info')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {t('cookie-consent.no-track.cross-site')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {t('cookie-consent.no-track.cookies')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    {t('cookie-consent.no-track.health-data')}
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors duration-200"
            >
              {isExpanded ? t('cookie-consent.show-less') : t('cookie-consent.learn-more')}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('cookie-consent.accept')}
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
            >
              {t('cookie-consent.decline')}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            {t('cookie-consent.policy-link-text')}{' '}
            <Link href="/privacy" className="text-teal-600 hover:text-teal-700 underline">
              {t('cookie-consent.privacy-policy')}
            </Link>{' '}
            {t('cookie-consent.and')}{' '}
            <Link href="/cookies" className="text-teal-600 hover:text-teal-700 underline">
              {t('cookie-consent.cookie-policy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}