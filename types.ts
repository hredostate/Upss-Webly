export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContentSection {
  id: string;
  type: 'hero' | 'text' | 'stats' | 'features';
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface PageData {
  slug: string;
  title: string;
  sections: ContentSection[];
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}