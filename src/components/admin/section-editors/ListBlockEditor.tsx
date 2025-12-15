import React from 'react';

interface ListBlockEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const ListBlockEditor: React.FC<ListBlockEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const items = contentJson.items || [''];
  const listType = contentJson.listType || 'bulleted';

  const addItem = () => {
    onContentChange('items', [...items, '']);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    onContentChange('items', newItems);
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onContentChange('items', newItems);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A bulleted or numbered list of items.
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
        <label className="block text-sm font-bold text-gray-700">List Type</label>
        <select
          value={listType}
          onChange={(e) => onContentChange('listType', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="bulleted">Bulleted (with checkmarks)</option>
          <option value="numbered">Numbered</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">List Items</label>
        {items.map((item: string, idx: number) => (
          <div key={idx} className="mb-2 flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(idx, e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder={`Item ${idx + 1}`}
            />
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
};
