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
      className="hero h-[90vh] min-h-[700px] flex items-center justify-center"
      aria-label={section.title}
    >
      {/* Background with continuous slow zoom */}
      <div className="hero-overlay z-0 select-none overflow-hidden">
        <img 
          src={backgroundImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"} 
          alt=""
          role="presentation"
          className="w-full h-full object-cover opacity-60 animate-zoom-slow absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-900/40 to-black/30 mix-blend-multiply"></div>
      </div>

      <div className="hero-content">
        <h1 
          className={`hero-title reveal ${isVisible ? 'active' : ''}`}
        >
          {section.title}
        </h1>
        
        {section.subtitle && (
          <p className={`hero-subtitle mb-12 opacity-90 reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            {section.subtitle}
          </p>
        )}
        
        <div className={`flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto reveal stagger-3 ${isVisible ? 'active' : ''}`}>
          {primaryCta && (
            <Link 
              to={primaryCta.link} 
              className="inline-flex items-center justify-center bg-primary-700 text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 shadow-2xl transition-all duration-500 ease-out hover:bg-primary-600 hover:shadow-primary-900/50 hover:-translate-y-1 rounded-sm"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link 
              to={secondaryCta.link} 
              className="inline-flex items-center justify-center bg-transparent border border-white text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 transition-all duration-500 ease-out hover:bg-white hover:text-primary-900 hover:-translate-y-1 rounded-sm backdrop-blur-sm"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};