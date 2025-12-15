import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const FeatureListSection: React.FC<{ section: Section }> = ({ section }) => {
  const { features } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);

  if (!features || !Array.isArray(features) || features.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-24 md:py-36 bg-white" aria-label={section.title || "Features"}>
      <div className="max-w-5xl mx-auto px-6">
        {section.title && (
          <div className={`mb-16 md:mb-20 text-center reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">{section.subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature: string, idx: number) => (
            <div 
              key={idx} 
              className={`flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-maroon-800 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed flex-1">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
