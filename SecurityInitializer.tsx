'use client';

import { useEffect } from 'react';
import { initSecurity } from '@/lib/security';

export default function SecurityInitializer() {
  useEffect(() => {
    initSecurity();
  }, []);
  
  return null;
}