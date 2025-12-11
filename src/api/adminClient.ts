
import { ApiResponse, Page, Section, NewsItem } from '../types';

const API_BASE = 'http://localhost:3001/api';

export const AdminClient = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const result: ApiResponse<{ token: string; user: any }> = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }
    
    return result.data;
  },

  // Helper to get headers with token
  authHeaders: () => {
    const token = localStorage.getItem('upss_auth_token');
    return {
      'Content-Type': 'application/json',
      'x-admin-token': token || ''
    };
  },

  // --- Page CRUD ---

  getPages: async (): Promise<Page[]> => {
    const response = await fetch(`${API_BASE}/pages`, {
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<Page[]> = await response.json();
    if (result.error) throw new Error(result.error);
    return result.data || [];
  },

  getPage: async (id: string): Promise<Page> => {
    const response = await fetch(`${API_BASE}/pages/${id}`, {
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<Page> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Page not found');
    return result.data;
  },

  createPage: async (data: Partial<Page>): Promise<Page> => {
    const response = await fetch(`${API_BASE}/pages`, {
      method: 'POST',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<Page> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to create page');
    return result.data;
  },

  updatePage: async (id: string, data: Partial<Page>): Promise<Page> => {
    const response = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'PUT',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<Page> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to update page');
    return result.data;
  },

  deletePage: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/pages/${id}`, {
      method: 'DELETE',
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<void> = await response.json();
    if (result.error) throw new Error(result.error);
  },

  // --- Section CRUD ---

  getSections: async (pageId: string): Promise<Section[]> => {
    const response = await fetch(`${API_BASE}/pages/${pageId}/sections`, {
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<Section[]> = await response.json();
    if (result.error) throw new Error(result.error);
    return result.data || [];
  },

  createSection: async (pageId: string, data: Partial<Section>): Promise<Section> => {
    const response = await fetch(`${API_BASE}/pages/${pageId}/sections`, {
      method: 'POST',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<Section> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to create section');
    return result.data;
  },

  updateSection: async (id: string, data: Partial<Section>): Promise<Section> => {
    const response = await fetch(`${API_BASE}/sections/${id}`, {
      method: 'PUT',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<Section> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to update section');
    return result.data;
  },

  deleteSection: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/sections/${id}`, {
      method: 'DELETE',
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<void> = await response.json();
    if (result.error) throw new Error(result.error);
  },

  reorderSections: async (orderedIds: string[]): Promise<void> => {
    const response = await fetch(`${API_BASE}/sections/reorder`, {
      method: 'PATCH',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify({ orderedIds })
    });
    const result: ApiResponse<void> = await response.json();
    if (result.error) throw new Error(result.error);
  },

  // --- News CRUD ---
  
  getNews: async (): Promise<NewsItem[]> => {
    const response = await fetch(`${API_BASE}/news`, {
      headers: AdminClient.authHeaders() // Using auth headers for admin, though public also works
    });
    const result: ApiResponse<NewsItem[]> = await response.json();
    if (result.error) throw new Error(result.error);
    return result.data || [];
  },

  getNewsItem: async (id: string): Promise<NewsItem> => {
    const response = await fetch(`${API_BASE}/news/${id}`, {
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<NewsItem> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('News item not found');
    return result.data;
  },

  createNewsItem: async (data: Partial<NewsItem>): Promise<NewsItem> => {
    const response = await fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<NewsItem> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to create news item');
    return result.data;
  },

  updateNewsItem: async (id: string, data: Partial<NewsItem>): Promise<NewsItem> => {
    const response = await fetch(`${API_BASE}/news/${id}`, {
      method: 'PUT',
      headers: AdminClient.authHeaders(),
      body: JSON.stringify(data)
    });
    const result: ApiResponse<NewsItem> = await response.json();
    if (result.error) throw new Error(result.error);
    if (!result.data) throw new Error('Failed to update news item');
    return result.data;
  },

  deleteNewsItem: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE',
      headers: AdminClient.authHeaders()
    });
    const result: ApiResponse<void> = await response.json();
    if (result.error) throw new Error(result.error);
  }
};
