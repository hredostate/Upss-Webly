import React, { useState, useRef } from 'react';
import { mediaApi } from '../../api/mediaApi';
import { Media } from '../../types/media';

interface VideoUploadProps {
  onUpload: (media: Media) => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  showPreview?: boolean;
  folder?: string;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onUpload,
  maxSize = 100,
  acceptedFormats = ['.mp4', '.webm', '.mov', '.avi'],
  showPreview = true,
  folder = 'videos'
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await processFile(file);
  };

  const processFile = async (file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Show preview if enabled
    if (showPreview) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    // Upload file
    try {
      setUploading(true);
      setProgress(0);

      // Simulate progress (in real implementation, this would track actual upload progress)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const media = await mediaApi.uploadVideo(file, folder);

      clearInterval(progressInterval);
      setProgress(100);

      // Clean up preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      onUpload(media);
      
      // Reset form
      setTimeout(() => {
        setPreviewUrl(null);
        setProgress(0);
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-maroon-500 transition-colors cursor-pointer bg-gray-50"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-maroon-600 hover:text-maroon-500">
              Upload a video
            </span>{' '}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {acceptedFormats.join(', ')} up to {maxSize}MB
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-maroon-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {previewUrl && showPreview && !uploading && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
          <video
            src={previewUrl}
            controls
            className="w-full max-h-64 rounded-lg bg-black"
          />
        </div>
      )}
    </div>
  );
};
