import { PageData, ContentSection } from '../types';

const INITIAL_HOME_DATA: PageData = {
  slug: 'home',
  title: 'Home',
  lastUpdated: new Date().toISOString(),
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      title: 'Knowledge for Service',
      subtitle: 'Nurturing the next generation of leaders in Benin City through academic excellence and character development.',
      imageUrl: 'https://picsum.photos/id/20/1920/1080'
    },
    {
      id: 'intro-1',
      type: 'text',
      title: 'A Tradition of Excellence',
      content: 'University Preparatory Secondary School (UPSS) stands as a beacon of quality education. Our curriculum is designed to challenge students to think critically and engage deeply with the world around them.',
    },
    {
      id: 'stats-1',
      type: 'stats',
      title: 'UPSS by the Numbers',
      stats: [
        { label: 'Students', value: '1,200+' },
        { label: 'Qualified Teachers', value: '85' },
        { label: 'Graduation Rate', value: '99%' },
        { label: 'Years of Excellence', value: '25+' }
      ]
    }
  ]
};

const STORAGE_KEY_PREFIX = 'upss_content_';

export const ContentService = {
  getPage: async (slug: string): Promise<PageData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${slug}`);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return default for home if not found
    if (slug === 'home') {
      return INITIAL_HOME_DATA;
    }
    
    throw new Error('Page not found');
  },

  savePage: async (slug: string, data: PageData): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${slug}`, JSON.stringify({
      ...data,
      lastUpdated: new Date().toISOString()
    }));
  },
  
  resetDefaults: () => {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}home`);
    window.location.reload();
  }
};