import React from 'react';

interface TestimonialsEditorProps {
  contentJson: any;
  title: string;
  subtitle: string;
  onContentChange: (key: string, value: any) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({
  contentJson,
  title,
  subtitle,
  onContentChange,
  onFieldChange,
}) => {
  const testimonials = contentJson.testimonials || [{ quote: '', author: '', role: '' }];
  const layout = contentJson.layout || 'grid';

  const addTestimonial = () => {
    onContentChange('testimonials', [...testimonials, { quote: '', author: '', role: '' }]);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = testimonials.filter((_: any, i: number) => i !== index);
    onContentChange('testimonials', newTestimonials);
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    onContentChange('testimonials', newTestimonials);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 mb-4">
        Testimonials from students, parents, or alumni.
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
        <label className="block text-sm font-bold text-gray-700">Layout Style</label>
        <select
          value={layout}
          onChange={(e) => onContentChange('layout', e.target.value)}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="grid">Grid (all visible)</option>
          <option value="carousel">Carousel (one at a time)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Testimonials</label>
        {testimonials.map((testimonial: any, idx: number) => (
          <div key={idx} className="mb-4 p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Testimonial {idx + 1}</span>
              {testimonials.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTestimonial(idx)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600">Quote</label>
                <textarea
                  value={testimonial.quote || ''}
                  onChange={(e) => updateTestimonial(idx, 'quote', e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  rows={3}
                  placeholder="The testimonial quote..."
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600">Author Name</label>
                  <input
                    type="text"
                    value={testimonial.author || ''}
                    onChange={(e) => updateTestimonial(idx, 'author', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Role/Title (Optional)</label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => updateTestimonial(idx, 'role', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="Class of 2023"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addTestimonial}
          className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-bold"
        >
          + Add Testimonial
        </button>
      </div>
    </div>
  );
};
