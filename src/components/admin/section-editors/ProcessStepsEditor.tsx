import React from 'react';

interface ProcessStepsEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const ProcessStepsEditor: React.FC<ProcessStepsEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const steps = contentJson.steps || [{ number: 1, title: '', description: '' }];

  const addStep = () => {
    onContentChange('steps', [...steps, { number: steps.length + 1, title: '', description: '' }]);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_: any, i: number) => i !== index);
    onContentChange('steps', newSteps);
  };

  const updateStep = (index: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onContentChange('steps', newSteps);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Numbered process steps displayed as a timeline or grid.
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
        <label className="block text-sm font-bold text-gray-700 mb-2">Process Steps</label>
        {steps.map((step: any, idx: number) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Step {idx + 1}</span>
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(idx)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600">Step Number</label>
                <input
                  type="number"
                  value={step.number || idx + 1}
                  onChange={(e) => updateStep(idx, 'number', parseInt(e.target.value))}
                  className="w-full p-2 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Step Title</label>
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => updateStep(idx, 'title', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="e.g., Apply Online"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Description</label>
                <textarea
                  value={step.description || ''}
                  onChange={(e) => updateStep(idx, 'description', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  rows={2}
                  placeholder="Brief description of this step"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Step
        </button>
      </div>
    </div>
  );
};
