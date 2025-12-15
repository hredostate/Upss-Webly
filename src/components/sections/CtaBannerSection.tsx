import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';

export const CtaBannerSection: React.FC<{ section: Section }> = ({ section }) => {
  const { text, ctaLabel, ctaLink, variant } = section.contentJson;
  const isDark = variant === 'dark';

  return (
    <section 
      className={`section text-center transition-colors duration-300 ${
        isDark ? 'bg-primary-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      aria-label={section.title}
    >
       <div className="container-narrow">
         <h2 className={`heading-2 mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
           {section.title}
         </h2>
         <p className={`mb-10 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
           {text}
         </p>
         <Link 
           to={ctaLink || '#'} 
           className={`btn ${
             isDark 
               ? 'btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-900' 
               : 'btn-primary'
           }`}
         >
           {ctaLabel}
         </Link>
       </div>
    </section>
  );
};