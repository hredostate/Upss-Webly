-- Idempotent full schema for UPSS CMS, media, and alumni features
-- Re-runnable script to create tables, policies, and triggers without duplicates

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Shared updated_at helper
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------
-- Core CMS pages & sections
-- -----------------------
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  track_type VARCHAR(50) DEFAULT 'general' CHECK (track_type IN ('general', 'foundation', 'science', 'humanities', 'business')),
  is_home_page BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  title VARCHAR(255),
  subtitle TEXT,
  content TEXT,
  content_json JSONB,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Normalize the section type constraint to the latest set
ALTER TABLE sections DROP CONSTRAINT IF EXISTS sections_type_check;
ALTER TABLE sections ADD CONSTRAINT sections_type_check CHECK (
  type IN (
    'HERO', 'TEXT_BLOCK', 'VALUE_COLUMNS', 'STATS', 'CTA_BANNER', 'PROCESS_STEPS',
    'LIST_BLOCK', 'SIGNATURE_BLOCK', 'FEATURE_LIST', 'NEWS_LIST', 'IMAGE_GALLERY',
    'FAQ', 'TESTIMONIALS', 'CONTACT_FORM', 'VIDEO_HERO', 'VIDEO_EMBED', 'VIDEO_GALLERY', 'VIDEO_BLOCK'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(page_id, order_index);

-- Triggers
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_sections_updated_at ON sections;
CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published pages" ON pages;
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can manage pages" ON pages;
CREATE POLICY "Authenticated users can manage pages" ON pages
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Public can read sections of published pages" ON sections;
CREATE POLICY "Public can read sections of published pages" ON sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pages
      WHERE pages.id = sections.page_id
        AND pages.is_published = true
    )
  );

DROP POLICY IF EXISTS "Authenticated users can manage sections" ON sections;
CREATE POLICY "Authenticated users can manage sections" ON sections
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- -----------------------
-- Media library
-- -----------------------
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL CHECK (file_type IN ('image', 'video', 'document', 'audio')),
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  duration INTEGER,
  thumbnail_url TEXT,
  video_width INTEGER,
  video_height INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text VARCHAR(255),
  caption TEXT,
  description TEXT,
  folder VARCHAR(100) DEFAULT 'general',
  tags TEXT[],
  is_public BOOLEAN DEFAULT TRUE,
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_file_type ON media(file_type);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);

DROP TRIGGER IF EXISTS update_media_updated_at ON media;
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -----------------------
-- Alumni domain
-- -----------------------
CREATE TABLE IF NOT EXISTS alumni_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  maiden_name VARCHAR(100),
  name_while_enrolled VARCHAR(200), -- Full name used during time at UPSS (historical)
  school_nickname VARCHAR(100), -- Nickname known by during time at UPSS
  nickname VARCHAR(100), -- Current nickname
  gender VARCHAR(20),
  date_of_birth DATE,
  graduation_year INTEGER NOT NULL,
  entry_year INTEGER,
  house VARCHAR(50),
  track VARCHAR(100),
  class_name VARCHAR(100),
  school_photo_url TEXT,
  recent_photo_url TEXT,
  cover_photo_url TEXT,
  bio TEXT,
  favorite_memory TEXT,
  favorite_teacher VARCHAR(100),
  message_to_students TEXT,
  occupation VARCHAR(100),
  job_title VARCHAR(100),
  company VARCHAR(200),
  industry VARCHAR(100),
  years_of_experience INTEGER,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  website_url TEXT,
  highest_degree VARCHAR(100),
  university VARCHAR(200),
  field_of_study VARCHAR(100),
  willing_to_mentor BOOLEAN DEFAULT false,
  available_for_career_talks BOOLEAN DEFAULT false,
  interested_in_donations BOOLEAN DEFAULT false,
  can_offer_internships BOOLEAN DEFAULT false,
  profile_visibility VARCHAR(20) DEFAULT 'public',
  show_email BOOLEAN DEFAULT false,
  show_phone BOOLEAN DEFAULT false,
  show_location BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  profile_completed BOOLEAN DEFAULT false,
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  post_type VARCHAR(50),
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  event_date TIMESTAMPTZ NOT NULL,
  event_time VARCHAR(20),
  location VARCHAR(255),
  venue VARCHAR(255),
  image_url TEXT,
  organizer_id UUID REFERENCES alumni_profiles(id),
  chapter_id UUID,
  max_attendees INTEGER,
  is_virtual BOOLEAN DEFAULT false,
  meeting_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES alumni_events(id) ON DELETE CASCADE,
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'registered',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, alumni_id)
);

CREATE TABLE IF NOT EXISTS alumni_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  donation_type VARCHAR(50),
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency VARCHAR(20),
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_reference VARCHAR(255),
  donor_name VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT false,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentorship_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  area_of_mentorship VARCHAR(255),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mentor_id, mentee_id)
);

