-- Add role support to users
ALTER TABLE public.Users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Create challenges table (extending brand_challenges concept)
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  creator_id UUID REFERENCES public.Users(id),
  region TEXT DEFAULT 'global',
  status TEXT DEFAULT 'active',
  badge_image_url TEXT,
  points INTEGER DEFAULT 10,
  participants_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenge participations table
CREATE TABLE IF NOT EXISTS public.challenge_participations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id),
  user_id UUID REFERENCES public.Users(id),
  status TEXT DEFAULT 'active', -- active, completed, abandoned
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

-- Create badges table
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.Users(id),
  challenge_id UUID REFERENCES public.challenges(id),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  story TEXT,
  nft_token_id TEXT,
  nft_transaction_hash TEXT,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create proof submissions table
CREATE TABLE IF NOT EXISTS public.proof_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID REFERENCES public.challenges(id),
  user_id UUID REFERENCES public.Users(id),
  proof_type TEXT NOT NULL, -- image, video, text
  proof_url TEXT,
  story TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  feedback TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.Users(id)
);

-- Create imprints table (testimonials)
CREATE TABLE IF NOT EXISTS public.imprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES public.Users(id),
  to_user_id UUID REFERENCES public.Users(id),
  content TEXT NOT NULL,
  type TEXT DEFAULT 'testimonial',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create franchise regions table
CREATE TABLE IF NOT EXISTS public.franchise_regions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL, -- ph, sg, etc
  subdomain TEXT UNIQUE NOT NULL, -- ph.imprintr.com
  admin_id UUID REFERENCES public.Users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proof_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.imprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_regions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Super Admin access
CREATE POLICY "Super admins can do everything on challenges" ON public.challenges
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admins can do everything on participations" ON public.challenge_participations
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admins can do everything on badges" ON public.badges
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admins can do everything on submissions" ON public.proof_submissions
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admins can do everything on imprints" ON public.imprints
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

CREATE POLICY "Super admins can do everything on regions" ON public.franchise_regions
FOR ALL USING (
  EXISTS (SELECT 1 FROM public.Users WHERE id = auth.uid() AND role = 'super_admin')
);

-- Public read policies for regular users
CREATE POLICY "Anyone can view active challenges" ON public.challenges
FOR SELECT USING (status = 'active');

CREATE POLICY "Users can view their own participations" ON public.challenge_participations
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can view their own badges" ON public.badges
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can submit their own proofs" ON public.proof_submissions
FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own submissions" ON public.proof_submissions
FOR SELECT USING (user_id = auth.uid());

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Set the super admin role for the specified email
UPDATE public.Users 
SET role = 'super_admin' 
WHERE email = 'leadgendarycandy@gmail.com';

-- Insert some sample data if the tables are empty
INSERT INTO public.franchise_regions (name, code, subdomain) VALUES 
('Philippines', 'ph', 'ph.imprintr.com'),
('Singapore', 'sg', 'sg.imprintr.com'),
('Global', 'global', 'imprintr.com')
ON CONFLICT (code) DO NOTHING;