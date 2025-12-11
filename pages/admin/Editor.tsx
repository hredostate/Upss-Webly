import React, { useState, useEffect } from 'react';
import { ContentService } from '../../services/mockBackend';
import { PageData } from '../../types';

export default function Editor() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    ContentService.getPage('home')
      .then(setData)
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const handleSave = () => {
    if (!data) return;
    setSaving(true);
    ContentService.savePage('home', data)
      .then(() => {
        setSuccessMsg('Changes saved successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      })
      .catch((err) => alert('Failed to save'))
      .finally(() => setSaving(false));
  };

  const updateSection = (index: number, field: string, value: string) => {
    if (!data) return;
    const newSections = [...data.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setData({ ...data, sections: newSections });
  };

  const handleReset = () => {
    if (confirm('Are you sure? This will revert all changes to default.')) {
      ContentService.resetDefaults();
    }
  };

  if (loading) return <div>Loading editor...</div>;
  if (!data) return <div>Error loading data.</div>;

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Edit Page: {data.title}</h1>
          <div className="flex gap-4">
             <button onClick={handleReset} className="text-red-600 text-sm hover:underline">Reset to Default</button>
             <button 
                onClick={handleSave} 
                disabled={saving}
                className="bg-maroon-800 text-white px-6 py-2 rounded-md hover:bg-maroon-900 disabled:opacity-50"
             >
               {saving ? 'Saving...' : 'Save Changes'}
             </button>
          </div>
       </div>

       {successMsg && (
         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
           {successMsg}
         </div>
       )}

       <div className="bg-white rounded-lg shadow border border-gray-200 divide-y divide-gray-200">
          {data.sections.map((section, idx) => (
             <div key={section.id} className="p-6">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wider">
                      Section: {section.type}
                   </h3>
                   <span className="text-xs text-gray-400">ID: {section.id}</span>
                </div>

                <div className="space-y-4">
                   {/* Title Field - Common to most sections */}
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title / Headline</label>
                      <input 
                        type="text" 
                        value={section.title}
                        onChange={(e) => updateSection(idx, 'title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-maroon-500 focus:border-maroon-500"
                      />
                   </div>

                   {/* Subtitle - Common */}
                   {section.subtitle !== undefined && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea 
                          rows={2}
                          value={section.subtitle}
                          onChange={(e) => updateSection(idx, 'subtitle', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-maroon-500 focus:border-maroon-500"
                        />
                     </div>
                   )}

                   {/* Content - For text sections */}
                   {section.content !== undefined && (
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Content</label>
                        <textarea 
                          rows={4}
                          value={section.content}
                          onChange={(e) => updateSection(idx, 'content', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-maroon-500 focus:border-maroon-500"
                        />
                     </div>
                   )}

                   {/* Image URL - For Hero */}
                   {section.imageUrl !== undefined && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                        <input 
                          type="text" 
                          value={section.imageUrl}
                          onChange={(e) => updateSection(idx, 'imageUrl', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-maroon-500 focus:border-maroon-500"
                        />
                        <div className="mt-2 text-xs text-gray-500">Preview:</div>
                        <img src={section.imageUrl} alt="Preview" className="h-20 w-auto mt-1 object-cover rounded border" />
                      </div>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}