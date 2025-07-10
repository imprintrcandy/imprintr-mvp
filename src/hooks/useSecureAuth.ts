import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent, rateLimiter } from '@/lib/security';

export const useSecureAuth = () => {
  const { user, session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !session) {
        setIsAdmin(false);
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        // Verify admin status server-side through RLS
        const { data, error } = await supabase
          .from('Users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setUserRole(null);
        } else {
          const role = data?.role || 'user';
          setUserRole(role);
          setIsAdmin(role === 'super_admin');
          
          // Log admin access
          if (role === 'super_admin') {
            logSecurityEvent('admin_access', { userId: user.id }, 'medium');
          }
        }
      } catch (error) {
        console.error('Error in admin check:', error);
        setIsAdmin(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, session]);

  const requireAuth = (): boolean => {
    if (!user || !session) {
      logSecurityEvent('unauthorized_access_attempt', {}, 'medium');
      return false;
    }
    return true;
  };

  const requireAdmin = (): boolean => {
    if (!requireAuth()) return false;
    
    if (!isAdmin) {
      logSecurityEvent('unauthorized_admin_access_attempt', { userId: user?.id }, 'high');
      return false;
    }
    
    return true;
  };

  const secureApiCall = async <T>(
    operation: () => Promise<T>,
    rateLimitKey?: string
  ): Promise<T | null> => {
    // Rate limiting check
    if (rateLimitKey && !rateLimiter.isAllowed(rateLimitKey)) {
      logSecurityEvent('rate_limit_exceeded', { key: rateLimitKey }, 'medium');
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Auth check
    if (!requireAuth()) {
      throw new Error('Authentication required');
    }

    try {
      return await operation();
    } catch (error) {
      logSecurityEvent('api_call_error', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        userId: user?.id 
      }, 'low');
      throw error;
    }
  };

  const secureAdminCall = async <T>(
    operation: () => Promise<T>,
    rateLimitKey?: string
  ): Promise<T | null> => {
    if (!requireAdmin()) {
      throw new Error('Admin access required');
    }

    return secureApiCall(operation, rateLimitKey);
  };

  return {
    user,
    session,
    isAdmin,
    userRole,
    loading,
    requireAuth,
    requireAdmin,
    secureApiCall,
    secureAdminCall,
  };
};