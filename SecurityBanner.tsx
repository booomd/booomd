'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function SecurityBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show security banner if HTTPS is not enabled
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center text-sm">
      <div className="flex items-center justify-center space-x-2">
        <AlertTriangle size={16} />
        <span>
          This site is not secure. Please ensure you're visiting the official HTTPS version at https://nuviamind.com
        </span>
      </div>
    </div>
  );
}