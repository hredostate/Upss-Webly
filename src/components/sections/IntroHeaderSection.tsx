import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface IntroHeaderProps {
  section: Section;
}

export function IntroHeaderSection({ section }: IntroHeaderProps) {
  const { ref, isVisible } = useReveal(0);
  const eyebrow = (section.contentJson as any)?.eyebrow || 'Overview';

  return (
    <header
      ref={ref}
      className="bg-gradient-to-r from-white via-slate-50 to-slate-100 border-b border-slate-100"
      data-full-bleed
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col gap-6">
        <div className={`text-xs font-bold uppercase tracking-[0.35em] text-primary-700 ${isVisible ? 'animate-fade-slide-up' : 'opacity-0 translate-y-4'}`}>
          {eyebrow}
        </div>
        <div className={`space-y-4 ${isVisible ? 'animate-fade-slide-up' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">{section.title}</h1>
          {section.subtitle && (
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">{section.subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
}
