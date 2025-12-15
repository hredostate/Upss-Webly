import React from 'react';

interface ImageGalleryEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const ImageGalleryEditor: React.FC<ImageGalleryEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const images = contentJson.images || [{ url: '', caption: '' }];

  const addImage = () => {
    onContentChange('images', [...images, { url: '', caption: '' }]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: any, i: number) => i !== index);
    onContentChange('images', newImages);
  };

  const updateImage = (index: number, field: string, value: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    onContentChange('images', newImages);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A grid of images with optional captions and lightbox view.
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700">Subtitle (Optional)</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => onFieldChange('subtitle', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Gallery Images</label>
        {images.map((image: any, idx: number) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Image {idx + 1}</span>
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600">Image URL</label>
                <input
                  type="text"
                  value={image.url || ''}
                  onChange={(e) => updateImage(idx, 'url', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Caption (Optional)</label>
                <input
                  type="text"
                  value={image.caption || ''}
                  onChange={(e) => updateImage(idx, 'caption', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Image description"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
};
