// Type definitions for Employment Application System

export interface JobCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface CreateJobCategoryDTO {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isActive?: boolean;
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
  applicationDeadline?: Date;
  status: 'draft' | 'open' | 'closed' | 'filled';
  isFeatured: boolean;
  isUrgent: boolean;
  viewsCount: number;
  applicationsCount: number;
  postedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobListingDTO {
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
  showSalary?: boolean;
  location?: string;
  isRemote?: boolean;
  applicationDeadline?: Date;
  status?: 'draft' | 'open' | 'closed' | 'filled';
  isFeatured?: boolean;
  isUrgent?: boolean;
  postedAt?: Date;
}

export interface JobApplicant {
  id: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobApplicantDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface UpdateJobApplicantDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  currentJobTitle?: string;
  currentEmployer?: string;
  yearsOfExperience?: number;
  highestEducation?: string;
  fieldOfStudy?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  photoUrl?: string;
  certificatesUrls?: string[];
  bio?: string;
  skills?: string;
  linkedinUrl?: string;
}

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

export interface JobApplication {
  id: string;
  applicantId: string;
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
  additionalDocuments?: Record<string, any>;
  yearsExperience?: number;
  expectedSalary?: number;
  availableStartDate?: Date;
  answers?: Record<string, any>;
  status: ApplicationStatus;
  interviewDate?: Date;
  interviewLocation?: string;
  interviewType?: 'in-person' | 'phone' | 'video' | 'panel';
  interviewNotes?: string;
  hrNotes?: string;
  rating?: number;
  reviewedBy?: string;
  reviewedAt?: Date;
  submittedAt: Date;
  updatedAt: Date;
}

export interface CreateJobApplicationDTO {
  applicantId: string;
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
  additionalDocuments?: Record<string, any>;
  yearsExperience?: number;
  expectedSalary?: number;
  availableStartDate?: Date;
  answers?: Record<string, any>;
}

export interface UpdateJobApplicationDTO {
  coverLetter?: string;
  resumeUrl?: string;
  additionalDocuments?: Record<string, any>;
  yearsExperience?: number;
  expectedSalary?: number;
  availableStartDate?: Date;
  answers?: Record<string, any>;
  status?: ApplicationStatus;
  interviewDate?: Date;
  interviewLocation?: string;
  interviewType?: 'in-person' | 'phone' | 'video' | 'panel';
  interviewNotes?: string;
  hrNotes?: string;
  rating?: number;
  reviewedBy?: string;
}

export interface ApplicationStatusHistory {
  id: string;
  applicationId: string;
  previousStatus?: string;
  newStatus: string;
  notes?: string;
  changedBy?: string;
  createdAt: Date;
}

export interface SavedJob {
  id: string;
  applicantId: string;
  jobId: string;
  savedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobAlertDTO {
  applicantId: string;
  alertName: string;
  categories?: string[];
  keywords?: string;
  employmentTypes?: string[];
  frequency: 'daily' | 'weekly' | 'immediate';
  isActive?: boolean;
}
