import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const ValueColumnsSection: React.FC<{ section: Section }> = ({ section }) => {
  const { columns, variant } = section.contentJson;
  const { ref, isVisible } = useReveal(0.1);

  // Variant for image panels (Academics & Student Life)
  if (variant === 'panels') {
    return (
      <section ref={ref} className="grid grid-cols-1 lg:grid-cols-2" aria-label={section.title || "Featured Areas"}>
        {columns?.map((col: any, idx: number) => (
          <div key={idx} className={`relative h-[600px] lg:h-[700px] group overflow-hidden bg-gray-900 reveal ${idx === 1 ? 'stagger-2' : ''} ${isVisible ? 'active' : ''}`}>
            <img 
              src={col.imageUrl} 
              alt=""
              role="presentation"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 opacity-70 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-transparent to-transparent lg:bg-maroon-900/20 lg:group-hover:bg-maroon-900/80 transition-colors duration-700 flex flex-col justify-end lg:justify-center items-center text-center p-10 lg:p-20">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 transform transition-transform duration-700 lg:translate-y-8 lg:group-hover:translate-y-0">
                {col.title}
              </h2>
              <p className="text-gray-100 max-w-md mb-10 leading-relaxed text-lg font-light lg:opacity-0 lg:transform lg:translate-y-8 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700 delay-100 hidden lg:block">
                {col.description}
              </p>
              {col.ctaLabel && (
                <Link 
                  to={col.link || '#'} 
                  className="border border-white text-white hover:bg-white hover:text-maroon-900 px-10 py-4 font-bold uppercase tracking-[0.2em] text-xs lg:text-sm transition-all duration-500 rounded-sm transform lg:translate-y-8 lg:group-hover:translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 delay-200"
                >
                  {col.ctaLabel}
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>
    );
  }

  // Default variant (3 Text Columns)
  return (
    <section ref={ref} className="section bg-white" aria-label={section.title || "Our Values"}>
      <div className="container-wide">
        {section.title && (
          <div className={`mb-20 md:mb-24 max-w-3xl reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="heading-2 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-500 font-light leading-relaxed">{section.subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {columns?.map((col: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col group h-full hover-lift p-2 reveal stagger-${idx + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="w-16 h-1 bg-maroon-800 mb-8 group-hover:w-24 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
              <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-6 leading-tight group-hover:text-maroon-800 transition-colors duration-300">
                {col.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-10 flex-grow text-lg font-light">
                {col.description}
              </p>
              {col.link && (
                <Link 
                  to={col.link} 
                  className="text-maroon-800 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-4 transition-all duration-300 mt-auto"
                >
                  Learn More 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};