-- Enable RLS on tables
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published pages
CREATE POLICY "Public can read published pages" ON pages
  FOR SELECT
  USING (is_published = true);

-- Policy: Authenticated users can do everything with pages
CREATE POLICY "Authenticated users can manage pages" ON pages
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: Anyone can read sections of published pages
CREATE POLICY "Public can read sections of published pages" ON sections
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pages 
      WHERE pages.id = sections.page_id 
      AND pages.is_published = true
    )
  );

-- Policy: Authenticated users can manage all sections
CREATE POLICY "Authenticated users can manage sections" ON sections
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
