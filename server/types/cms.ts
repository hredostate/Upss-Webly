
export type SectionType = 
  | 'HERO' 
  | 'VALUE_COLUMNS' 
  | 'STATS' 
  | 'NEWS_LIST' 
  | 'TEXT_BLOCK' 
  | 'CTA_BANNER';

export interface Page {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  isHomePage: boolean;
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
  isHomePage?: boolean;
}

export interface CreateSectionDTO {
  pageId: string;
  type: SectionType;
  orderIndex: number;
  title?: string;
  subtitle?: string;
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
