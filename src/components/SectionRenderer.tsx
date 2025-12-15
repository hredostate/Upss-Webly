
import React from 'react';
import { Section } from '../types';
import { HeroSection } from './sections/HeroSection';
import { ValueColumnsSection } from './sections/ValueColumnsSection';
import { StatsSection } from './sections/StatsSection';
import { NewsListSection } from './sections/NewsListSection';
import { CtaBannerSection } from './sections/CtaBannerSection';
import { ProcessStepsSection } from './sections/ProcessStepsSection';
import { ListBlockSection } from './sections/ListBlockSection';
import { SignatureBlockSection } from './sections/SignatureBlockSection';
import { FeatureListSection } from './sections/FeatureListSection';
import { ImageGallerySection } from './sections/ImageGallerySection';
import { FaqSection } from './sections/FaqSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { ContactFormSection } from './sections/ContactFormSection';

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
    case 'PROCESS_STEPS':
      return <ProcessStepsSection section={section} />;
    case 'LIST_BLOCK':
      return <ListBlockSection section={section} />;
    case 'SIGNATURE_BLOCK':
      return <SignatureBlockSection section={section} />;
    case 'FEATURE_LIST':
      return <FeatureListSection section={section} />;
    case 'IMAGE_GALLERY':
      return <ImageGallerySection section={section} />;
    case 'FAQ':
      return <FaqSection section={section} />;
    case 'TESTIMONIALS':
      return <TestimonialsSection section={section} />;
    case 'CONTACT_FORM':
      return <ContactFormSection section={section} />;
    case 'TEXT_BLOCK':
      return (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            {section.title && (
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 border-l-4 border-maroon-800 pl-4">
                {section.title}
              </h2>
            )}
            {section.content ? (
              <div className="prose prose-lg prose-headings:font-serif prose-a:text-maroon-800 text-gray-700 whitespace-pre-line">
                {section.content}
              </div>
            ) : section.contentJson?.html ? (
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
