export type TrackType = 'general' | 'foundation' | 'science' | 'humanities' | 'business';

export interface Page {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  trackType: 'general' | 'foundation' | 'science' | 'humanities' | 'business';
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
  | 'INTRO_HEADER'
  | 'CONTENT_LEAD'
  | 'VIDEO_HERO'
  | 'VIDEO_EMBED'
  | 'VIDEO_GALLERY'
  | 'VIDEO_BLOCK';

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
