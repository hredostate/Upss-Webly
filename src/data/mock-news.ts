import { NewsItem } from '../types';

export const mockNewsData: NewsItem[] = [
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
];
