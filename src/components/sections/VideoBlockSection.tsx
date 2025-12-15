import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';
import { VideoBlockContent } from '../../types/media';
import { VideoPlayer } from '../media/VideoPlayer';

export const VideoBlockSection: React.FC<{ section: Section }> = ({ section }) => {
  const content = section.contentJson as VideoBlockContent;
  const {
    videoUrl,
    videoType = 'upload',
    layout = 'video-left',
    title,
    description,
    ctaLabel,
    ctaLink
  } = content || {};

  // Get embed URL for YouTube/Vimeo
  const getVideoElement = () => {
    if (videoType === 'youtube') {
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = videoUrl?.match(youtubeRegex);
      const videoId = match ? match[1] : videoUrl;
      
      return (
        <div className="relative w-full pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Video'}
          />
        </div>
      );
    } else if (videoType === 'vimeo') {
      const vimeoRegex = /vimeo\.com\/(\d+)/;
      const match = videoUrl?.match(vimeoRegex);
      const videoId = match ? match[1] : videoUrl;
      
      return (
        <div className="relative w-full pb-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://player.vimeo.com/video/${videoId}`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || 'Video'}
          />
        </div>
      );
    }

    // Upload type - use custom video player
    return (
      <div className="rounded-lg overflow-hidden shadow-lg">
        <VideoPlayer
          src={videoUrl || ''}
          controls={true}
          className="w-full"
        />
      </div>
    );
  };

  const videoElement = getVideoElement();
  const textContent = (
    <div className="flex flex-col justify-center">
      {title && (
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 border-l-4 border-maroon-800 pl-4">
          {title}
        </h2>
      )}
      
      {description && (
        <div className="prose prose-lg text-gray-700 mb-6">
          <p>{description}</p>
        </div>
      )}

      {ctaLabel && ctaLink && (
        <div>
          <Link
            to={ctaLink}
            className="inline-flex items-center bg-maroon-800 text-white px-8 py-3 rounded hover:bg-maroon-900 transition-colors font-bold uppercase tracking-wider text-sm"
          >
            {ctaLabel}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {layout === 'video-top' ? (
          <div className="space-y-12">
            <div>{videoElement}</div>
            <div className="max-w-4xl mx-auto">{textContent}</div>
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 gap-12 items-center ${
            layout === 'video-right' ? 'md:grid-flow-dense' : ''
          }`}>
            <div className={layout === 'video-right' ? 'md:col-start-2' : ''}>
              {videoElement}
            </div>
            <div className={layout === 'video-right' ? 'md:col-start-1 md:row-start-1' : ''}>
              {textContent}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
