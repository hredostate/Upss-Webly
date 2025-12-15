# Video Upload and Management Feature

This document describes the comprehensive video upload, management, and display capabilities added to the UPSS website.

## Overview

The video feature includes:
- Video and image upload to Supabase Storage
- Media library management with filtering
- Four new section types for displaying videos
- Custom video player with full controls
- YouTube and Vimeo embed support

## Database Setup

### 1. Run Migrations

Execute the following SQL migrations in your Supabase database:

```bash
# Apply migrations 003 and 004
supabase/migrations/003_add_media_and_video_sections.sql
supabase/migrations/004_storage_buckets.sql
```

### 2. Create Storage Buckets

In the Supabase dashboard:

1. Go to Storage
2. Create a new bucket named `videos` (set as public)
3. Create a new bucket named `images` (set as public)
4. Apply the RLS policies from migration 004

Alternatively, use the Supabase API or SQL:

```sql
-- Create buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true);

-- Apply RLS policies (see migration 004 for complete policies)
```

## Features

### Media Library

**Location:** Admin Panel > Media Library

**Features:**
- Upload videos (MP4, WebM, MOV, AVI) up to 100MB
- Upload images (JPG, PNG, GIF) up to 10MB
- Filter by media type (All, Images, Videos)
- Preview videos and images
- Copy media URLs
- Delete media with confirmation
- Automatic metadata extraction (dimensions, duration)

**Usage:**
1. Click "Upload Media" button
2. Drag and drop files or click to browse
3. Wait for upload progress to complete
4. View uploaded media in the grid
5. Click on media to preview or copy URL

### Video Section Types

#### 1. VIDEO_HERO

Full-width background video with overlay text and CTAs.

**Use Cases:**
- Homepage hero sections
- Landing page headers
- Promotional sections

**Configuration:**
- Video URL (uploaded or external)
- Poster image (fallback)
- Overlay opacity (0-1)
- Autoplay, loop, muted settings
- Title and subtitle
- Primary and secondary CTAs

**Example Content JSON:**
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "posterImage": "https://example.com/poster.jpg",
  "overlayOpacity": 0.5,
  "autoplay": true,
  "loop": true,
  "muted": true,
  "title": "Welcome to UPSS",
  "subtitle": "Excellence in Education",
  "primaryCta": {
    "label": "Apply Now",
    "link": "/admissions"
  },
  "secondaryCta": {
    "label": "Learn More",
    "link": "/about"
  }
}
```

#### 2. VIDEO_EMBED

Embed videos from YouTube, Vimeo, or custom platforms.

**Use Cases:**
- Promotional videos
- Tutorial content
- Event recordings

**Configuration:**
- Embed URL (YouTube/Vimeo)
- Embed type (youtube, vimeo, custom)
- Aspect ratio (16:9, 4:3, 1:1)
- Start time (optional)
- Privacy mode (YouTube no-cookie)

**Example Content JSON:**
```json
{
  "embedUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "embedType": "youtube",
  "aspectRatio": "16:9",
  "startTime": 0,
  "privacyMode": true
}
```

#### 3. VIDEO_GALLERY

Display multiple videos in a grid or carousel layout.

**Use Cases:**
- Event highlights
- Student testimonials
- Campus tours

**Configuration:**
- Videos array (url, title, thumbnail, duration, category)
- Layout (grid or carousel)
- Columns (2, 3, or 4)
- Category filtering

**Example Content JSON:**
```json
{
  "videos": [
    {
      "url": "https://example.com/video1.mp4",
      "title": "Campus Tour",
      "thumbnail": "https://example.com/thumb1.jpg",
      "duration": "3:45",
      "category": "Campus Life"
    },
    {
      "url": "https://example.com/video2.mp4",
      "title": "Student Testimonial",
      "thumbnail": "https://example.com/thumb2.jpg",
      "duration": "2:30",
      "category": "Testimonials"
    }
  ],
  "layout": "grid",
  "columns": 3
}
```

#### 4. VIDEO_BLOCK

Single video with accompanying text content.

**Use Cases:**
- Feature explanations
- Product demos
- About us sections

**Configuration:**
- Video URL
- Video type (upload, youtube, vimeo)
- Layout (video-left, video-right, video-top)
- Title and description
- Optional CTA

**Example Content JSON:**
```json
{
  "videoUrl": "https://example.com/demo.mp4",
  "videoType": "upload",
  "layout": "video-left",
  "title": "Our Facilities",
  "description": "Take a look at our state-of-the-art classrooms and laboratories.",
  "ctaLabel": "Schedule a Visit",
  "ctaLink": "/contact"
}
```

## Components

### VideoPlayer

Custom video player with controls.

**Props:**
```typescript
interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}
```

**Features:**
- Play/pause button
- Seek bar with time display
- Volume control
- Fullscreen toggle
- Keyboard shortcuts
- Mobile-friendly controls

### VideoUpload

Reusable upload component.

**Props:**
```typescript
interface VideoUploadProps {
  onUpload: (media: Media) => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  showPreview?: boolean;
  folder?: string;
}
```

**Features:**
- Drag and drop support
- File validation
- Progress tracking
- Preview functionality

### VideoPicker

Modal for selecting or uploading videos.

**Props:**
```typescript
interface VideoPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (video: Media) => void;
  allowUpload?: boolean;
  allowEmbed?: boolean;
}
```

**Features:**
- Browse video library
- Upload new videos
- Embed external videos
- Tabbed interface

## API Reference

### mediaApi

**Methods:**

- `uploadFile(file: File, folder?: string): Promise<Media>`
- `uploadVideo(file: File, folder?: string): Promise<Media>`
- `getMedia(filters?: { type?, folder?, limit? }): Promise<Media[]>`
- `getMediaById(id: string): Promise<Media | null>`
- `updateMedia(id: string, updates: Partial<Media>): Promise<Media>`
- `deleteMedia(id: string): Promise<void>`
- `getVideoMetadata(file: File): Promise<{ duration, width, height }>`
- `getImageDimensions(file: File): Promise<{ width, height }>`
- `formatFileSize(bytes: number): string`
- `formatDuration(seconds: number): string`

**Example Usage:**
```typescript
import { mediaApi } from '../api/mediaApi';

