import React, { useState } from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC<{ section: Section }> = ({ section }) => {
  const { faqs } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="section bg-gray-50" aria-label={section.title || "FAQ"}>
      <div className="container-narrow">
        {section.title && (
          <div className={`section-header reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="heading-2 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed">{section.subtitle}</p>}
          </div>
        )}
        
        <div className="space-y-4">
          {(faqs as FaqItem[]).map((faq, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-lg shadow-sm overflow-hidden reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="font-serif text-xl text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <svg 
                  className={`w-6 h-6 text-maroon-800 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
