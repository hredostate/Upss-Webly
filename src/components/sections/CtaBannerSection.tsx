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
         <p className={`mb-10 font-light leading-relaxed ${isDark ? 'hero-subtitle-dark' : 'hero-subtitle-light'}`}>
           {text}
         </p>
         <Link 
           to={ctaLink || '#'} 
           className={isDark ? 'btn-secondary-dark' : 'btn-primary'}
         >
           {ctaLabel}
         </Link>
       </div>
    </section>
  );
};