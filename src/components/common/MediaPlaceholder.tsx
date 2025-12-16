import React from 'react';

interface MediaPlaceholderProps {
  label?: string;
  type?: 'image' | 'video';
  aspect?: 'wide' | 'square';
}

const baseImage = 'https://placehold.co/1200x720/111827/ffffff?text=UPSS+Media';
const baseSquare = 'https://placehold.co/900x900/111827/ffffff?text=UPSS+Media';

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  label,
  type = 'image',
  aspect = 'wide',
}) => {
  const source = aspect === 'square' ? baseSquare : baseImage;

  return (
    <figure className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white">
      <img
        src={source}
        alt={label || 'Media placeholder'}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 flex items-end">
        <div className="w-full flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-black/35 text-white text-sm font-semibold tracking-wide uppercase">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 shadow-lg shadow-primary-900/40">
              {type === 'video' ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                  <circle cx="12" cy="13" r="3.2" />
                </svg>
              )}
            </span>
            <span>{label || (type === 'video' ? 'Video Placeholder' : 'Image Placeholder')}</span>
          </div>
          <div className="text-xs font-medium text-white/80">UPSS</div>
        </div>
      </div>
    </figure>
  );
};

