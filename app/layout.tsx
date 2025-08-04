'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { LiveChatProvider } from '@/components/LiveChat';
import CookieConsent from '@/components/CookieConsent';
import SecurityInitializer from '@/components/SecurityInitializer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <LiveChatProvider>
            <SecurityInitializer />
            <Navigation />
            <main>
              {children}
            </main>
            <Footer />
            <CookieConsent />
          </LiveChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}