// Upload a video
const media = await mediaApi.uploadVideo(file, 'videos');

// Get all videos
const videos = await mediaApi.getMedia({ type: 'video' });

// Delete media
await mediaApi.deleteMedia(mediaId);
```

## Best Practices

### Video Upload

1. **File Size:** Keep videos under 100MB for better performance
2. **Format:** Use MP4 with H.264 codec for maximum compatibility
3. **Compression:** Compress videos before upload to reduce file size
4. **Thumbnails:** Upload custom thumbnails for better presentation

### Video Display

1. **Autoplay:** Use autoplay sparingly, always mute autoplay videos
2. **Fallbacks:** Always provide poster images for slow connections
3. **Accessibility:** Include captions and transcripts when possible
4. **Mobile:** Test video playback on mobile devices

### Performance

1. **Lazy Loading:** Videos are loaded on-demand to improve page speed
2. **CDN:** Use Supabase CDN for fast video delivery
3. **Responsive:** Videos adapt to screen size automatically
4. **Caching:** Set appropriate cache headers for video files

## Troubleshooting

### Videos Not Playing

1. Check video format compatibility (MP4 recommended)
2. Verify Supabase storage bucket is public
3. Check browser console for errors
4. Ensure video URL is accessible

### Upload Failures

1. Check file size (max 100MB for videos)
2. Verify Supabase credentials are correct
3. Check storage bucket exists and is accessible
4. Review network connection

### Missing Thumbnails

1. Thumbnails are optional for uploaded videos
2. Use custom thumbnail upload for better control
3. For embedded videos, platforms generate thumbnails automatically

## Future Enhancements

1. **Server-side Thumbnail Generation:** Implement ffmpeg-based thumbnail generation
2. **Video Processing:** Add video compression and format conversion
3. **Playlists:** Create video playlists for sequential playback
4. **Analytics:** Track video views and engagement
5. **Subtitles:** Support for WebVTT subtitle files
6. **Live Streaming:** Integration with live streaming platforms

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the Supabase documentation
3. Contact the development team
