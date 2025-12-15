import React from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const SignatureBlockSection: React.FC<{ section: Section }> = ({ section }) => {
  const { signatureName, signatureTitle } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-gray-50" aria-label={section.title || "Message"}>
      <div className="max-w-4xl mx-auto px-6">
        <div className={`bg-white p-10 md:p-16 shadow-lg rounded-sm reveal ${isVisible ? 'active' : ''}`}>
          {section.title && (
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8">
              {section.title}
            </h2>
          )}
          
          {section.content && (
            <div className="relative mb-12">
              <svg className="absolute -top-4 -left-2 w-12 h-12 text-maroon-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic pl-8 whitespace-pre-line">
                {section.content}
              </p>
            </div>
          )}
          
          {signatureName && (
            <div className="border-t border-gray-200 pt-8">
              <p className="font-serif text-xl text-gray-900 font-bold mb-1">
                {signatureName}
              </p>
              {signatureTitle && (
                <p className="text-gray-600 italic">
                  {signatureTitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
