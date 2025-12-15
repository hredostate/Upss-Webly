import React from 'react';

interface SignatureBlockEditorProps {
  contentJson: any;
  title: string;
  content: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const SignatureBlockEditor: React.FC<SignatureBlockEditorProps> = ({
  contentJson,
  title,
  content,
  onContentChange,
  onFieldChange,
}) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        A quote or message block with signature details (e.g., Principal's message).
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700">Section Title (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          placeholder="e.g., Message from the Principal"
        />
      </div>
      
      <div>
        <label className="block text-sm font-bold text-gray-700">Message/Quote</label>
        <textarea
          value={content}
          onChange={(e) => onFieldChange('content', e.target.value)}
          className="w-full p-2 border rounded mt-1"
          rows={8}
          placeholder="Enter the message or quote here..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700">Signature Name</label>
          <input
            type="text"
            value={contentJson.signatureName || ''}
            onChange={(e) => onContentChange('signatureName', e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Dr. John Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700">Signature Title</label>
          <input
            type="text"
            value={contentJson.signatureTitle || ''}
            onChange={(e) => onContentChange('signatureTitle', e.target.value)}
            className="w-full p-2 border rounded mt-1"
            placeholder="Principal, UPSS"
          />
        </div>
      </div>
    </div>
  );
};
