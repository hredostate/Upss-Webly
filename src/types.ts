
export type SectionType = 
  | 'HERO' 
  | 'VALUE_COLUMNS' 
  | 'STATS' 
  | 'NEWS_LIST' 
  | 'TEXT_BLOCK' 
  | 'CTA_BANNER';

export interface Section {
  id: string;
  pageId: string;
  type: SectionType;
  orderIndex: number;
  title?: string;
  subtitle?: string;
  contentJson: Record<string, any>;
  isVisible: boolean;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  isHomePage: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  body?: string;
  category?: string;
  publishedDate: string; // Serialized date from JSON
  isFeatured: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
