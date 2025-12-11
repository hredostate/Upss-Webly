import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';

export const CtaBannerSection: React.FC<{ section: Section }> = ({ section }) => {
  const { text, ctaLabel, ctaLink, variant } = section.contentJson;
  const isDark = variant === 'dark';

  return (
    <section 
      className={`py-20 md:py-32 text-center transition-colors duration-300 ${
        isDark ? 'bg-maroon-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      aria-label={section.title}
    >
       <div className="max-w-4xl mx-auto px-6">
         <h2 className={`font-serif text-3xl md:text-5xl mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
           {section.title}
         </h2>
         <p className={`mb-10 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-maroon-100' : 'text-gray-600'}`}>
           {text}
         </p>
         <Link 
           to={ctaLink || '#'} 
           className={`border-2 px-10 py-4 font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all duration-300 inline-block rounded-sm ${
             isDark 
               ? 'border-white text-white hover:bg-white hover:text-maroon-900' 
               : 'border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white'
           }`}
         >
           {ctaLabel}
         </Link>
       </div>
    </section>
  );
};