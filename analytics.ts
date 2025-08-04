// Analytics utility functions for privacy-friendly tracking

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export const analytics = {
  // Track page views (automatically handled by Plausible)
  pageView: (page: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('pageview', { props: { page } });
    }
  },

  // Track button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Button Click', { 
        props: { 
          button: buttonName,
          location: location || 'unknown'
        } 
      });
    }
  },

  // Track form submissions
  trackFormSubmission: (formName: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Form Submission', { 
        props: { 
          form: formName
        } 
      });
    }
  },

  // Track navigation events
  trackNavigation: (from: string, to: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Navigation', { 
        props: { 
          from,
          to
        } 
      });
    }
  },

  // Track conversion events
  trackConversion: (event: string, value?: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Conversion', { 
        props: { 
          event,
          value: value || 'unknown'
        } 
      });
    }
  },

  // Track language changes
  trackLanguageChange: (from: string, to: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Language Change', { 
        props: { 
          from,
          to
        } 
      });
    }
  },

  // Track pricing plan interest
  trackPricingInterest: (plan: string, action: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Pricing Interest', { 
        props: { 
          plan,
          action
        } 
      });
    }
  },

  // Track download attempts
  trackDownloadAttempt: (source: string) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('Download Attempt', { 
        props: { 
          source
        } 
      });
    }
  }
};

// Check if user has consented to analytics
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === 'accepted';
};

// Wrapper function to only track if consent is given
export const trackEvent = (eventName: string, properties?: Record<string, string | number>) => {
  if (hasAnalyticsConsent() && typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: properties });
  }
}