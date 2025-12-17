import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const ListBlockSection: React.FC<{ section: Section }> = ({ section }) => {
  const { items, listType = 'bulleted' } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 bg-slate-50" aria-label={section.title || "List"}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-start">
        <div>
          {section.title && (
            <h2 className={`text-3xl md:text-4xl font-serif text-gray-900 mb-4 reveal ${isVisible ? 'active' : ''}`}>
              {section.title}
            </h2>
          )}
          {section.subtitle && (
            <p className={`text-lg md:text-xl text-gray-600 mb-6 reveal stagger-2 ${isVisible ? 'active' : ''}`}>
              {section.subtitle}
            </p>
          )}
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
            <p className="text-sm font-semibold text-primary-800 uppercase tracking-[0.2em] mb-2">What to expect</p>
            <p className="text-gray-600 leading-relaxed">Each checkpoint is intentionally sequenced so families understand the journey and outcomes of this programme.</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary-200 via-primary-300 to-primary-100" aria-hidden />
          <div className="space-y-6">
            {items.map((item: string, idx: number) => (
              <div
                key={idx}
                className={`relative pl-10 py-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
              >
                <div className="absolute left-1 top-6 w-6 h-6 rounded-full bg-white border-2 border-primary-700 flex items-center justify-center text-xs font-bold text-primary-900">
                  {listType === 'numbered' ? idx + 1 : '✔'}
                </div>
                <p className="text-base md:text-lg text-gray-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
