import React from 'react';

interface FeatureListEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const FeatureListEditor: React.FC<FeatureListEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const features = contentJson.features || [''];

  const addFeature = () => {
    onContentChange('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_: any, i: number) => i !== index);
    onContentChange('features', newFeatures);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    onContentChange('features', newFeatures);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A grid of features with checkmarks (ideal for program highlights, track features).
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
        <label className="block text-sm font-bold text-gray-700 mb-2">Features</label>
        {features.map((feature: string, idx: number) => (
          <div key={idx} className="mb-2 flex gap-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => updateFeature(idx, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder={`Feature ${idx + 1}`}
            />
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Feature
        </button>
      </div>
    </div>
  );
};
