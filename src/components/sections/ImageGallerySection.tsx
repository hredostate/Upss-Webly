import React, { useState } from 'react';
import { Section } from '../../types';
import { useReveal } from '../../hooks/useReveal';

interface GalleryImage {
  url: string;
  caption?: string;
}

export const ImageGallerySection: React.FC<{ section: Section }> = ({ section }) => {
  const { images } = section.contentJson || {};
  const { ref, isVisible } = useReveal(0.1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <>
      <section ref={ref} className="section bg-white" aria-label={section.title || "Gallery"}>
        <div className="max-w-7xl mx-auto px-6">
          {section.title && (
            <div className={`mb-16 md:mb-20 text-center reveal ${isVisible ? 'active' : ''}`}>
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">{section.title}</h2>
              {section.subtitle && <p className="text-xl text-gray-600 font-light leading-relaxed">{section.subtitle}</p>}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(images as GalleryImage[]).map((img, idx) => (
              <div 
                key={idx} 
                className={`group relative overflow-hidden rounded-lg cursor-pointer reveal stagger-${(idx % 3) + 1} ${isVisible ? 'active' : ''}`}
                onClick={() => setLightboxImage(img.url)}
              >
                <div className="relative w-full" style={{ aspectRatio: '16 / 12' }}>
                  <img 
                    src={img.url} 
                    alt={img.caption || `Gallery image ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <img 
            src={lightboxImage} 
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
};
