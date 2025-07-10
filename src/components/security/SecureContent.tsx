import React from 'react';
import { sanitizeHtml, sanitizeText } from '@/lib/security';

interface SecureContentProps {
  content: string;
  type?: 'html' | 'text';
  className?: string;
  maxLength?: number;
}

/**
 * Component for safely displaying user-generated content
 */
export const SecureContent: React.FC<SecureContentProps> = ({
  content,
  type = 'text',
  className = '',
  maxLength,
}) => {
  if (!content) return null;

  let sanitizedContent = content;
  
  if (type === 'html') {
    sanitizedContent = sanitizeHtml(content);
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  } else {
    sanitizedContent = sanitizeText(content);
    if (maxLength && sanitizedContent.length > maxLength) {
      sanitizedContent = sanitizedContent.slice(0, maxLength) + '...';
    }
    return <span className={className}>{sanitizedContent}</span>;
  }
};

interface SecureLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Component for safely rendering external links
 */
export const SecureLink: React.FC<SecureLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  // Validate URL to prevent javascript: and data: schemes
  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  if (!isValidUrl(href)) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};