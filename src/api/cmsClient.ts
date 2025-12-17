
import { Page, Section, ApiResponse, NewsItem } from '../types';
import initialPagesWithSections, { getSectionsByPageId } from '../data/cms-seed-data';

const API_BASE = 'http://localhost:3001/api';

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    const errorMessage = await response.text().catch(() => response.statusText);
    throw new Error(errorMessage || response.statusText);
  }

  const result: ApiResponse<T> = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
  if (!result.data) {
    throw new Error('No data returned');
  }
  return result.data;
}

const getFallbackPageBySlug = (slug: string): Page | null => {
  const match = initialPagesWithSections.find((item) => item.page.slug === slug);
  return match ? match.page : null;
};

const getFallbackSectionsForPage = (pageId: string): Section[] => {
  const sections = getSectionsByPageId(pageId) as unknown as Section[];

  return sections
    .map((section) => ({
      ...section,
      orderIndex: (section as any).orderIndex ?? (section as any).order ?? 0,
    }))
    .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
};

export const CmsClient = {
  getPageBySlug: async (slug: string): Promise<Page> => {
    try {
      return await fetchJson<Page>(`/pages/slug/${slug}`);
    } catch (error) {
      const fallback = getFallbackPageBySlug(slug);
      if (fallback) return fallback;
      throw error;
    }
  },

  getSectionsForPage: async (pageId: string): Promise<Section[]> => {
    try {
      return await fetchJson<Section[]>(`/pages/${pageId}/sections`);
    } catch (error) {
      const fallbackSections = getFallbackSectionsForPage(pageId);
      if (fallbackSections.length) return fallbackSections;
      throw error;
    }
  },

  getNews: async (featured?: boolean, limit?: number): Promise<NewsItem[]> => {
    const params = new URLSearchParams();
    if (featured) params.append('featured', 'true');
    if (limit) params.append('limit', limit.toString());
    return fetchJson<NewsItem[]>(`/news?${params.toString()}`);
  },

  getNewsBySlug: async (slug: string): Promise<NewsItem> => {
    return fetchJson<NewsItem>(`/news/slug/${slug}`);
  },
  
  // Fallback for when backend isn't running or empty
  getMockHomeSections: (): Section[] => {
    return [
      {
        id: '1', pageId: 'home', type: 'HERO', orderIndex: 0, isVisible: true,
        title: 'Where Future Scholars Rise.',
        subtitle: 'UPSS is a high-performing, forward-thinking secondary school in Benin City, shaping Nigerian students into confident, globally-ready leaders.',
        contentJson: {
          backgroundImage: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          primaryCta: { label: 'Apply to UPSS', link: '/admissions' },
          secondaryCta: { label: 'Visit Our Campus', link: '/contact' }
        }
      },
      {
        id: '2', pageId: 'home', type: 'VALUE_COLUMNS', orderIndex: 1, isVisible: true,
        title: 'Three Pillars of UPSS',
        contentJson: {
          columns: [
            { title: 'Academic Excellence', description: 'Our classrooms are powered by strong teaching, structured systems, continuous assessments, and a culture of hard work.', link: '/academics' },
            { title: 'Character & Leadership', description: 'Every UPSS student is trained to lead—with integrity, empathy, confidence, discipline, and responsibility.', link: '/student-life' },
            { title: 'Global Readiness', description: 'Through competitions, digital skills, research, and exposure to global challenges, our students develop the mindset needed for a competitive world.', link: '/about' }
          ]
        }
      },
      {
        id: '3', pageId: 'home', type: 'STATS', orderIndex: 2, isVisible: true,
        title: 'UPSS at a Glance',
        contentJson: {
          stats: [
             { label: 'Uni Admission', value: '95%' },
             { label: 'Natl. Medals', value: '10+' },
             { label: 'Clubs', value: '20+' },
             { label: 'Mentoring', value: '1:1' }
          ]
        }
      },
      {
         id: '4', pageId: 'home', type: 'VALUE_COLUMNS', orderIndex: 3, isVisible: true,
         title: '',
         contentJson: {
           variant: 'panels',
           columns: [
             { title: 'Academics', description: 'Our academic programme is rigorous, structured, and intentionally designed to build mastery.', imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80', link: '/academics', ctaLabel: 'Explore Academics' },
             { title: 'Student Life', description: 'Life at UPSS bursts with creativity, teamwork, leadership, sports, arts, entrepreneurship, and competitions.', imageUrl: 'https://images.unsplash.com/photo-1529390003361-593236f5f961?ixlib=rb-4.0.3&auto=format&fit=crop&w=1532&q=80', link: '/student-life', ctaLabel: 'Student Life at UPSS' }
           ]
         }
      },
      {
        id: '5', pageId: 'home', type: 'NEWS_LIST', orderIndex: 4, isVisible: true,
        title: 'News & Events',
        subtitle: 'Recent highlights from our vibrant community.',
        contentJson: { limit: 3 }
      },
      {
        id: '6', pageId: 'home', type: 'FEATURE_LIST', orderIndex: 5, isVisible: true,
        title: 'Why families choose UPSS',
        subtitle: 'Grounded in heritage, engineered for the future.',
        contentJson: {
          features: [
            { title: 'Adaptive teaching', description: 'Personalized pathways, responsive feedback, and supportive tutoring.', icon: 'academic-cap' },
            { title: 'Future skills', description: 'Robotics, research labs, digital fluency, and purposeful innovation.', icon: 'sparkles' },
            { title: 'Whole child', description: 'Advisory system, wellness supports, and leadership coaching.', icon: 'heart' },
            { title: 'Global network', description: 'Alumni mentors, partner schools, and international competitions.', icon: 'globe-alt' }
          ]
        }
      },
      {
        id: '7', pageId: 'home', type: 'TESTIMONIALS', orderIndex: 6, isVisible: true,
        title: 'Voices from the UPSS community',
        contentJson: {
          testimonials: [
            { quote: 'UPSS prepared me to thrive at university and lead with confidence.', name: 'Abeni, Class of 2018', role: 'Engineering student', avatar: '' },
            { quote: 'The teachers demand excellence while making every child feel seen.', name: 'Mrs. Uche', role: 'Parent', avatar: '' }
          ]
        }
      },
      {
        id: '8', pageId: 'home', type: 'FAQ', orderIndex: 7, isVisible: true,
        title: 'Quick answers for families',
        contentJson: {
          faqs: [
            { question: 'How do I apply?', answer: 'Begin with the admissions form, then schedule an assessment and campus tour.' },
            { question: 'Do you offer boarding?', answer: 'Yes, we provide structured boarding with dedicated house parents and study support.' },
            { question: 'What co-curriculars are available?', answer: 'From robotics to debate, coding, arts, sports, and entrepreneurship clubs.' }
          ]
        }
      },
      {
        id: '9', pageId: 'home', type: 'CTA_BANNER', orderIndex: 8, isVisible: true,
        title: 'Ready to experience UPSS?',
        subtitle: 'Schedule a visit or speak with our admissions team to learn more.',
        contentJson: {
          primaryCta: { label: 'Book a tour', link: '/contact' },
          secondaryCta: { label: 'Start application', link: '/admissions' }
        }
      }
    ];
  },

  getMockNews: (): NewsItem[] => {
    return [
      {
        id: '1',
        title: 'UPSS Robotics Team Wins National Championship',
        slug: 'robotics-team-wins-national',
        publishedDate: '2023-10-12',
        category: 'Achievement',
        summary: 'Our senior robotics team took home the gold medal in Lagos this weekend, qualifying for the international finals in Tokyo.',
        body: 'Full article content here...',
        isFeatured: true
      },
      {
        id: '2',
        title: 'Annual "Knowledge for Service" Symposium',
        slug: 'knowledge-symposium',
        publishedDate: '2023-11-05',
        category: 'Events',
        summary: 'Join us for a day of lectures and workshops featuring distinguished alumni and industry leaders.',
        body: 'Full article content here...',
        isFeatured: true
      },
      {
        id: '3',
        title: 'Admissions for 2024/2025 Session Now Open',
        slug: 'admissions-2024-open',
        publishedDate: '2023-09-15',
        category: 'Admissions',
        summary: 'Prospective parents are invited to apply. Entrance examinations are scheduled to begin in January.',
        body: 'Full article content here...',
        isFeatured: true
      }
    ] as NewsItem[];
  }
};