CREATE TABLE IF NOT EXISTS alumni_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  parent_message_id UUID REFERENCES alumni_messages(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) NOT NULL,
  description TEXT,
  coordinator_id UUID REFERENCES alumni_profiles(id),
  whatsapp_link TEXT,
  member_count INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  graduation_year INTEGER UNIQUE NOT NULL,
  class_name VARCHAR(255),
  class_motto TEXT,
  class_photo_url TEXT,
  coordinator_id UUID REFERENCES alumni_profiles(id),
  whatsapp_link TEXT,
  member_count INTEGER DEFAULT 0,
  countries_represented INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alumni indexes
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_user_id ON alumni_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_graduation_year ON alumni_profiles(graduation_year);
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_email ON alumni_profiles(email);
CREATE INDEX IF NOT EXISTS idx_alumni_posts_alumni_id ON alumni_posts(alumni_id);
CREATE INDEX IF NOT EXISTS idx_alumni_events_event_date ON alumni_events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_alumni_id ON event_registrations(alumni_id);
CREATE INDEX IF NOT EXISTS idx_alumni_messages_sender_id ON alumni_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_alumni_messages_recipient_id ON alumni_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentor_id ON mentorship_connections(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentee_id ON mentorship_connections(mentee_id);

-- Alumni triggers
DROP TRIGGER IF EXISTS update_alumni_profiles_updated_at ON alumni_profiles;
CREATE TRIGGER update_alumni_profiles_updated_at BEFORE UPDATE ON alumni_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_alumni_posts_updated_at ON alumni_posts;
CREATE TRIGGER update_alumni_posts_updated_at BEFORE UPDATE ON alumni_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_alumni_events_updated_at ON alumni_events;
CREATE TRIGGER update_alumni_events_updated_at BEFORE UPDATE ON alumni_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_mentorship_connections_updated_at ON mentorship_connections;
CREATE TRIGGER update_mentorship_connections_updated_at BEFORE UPDATE ON mentorship_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_alumni_chapters_updated_at ON alumni_chapters;
CREATE TRIGGER update_alumni_chapters_updated_at BEFORE UPDATE ON alumni_chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_class_sets_updated_at ON class_sets;
CREATE TRIGGER update_class_sets_updated_at BEFORE UPDATE ON class_sets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sets ENABLE ROW LEVEL SECURITY;

-- Alumni RLS policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON alumni_profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON alumni_profiles FOR SELECT
  USING (profile_visibility = 'public' OR profile_visibility = 'alumni_only');

DROP POLICY IF EXISTS "Users can insert their own profile" ON alumni_profiles;
CREATE POLICY "Users can insert their own profile"
  ON alumni_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON alumni_profiles;
CREATE POLICY "Users can update their own profile"
  ON alumni_profiles FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON alumni_posts;
CREATE POLICY "Published posts are viewable by everyone"
  ON alumni_posts FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Users can insert their own posts" ON alumni_posts;
CREATE POLICY "Users can insert their own posts"
  ON alumni_posts FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

DROP POLICY IF EXISTS "Users can update their own posts" ON alumni_posts;
CREATE POLICY "Users can update their own posts"
  ON alumni_posts FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

DROP POLICY IF EXISTS "Events are viewable by everyone" ON alumni_events;
CREATE POLICY "Events are viewable by everyone"
  ON alumni_events FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can view their own registrations" ON event_registrations;
CREATE POLICY "Users can view their own registrations"
  ON event_registrations FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

DROP POLICY IF EXISTS "Users can register for events" ON event_registrations;
CREATE POLICY "Users can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

DROP POLICY IF EXISTS "Users can view their own messages" ON alumni_messages;
CREATE POLICY "Users can view their own messages"
  ON alumni_messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM alumni_profiles
      WHERE id = sender_id OR id = recipient_id
    )
  );

DROP POLICY IF EXISTS "Users can send messages" ON alumni_messages;
CREATE POLICY "Users can send messages"
  ON alumni_messages FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = sender_id));

DROP POLICY IF EXISTS "Chapters are viewable by everyone" ON alumni_chapters;
CREATE POLICY "Chapters are viewable by everyone"
  ON alumni_chapters FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Class sets are viewable by everyone" ON class_sets;
CREATE POLICY "Class sets are viewable by everyone"
  ON class_sets FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can view their own mentorship connections" ON mentorship_connections;
CREATE POLICY "Users can view their own mentorship connections"
  ON mentorship_connections FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM alumni_profiles
      WHERE id = mentor_id OR id = mentee_id
    )
  );

DROP POLICY IF EXISTS "Non-anonymous donations are viewable" ON alumni_donations;
CREATE POLICY "Non-anonymous donations are viewable"
  ON alumni_donations FOR SELECT
  USING (is_anonymous = false);

-- -----------------------
-- Storage bucket guidance (manual step in Supabase dashboard)
-- -----------------------
-- Uncomment to create buckets directly if you have access:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true) ON CONFLICT (id) DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;
--
-- Policies would mirror the bucket_id guards shown below once buckets exist:
-- DROP POLICY IF EXISTS "Public can view videos" ON storage.objects;
-- CREATE POLICY "Public can view videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');
-- DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
-- CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
-- DROP POLICY IF EXISTS "Authenticated users can delete their videos" ON storage.objects;
-- CREATE POLICY "Authenticated users can delete their videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos');
-- DROP POLICY IF EXISTS "Authenticated users can update their videos" ON storage.objects;
-- CREATE POLICY "Authenticated users can update their videos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'videos');
--
-- Repeat the same policy pattern for the 'images' bucket as needed.
