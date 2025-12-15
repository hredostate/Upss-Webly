
export type SectionType = 
  | 'HERO' 
  | 'VALUE_COLUMNS' 
  | 'STATS' 
  | 'NEWS_LIST' 
  | 'TEXT_BLOCK' 
  | 'CTA_BANNER'
  | 'PROCESS_STEPS'
  | 'LIST_BLOCK'
  | 'SIGNATURE_BLOCK'
  | 'FEATURE_LIST'
  | 'IMAGE_GALLERY'
  | 'FAQ'
  | 'TESTIMONIALS'
  | 'CONTACT_FORM';

export type TrackType = 'general' | 'foundation' | 'science' | 'humanities' | 'business';

export interface Page {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  trackType?: TrackType;
  isHomePage: boolean;
  isPublished?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  id: string;
  pageId: string;
  type: SectionType;
  orderIndex: number;
  title?: string;
  subtitle?: string;
  content?: string;
  contentJson: Record<string, any>;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  body?: string;
  category?: string;
  publishedDate: Date;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for creation/updates
export interface CreatePageDTO {
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  trackType?: TrackType;
  isHomePage?: boolean;
  isPublished?: boolean;
}

export interface CreateSectionDTO {
  pageId: string;
  type: SectionType;
  orderIndex: number;
  title?: string;
  subtitle?: string;
  content?: string;
  contentJson?: Record<string, any>;
  isVisible?: boolean;
}

export interface CreateNewsItemDTO {
  slug: string;
  title: string;
  summary?: string;
  body?: string;
  category?: string;
  publishedDate?: string | Date;
  isFeatured?: boolean;
}
