export interface Page {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  trackType?: string;
  isHomePage: boolean;
  isPublished?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SectionType =
  | 'HERO'
  | 'TEXT_BLOCK'
  | 'VALUE_COLUMNS'
  | 'STATS'
  | 'CTA_BANNER'
  | 'PROCESS_STEPS'
  | 'LIST_BLOCK'
  | 'SIGNATURE_BLOCK'
  | 'FEATURE_LIST'
  | 'NEWS_LIST';

export interface Section {
  id: string;
  pageId: string;
  type: SectionType;
  order: number;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  contentJson: Record<string, unknown> | null;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageWithSections {
  page: Page;
  sections: Section[];
}
