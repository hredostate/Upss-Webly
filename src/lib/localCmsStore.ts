import { Page, Section, NewsItem } from '../types';
import initialPagesWithSections, { getSectionsByPageId } from '../data/cms-seed-data';
import { CmsClient } from '../api/cmsClient';

type LocalCmsState = {
  pages: Page[];
  sections: Section[];
  news: NewsItem[];
};

const STORAGE_KEY = 'upss-local-cms';

const seedState = (): LocalCmsState => {
  const pages = initialPagesWithSections.map(({ page }) => ({
    ...page,
    isPublished: page.isPublished ?? true,
  })) as Page[];

  const sections = initialPagesWithSections.flatMap(({ page }) =>
    (getSectionsByPageId(page.id) as unknown as Section[]).map((section, index) => ({
      ...section,
      orderIndex: (section as any).orderIndex ?? (section as any).order ?? index,
      isVisible: section.isVisible ?? true,
    }))
  );

  return {
    pages,
    sections,
    news: CmsClient.getMockNews(),
  };
};

const loadState = (): LocalCmsState => {
  if (typeof localStorage === 'undefined') return seedState();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = seedState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(stored) as LocalCmsState;
  } catch (error) {
    console.warn('Failed to parse local CMS store, re-seeding', error);
    const seeded = seedState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
};

const persistState = (state: LocalCmsState) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const stateRef: { current: LocalCmsState } = {
  current: loadState(),
};

const nextId = (prefix: string) => `${prefix}_${crypto.randomUUID()}`;

export const localCmsStore = {
  getPages: async (): Promise<Page[]> => stateRef.current.pages,
  getPage: async (id: string): Promise<Page> => {
    const match = stateRef.current.pages.find((p) => p.id === id);
    if (!match) throw new Error('Page not found');
    return match;
  },
  createPage: async (payload: Partial<Page>): Promise<Page> => {
    const newPage: Page = {
      id: payload.id || nextId('page'),
      slug: payload.slug || nextId('slug'),
      title: payload.title || 'Untitled Page',
      seoTitle: payload.seoTitle,
      seoDescription: payload.seoDescription,
      trackType: payload.trackType || 'general',
      isHomePage: payload.isHomePage ?? false,
      isPublished: payload.isPublished ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    stateRef.current.pages = [newPage, ...stateRef.current.pages];
    persistState(stateRef.current);
    return newPage;
  },
  updatePage: async (id: string, payload: Partial<Page>): Promise<Page> => {
    const idx = stateRef.current.pages.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error('Page not found');
    const updated = { ...stateRef.current.pages[idx], ...payload, updatedAt: new Date().toISOString() } as Page;
    stateRef.current.pages[idx] = updated;
    persistState(stateRef.current);
    return updated;
  },
  deletePage: async (id: string): Promise<void> => {
    stateRef.current.pages = stateRef.current.pages.filter((p) => p.id !== id);
    stateRef.current.sections = stateRef.current.sections.filter((s) => s.pageId !== id);
    persistState(stateRef.current);
  },

  getSections: async (pageId: string): Promise<Section[]> =>
    stateRef.current.sections
      .filter((s) => s.pageId === pageId)
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)),

  createSection: async (pageId: string, payload: Partial<Section>): Promise<Section> => {
    const newSection: Section = {
      id: payload.id || nextId('section'),
      pageId,
      type: payload.type || 'TEXT_BLOCK',
      orderIndex: payload.orderIndex ?? stateRef.current.sections.filter((s) => s.pageId === pageId).length,
      title: payload.title,
      subtitle: payload.subtitle,
      content: payload.content,
      contentJson: payload.contentJson || {},
      isVisible: payload.isVisible ?? true,
    };
    stateRef.current.sections = [...stateRef.current.sections, newSection];
    persistState(stateRef.current);
    return newSection;
  },

  updateSection: async (id: string, payload: Partial<Section>): Promise<Section> => {
    const idx = stateRef.current.sections.findIndex((s) => s.id === id);
    if (idx === -1) throw new Error('Section not found');
    const updated = { ...stateRef.current.sections[idx], ...payload } as Section;
    stateRef.current.sections[idx] = updated;
    persistState(stateRef.current);
    return updated;
  },

  deleteSection: async (id: string): Promise<void> => {
    stateRef.current.sections = stateRef.current.sections.filter((s) => s.id !== id);
    persistState(stateRef.current);
  },

  reorderSections: async (orderedIds: string[]): Promise<void> => {
    stateRef.current.sections = orderedIds.map((id, index) => {
      const existing = stateRef.current.sections.find((s) => s.id === id);
      if (!existing) throw new Error('Section not found');
      return { ...existing, orderIndex: index } as Section;
    });
    persistState(stateRef.current);
  },

  getNews: async (): Promise<NewsItem[]> => stateRef.current.news,
  getNewsItem: async (id: string): Promise<NewsItem> => {
    const match = stateRef.current.news.find((n) => n.id === id);
    if (!match) throw new Error('News item not found');
    return match;
  },
  createNewsItem: async (payload: Partial<NewsItem>): Promise<NewsItem> => {
    const newItem: NewsItem = {
      id: payload.id || nextId('news'),
      slug: payload.slug || nextId('news-slug'),
      title: payload.title || 'Untitled News',
      summary: payload.summary,
      body: payload.body,
      category: payload.category,
      publishedDate: payload.publishedDate || new Date().toISOString(),
      isFeatured: payload.isFeatured ?? false,
    };
    stateRef.current.news = [newItem, ...stateRef.current.news];
    persistState(stateRef.current);
    return newItem;
  },
  updateNewsItem: async (id: string, payload: Partial<NewsItem>): Promise<NewsItem> => {
    const idx = stateRef.current.news.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error('News item not found');
    const updated = { ...stateRef.current.news[idx], ...payload } as NewsItem;
    stateRef.current.news[idx] = updated;
    persistState(stateRef.current);
    return updated;
  },
  deleteNewsItem: async (id: string): Promise<void> => {
    stateRef.current.news = stateRef.current.news.filter((n) => n.id !== id);
    persistState(stateRef.current);
  },
};

