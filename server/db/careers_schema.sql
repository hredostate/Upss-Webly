-- Database schema for UPSS Employment Application System

-- Create job_categories table
CREATE TABLE IF NOT EXISTS job_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES job_categories(id) ON DELETE SET NULL,
  employment_type VARCHAR(50) CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  experience_level VARCHAR(50) CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  min_experience_years INTEGER DEFAULT 0,
  summary TEXT,
  description TEXT,
  responsibilities TEXT,
  requirements TEXT,
  qualifications TEXT,
  benefits TEXT,
  salary_min DECIMAL(12, 2),
  salary_max DECIMAL(12, 2),
  show_salary BOOLEAN DEFAULT FALSE,
  location VARCHAR(255),
  is_remote BOOLEAN DEFAULT FALSE,
  application_deadline TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed', 'filled')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_urgent BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applicants table (Applicant Accounts)
CREATE TABLE IF NOT EXISTS job_applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID, -- Can be linked to main users table if needed
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Nigeria',
  current_job_title VARCHAR(255),
  current_employer VARCHAR(255),
  years_of_experience INTEGER DEFAULT 0,
  highest_education VARCHAR(100),
  field_of_study VARCHAR(255),
  resume_url TEXT,
  cover_letter_url TEXT,
  photo_url TEXT,
  certificates_urls JSONB,
  bio TEXT,
  skills TEXT,
  linkedin_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID REFERENCES job_applicants(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  additional_documents JSONB,
  years_experience INTEGER,
  expected_salary DECIMAL(12, 2),
  available_start_date DATE,
  answers JSONB,
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN (
    'submitted', 'under_review', 'shortlisted', 'interview_scheduled', 
    'interview_completed', 'offer_extended', 'offer_accepted', 'hired', 
    'rejected', 'withdrawn'
  )),
  interview_date TIMESTAMP WITH TIME ZONE,
  interview_location VARCHAR(255),
  interview_type VARCHAR(50) CHECK (interview_type IN ('in-person', 'phone', 'video', 'panel')),
  interview_notes TEXT,
  hr_notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  reviewed_by UUID, -- Can reference users/admins table
  reviewed_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create application_status_history table
CREATE TABLE IF NOT EXISTS application_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES job_applications(id) ON DELETE CASCADE,
  previous_status VARCHAR(50),
  new_status VARCHAR(50),
  notes TEXT,
  changed_by UUID, -- Can reference users/admins table
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_jobs table
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID REFERENCES job_applicants(id) ON DELETE CASCADE,
  job_id UUID REFERENCES job_listings(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(applicant_id, job_id)
);

-- Create job_alerts table
CREATE TABLE IF NOT EXISTS job_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id UUID REFERENCES job_applicants(id) ON DELETE CASCADE,
  alert_name VARCHAR(255) NOT NULL,
  categories JSONB,
  keywords TEXT,
  employment_types JSONB,
  frequency VARCHAR(50) CHECK (frequency IN ('daily', 'weekly', 'immediate')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_listings_category_id ON job_listings(category_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_status ON job_listings(status);
CREATE INDEX IF NOT EXISTS idx_job_listings_slug ON job_listings(slug);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON job_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_application_status_history_application_id ON application_status_history(application_id);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_applicant_id ON saved_jobs(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_alerts_applicant_id ON job_alerts(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_applicants_email ON job_applicants(email);

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_job_listings_updated_at BEFORE UPDATE ON job_listings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applicants_updated_at BEFORE UPDATE ON job_applicants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_alerts_updated_at BEFORE UPDATE ON job_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
