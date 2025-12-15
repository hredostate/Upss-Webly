import React from 'react';
import { Section } from '../../types';
import { VideoEmbedContent } from '../../types/media';

export const VideoEmbedSection: React.FC<{ section: Section }> = ({ section }) => {
  const content = section.contentJson as VideoEmbedContent;
  const {
    embedUrl,
    embedType = 'youtube',
    aspectRatio = '16:9',
    startTime = 0,
    privacyMode = false
  } = content || {};

  // Convert YouTube/Vimeo URLs to embed format
  const getEmbedUrl = (): string => {
    if (!embedUrl) return '';

    if (embedType === 'youtube') {
      // Extract video ID from various YouTube URL formats
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = embedUrl.match(youtubeRegex);
      const videoId = match ? match[1] : embedUrl;
      
      const baseUrl = privacyMode 
        ? 'https://www.youtube-nocookie.com/embed/' 
        : 'https://www.youtube.com/embed/';
      
      const params = new URLSearchParams();
      if (startTime > 0) params.append('start', startTime.toString());
      
      return `${baseUrl}${videoId}${params.toString() ? '?' + params.toString() : ''}`;
    } else if (embedType === 'vimeo') {
      // Extract video ID from Vimeo URL
      const vimeoRegex = /vimeo\.com\/(\d+)/;
      const match = embedUrl.match(vimeoRegex);
      const videoId = match ? match[1] : embedUrl;
      
      const params = new URLSearchParams();
      if (startTime > 0) params.append('t', startTime.toString());
      
      return `https://player.vimeo.com/video/${videoId}${params.toString() ? '?' + params.toString() : ''}`;
    }

    // For custom embeds, use the URL as-is
    return embedUrl;
  };

  // Get padding based on aspect ratio
  const getPaddingBottom = (): string => {
    switch (aspectRatio) {
      case '16:9':
        return '56.25%'; // 9/16 * 100
      case '4:3':
        return '75%'; // 3/4 * 100
      case '1:1':
        return '100%';
      default:
        return '56.25%';
    }
  };

  const finalEmbedUrl = getEmbedUrl();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8 text-center border-l-4 border-maroon-800 pl-4 inline-block">
            {section.title}
          </h2>
        )}
        
        {section.subtitle && (
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        )}

        {/* Responsive Video Container */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-xl bg-gray-900">
          <div 
            className="relative w-full" 
            style={{ paddingBottom: getPaddingBottom() }}
          >
            {finalEmbedUrl ? (
              <iframe
                src={finalEmbedUrl}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={section.title || 'Embedded Video'}
              />
            ) : (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 text-white">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" />
                  </svg>
                  <p>No video URL provided</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
