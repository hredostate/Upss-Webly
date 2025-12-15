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
    <section ref={ref} className="py-20 bg-white" aria-label={section.title || "List"}>
      <div className="max-w-4xl mx-auto px-6">
        {section.title && (
          <h2 className={`text-3xl md:text-4xl font-serif text-gray-900 mb-8 border-l-4 border-maroon-800 pl-4 reveal ${isVisible ? 'active' : ''}`}>
            {section.title}
          </h2>
        )}
        {section.subtitle && (
          <p className={`text-xl text-gray-600 mb-12 reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            {section.subtitle}
          </p>
        )}
        
        {listType === 'numbered' ? (
          <ol className={`list-decimal list-outside ml-6 space-y-4 reveal stagger-3 ${isVisible ? 'active' : ''}`}>
            {items.map((item: string, idx: number) => (
              <li key={idx} className="text-lg text-gray-700 leading-relaxed pl-2">
                {item}
              </li>
            ))}
          </ol>
        ) : (
          <ul className={`space-y-4 reveal stagger-3 ${isVisible ? 'active' : ''}`}>
            {items.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-4">
                <svg className="w-6 h-6 text-maroon-800 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-gray-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
