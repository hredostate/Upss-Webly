import React, { useState } from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

export const ContactFormSection: React.FC<{ section: Section }> = ({ section }) => {
  const { fields = [] } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Implement actual form submission
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({});
    
    // Reset after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={ref} className="section bg-white" aria-label={section.title || "Contact Form"}>
      <div className="max-w-3xl mx-auto px-6">
        {section.title && (
          <div className={`mb-12 text-center reveal ${isVisible ? 'active' : ''}`}>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed">{section.subtitle}</p>}
          </div>
        )}
        
        {submitted ? (
          <div className={`bg-green-50 border-l-4 border-green-500 p-6 rounded reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-700 font-medium">Thank you! Your message has been sent successfully.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`bg-gray-50 p-8 rounded-lg shadow-sm reveal stagger-2 ${isVisible ? 'active' : ''}`}>
            <div className="space-y-6">
              {/* Default fields if none configured */}
              {fields.length === 0 ? (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                fields.map((field: any, idx: number) => (
                  <div key={idx}>
                    <label htmlFor={field.name} className="block text-sm font-bold text-gray-700 mb-2">
                      {field.label} {field.required && '*'}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        rows={field.rows || 4}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                      />
                    ) : field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        {field.options?.map((opt: string, i: number) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-maroon-800 focus:border-transparent"
                      />
                    )}
                  </div>
                ))
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-8 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
