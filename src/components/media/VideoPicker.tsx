import React, { useState, useEffect } from 'react';
import { mediaApi } from '../../api/mediaApi';
import { Media } from '../../types/media';
import { VideoUpload } from './VideoUpload';

interface VideoPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (video: Media) => void;
  allowUpload?: boolean;
  allowEmbed?: boolean;
}

export const VideoPicker: React.FC<VideoPickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  allowUpload = true,
  allowEmbed = false
}) => {
  const [videos, setVideos] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'embed'>('library');
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadVideos();
    }
  }, [isOpen]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const media = await mediaApi.getMedia({ type: 'video' });
      setVideos(media);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (media: Media) => {
    onSelect(media);
    onClose();
  };

  const handleEmbedSubmit = () => {
    if (!embedUrl) return;
    
    // Create a media object for embedded videos with special handling
    // Note: Embedded videos use a custom mimeType to distinguish them from uploaded videos
    const embedMedia: Media = {
      id: `embed-${Date.now()}`,
      fileName: embedUrl,
      originalName: embedUrl,
      fileType: 'video',
      mimeType: 'application/x-video-embed', // Custom MIME type for embedded videos
      fileSize: 0,
      fileUrl: embedUrl,
      folder: 'embed',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onSelect(embedMedia);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Select Video</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('library')}
                className={`pb-2 px-1 font-semibold text-sm ${
                  activeTab === 'library'
                    ? 'border-b-2 border-maroon-600 text-maroon-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Video Library
              </button>
              {allowUpload && (
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`pb-2 px-1 font-semibold text-sm ${
                    activeTab === 'upload'
                      ? 'border-b-2 border-maroon-600 text-maroon-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Upload New
                </button>
              )}
              {allowEmbed && (
                <button
                  onClick={() => setActiveTab('embed')}
                  className={`pb-2 px-1 font-semibold text-sm ${
                    activeTab === 'embed'
                      ? 'border-b-2 border-maroon-600 text-maroon-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Embed URL
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-96 overflow-y-auto">
            {activeTab === 'library' && (
              <>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-maroon-600"></div>
                    <p className="mt-2 text-gray-600">Loading videos...</p>
                  </div>
                ) : videos.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-gray-600">No videos uploaded yet</p>
                    {allowUpload && (
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-600 hover:bg-maroon-700"
                      >
                        Upload Video
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {videos.map((video) => (
                      <button
                        key={video.id}
                        onClick={() => {
                          onSelect(video);
                          onClose();
                        }}
                        className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-maroon-600 transition-all"
                      >
                        {video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.originalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                          <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                          <p className="text-white text-xs truncate">{video.originalName}</p>
                          {video.duration && (
                            <p className="text-gray-300 text-xs">
                              {mediaApi.formatDuration(video.duration)}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'upload' && (
              <VideoUpload onUpload={handleUploadComplete} showPreview={true} />
            )}

            {activeTab === 'embed' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Video URL (YouTube, Vimeo, etc.)
                  </label>
                  <input
                    type="text"
                    value={embedUrl}
                    onChange={(e) => setEmbedUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-maroon-500 focus:border-maroon-500"
                  />
                </div>
                <button
                  onClick={handleEmbedSubmit}
                  disabled={!embedUrl}
                  className="w-full bg-maroon-600 text-white px-4 py-2 rounded-md hover:bg-maroon-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Use This URL
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
