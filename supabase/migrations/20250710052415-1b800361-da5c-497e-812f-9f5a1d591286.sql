-- Phase 1: Critical RLS Policy Fixes

-- Fix Users table policies - add missing INSERT/UPDATE policies
CREATE POLICY "Users can insert their own profile" ON public."Users"
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public."Users"
FOR UPDATE USING (auth.uid() = id);

-- Fix imprints table policies - add user-level policies
CREATE POLICY "Users can view imprints they sent or received" ON public.imprints
FOR SELECT USING (
  from_user_id = auth.uid() OR 
  to_user_id = auth.uid()
);

CREATE POLICY "Users can create imprints" ON public.imprints
FOR INSERT WITH CHECK (from_user_id = auth.uid());

CREATE POLICY "Users can update their own sent imprints" ON public.imprints
FOR UPDATE USING (from_user_id = auth.uid());

CREATE POLICY "Users can delete their own sent imprints" ON public.imprints
FOR DELETE USING (from_user_id = auth.uid());

-- Fix challenge_participations policies - add user policies for joining/leaving
CREATE POLICY "Users can join challenges" ON public.challenge_participations
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own participations" ON public.challenge_participations
FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can leave challenges" ON public.challenge_participations
FOR DELETE USING (user_id = auth.uid());

-- Fix brand_reviews - add missing DELETE policy
CREATE POLICY "Users can delete their own reviews" ON public.brand_reviews
FOR DELETE USING (auth.uid() = user_id);

-- Strengthen super admin policies with additional verification
CREATE POLICY "Super admins can manage franchise regions" ON public.franchise_regions
FOR ALL USING (
  EXISTS (SELECT 1 FROM public."Users" WHERE id = auth.uid() AND role = 'super_admin')
);

-- Add audit logging table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES public."Users"(id),
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Only super admins can access audit logs
CREATE POLICY "Super admins can access audit logs" ON public.admin_audit_log
FOR ALL USING (
  EXISTS (SELECT 1 FROM public."Users" WHERE id = auth.uid() AND role = 'super_admin')
);

-- Add user privacy settings table
CREATE TABLE IF NOT EXISTS public.user_privacy_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public."Users"(id) UNIQUE,
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'friends')),
  badge_visibility TEXT DEFAULT 'public' CHECK (badge_visibility IN ('public', 'private', 'friends')),
  imprint_visibility TEXT DEFAULT 'public' CHECK (imprint_visibility IN ('public', 'private', 'friends')),
  allow_imprints_from TEXT DEFAULT 'everyone' CHECK (allow_imprints_from IN ('everyone', 'friends', 'nobody')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on privacy settings
ALTER TABLE public.user_privacy_settings ENABLE ROW LEVEL SECURITY;

-- Users can manage their own privacy settings
CREATE POLICY "Users can manage their own privacy settings" ON public.user_privacy_settings
FOR ALL USING (user_id = auth.uid());

-- Create trigger for privacy settings updates
CREATE TRIGGER update_user_privacy_settings_updated_at
  BEFORE UPDATE ON public.user_privacy_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add security event logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public."Users"(id),
  event_type TEXT NOT NULL,
  event_details JSONB,
  ip_address INET,
  user_agent TEXT,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only super admins and the user themselves can view security events
CREATE POLICY "Users can view their own security events" ON public.security_events
FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public."Users" WHERE id = auth.uid() AND role = 'super_admin')
);

-- Super admins can insert security events
CREATE POLICY "Super admins can manage security events" ON public.security_events
FOR ALL USING (
  EXISTS (SELECT 1 FROM public."Users" WHERE id = auth.uid() AND role = 'super_admin')
);