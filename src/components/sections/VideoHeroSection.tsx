import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../../types';
import { VideoHeroContent } from '../../types/media';

export const VideoHeroSection: React.FC<{ section: Section }> = ({ section }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const content = (section.contentJson || {}) as VideoHeroContent;
  const {
    videoUrl,
    posterImage,
    overlayOpacity = 0.5,
    autoplay = true,
    loop = true,
    muted = true,
    title,
    subtitle,
    primaryCta,
    secondaryCta
  } = content;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section 
      className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-gray-900"
      aria-label={title || section.title || 'Video Hero Section'}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay={autoplay}
            muted={muted}
            loop={loop}
            playsInline
            poster={posterImage}
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : posterImage ? (
          <img 
            src={posterImage} 
            alt=""
            className="w-full h-full object-cover"
          />
        ) : null}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-maroon-900/40 to-black/30 mix-blend-multiply"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {(title || section.title) && (
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] md:leading-[0.95] mb-8 drop-shadow-2xl tracking-tight max-w-5xl">
            {title || section.title}
          </h1>
        )}
        
        {(subtitle || section.subtitle) && (
          <p className="text-lg md:text-2xl text-gray-100 font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md opacity-90">
            {subtitle || section.subtitle}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
          {primaryCta && (
            <Link 
              to={primaryCta.link} 
              className="inline-flex items-center justify-center bg-maroon-700 text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 shadow-2xl transition-all duration-500 ease-out hover:bg-maroon-600 hover:shadow-maroon-900/50 hover:-translate-y-1 rounded-sm"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link 
              to={secondaryCta.link} 
              className="inline-flex items-center justify-center bg-transparent border border-white text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 transition-all duration-500 ease-out hover:bg-white hover:text-maroon-900 hover:-translate-y-1 rounded-sm backdrop-blur-sm"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>

      {/* Play/Pause Control */}
      {videoUrl && (
        <button
          onClick={togglePlay}
          className="absolute bottom-8 right-8 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}
    </section>
  );
};
