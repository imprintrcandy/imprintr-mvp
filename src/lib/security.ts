import DOMPurify from 'dompurify';

// Configure DOMPurify for safe HTML sanitization
const purifyConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_DOM_IMPORT: false,
};

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (dirty: string): string => {
  if (!dirty || typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, purifyConfig);
};

/**
 * Sanitize plain text content
 */
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/[<>]/g, '') // Remove potential HTML brackets
    .trim()
    .slice(0, 1000); // Limit length
};

/**
 * Validate and sanitize user input for forms
 */
export const sanitizeFormInput = (input: string, maxLength: number = 500): string => {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>'"]/g, '') // Remove potentially dangerous characters
    .slice(0, maxLength);
};

/**
 * Sanitize email addresses
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase().slice(0, 254); // RFC 5321 limit
};

/**
 * Check if user has admin role (for client-side UI only)
 * Note: This should always be verified on the server side
 */
export const isAdmin = (userRole?: string | null): boolean => {
  return userRole === 'super_admin';
};

/**
 * Log security events for monitoring
 */
export const logSecurityEvent = async (
  eventType: string, 
  details: Record<string, any> = {},
  riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
) => {
  // This would typically send to a logging service
  console.log('[Security Event]', {
    eventType,
    details: sanitizeText(JSON.stringify(details)),
    riskLevel,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
};

/**
 * Rate limiting helper for client-side
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    const attempts = this.attempts.get(key) || [];
    const recentAttempts = attempts.filter(time => time > windowStart);
    
    if (recentAttempts.length >= maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }
  
  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Secure file validation
 */
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }
  
  // Check for suspicious file names
  if (file.name.includes('../') || file.name.includes('..\\')) {
    return { valid: false, error: 'Invalid file name.' };
  }
  
  return { valid: true };
};

/**
 * Content Security Policy helpers
 */
export const CSP_DIRECTIVES = {
  'default-src': "'self'",
  'script-src': "'self' 'unsafe-inline'", // Note: unsafe-inline should be removed in production
  'style-src': "'self' 'unsafe-inline'",
  'img-src': "'self' data: https:",
  'font-src': "'self' https:",
  'connect-src': "'self' https://eprvbtrqsxecugufmjri.supabase.co",
  'frame-ancestors': "'none'",
  'base-uri': "'self'",
  'form-action': "'self'",
};