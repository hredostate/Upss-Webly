
import React, { useState, useEffect } from 'react';
import { Section, SectionType } from '../../types';

interface SectionFormProps {
  initialData?: Partial<Section>;
  onSave: (data: Partial<Section>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const SECTION_TYPES: SectionType[] = [
  'HERO', 'VALUE_COLUMNS', 'STATS', 'NEWS_LIST', 'TEXT_BLOCK', 'CTA_BANNER',
  'VIDEO_HERO', 'VIDEO_EMBED', 'VIDEO_GALLERY', 'VIDEO_BLOCK'
];

export const SectionForm: React.FC<SectionFormProps> = ({ initialData, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState<Partial<Section>>({
    type: 'HERO',
    title: '',
    subtitle: '',
    isVisible: true,
    contentJson: {},
    ...initialData
  });

  const [contentFields, setContentFields] = useState<any>(formData.contentJson || {});

  useEffect(() => {
    setFormData(prev => ({ ...prev, contentJson: contentFields }));
  }, [contentFields]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (key: string, value: any) => {
    setContentFields((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // --- Type Specific Fields ---

  const renderHeroFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A large visual banner with text and call-to-action buttons.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Headline</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
          placeholder="Main Heading text"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Subtext</label>
        <textarea
          value={formData.subtitle || ''}
          onChange={(e) => setFormData(prev => ({...prev, subtitle: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
          placeholder="Supporting descriptive text"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Background Image URL</label>
        <input 
          type="text" 
          value={contentFields.backgroundImage || ''}
          onChange={(e) => handleContentChange('backgroundImage', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="Link to high-res image"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Primary CTA Label</label>
          <input 
            type="text" 
            value={contentFields.primaryCta?.label || ''}
            onChange={(e) => handleContentChange('primaryCta', { ...contentFields.primaryCta, label: e.target.value })}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. Apply Now"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Primary CTA Link</label>
          <input 
            type="text" 
            value={contentFields.primaryCta?.link || ''}
            onChange={(e) => handleContentChange('primaryCta', { ...contentFields.primaryCta, link: e.target.value })}
            className="w-full p-2 border rounded mt-1"
            placeholder="/admissions"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Secondary CTA Label</label>
          <input 
            type="text" 
            value={contentFields.secondaryCta?.label || ''}
            onChange={(e) => handleContentChange('secondaryCta', { ...contentFields.secondaryCta, label: e.target.value })}
            className="w-full p-2 border rounded mt-1"
            placeholder="e.g. Visit Campus"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Secondary CTA Link</label>
          <input 
            type="text" 
            value={contentFields.secondaryCta?.link || ''}
            onChange={(e) => handleContentChange('secondaryCta', { ...contentFields.secondaryCta, link: e.target.value })}
            className="w-full p-2 border rounded mt-1"
            placeholder="/contact"
          />
        </div>
      </div>
    </div>
  );

  const renderValueColumnsFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A grid of 3 columns highlighting core values or features.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title (Optional)</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Columns Data (JSON)</label>
        <p className="text-xs text-gray-500 mb-2">Each column needs a title and description.</p>
        <textarea
          rows={8}
          value={JSON.stringify(contentFields.columns || [
            { title: "Column 1", description: "Desc...", link: "" },
            { title: "Column 2", description: "Desc...", link: "" },
            { title: "Column 3", description: "Desc...", link: "" }
          ], null, 2)}
          onChange={(e) => {
            try {
              handleContentChange('columns', JSON.parse(e.target.value));
            } catch (err) {}
          }}
          className="w-full p-2 border rounded font-mono text-xs"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Variant</label>
        <select
          value={contentFields.variant || 'default'}
          onChange={(e) => handleContentChange('variant', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="default">Standard (Text Columns)</option>
          <option value="panels">Large Image Panels (Academics/Life)</option>
        </select>
      </div>
    </div>
  );

  const renderStatsFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A row of key performance indicators or numbers.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Stats List (JSON)</label>
        <p className="text-xs text-gray-500 mb-2">Format: Label and Value pairs.</p>
        <textarea
          rows={6}
          value={JSON.stringify(contentFields.stats || [
            { label: "University Admission Rate", value: "95%" },
            { label: "Student Clubs", value: "20+" }
          ], null, 2)}
          onChange={(e) => {
            try {
              handleContentChange('stats', JSON.parse(e.target.value));
            } catch (err) {}
          }}
          className="w-full p-2 border rounded font-mono text-xs"
        />
      </div>
    </div>
  );

  const renderNewsListFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Automatically pulls recent articles from the News module.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
          placeholder="Latest News"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-bold text-gray-700">Number of items to show</label>
          <input 
            type="number" 
            value={contentFields.limit || 3}
            onChange={(e) => handleContentChange('limit', parseInt(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox"
            checked={!!contentFields.featuredOnly}
            onChange={(e) => handleContentChange('featuredOnly', e.target.checked)}
            className="rounded text-maroon-800 focus:ring-maroon-500"
          />
          <span className="text-sm font-bold text-gray-700">Show "Featured" only</span>
        </label>
      </div>
    </div>
  );

  const renderTextBlockFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A general purpose block for paragraphs and rich text.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Content Body (Rich Text)</label>
        <textarea
          rows={10}
          value={contentFields.html || ''}
          onChange={(e) => handleContentChange('html', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="<p>Enter your content here...</p>"
        />
      </div>
    </div>
  );

  const renderCtaBannerFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A full-width strip for important calls to action.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Main Banner Text</label>
        <textarea
          value={contentFields.text || ''}
          onChange={(e) => handleContentChange('text', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          rows={2}
          placeholder="e.g., Applications are now open."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Button Text</label>
          <input 
            type="text" 
            value={contentFields.ctaLabel || ''}
            onChange={(e) => handleContentChange('ctaLabel', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Button Link</label>
          <input 
            type="text" 
            value={contentFields.ctaLink || ''}
            onChange={(e) => handleContentChange('ctaLink', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Style Variant</label>
        <select
          value={contentFields.variant || 'light'}
          onChange={(e) => handleContentChange('variant', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="light">Light Theme (Gray Background)</option>
          <option value="dark">Dark Theme (Maroon Background)</option>
        </select>
      </div>
    </div>
  );

  const renderVideoHeroFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Full-width background video with overlay text and CTAs.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Video URL</label>
        <input 
          type="text"
          value={contentFields.videoUrl || ''}
          onChange={(e) => handleContentChange('videoUrl', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Poster Image URL (Fallback)</label>
        <input 
          type="text"
          value={contentFields.posterImage || ''}
          onChange={(e) => handleContentChange('posterImage', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Title</label>
        <input 
          type="text"
          value={contentFields.title || ''}
          onChange={(e) => handleContentChange('title', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Subtitle</label>
        <textarea
          value={contentFields.subtitle || ''}
          onChange={(e) => handleContentChange('subtitle', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Overlay Opacity</label>
          <input 
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={contentFields.overlayOpacity || 0.5}
            onChange={(e) => handleContentChange('overlayOpacity', parseFloat(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 mt-6">
            <input 
              type="checkbox"
              checked={!!contentFields.autoplay}
              onChange={(e) => handleContentChange('autoplay', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-bold">Autoplay</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2 mt-6">
            <input 
              type="checkbox"
              checked={!!contentFields.loop}
              onChange={(e) => handleContentChange('loop', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-bold">Loop</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Primary CTA Label</label>
          <input 
            type="text" 
            value={contentFields.primaryCta?.label || ''}
            onChange={(e) => handleContentChange('primaryCta', { ...contentFields.primaryCta, label: e.target.value })}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Primary CTA Link</label>
          <input 
            type="text" 
            value={contentFields.primaryCta?.link || ''}
            onChange={(e) => handleContentChange('primaryCta', { ...contentFields.primaryCta, link: e.target.value })}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderVideoEmbedFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Embed videos from YouTube, Vimeo, or other platforms.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title (Optional)</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Embed URL</label>
        <input 
          type="text"
          value={contentFields.embedUrl || ''}
          onChange={(e) => handleContentChange('embedUrl', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Embed Type</label>
          <select
            value={contentFields.embedType || 'youtube'}
            onChange={(e) => handleContentChange('embedType', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Aspect Ratio</label>
          <select
            value={contentFields.aspectRatio || '16:9'}
            onChange={(e) => handleContentChange('aspectRatio', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="16:9">16:9 (Widescreen)</option>
            <option value="4:3">4:3 (Standard)</option>
            <option value="1:1">1:1 (Square)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderVideoGalleryFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Display multiple videos in a grid or carousel layout.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title</label>
        <input 
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Layout</label>
          <select
            value={contentFields.layout || 'grid'}
            onChange={(e) => handleContentChange('layout', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="grid">Grid</option>
            <option value="carousel">Carousel</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Columns (Grid)</label>
          <select
            value={contentFields.columns || 3}
            onChange={(e) => handleContentChange('columns', parseInt(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
            <option value="4">4 Columns</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Videos (JSON)</label>
        <p className="text-xs text-gray-500 mb-2">Array of video objects with url, title, thumbnail, duration, category</p>
        <textarea
          rows={10}
          value={JSON.stringify(contentFields.videos || [
            { url: "video-url.mp4", title: "Video 1", thumbnail: "thumb.jpg", duration: "2:30", category: "Demo" }
          ], null, 2)}
          onChange={(e) => {
            try {
              handleContentChange('videos', JSON.parse(e.target.value));
            } catch (err) {
              // Show error feedback to user
              if (e.target.value.trim()) {
                console.error('Invalid JSON format');
                // You could set an error state here to show to the user
              }
            }
          }}
          className="w-full p-2 border rounded font-mono text-xs"
          placeholder='[{"url": "video.mp4", "title": "My Video", "thumbnail": "thumb.jpg"}]'
        />
        <p className="text-xs text-red-500 mt-1">Make sure the JSON is valid. Use online JSON validators if needed.</p>
      </div>
    </div>
  );

  const renderVideoBlockFields = () => (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Single video with accompanying text content.
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Video URL</label>
        <input 
          type="text"
          value={contentFields.videoUrl || ''}
          onChange={(e) => handleContentChange('videoUrl', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="https://... or YouTube/Vimeo URL"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Video Type</label>
          <select
            value={contentFields.videoType || 'upload'}
            onChange={(e) => handleContentChange('videoType', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="upload">Uploaded Video</option>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Layout</label>
          <select
            value={contentFields.layout || 'video-left'}
            onChange={(e) => handleContentChange('layout', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="video-left">Video Left</option>
            <option value="video-right">Video Right</option>
            <option value="video-top">Video Top</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Title</label>
        <input 
          type="text"
          value={contentFields.title || ''}
          onChange={(e) => handleContentChange('title', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Description</label>
        <textarea
          value={contentFields.description || ''}
          onChange={(e) => handleContentChange('description', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">CTA Label (Optional)</label>
          <input 
            type="text"
            value={contentFields.ctaLabel || ''}
            onChange={(e) => handleContentChange('ctaLabel', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">CTA Link</label>
          <input 
            type="text"
            value={contentFields.ctaLink || ''}
            onChange={(e) => handleContentChange('ctaLink', e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700">Section Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500"
            disabled={!!initialData?.id}
          >
            {SECTION_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">Visibility</label>
           <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
              className="h-4 w-4 text-maroon-600 focus:ring-maroon-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Visible on public site</span>
          </div>
        </div>
      </div>

      {formData.type === 'HERO' && renderHeroFields()}
      {formData.type === 'VALUE_COLUMNS' && renderValueColumnsFields()}
      {formData.type === 'STATS' && renderStatsFields()}
      {formData.type === 'NEWS_LIST' && renderNewsListFields()}
      {formData.type === 'TEXT_BLOCK' && renderTextBlockFields()}
      {formData.type === 'CTA_BANNER' && renderCtaBannerFields()}
      {formData.type === 'VIDEO_HERO' && renderVideoHeroFields()}
      {formData.type === 'VIDEO_EMBED' && renderVideoEmbedFields()}
      {formData.type === 'VIDEO_GALLERY' && renderVideoGalleryFields()}
      {formData.type === 'VIDEO_BLOCK' && renderVideoBlockFields()}

      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-bold"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-maroon-800 text-white rounded hover:bg-maroon-900 disabled:opacity-50 font-bold uppercase tracking-wide"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};
