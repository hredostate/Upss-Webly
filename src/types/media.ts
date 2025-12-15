// Media types for video and image uploads
export interface Media {
  id: string;
  fileName: string;
  originalName: string;
  fileType: 'image' | 'video' | 'document' | 'audio';
  mimeType: string;
  fileSize: number;
  fileUrl: string;
  
  // Video specific
  duration?: number;
  thumbnailUrl?: string;
  videoWidth?: number;
  videoHeight?: number;
  
  // Image specific
  width?: number;
  height?: number;
  
  // Metadata
  altText?: string;
  caption?: string;
  description?: string;
  
  // Organization
  folder: string;
  tags?: string[];
  
  isPublic: boolean;
  uploadedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoSectionContent {
  videoUrl: string;
  videoType: 'upload' | 'youtube' | 'vimeo';
  posterImage?: string;
  title?: string;
  description?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface VideoHeroContent {
  videoUrl: string;
  posterImage: string;
  overlayOpacity: number;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; link: string };
  secondaryCta?: { label: string; link: string };
}

export interface VideoEmbedContent {
  embedUrl: string;
  embedType: 'youtube' | 'vimeo' | 'custom';
  aspectRatio: '16:9' | '4:3' | '1:1';
  startTime?: number;
  privacyMode?: boolean;
}

export interface VideoGalleryContent {
  videos: Array<{
    url: string;
    title: string;
    thumbnail: string;
    duration?: string;
    category?: string;
  }>;
  layout: 'grid' | 'carousel';
  columns: 2 | 3 | 4;
}

export interface VideoBlockContent {
  videoUrl: string;
  videoType: 'upload' | 'youtube' | 'vimeo';
  layout: 'video-left' | 'video-right' | 'video-top';
  title: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
}
