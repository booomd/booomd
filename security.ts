// Security utilities for form validation and sanitization

import DOMPurify from 'isomorphic-dompurify';
import { securityMonitor, initSecurityMonitoring } from './security-monitoring';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Remove HTML tags and sanitize
  const sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
  
  // Additional sanitization for common XSS patterns
  return sanitized
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitizedEmail = sanitizeInput(email);
  return emailRegex.test(sanitizedEmail) && sanitizedEmail.length <= 254;
};

// Name validation
export const validateName = (name: string): boolean => {
  const sanitizedName = sanitizeInput(name);
  const nameRegex = /^[a-zA-Z\s\u00C0-\u017F\u0600-\u06FF\u0100-\u017F]{2,50}$/;
  return nameRegex.test(sanitizedName);
};

// Message validation
export const validateMessage = (message: string): boolean => {
  const sanitizedMessage = sanitizeInput(message);
  return sanitizedMessage.length >= 10 && sanitizedMessage.length <= 2000;
};

// Rate limiting
export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 900000): boolean => {
  const now = Date.now();
  const key = identifier;
  
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    // Log rate limit violation
    securityMonitor.logEvent('rate_limit', {
      identifier: identifier.slice(0, 8), // Partial identifier only
      attempts: current.count,
      window: windowMs
    });
    return false;
  }
  
  current.count++;
  return true;
};

// Generate client fingerprint for rate limiting (non-PII)
export const generateClientFingerprint = (): string => {
  if (typeof window === 'undefined') return 'server';
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Security fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent.slice(0, 100),
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL().slice(0, 100)
  ].join('|');
  
  // Simple hash function (non-cryptographic, for rate limiting only)
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

// CSRF token generation and validation
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure form submission wrapper
export const secureFormSubmit = async (
  formData: Record<string, string>,
  endpoint: string,
  csrfToken?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Rate limiting check
    const fingerprint = generateClientFingerprint();
    if (!checkRateLimit(fingerprint)) {
      return { success: false, error: 'Too many requests. Please try again later.' };
    }
    
    // Sanitize all inputs
    const sanitizedData: Record<string, string> = {};
    for (const [key, value] of Object.entries(formData)) {
      sanitizedData[key] = sanitizeInput(value);
    }
    
    // Validate required fields
    if (sanitizedData.email && !validateEmail(sanitizedData.email)) {
      return { success: false, error: 'Invalid email address.' };
    }
    
    if (sanitizedData.name && !validateName(sanitizedData.name)) {
      return { success: false, error: 'Invalid name format.' };
    }
    
    if (sanitizedData.message && !validateMessage(sanitizedData.message)) {
      return { success: false, error: 'Message must be between 10 and 2000 characters.' };
    }
    
    // In a real implementation, this would send to your secure backend
    console.log('Secure form submission:', { sanitizedData, endpoint, timestamp: new Date().toISOString() });
    
    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};

// Content Security Policy violation reporting
export const reportCSPViolation = (violation: any) => {
  // In production, send to your security monitoring service
  console.warn('CSP Violation:', violation);
};

// Initialize security monitoring
export const initSecurity = () => {
  if (typeof window === 'undefined') return;
  
  // Initialize security monitoring
  initSecurityMonitoring();
  
  // Listen for CSP violations
  document.addEventListener('securitypolicyviolation', (e) => {
    reportCSPViolation({
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      timestamp: new Date().toISOString()
    });
  });
  
  // Prevent common attacks
  window.addEventListener('error', (e) => {
    // Log security-related errors (without PII)
    if (e.message.includes('script') || e.message.includes('eval')) {
      console.warn('Potential security issue detected:', {
        message: e.message.slice(0, 100),
        filename: e.filename?.slice(0, 100),
        timestamp: new Date().toISOString()
      });
    }
  });
};