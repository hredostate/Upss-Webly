-- Create storage buckets for videos and images
-- Note: This is typically done via Supabase dashboard or API, but documented here for reference

-- Videos bucket (to be created in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);

-- Images bucket (to be created in Supabase dashboard)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- RLS policies for videos bucket (to be created after bucket exists)
/*
CREATE POLICY "Public can view videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can upload videos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Authenticated users can delete their videos" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'videos');

CREATE POLICY "Authenticated users can update their videos" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'videos');
*/

-- RLS policies for images bucket
/*
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete their images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can update their images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'images');
*/
