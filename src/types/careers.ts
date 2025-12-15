// Frontend type definitions for Employment Application System

export type ApplicationStatus = 
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'offer_extended'
  | 'offer_accepted'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
}

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  categoryId?: string;
  employmentType?: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  minExperienceYears?: number;
  summary?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  qualifications?: string;
  benefits?: string;
  salaryMin?: number;
  salaryMax?: number;
  showSalary: boolean;
  location?: string;
  isRemote: boolean;
  applicationDeadline?: string;
  status: 'draft' | 'open' | 'closed' | 'filled';
  isFeatured: boolean;
  isUrgent: boolean;
  viewsCount: number;
  applicationsCount: number;
  postedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  state?: string;
  country: string;
  currentJobTitle?: string;
  currentEmployer?: string;
  yearsOfExperience: number;
  highestEducation?: string;
  fieldOfStudy?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  photoUrl?: string;
  certificatesUrls?: string[];
  bio?: string;
  skills?: string;
  linkedinUrl?: string;
  isActive: boolean;
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  applicantId: string;
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
  additionalDocuments?: Record<string, any>;
  yearsExperience?: number;
  expectedSalary?: number;
  availableStartDate?: string;
  answers?: Record<string, any>;
  status: ApplicationStatus;
  interviewDate?: string;
  interviewLocation?: string;
  interviewType?: 'in-person' | 'phone' | 'video' | 'panel';
  interviewNotes?: string;
  hrNotes?: string;
  rating?: number;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt: string;
  updatedAt: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  previousStatus?: string;
  newStatus: string;
  notes?: string;
  changedBy?: string;
  createdAt: string;
}

export interface SavedJob {
  id: string;
  applicantId: string;
  jobId: string;
  savedAt: string;
  title?: string;
  slug?: string;
  location?: string;
  employmentType?: string;
}

export interface JobAlert {
  id: string;
  applicantId: string;
  alertName: string;
  categories?: string[];
  keywords?: string;
  employmentTypes?: string[];
  frequency: 'daily' | 'weekly' | 'immediate';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
