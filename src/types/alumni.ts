// Alumni Profile Types
export interface AlumniProfile {
  id: string;
  user_id?: string;
  
  // Account & Basic Info
  email: string;
  first_name: string;
  last_name: string;
  maiden_name?: string;
  nickname?: string;
  gender?: string;
  date_of_birth?: string;
  
  // UPSS Info
  graduation_year: number;
  entry_year?: number;
  house?: string;
  track?: string;
  class_name?: string;
  
  // Photos
  school_photo_url?: string;
  recent_photo_url?: string;
  cover_photo_url?: string;
  
  // Bio
  bio?: string;
  favorite_memory?: string;
  favorite_teacher?: string;
  message_to_students?: string;
  
  // Career
  occupation?: string;
  job_title?: string;
  company?: string;
  industry?: string;
  years_of_experience?: number;
  
  // Location
  city?: string;
  state?: string;
  country?: string;
  
  // Social Media
  linkedin_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  website_url?: string;
  
  // Education
  highest_degree?: string;
  university?: string;
  field_of_study?: string;
  
  // Give Back
  willing_to_mentor?: boolean;
  available_for_career_talks?: boolean;
  interested_in_donations?: boolean;
  can_offer_internships?: boolean;
  
  // Privacy Settings
  profile_visibility?: 'public' | 'alumni_only' | 'private';
  show_email?: boolean;
  show_phone?: boolean;
  show_location?: boolean;
  
  // Profile Status
  is_verified?: boolean;
  is_featured?: boolean;
  profile_completed?: boolean;
  completion_percentage?: number;
  
  // Metadata
  created_at?: string;
  updated_at?: string;
}

// Alumni Post Types
export interface AlumniPost {
  id: string;
  alumni_id: string;
  title: string;
  content: string;
  post_type?: 'achievement' | 'update' | 'announcement';
  image_url?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Alumni Event Types
export interface AlumniEvent {
  id: string;
  title: string;
  description?: string;
  event_type?: 'reunion' | 'networking' | 'career_talk' | 'social';
  event_date: string;
  event_time?: string;
  location?: string;
  venue?: string;
  image_url?: string;
  organizer_id?: string;
  chapter_id?: string;
  max_attendees?: number;
  is_virtual?: boolean;
  meeting_link?: string;
  created_at?: string;
  updated_at?: string;
  attendees_count?: number;
  organizer?: AlumniProfile;
}

// Event Registration Types
export interface EventRegistration {
  id: string;
  event_id: string;
  alumni_id: string;
  status?: 'registered' | 'attended' | 'cancelled';
  registered_at?: string;
}

// Alumni Donation Types
export interface AlumniDonation {
  id: string;
  alumni_id?: string;
  amount: number;
  currency?: string;
  donation_type?: 'scholarship' | 'infrastructure' | 'sports' | 'general';
  is_recurring?: boolean;
  recurring_frequency?: 'monthly' | 'quarterly' | 'annual';
  payment_status?: 'pending' | 'completed' | 'failed';
  payment_reference?: string;
  donor_name?: string;
  is_anonymous?: boolean;
  message?: string;
  created_at?: string;
}

// Mentorship Connection Types
export interface MentorshipConnection {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status?: 'pending' | 'active' | 'completed' | 'declined';
  area_of_mentorship?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
  updated_at?: string;
  mentor?: AlumniProfile;
  mentee?: AlumniProfile;
}

// Alumni Message Types
export interface AlumniMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string;
  message: string;
  is_read?: boolean;
  read_at?: string;
  parent_message_id?: string;
  created_at?: string;
  sender?: AlumniProfile;
  recipient?: AlumniProfile;
}

// Alumni Chapter Types
export interface AlumniChapter {
  id: string;
  name: string;
  location: string;
  city?: string;
  state?: string;
  country: string;
  description?: string;
  coordinator_id?: string;
  whatsapp_link?: string;
  member_count?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  coordinator?: AlumniProfile;
}

// Class Set Types
export interface ClassSet {
  id: string;
  graduation_year: number;
  class_name?: string;
  class_motto?: string;
  class_photo_url?: string;
  coordinator_id?: string;
  whatsapp_link?: string;
  member_count?: number;
  countries_represented?: number;
  created_at?: string;
  updated_at?: string;
  coordinator?: AlumniProfile;
}

// Registration Form Data Types
export interface AlumniRegistrationData {
  // Step 1: Account
  email: string;
  password: string;
  
  // Step 2: Basic Info
  first_name: string;
  last_name: string;
  maiden_name?: string;
  nickname?: string;
  gender?: string;
  date_of_birth?: string;
  
  // Step 3: UPSS Info
  graduation_year: number;
  entry_year?: number;
  house?: string;
  track?: string;
  class_name?: string;
  
  // Step 4: Photos
  school_photo?: File;
  recent_photo?: File;
  
  // Step 5: Bio
  bio?: string;
  favorite_memory?: string;
  favorite_teacher?: string;
  message_to_students?: string;
  
  // Step 6: Career
  occupation?: string;
  job_title?: string;
  company?: string;
  industry?: string;
  years_of_experience?: number;
  
  // Step 7: Location
  city?: string;
  state?: string;
  country?: string;
  
  // Step 8: Social Media
  linkedin_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  website_url?: string;
  
  // Step 9: Education
  highest_degree?: string;
  university?: string;
  field_of_study?: string;
  
  // Step 10: Give Back
  willing_to_mentor?: boolean;
  available_for_career_talks?: boolean;
  interested_in_donations?: boolean;
  can_offer_internships?: boolean;
  
  // Step 11: Privacy
  profile_visibility?: 'public' | 'alumni_only' | 'private';
  show_email?: boolean;
  show_phone?: boolean;
  show_location?: boolean;
}

// Directory Filter Types
export interface DirectoryFilters {
  graduation_year?: number;
  track?: string;
  location?: string;
  industry?: string;
  mentors_only?: boolean;
  search?: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  total_alumni: number;
  countries_represented: number;
  companies_represented: number;
  total_scholarships: number;
  unread_messages: number;
  upcoming_events: number;
  connections: number;
}
