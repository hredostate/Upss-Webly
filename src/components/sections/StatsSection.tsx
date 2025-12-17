import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const StatsSection: React.FC<{ section: Section }> = ({ section }) => {
  const { stats } = section.contentJson;
  const { ref, isVisible } = useReveal(0.2);

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white relative overflow-hidden"
      aria-label={section.title}
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#c99a1f,transparent_25%),radial-gradient(circle_at_80%_0%,#fff,transparent_28%)]" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 md:mb-24 reveal ${isVisible ? 'active' : ''}`}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-200 mb-3">UPSS at a glance</p>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">{section.title}</h2>
          <div className="w-24 h-1 bg-accent-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 lg:gap-16">
          {stats?.map((stat: any, idx: number) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center group cursor-default reveal stagger-${idx + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-none transition-transform duration-500 ease-out group-hover:scale-110">
                {stat.value}
              </div>
              <div className="text-primary-100 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] max-w-[160px] leading-relaxed">
                {stat.label}
              </div>
              <div className="mt-6 w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <span className="block h-full bg-accent-400/80 animate-[pulse_2s_ease-in-out_infinite]"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};