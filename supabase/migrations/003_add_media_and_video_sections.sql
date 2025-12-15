-- Create media table for video and image uploads
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- File Info
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL CHECK (file_type IN ('image', 'video', 'document', 'audio')),
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  
  -- Video Specific
  duration INTEGER, -- in seconds
  thumbnail_url TEXT,
  video_width INTEGER,
  video_height INTEGER,
  
  -- Image Specific
  width INTEGER,
  height INTEGER,
  
  -- Metadata
  alt_text VARCHAR(255),
  caption TEXT,
  description TEXT,
  
  -- Organization
  folder VARCHAR(100) DEFAULT 'general',
  tags TEXT[],
  
  -- Status
  is_public BOOLEAN DEFAULT TRUE,
  uploaded_by UUID,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_file_type ON media(file_type);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);

-- Add trigger to auto-update updated_at
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update sections table to include video section types
ALTER TABLE sections DROP CONSTRAINT IF EXISTS sections_type_check;
ALTER TABLE sections ADD CONSTRAINT sections_type_check CHECK (type IN (
  'HERO', 'TEXT_BLOCK', 'VALUE_COLUMNS', 'STATS', 'CTA_BANNER', 
  'PROCESS_STEPS', 'LIST_BLOCK', 'SIGNATURE_BLOCK', 'FEATURE_LIST', 'NEWS_LIST',
  'VIDEO_HERO', 'VIDEO_EMBED', 'VIDEO_GALLERY', 'VIDEO_BLOCK'
));
