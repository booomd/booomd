// Security monitoring and logging utilities

interface SecurityEvent {
  type: 'csp_violation' | 'rate_limit' | 'form_attack' | 'suspicious_activity';
  details: Record<string, any>;
  timestamp: string;
  fingerprint: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000;

  // Log security events (without PII)
  logEvent(type: SecurityEvent['type'], details: Record<string, any>) {
    const event: SecurityEvent = {
      type,
      details: this.sanitizeDetails(details),
      timestamp: new Date().toISOString(),
      fingerprint: this.generateFingerprint()
    };

    this.events.push(event);
    
    // Keep only recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // In production, send to security monitoring service
    this.reportToSecurityService(event);
  }

  private sanitizeDetails(details: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(details)) {
      // Remove any potential PII
      if (typeof value === 'string') {
        sanitized[key] = value
          .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]')
          .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]')
          .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]')
          .slice(0, 200); // Limit length
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  private generateFingerprint(): string {
    if (typeof window === 'undefined') return 'server';
    
    // Non-PII fingerprint for security tracking
    const components = [
      navigator.userAgent.slice(0, 50),
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset().toString()
    ];
    
    let hash = 0;
    const str = components.join('|');
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(36);
  }

  private reportToSecurityService(event: SecurityEvent) {
    // In production, send to your security monitoring service
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security Event:', event);
    }
    
    // Example: Send to external security service
    // fetch('/api/security/report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // });
  }

  // Get security statistics (anonymized)
  getStats() {
    const stats = {
      totalEvents: this.events.length,
      eventTypes: {} as Record<string, number>,
      recentEvents: this.events.slice(-10).map(e => ({
        type: e.type,
        timestamp: e.timestamp
      }))
    };

    this.events.forEach(event => {
      stats.eventTypes[event.type] = (stats.eventTypes[event.type] || 0) + 1;
    });

    return stats;
  }

  // Clear old events
  cleanup() {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    this.events = this.events.filter(event => event.timestamp > oneWeekAgo);
  }
}

// Global security monitor instance
export const securityMonitor = new SecurityMonitor();

// Initialize security monitoring
export const initSecurityMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Monitor CSP violations
  document.addEventListener('securitypolicyviolation', (e) => {
    securityMonitor.logEvent('csp_violation', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      documentURI: e.documentURI
    });
  });

  // Monitor suspicious form activity
  document.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    if (target.type === 'text' || target.type === 'email' || target.tagName === 'TEXTAREA') {
      const value = target.value;
      
      // Check for common attack patterns
      const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,
        /eval\(/i,
        /document\.cookie/i,
        /window\.location/i
      ];
      
      if (suspiciousPatterns.some(pattern => pattern.test(value))) {
        securityMonitor.logEvent('form_attack', {
          fieldName: target.name || 'unknown',
          pattern: 'xss_attempt',
          length: value.length
        });
      }
    }
  });

  // Monitor rapid form submissions (potential bot activity)
  let lastSubmission = 0;
  document.addEventListener('submit', (e) => {
    const now = Date.now();
    if (now - lastSubmission < 2000) { // Less than 2 seconds
      securityMonitor.logEvent('suspicious_activity', {
        type: 'rapid_submission',
        timeDiff: now - lastSubmission
      });
    }
    lastSubmission = now;
  });

  // Cleanup old events periodically
  setInterval(() => {
    securityMonitor.cleanup();
  }, 60 * 60 * 1000); // Every hour
};

// Export for use in components
export { SecurityEvent };