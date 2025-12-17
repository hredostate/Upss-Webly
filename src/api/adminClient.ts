import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Page, Section, NewsItem } from '../types';
import { localCmsStore } from '../lib/localCmsStore';

export const AdminClient = {
  // --- Auth (legacy admin panel) ---
  login: async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Using local admin fallback.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);

    return {
      token: data.session?.access_token,
      user: data.user,
    };
  },

  // --- Page CRUD ---
  getPages: async (): Promise<Page[]> => {
    if (!isSupabaseConfigured) return localCmsStore.getPages();
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getPage: async (id: string): Promise<Page> => {
    if (!isSupabaseConfigured) return localCmsStore.getPage(id);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  createPage: async (pageData: Partial<Page>): Promise<Page> => {
    if (!isSupabaseConfigured) return localCmsStore.createPage(pageData);
    const { data, error } = await supabase
      .from('pages')
      .insert([pageData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  updatePage: async (id: string, pageData: Partial<Page>): Promise<Page> => {
    if (!isSupabaseConfigured) return localCmsStore.updatePage(id, pageData);
    const { data, error } = await supabase
      .from('pages')
      .update(pageData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  deletePage: async (id: string): Promise<void> => {
    if (!isSupabaseConfigured) return localCmsStore.deletePage(id);
    const { error } = await supabase.from('pages').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  // --- Section CRUD ---
  getSections: async (pageId: string): Promise<Section[]> => {
    if (!isSupabaseConfigured) return localCmsStore.getSections(pageId);
    const { data, error } = await supabase
      .from('sections')
      .select('*')
      .eq('page_id', pageId)
      .order('section_order', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  },

  createSection: async (pageId: string, sectionData: Partial<Section>): Promise<Section> => {
    if (!isSupabaseConfigured) return localCmsStore.createSection(pageId, sectionData);
    const { data, error } = await supabase
      .from('sections')
      .insert([{ ...sectionData, page_id: pageId }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  updateSection: async (id: string, sectionData: Partial<Section>): Promise<Section> => {
    if (!isSupabaseConfigured) return localCmsStore.updateSection(id, sectionData);
    const { data, error } = await supabase
      .from('sections')
      .update(sectionData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  deleteSection: async (id: string): Promise<void> => {
    if (!isSupabaseConfigured) return localCmsStore.deleteSection(id);
    const { error } = await supabase.from('sections').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  reorderSections: async (orderedIds: string[]): Promise<void> => {
    if (!isSupabaseConfigured) return localCmsStore.reorderSections(orderedIds);
    const updates = orderedIds.map((id, index) =>
      supabase.from('sections').update({ section_order: index }).eq('id', id)
    );
    await Promise.all(updates);
  },

  // --- News CRUD ---
  getNews: async (): Promise<NewsItem[]> => {
    if (!isSupabaseConfigured) return localCmsStore.getNews();
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_date', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getNewsItem: async (id: string): Promise<NewsItem> => {
    if (!isSupabaseConfigured) return localCmsStore.getNewsItem(id);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  createNewsItem: async (newsData: Partial<NewsItem>): Promise<NewsItem> => {
    if (!isSupabaseConfigured) return localCmsStore.createNewsItem(newsData);
    const { data, error } = await supabase
      .from('news')
      .insert([newsData])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  updateNewsItem: async (id: string, newsData: Partial<NewsItem>): Promise<NewsItem> => {
    if (!isSupabaseConfigured) return localCmsStore.updateNewsItem(id, newsData);
    const { data, error } = await supabase
      .from('news')
      .update(newsData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  deleteNewsItem: async (id: string): Promise<void> => {
    if (!isSupabaseConfigured) return localCmsStore.deleteNewsItem(id);
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },

  // --- Media ---
  getMedia: async (): Promise<any[]> => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },
};
