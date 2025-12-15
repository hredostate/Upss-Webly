import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const ProcessStepsSection: React.FC<{ section: Section }> = ({ section }) => {
  const { steps } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="section bg-gray-50" aria-label={section.title || "Process Steps"}>
      <div className="container-wide">
        {section.title && (
          <div className={`mb-20 md:mb-24 max-w-3xl mx-auto text-center reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="heading-2 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed">{section.subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="w-16 h-16 bg-maroon-800 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                {step.number || idx + 1}
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
