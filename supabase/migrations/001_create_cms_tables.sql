-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  track_type VARCHAR(50) DEFAULT 'general' CHECK (track_type IN ('general', 'foundation', 'science', 'humanities', 'business')),
  is_home_page BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('HERO', 'TEXT_BLOCK', 'VALUE_COLUMNS', 'STATS', 'CTA_BANNER', 'PROCESS_STEPS', 'LIST_BLOCK', 'SIGNATURE_BLOCK', 'FEATURE_LIST', 'NEWS_LIST', 'IMAGE_GALLERY', 'FAQ', 'TESTIMONIALS', 'CONTACT_FORM')),
  order_index INTEGER NOT NULL DEFAULT 0,
  title VARCHAR(255),
  subtitle TEXT,
  content TEXT,
  content_json JSONB,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sections_page_id ON sections(page_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(page_id, order_index);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sections_updated_at BEFORE UPDATE ON sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
