import React from 'react';

interface FaqEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const FaqEditor: React.FC<FaqEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const faqs = contentJson.faqs || [{ question: '', answer: '' }];

  const addFaq = () => {
    onContentChange('faqs', [...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    const newFaqs = faqs.filter((_: any, i: number) => i !== index);
    onContentChange('faqs', newFaqs);
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    onContentChange('faqs', newFaqs);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Accordion-style frequently asked questions.
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
        <label className="block text-sm font-bold text-gray-700 mb-2">FAQ Items</label>
        {faqs.map((faq: any, idx: number) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">FAQ {idx + 1}</span>
              {faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600">Question</label>
                <input
                  type="text"
                  value={faq.question || ''}
                  onChange={(e) => updateFaq(idx, 'question', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="What is the admission process?"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Answer</label>
                <textarea
                  value={faq.answer || ''}
                  onChange={(e) => updateFaq(idx, 'answer', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  rows={3}
                  placeholder="The answer to the question..."
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addFaq}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add FAQ
        </button>
      </div>
    </div>
  );
};
