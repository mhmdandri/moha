-- ========================================================
-- Moha Project - Supabase Database & Storage Setup Schema
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ========================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link TEXT,
  github_url TEXT,
  category TEXT DEFAULT 'Fullstack Project',
  tech_stack TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Projects Table Security Policies
DROP POLICY IF EXISTS "Public can view projects" ON public.projects;
CREATE POLICY "Public can view projects"
  ON public.projects FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admin can insert projects" ON public.projects;
CREATE POLICY "Admin can insert projects"
  ON public.projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admin can update projects" ON public.projects;
CREATE POLICY "Admin can update projects"
  ON public.projects FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Admin can delete projects" ON public.projects;
CREATE POLICY "Admin can delete projects"
  ON public.projects FOR DELETE
  TO authenticated
  USING (true);

-- 4. Create Storage Bucket for Project Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Storage Security Policies
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
CREATE POLICY "Public can view project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Admin can upload project images" ON storage.objects;
CREATE POLICY "Admin can upload project images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Admin can update project images" ON storage.objects;
CREATE POLICY "Admin can update project images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Admin can delete project images" ON storage.objects;
CREATE POLICY "Admin can delete project images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'project-images');

-- 6. Insert Initial Seed Data (Existing Projects)
INSERT INTO public.projects (title, description, image_url, link, category, tech_stack, order_index)
VALUES 
  ('Andri & Cica Wedding', 'Undangan digital interaktif dengan fitur QR Code Check-in dan konfirmasi kehadiran (RSVP) realtime.', '/project5.png', 'https://weddingofandricica.me', 'Wedding Invitation', ARRAY['Next.js', 'Tailwind CSS', 'QR Code', 'RSVP'], 1),
  ('Personal Brand', 'Web Design and Personal Portfolio', '/project3.png', 'https://mohaproject.tech/', 'Personal Brand', ARRAY['Next.js', 'Tailwind CSS', 'Figma'], 2),
  ('Fullstack Project', 'Sistem berbasis web CDMS', '/project1.png', 'https://cdms.mohaproject.tech/', 'Fullstack Project', ARRAY['Next.js', 'TypeScript', 'Node.js'], 3),
  ('Fullstack Project', 'Sistem berbasis web CORS', '/project4.png', 'https://cors.mohaproject.tech/', 'Fullstack Project', ARRAY['React', 'Express', 'MongoDB'], 4),
  ('Fullstack Project', 'Digital Wedding Invitation Summary', '/project6.png', 'https://wedding.mohaproject.tech/summary', 'Wedding Invitation', ARRAY['Next.js', 'Tailwind CSS', 'Motion'], 5)
ON CONFLICT DO NOTHING;
