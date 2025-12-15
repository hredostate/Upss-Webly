
import { useState, useEffect } from 'react';
import { mediaApi } from '../../api/mediaApi';
import { Media } from '../../types/media';
import { VideoUpload } from '../../components/media/VideoUpload';

export default function MediaLibrary() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    loadMedia();
  }, [filter]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const filters = filter !== 'all' ? { type: filter } : undefined;
      const data = await mediaApi.getMedia(filters);
      setMedia(data);
    } catch (error) {
      console.error('Failed to load media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (newMedia: Media) => {
    setMedia(prev => [newMedia, ...prev]);
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await mediaApi.deleteMedia(id);
      setMedia(prev => prev.filter(m => m.id !== id));
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete media');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Media Library</h1>
        <button 
          onClick={() => setUploading(!uploading)}
          className="bg-maroon-800 text-white px-4 py-2 rounded shadow-sm hover:bg-maroon-900 transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          {uploading ? 'Cancel Upload' : 'Upload Media'}
        </button>
      </div>

      {/* Upload Area */}
      {uploading && (
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upload New Media</h3>
          <VideoUpload 
            onUpload={handleUploadComplete}
            maxSize={100}
            acceptedFormats={['.mp4', '.webm', '.mov', '.avi', '.jpg', '.jpeg', '.png', '.gif']}
            showPreview={true}
            folder="general"
          />
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`pb-2 px-4 font-semibold text-sm ${
            filter === 'all'
              ? 'border-b-2 border-maroon-600 text-maroon-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All Media
        </button>
        <button
          onClick={() => setFilter('image')}
          className={`pb-2 px-4 font-semibold text-sm ${
            filter === 'image'
              ? 'border-b-2 border-maroon-600 text-maroon-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`pb-2 px-4 font-semibold text-sm ${
            filter === 'video'
              ? 'border-b-2 border-maroon-600 text-maroon-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Videos
        </button>
      </div>

      {/* Media Grid */}
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-maroon-600"></div>
            <p className="mt-2 text-gray-600">Loading media...</p>
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No {filter !== 'all' ? filter + 's' : 'media'} uploaded yet.</p>
            <button
              onClick={() => setUploading(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maroon-600 hover:bg-maroon-700"
            >
              Upload Media
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                {/* Preview */}
                {item.fileType === 'image' ? (
                  <img
                    src={item.fileUrl}
                    alt={item.altText || item.originalName}
                    className="w-full h-full object-cover"
                  />
                ) : item.fileType === 'video' ? (
                  <div className="relative w-full h-full bg-gray-900">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    {item.duration && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        {mediaApi.formatDuration(item.duration)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    </svg>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMedia(item)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="View"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => copyUrl(item.fileUrl)}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                  <p className="text-white text-xs truncate">{item.originalName}</p>
                  <p className="text-gray-300 text-xs">{mediaApi.formatFileSize(item.fileSize)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {selectedMedia.fileType === 'image' ? (
              <img
                src={selectedMedia.fileUrl}
                alt={selectedMedia.altText || selectedMedia.originalName}
                className="w-full rounded-lg"
              />
            ) : selectedMedia.fileType === 'video' ? (
              <video
                src={selectedMedia.fileUrl}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            ) : null}
            
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{selectedMedia.originalName}</h3>
              <p className="text-gray-300 text-sm mt-2">
                {mediaApi.formatFileSize(selectedMedia.fileSize)}
                {selectedMedia.duration && ` • ${mediaApi.formatDuration(selectedMedia.duration)}`}
              </p>
              <button
                onClick={() => copyUrl(selectedMedia.fileUrl)}
                className="mt-4 inline-flex items-center px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
