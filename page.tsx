'use client';

import React from 'react';
import { Shield, Lock, Eye, Server, AlertTriangle, CheckCircle, Key, Database, Monitor, FileText } from 'lucide-react';

export default function SecurityPracticesPage() {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <Shield className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Security Practices
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach to protecting your data and ensuring the security of our platform.
          </p>
        </div>

        {/* Security Overview */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Security Commitment</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At NuviaMind, security is not an afterthought—it's built into every aspect of our platform. We implement 
            industry-leading security practices to protect your personal information, mental health data, and ensure 
            the integrity of our services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Zero Trust Architecture</h3>
                <p className="text-sm text-gray-600">Every request is verified and authenticated</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600">Data protected at rest and in transit</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Regular Security Audits</h3>
                <p className="text-sm text-gray-600">Continuous monitoring and assessment</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Compliance Standards</h3>
                <p className="text-sm text-gray-600">GDPR, CCPA, and HIPAA ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <Database className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Data Protection</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Encryption Standards</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <Lock className="text-green-500 mr-3" size={16} />
                  <span><strong>AES-256 encryption</strong> for data at rest</span>
                </li>
                <li className="flex items-center">
                  <Lock className="text-green-500 mr-3" size={16} />
                  <span><strong>TLS 1.3</strong> for data in transit</span>
                </li>
                <li className="flex items-center">
                  <Lock className="text-green-500 mr-3" size={16} />
                  <span><strong>End-to-end encryption</strong> for sensitive communications</span>
                </li>
                <li className="flex items-center">
                  <Lock className="text-green-500 mr-3" size={16} />
                  <span><strong>Hardware Security Modules (HSM)</strong> for key management</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Minimization</h3>
              <p className="text-gray-700 mb-3">
                We collect only the data necessary to provide our services and delete it when no longer needed:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Automatic data retention policies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>User-controlled data deletion</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Anonymization of analytics data</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>No unnecessary data collection</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Access Control */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <Key className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Access Control & Authentication</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Authentication</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Multi-factor authentication (MFA)</strong>
                    <p className="text-sm text-gray-600">Optional but recommended for all accounts</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Strong password requirements</strong>
                    <p className="text-sm text-gray-600">Minimum 8 characters with complexity rules</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Session management</strong>
                    <p className="text-sm text-gray-600">Automatic logout and secure session tokens</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Internal Access</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Role-based access control (RBAC)</strong>
                    <p className="text-sm text-gray-600">Least privilege principle for all staff</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Regular access reviews</strong>
                    <p className="text-sm text-gray-600">Quarterly audits of user permissions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1" size={16} />
                  <div>
                    <strong>Audit logging</strong>
                    <p className="text-sm text-gray-600">Complete logs of all data access</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Infrastructure Security */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <Server className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Infrastructure Security</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Network Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>Web Application Firewall (WAF)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>DDoS protection and mitigation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>Network segmentation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>Intrusion detection systems</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>VPN access for remote work</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>Regular penetration testing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>24/7 security monitoring</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-3" size={16} />
                    <span>Automated threat detection</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cloud Security</h3>
              <p className="text-gray-700 mb-3">
                Our cloud infrastructure follows industry best practices:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>SOC 2 Type II certified cloud providers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Data residency controls</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Automated backup and disaster recovery</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Infrastructure as Code (IaC) for consistency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Security */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <Monitor className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Application Security</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Secure Development</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Development Practices</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Secure coding standards</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Code review requirements</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Static application security testing (SAST)</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Dynamic application security testing (DAST)</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security Controls</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Input validation and sanitization</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>SQL injection prevention</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Cross-site scripting (XSS) protection</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={14} />
                      <span>Cross-site request forgery (CSRF) protection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Security Headers</h3>
              <p className="text-gray-700 mb-4">
                We implement comprehensive security headers to protect against common web vulnerabilities:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Content Security Policy (CSP)</strong>
                    <p className="text-gray-600">Prevents XSS and data injection attacks</p>
                  </div>
                  <div>
                    <strong>Strict Transport Security (HSTS)</strong>
                    <p className="text-gray-600">Enforces secure HTTPS connections</p>
                  </div>
                  <div>
                    <strong>X-Frame-Options</strong>
                    <p className="text-gray-600">Prevents clickjacking attacks</p>
                  </div>
                  <div>
                    <strong>X-Content-Type-Options</strong>
                    <p className="text-gray-600">Prevents MIME type sniffing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Response */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <AlertTriangle className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Incident Response</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Response Plan</h3>
              <p className="text-gray-700 mb-4">
                We maintain a comprehensive incident response plan to quickly address any security issues:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Detection & Analysis</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 24/7 security monitoring</li>
                    <li>• Automated threat detection</li>
                    <li>• Real-time alerting systems</li>
                    <li>• Forensic analysis capabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Containment & Recovery</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Immediate threat isolation</li>
                    <li>• System restoration procedures</li>
                    <li>• Data integrity verification</li>
                    <li>• Service continuity planning</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
              <p className="text-gray-700 mb-3">
                In the event of a security incident that may affect user data:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Immediate internal escalation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Timely user notification (within 72 hours)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Regulatory authority notification as required</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-3" size={16} />
                  <span>Transparent communication about impact and remediation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance & Auditing */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-12">
          <div className="flex items-center mb-6">
            <FileText className="text-teal-600 mr-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Compliance & Auditing</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">GDPR</h4>
                  <p className="text-sm text-gray-600">European data protection compliance</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">CCPA</h4>
                  <p className="text-sm text-gray-600">California privacy rights protection</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">HIPAA Ready</h4>
                  <p className="text-sm text-gray-600">Healthcare data protection standards</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Regular Audits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Internal Audits</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Monthly security assessments</li>
                    <li>• Quarterly compliance reviews</li>
                    <li>• Annual risk assessments</li>
                    <li>• Continuous monitoring programs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">External Audits</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Annual third-party security audits</li>
                    <li>• Penetration testing by certified firms</li>
                    <li>• Compliance certification reviews</li>
                    <li>• Vulnerability assessments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-8 rounded-2xl border border-teal-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Security Contact
          </h2>
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              If you discover a security vulnerability or have security-related questions, please contact our security team:
            </p>
            <div className="bg-white p-6 rounded-lg inline-block">
              <p className="text-gray-700">
                <strong>Email:</strong> security@nuviamind.com<br />
                <strong>Subject Line:</strong> Security Issue Report<br />
                <strong>Response Time:</strong> Within 24 hours
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              We appreciate responsible disclosure and will work with security researchers to address any issues promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}