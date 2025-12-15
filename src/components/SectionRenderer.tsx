
import React from 'react';
import { Section } from '../types';
import { HeroSection } from './sections/HeroSection';
import { ValueColumnsSection } from './sections/ValueColumnsSection';
import { StatsSection } from './sections/StatsSection';
import { NewsListSection } from './sections/NewsListSection';
import { CtaBannerSection } from './sections/CtaBannerSection';
import { VideoHeroSection } from './sections/VideoHeroSection';
import { VideoEmbedSection } from './sections/VideoEmbedSection';
import { VideoGallerySection } from './sections/VideoGallerySection';
import { VideoBlockSection } from './sections/VideoBlockSection';

export const SectionRenderer: React.FC<{ section: Section }> = ({ section }) => {
  if (!section.isVisible) return null;

  switch (section.type) {
    case 'HERO':
      return <HeroSection section={section} />;
    case 'VALUE_COLUMNS':
      return <ValueColumnsSection section={section} />;
    case 'STATS':
      return <StatsSection section={section} />;
    case 'NEWS_LIST':
      return <NewsListSection section={section} />;
    case 'CTA_BANNER':
      return <CtaBannerSection section={section} />;
    case 'VIDEO_HERO':
      return <VideoHeroSection section={section} />;
    case 'VIDEO_EMBED':
      return <VideoEmbedSection section={section} />;
    case 'VIDEO_GALLERY':
      return <VideoGallerySection section={section} />;
    case 'VIDEO_BLOCK':
      return <VideoBlockSection section={section} />;
    case 'TEXT_BLOCK':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 border-l-4 border-maroon-800 pl-4">
                {section.title}
              </h2>
            )}
            {section.contentJson.html ? (
              <div 
                className="prose prose-lg prose-headings:font-serif prose-a:text-maroon-800 text-gray-700"
                dangerouslySetInnerHTML={{ __html: section.contentJson.html }} 
              />
            ) : (
              <p className="text-gray-500 italic">No content provided.</p>
            )}
          </div>
        </section>
      );
    default:
      console.warn(`Unknown section type: ${section.type}`);
      return null;
  }
};
