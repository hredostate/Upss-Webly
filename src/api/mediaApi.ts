import { supabase } from '../lib/supabase';
import { Media } from '../types/media';

export const mediaApi = {
  /**
   * Upload a file (image or video) to Supabase storage
   */
  uploadFile: async (file: File, folder: string = 'general'): Promise<Media> => {
    try {
      // Determine file type
      const fileType = file.type.startsWith('video/') ? 'video' : 
                       file.type.startsWith('image/') ? 'image' :
                       file.type.startsWith('audio/') ? 'audio' : 'document';
      
      // Determine bucket based on file type
      const bucket = fileType === 'video' ? 'videos' : 'images';
      
      // Create unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${folder}/${timestamp}_${sanitizedName}`;
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);
      
      const fileUrl = urlData.publicUrl;
      
      // Get video metadata if it's a video
      let duration: number | undefined;
      let videoWidth: number | undefined;
      let videoHeight: number | undefined;
      let thumbnailUrl: string | undefined;
      
      if (fileType === 'video') {
        const metadata = await mediaApi.getVideoMetadata(file);
        duration = metadata.duration;
        videoWidth = metadata.width;
        videoHeight = metadata.height;
        // TODO: Implement server-side thumbnail generation using a service like ffmpeg
        // or a cloud function. Client-side thumbnail generation is limited and unreliable.
        // For now, thumbnails can be uploaded separately or generated post-upload.
      }
      
      // Get image dimensions if it's an image
      let width: number | undefined;
      let height: number | undefined;
      
      if (fileType === 'image') {
        const dimensions = await mediaApi.getImageDimensions(file);
        width = dimensions.width;
        height = dimensions.height;
      }
      
      // Create media record in database
      const { data: { user } } = await supabase.auth.getUser();
      
      const mediaData = {
        file_name: fileName,
        original_name: file.name,
        file_type: fileType,
        mime_type: file.type,
        file_size: file.size,
        file_url: fileUrl,
        duration,
        thumbnail_url: thumbnailUrl,
        video_width: videoWidth,
        video_height: videoHeight,
        width,
        height,
        folder,
        is_public: true,
        uploaded_by: user?.id
      };
      
      const { data: mediaRecord, error: dbError } = await supabase
        .from('media')
        .insert(mediaData)
        .select()
        .single();
      
      if (dbError) {
        // Clean up uploaded file if database insert fails
        await supabase.storage.from(bucket).remove([fileName]);
        throw new Error(`Database error: ${dbError.message}`);
      }
      
      // Convert snake_case to camelCase
      return mediaApi.convertToMedia(mediaRecord);
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  },
  
  /**
   * Upload video specifically with validation
   */
  uploadVideo: async (file: File, folder: string = 'videos'): Promise<Media> => {
    // Validate it's a video
    if (!file.type.startsWith('video/')) {
      throw new Error('File must be a video');
    }
    
    // Validate size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      throw new Error('Video file size must be less than 100MB');
    }
    
    return mediaApi.uploadFile(file, folder);
  },
  
  /**
   * Get all media items with optional filters
   */
  getMedia: async (filters?: { 
    type?: string; 
    folder?: string;
    limit?: number;
  }): Promise<Media[]> => {
    let query = supabase.from('media').select('*').order('created_at', { ascending: false });
    
    if (filters?.type) {
      query = query.eq('file_type', filters.type);
    }
    
    if (filters?.folder) {
      query = query.eq('folder', filters.folder);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw new Error(`Failed to fetch media: ${error.message}`);
    }
    
    return (data || []).map(mediaApi.convertToMedia);
  },
  
  /**
   * Get a single media item by ID
   */
  getMediaById: async (id: string): Promise<Media | null> => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching media:', error);
      return null;
    }
    
    return mediaApi.convertToMedia(data);
  },
  
  /**
   * Update media metadata
   */
  updateMedia: async (id: string, updates: Partial<Media>): Promise<Media> => {
    // Convert camelCase to snake_case for database
    const dbUpdates: any = {};
    if (updates.altText !== undefined) dbUpdates.alt_text = updates.altText;
    if (updates.caption !== undefined) dbUpdates.caption = updates.caption;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
    if (updates.folder !== undefined) dbUpdates.folder = updates.folder;
    
    const { data, error } = await supabase
      .from('media')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Failed to update media: ${error.message}`);
    }
    
    return mediaApi.convertToMedia(data);
  },
  
  /**
   * Delete media item and associated file
   */
  deleteMedia: async (id: string): Promise<void> => {
    // First get the media record to know which file to delete
    const media = await mediaApi.getMediaById(id);
    
    if (!media) {
      throw new Error('Media not found');
    }
    
    // Delete from storage
    const bucket = media.fileType === 'video' ? 'videos' : 'images';
    const { error: storageError } = await supabase.storage
      .from(bucket)
      .remove([media.fileName]);
    
    if (storageError) {
      console.error('Storage deletion error:', storageError);
      // Continue with database deletion even if storage deletion fails
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
    
    if (dbError) {
      throw new Error(`Failed to delete media: ${dbError.message}`);
    }
  },
  
  /**
   * Get video metadata using HTML5 Video API
   */
  getVideoMetadata: async (file: File): Promise<{
    duration: number;
    width: number;
    height: number;
  }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve({
          duration: Math.round(video.duration),
          width: video.videoWidth,
          height: video.videoHeight
        });
      };
      
      video.onerror = () => {
        reject(new Error('Failed to load video metadata'));
      };
      
      video.src = URL.createObjectURL(file);
    });
  },
  
  /**
   * Get image dimensions
   */
  getImageDimensions: async (file: File): Promise<{
    width: number;
    height: number;
  }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        window.URL.revokeObjectURL(img.src);
        resolve({
          width: img.width,
          height: img.height
        });
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  },
  
  /**
   * Helper to convert database record to Media type
   */
  convertToMedia: (record: any): Media => {
    return {
      id: record.id,
      fileName: record.file_name,
      originalName: record.original_name,
      fileType: record.file_type,
      mimeType: record.mime_type,
      fileSize: record.file_size,
      fileUrl: record.file_url,
      duration: record.duration,
      thumbnailUrl: record.thumbnail_url,
      videoWidth: record.video_width,
      videoHeight: record.video_height,
      width: record.width,
      height: record.height,
      altText: record.alt_text,
      caption: record.caption,
      description: record.description,
      folder: record.folder,
      tags: record.tags,
      isPublic: record.is_public,
      uploadedBy: record.uploaded_by,
      createdAt: record.created_at,
      updatedAt: record.updated_at
    };
  },
  
  /**
   * Format file size for display
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },
  
  /**
   * Format video duration for display
   */
  formatDuration: (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
};
