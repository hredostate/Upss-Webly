import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const StatsSection: React.FC<{ section: Section }> = ({ section }) => {
  const { stats } = section.contentJson;
  const { ref, isVisible } = useReveal(0.2);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gray-50 border-y border-gray-200" aria-label={section.title}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 md:mb-24 reveal ${isVisible ? 'active' : ''}`}>
          <h2 className="font-serif text-3xl md:text-5xl text-gray-900 mb-6">{section.title}</h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 lg:gap-16">
          {stats?.map((stat: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center group cursor-default reveal stagger-${idx + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-maroon-900 mb-4 md:mb-6 leading-none transition-transform duration-500 ease-out group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-gray-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] max-w-[160px] leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};