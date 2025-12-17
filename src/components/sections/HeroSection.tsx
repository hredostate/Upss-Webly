import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const HeroSection: React.FC<{ section: Section }> = ({ section }) => {
  const { backgroundImage, primaryCta, secondaryCta, layout } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0);

  if (layout === 'split') {
    return (
      <section
        ref={ref}
        data-full-bleed
        className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white py-20 md:py-28"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute left-10 bottom-0 w-72 h-72 rounded-full bg-primary-400/20 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-slide-up' : 'opacity-0 translate-y-6'}`}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary-100/80 font-bold">UPSS Website Builder</p>
            <h1 className="text-4xl md:text-5xl font-serif leading-tight">{section.title}</h1>
            {section.subtitle && (
              <p className="text-lg text-primary-50/80 leading-relaxed">{section.subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta && (
                <Link
                  to={primaryCta.link}
                  className="inline-flex items-center justify-center bg-white text-primary-900 font-bold uppercase tracking-[0.2em] px-8 py-3 rounded shadow-lg hover:-translate-y-1 transition"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  to={secondaryCta.link}
                  className="inline-flex items-center justify-center border border-white/70 text-white font-bold uppercase tracking-[0.2em] px-8 py-3 rounded hover:bg-white/10 transition"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
          <div className="relative h-80 md:h-[420px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img
                src={backgroundImage || 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80'}
                alt="Campus life"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="hero h-[90vh] min-h-[700px] flex items-center justify-center"
      data-full-bleed
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