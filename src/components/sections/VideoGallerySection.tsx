import React, { useState } from 'react';
import { Section } from '../../types';
import { VideoGalleryContent } from '../../types/media';
import { VideoPlayer } from '../media/VideoPlayer';

export const VideoGallerySection: React.FC<{ section: Section }> = ({ section }) => {
  const content = section.contentJson as VideoGalleryContent;
  const {
    videos = [],
    layout = 'grid',
    columns = 3
  } = content || {};

  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...new Set(videos.map(v => v.category).filter(Boolean))];

  // Filter videos by category
  const filteredVideos = filter === 'all' 
    ? videos 
    : videos.filter(v => v.category === filter);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  }[columns] || 'md:grid-cols-3';

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {section.title && (
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 text-center">
            {section.title}
          </h2>
        )}
        
        {section.subtitle && (
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            {section.subtitle}
          </p>
        )}

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat
                    ? 'bg-maroon-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat === 'all' ? 'All Videos' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Video Grid */}
        {layout === 'grid' ? (
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {filteredVideos.map((video, index) => (
              <div
                key={index}
                onClick={() => setSelectedVideo(video)}
                className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              >
                {/* Thumbnail */}
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-maroon-900 to-maroon-700 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    <svg className="w-8 h-8 text-maroon-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{video.title}</h3>
                  {video.duration && (
                    <p className="text-gray-300 text-xs">{video.duration}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Carousel Layout - Simple horizontal scroll */
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {filteredVideos.map((video, index) => (
              <div
                key={index}
                onClick={() => setSelectedVideo(video)}
                className="group relative flex-shrink-0 w-80 aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all snap-center"
              >
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-maroon-900 to-maroon-700 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    <svg className="w-8 h-8 text-maroon-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{video.title}</h3>
                  {video.duration && (
                    <p className="text-gray-300 text-xs">{video.duration}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
            <div className="relative w-full max-w-5xl">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <VideoPlayer
                src={selectedVideo.url}
                poster={selectedVideo.thumbnail}
                controls={true}
                autoPlay={true}
                className="rounded-lg overflow-hidden"
              />
              
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{selectedVideo.title}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
