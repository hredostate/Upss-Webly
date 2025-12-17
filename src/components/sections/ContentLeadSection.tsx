import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';
import { MediaPlaceholder } from '../common/MediaPlaceholder';

export function ContentLeadSection({ section }: { section: Section }) {
  const { ref, isVisible } = useReveal(50);
  const layout = (section.contentJson as any)?.layout === 'split' ? 'split' : 'stack';
  const media = (section.contentJson as any)?.mediaPlaceholder as
    | { label?: string; type?: 'image' | 'video'; aspect?: 'wide' | 'square' }
    | undefined;

  if (layout === 'split') {
    return (
      <section ref={ref} className="py-16 bg-white" data-full-bleed>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className={`space-y-4 ${isVisible ? 'animate-fade-slide-up' : 'opacity-0 translate-y-4'}`}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-700 font-semibold">{section.subtitle || 'Highlights'}</p>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">{section.title}</h2>
            {section.content && (
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            )}
          </div>
          {media && (
            <div className={`w-full ${isVisible ? 'animate-fade-slide-up' : 'opacity-0 translate-y-4'}`}>
              <MediaPlaceholder label={media.label} type={media.type} aspect={media.aspect} />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-14 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 space-y-4">
        <p className="text-xs uppercase tracking-[0.35em] text-primary-700 font-semibold">{section.subtitle || 'Overview'}</p>
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">{section.title}</h2>
        {section.content && (
          <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</p>
        )}
      </div>
    </section>
  );
}
