import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const HeroSection: React.FC<{ section: Section }> = ({ section }) => {
  const { backgroundImage, primaryCta, secondaryCta } = section.contentJson;
  const { ref, isVisible } = useReveal(0);

  return (
    <section 
      ref={ref}
      className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900"
      aria-label={section.title}
    >
      {/* Background with continuous slow zoom */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img 
          src={backgroundImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-60 animate-zoom-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/95 via-maroon-900/40 to-black/30 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <h1 
          className={`font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] md:leading-[0.95] mb-8 drop-shadow-2xl tracking-tight max-w-5xl reveal ${isVisible ? 'active' : ''}`}
        >
          {section.title}
        </h1>
        
        {section.subtitle && (
          <p className={`text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md opacity-90 reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            {section.subtitle}
          </p>
        )}
        
        <div className={`flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto reveal stagger-3 ${isVisible ? 'active' : ''}`}>
          {primaryCta && (
            <Link 
              to={primaryCta.link} 
              className="inline-flex items-center justify-center bg-maroon-700 text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 shadow-2xl transition-all duration-500 ease-out hover:bg-maroon-600 hover:shadow-maroon-900/50 hover:-translate-y-1 rounded-sm"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link 
              to={secondaryCta.link} 
              className="inline-flex items-center justify-center bg-transparent border border-white text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 transition-all duration-500 ease-out hover:bg-white hover:text-maroon-900 hover:-translate-y-1 rounded-sm backdrop-blur-sm"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};