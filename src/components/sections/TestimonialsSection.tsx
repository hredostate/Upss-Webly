import React, { useState } from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

export const TestimonialsSection: React.FC<{ section: Section }> = ({ section }) => {
  const { testimonials, layout = 'grid' } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Carousel layout
  if (layout === 'carousel') {
    const current = (testimonials as Testimonial[])[currentIndex];
    return (
      <section ref={ref} className="py-24 md:py-36 bg-maroon-900 text-white" aria-label={section.title || "Testimonials"}>
        <div className="max-w-5xl mx-auto px-6">
          {section.title && (
            <h2 className={`font-serif text-4xl md:text-5xl text-center mb-16 reveal ${isVisible ? 'active' : ''}`}>
              {section.title}
            </h2>
          )}
          
          <div className={`relative reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            <div className="text-center">
              <svg className="w-16 h-16 text-maroon-700 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
                "{current.quote}"
              </blockquote>
              <div className="border-t border-maroon-700 pt-6 inline-block">
                <p className="font-bold text-lg">{current.author}</p>
                {current.role && <p className="text-maroon-300 text-sm mt-1">{current.role}</p>}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-12">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-white hover:bg-white hover:text-maroon-900 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_: Testimonial, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-maroon-700'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-white hover:bg-white hover:text-maroon-900 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Grid layout (default)
  return (
    <section ref={ref} className="py-24 md:py-36 bg-gray-50" aria-label={section.title || "Testimonials"}>
      <div className="max-w-7xl mx-auto px-6">
        {section.title && (
          <div className={`mb-16 md:mb-20 text-center reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed">{section.subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(testimonials as Testimonial[]).map((testimonial, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-8 rounded-lg shadow-sm reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
            >
              <svg className="w-10 h-10 text-maroon-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                {testimonial.role && <p className="text-gray-600 text-sm mt-1">{testimonial.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
