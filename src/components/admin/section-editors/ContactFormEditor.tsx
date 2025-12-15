import React from 'react';

interface ContactFormEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const ContactFormEditor: React.FC<ContactFormEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const fields = contentJson.fields || [];

  const addField = () => {
    onContentChange('fields', [...fields, { name: '', label: '', type: 'text', required: false }]);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_: any, i: number) => i !== index);
    onContentChange('fields', newFields);
  };

  const updateField = (index: number, key: string, value: any) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [key]: value };
    onContentChange('fields', newFields);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A contact form with configurable fields. If no fields are configured, default fields (name, email, message) will be shown.
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
        <label className="block text-sm font-bold text-gray-700 mb-2">Form Fields (Optional - leave empty for default fields)</label>
        {fields.map((field: any, idx: number) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Field {idx + 1}</span>
              <button
                type="button"
                onClick={() => removeField(idx)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600">Field Name (ID)</label>
                <input
                  type="text"
                  value={field.name || ''}
                  onChange={(e) => updateField(idx, 'name', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="e.g., phone"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Field Label</label>
                <input
                  type="text"
                  value={field.label || ''}
                  onChange={(e) => updateField(idx, 'label', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="e.g., Phone Number"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Field Type</label>
                <select
                  value={field.type || 'text'}
                  onChange={(e) => updateField(idx, 'type', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="tel">Phone</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select Dropdown</option>
                </select>
              </div>
              <div className="flex items-center pt-4">
                <label className="flex items-center text-xs text-gray-600">
                  <input
                    type="checkbox"
                    checked={field.required || false}
                    onChange={(e) => updateField(idx, 'required', e.target.checked)}
                    className="mr-2"
                  />
                  Required field
                </label>
              </div>
            </div>
            {field.type === 'select' && (
              <div className="mt-2">
                <label className="block text-xs text-gray-600">Options (comma-separated)</label>
                <input
                  type="text"
                  value={field.options?.join(', ') || ''}
                  onChange={(e) => updateField(idx, 'options', e.target.value.split(',').map((s: string) => s.trim()))}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="Option 1, Option 2, Option 3"
                />
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addField}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Field
        </button>
      </div>
    </div>
  );
};
