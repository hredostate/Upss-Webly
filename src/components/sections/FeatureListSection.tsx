import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface Feature {
  title: string;
  description?: string;
  icon?: string;
}

export const FeatureListSection: React.FC<{ section: Section }> = ({ section }) => {
  const { features } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);

  if (!features || !Array.isArray(features) || features.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="section bg-white" aria-label={section.title || "Features"}>
      <div className="max-w-6xl mx-auto px-6">
        {section.title && (
          <div className={`mb-16 md:mb-20 text-center reveal ${isVisible ? 'active' : ''}`}>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-700 mb-3">Experience the difference</p>
            <h2 className="heading-2 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">{section.subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature: string | Feature, idx: number) => {
            const isObject = typeof feature === 'object' && feature !== null;
            const title = isObject ? (feature as Feature).title : feature;
            const description = isObject ? (feature as Feature).description : undefined;
            
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white via-white to-primary-50/60 p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
              >
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#c99a1f22,transparent_35%)]" aria-hidden />
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-900 text-white flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                      {title}
                    </p>
                    {description && (
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-2">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative mt-6 h-1 w-full bg-primary-100 rounded-full overflow-hidden">
                  <span className="block h-full bg-primary-700 w-2/3"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
