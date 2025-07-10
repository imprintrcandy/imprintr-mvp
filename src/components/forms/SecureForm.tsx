import React from 'react';
import { sanitizeFormInput, sanitizeEmail, rateLimiter, logSecurityEvent } from '@/lib/security';
import { toast } from '@/hooks/use-toast';

interface SecureFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  rateLimitKey?: string;
  className?: string;
}

/**
 * Secure form wrapper with rate limiting and validation
 */
export const SecureForm: React.FC<SecureFormProps> = ({
  children,
  onSubmit,
  rateLimitKey,
  className = '',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (rateLimitKey && !rateLimiter.isAllowed(rateLimitKey)) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before trying again.",
        variant: "destructive",
      });
      logSecurityEvent('form_rate_limit_exceeded', { key: rateLimitKey }, 'medium');
      return;
    }
    
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

interface SecureInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  sanitizationType?: 'text' | 'email' | 'none';
  maxLength?: number;
}

/**
 * Secure input component with automatic sanitization
 */
export const SecureInput: React.FC<SecureInputProps> = ({
  value,
  onChange,
  sanitizationType = 'text',
  maxLength = 500,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let sanitizedValue = e.target.value;
    
    switch (sanitizationType) {
      case 'email':
        sanitizedValue = sanitizeEmail(sanitizedValue);
        break;
      case 'text':
        sanitizedValue = sanitizeFormInput(sanitizedValue, maxLength);
        break;
      case 'none':
        // No sanitization
        break;
      default:
        sanitizedValue = sanitizeFormInput(sanitizedValue, maxLength);
    }
    
    onChange(sanitizedValue);
  };

  return (
    <input
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
    />
  );
};

interface SecureTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

/**
 * Secure textarea component with automatic sanitization
 */
export const SecureTextarea: React.FC<SecureTextareaProps> = ({
  value,
  onChange,
  maxLength = 1000,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedValue = sanitizeFormInput(e.target.value, maxLength);
    onChange(sanitizedValue);
  };

  return (
    <textarea
      {...props}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
    />
  );
};