-- Alumni Profiles Table
CREATE TABLE IF NOT EXISTS alumni_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Account & Basic Info
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  maiden_name VARCHAR(100),
  name_while_enrolled VARCHAR(200), -- Full name used during time at UPSS (historical)
  school_nickname VARCHAR(100), -- Nickname known by during time at UPSS
  nickname VARCHAR(100), -- Current nickname
  gender VARCHAR(20),
  date_of_birth DATE,
  
  -- UPSS Info
  graduation_year INTEGER NOT NULL,
  entry_year INTEGER,
  house VARCHAR(50),
  track VARCHAR(100),
  class_name VARCHAR(100),
  
  -- Photos
  school_photo_url TEXT,
  recent_photo_url TEXT,
  cover_photo_url TEXT,
  
  -- Bio
  bio TEXT,
  favorite_memory TEXT,
  favorite_teacher VARCHAR(100),
  message_to_students TEXT,
  
  -- Career
  occupation VARCHAR(100),
  job_title VARCHAR(100),
  company VARCHAR(200),
  industry VARCHAR(100),
  years_of_experience INTEGER,
  
  -- Location
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  
  -- Social Media
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  website_url TEXT,
  
  -- Education
  highest_degree VARCHAR(100),
  university VARCHAR(200),
  field_of_study VARCHAR(100),
  
  -- Give Back
  willing_to_mentor BOOLEAN DEFAULT false,
  available_for_career_talks BOOLEAN DEFAULT false,
  interested_in_donations BOOLEAN DEFAULT false,
  can_offer_internships BOOLEAN DEFAULT false,
  
  -- Privacy Settings
  profile_visibility VARCHAR(20) DEFAULT 'public', -- public, alumni_only, private
  show_email BOOLEAN DEFAULT false,
  show_phone BOOLEAN DEFAULT false,
  show_location BOOLEAN DEFAULT true,
  
  -- Profile Status
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  profile_completed BOOLEAN DEFAULT false,
  completion_percentage INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alumni Posts Table
CREATE TABLE IF NOT EXISTS alumni_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  post_type VARCHAR(50), -- achievement, update, announcement
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alumni Events Table
CREATE TABLE IF NOT EXISTS alumni_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- reunion, networking, career_talk, social
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

-- Event Registrations Table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES alumni_events(id) ON DELETE CASCADE,
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'registered', -- registered, attended, cancelled
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, alumni_id)
);

-- Alumni Donations Table
CREATE TABLE IF NOT EXISTS alumni_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_id UUID REFERENCES alumni_profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  donation_type VARCHAR(50), -- scholarship, infrastructure, sports, general
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency VARCHAR(20), -- monthly, quarterly, annual
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
  payment_reference VARCHAR(255),
  donor_name VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT false,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mentorship Connections Table
CREATE TABLE IF NOT EXISTS mentorship_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES alumni_profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, completed, declined
  area_of_mentorship VARCHAR(255),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mentor_id, mentee_id)
);

-- Alumni Messages Table
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

-- Alumni Chapters Table
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

-- Class Sets Table
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

-- Create indexes for better query performance
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

-- Enable Row Level Security
ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for alumni_profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON alumni_profiles FOR SELECT
  USING (profile_visibility = 'public' OR profile_visibility = 'alumni_only');

CREATE POLICY "Users can insert their own profile"
  ON alumni_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON alumni_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for alumni_posts
CREATE POLICY "Published posts are viewable by everyone"
  ON alumni_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can insert their own posts"
  ON alumni_posts FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

CREATE POLICY "Users can update their own posts"
  ON alumni_posts FOR UPDATE
  USING (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

-- RLS Policies for alumni_events
CREATE POLICY "Events are viewable by everyone"
  ON alumni_events FOR SELECT
  USING (true);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view their own registrations"
  ON event_registrations FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

CREATE POLICY "Users can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = alumni_id));

-- RLS Policies for alumni_messages
CREATE POLICY "Users can view their own messages"
  ON alumni_messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM alumni_profiles 
      WHERE id = sender_id OR id = recipient_id
    )
  );

CREATE POLICY "Users can send messages"
  ON alumni_messages FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM alumni_profiles WHERE id = sender_id));

-- RLS Policies for alumni_chapters
CREATE POLICY "Chapters are viewable by everyone"
  ON alumni_chapters FOR SELECT
  USING (true);

-- RLS Policies for class_sets
CREATE POLICY "Class sets are viewable by everyone"
  ON class_sets FOR SELECT
  USING (true);

-- RLS Policies for mentorship_connections
CREATE POLICY "Users can view their own mentorship connections"
  ON mentorship_connections FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM alumni_profiles 
      WHERE id = mentor_id OR id = mentee_id
    )
  );

-- RLS Policies for alumni_donations (anonymous viewing)
CREATE POLICY "Non-anonymous donations are viewable"
  ON alumni_donations FOR SELECT
  USING (is_anonymous = false);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_alumni_profiles_updated_at
  BEFORE UPDATE ON alumni_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_posts_updated_at
  BEFORE UPDATE ON alumni_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_events_updated_at
  BEFORE UPDATE ON alumni_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentorship_connections_updated_at
  BEFORE UPDATE ON mentorship_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_chapters_updated_at
  BEFORE UPDATE ON alumni_chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_class_sets_updated_at
  BEFORE UPDATE ON class_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
