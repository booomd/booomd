'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { secureFormSubmit, generateCSRFToken } from '@/lib/security';
import { useLanguage } from '@/contexts/LanguageContext';

interface SecureFormProps {
  onSubmit: (data: Record<string, string>) => void;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'select';
    required?: boolean;
    options?: string[];
    placeholder?: string;
  }>;
  submitLabel: string;
  className?: string;
}

export default function SecureForm({ onSubmit, fields, submitLabel, className = '' }: SecureFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    // Generate CSRF token
    setCsrfToken(generateCSRFToken());
    
    // Load hCaptcha script
    if (!document.querySelector('script[src*="hcaptcha"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.hcaptcha.com/1/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach(field => {
      const value = formData[field.name] || '';
      
      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.type === 'email' && value && !validateEmail(value)) {
        newErrors[field.name] = 'Please enter a valid email address';
      } else if (field.name === 'name' && value && !validateName(value)) {
        newErrors[field.name] = 'Please enter a valid name (2-50 characters, letters only)';
      } else if (field.type === 'textarea' && value && (value.length < 10 || value.length > 2000)) {
        newErrors[field.name] = 'Message must be between 10 and 2000 characters';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Show CAPTCHA for first submission
    if (!captchaToken && !showCaptcha) {
      setShowCaptcha(true);
      return;
    }
    
    if (!captchaToken) {
      setErrors({ captcha: 'Please complete the CAPTCHA verification' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await secureFormSubmit(formData, '/api/contact', csrfToken);
      
      if (result.success) {
        onSubmit(formData);
        setFormData({});
        setCaptchaToken('');
        setShowCaptcha(false);
        // Generate new CSRF token
        setCsrfToken(generateCSRFToken());
      } else {
        setErrors({ submit: result.error || 'Submission failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setErrors(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <div className="flex items-center">
          <Shield className="text-green-600 mr-2" size={16} />
          <span className="text-sm text-green-800">
            {t('security-form.notice')}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-semibold text-gray-900 mb-2">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              rows={6}
              maxLength={2000}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors duration-200 resize-none ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors duration-200 ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{field.placeholder || `Select ${field.label}`}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              maxLength={field.type === 'email' ? 254 : 100}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors duration-200 ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          )}
          
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertTriangle size={14} className="mr-1" />
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      {/* CAPTCHA */}
      {showCaptcha && (
        <div>
          <div 
            className="h-captcha" 
            data-sitekey="10000000-ffff-ffff-ffff-000000000001"
            data-callback="onCaptchaVerify"
          ></div>
          {errors.captcha && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertTriangle size={14} className="mr-1" />
              {errors.captcha}
            </p>
          )}
        </div>
      )}

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-sm text-red-800 flex items-center">
            <AlertTriangle size={14} className="mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Hidden CSRF Token */}
      <input type="hidden" name="csrf_token" value={csrfToken} />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </button>

      {/* Security Notice */}
      <p className="text-xs text-gray-500 text-center">
        {t('security-form.data-notice')}
      </p>
    </form>
  );
}

// Global CAPTCHA callback
if (typeof window !== 'undefined') {
  (window as any).onCaptchaVerify = (token: string) => {
    // This will be handled by the component
    const event = new CustomEvent('captcha-verified', { detail: token });
    window.dispatchEvent(event);
  };
}