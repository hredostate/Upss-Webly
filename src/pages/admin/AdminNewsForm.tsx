
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminClient } from '../../api/adminClient';
import { NewsItem } from '../../types';

export default function AdminNewsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id && id !== 'new';

  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    slug: '',
    summary: '',
    body: '',
    category: 'General',
    publishedDate: new Date().toISOString().split('T')[0],
    isFeatured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      AdminClient.getNewsItem(id)
        .then(data => setFormData({
           ...data,
           publishedDate: new Date(data.publishedDate).toISOString().split('T')[0]
        }))
        .catch(err => setError(err.message));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.summary && formData.summary.length > 300) {
      setError("Summary cannot exceed 300 characters.");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (isEditMode && id) {
        await AdminClient.updateNewsItem(id, formData);
      } else {
        await AdminClient.createNewsItem(formData);
      }
      navigate('/admin/news');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isEditMode ? 'Edit Article' : 'Post New Article'}
        </h1>
        <Link to="/admin/news" className="text-gray-600 hover:text-gray-900">
          &larr; Back to List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 border border-gray-200 space-y-6">
        {error && (
           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-2">
             <p className="text-sm text-red-700">{error}</p>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <label className="block text-sm font-bold text-gray-700">Article Title</label>
              <input 
                 type="text" 
                 name="title" 
                 value={formData.title} 
                 onChange={(e) => {
                    if (!isEditMode && !formData.slug) {
                       setFormData(prev => ({ 
                          ...prev, 
                          title: e.target.value,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                       }));
                    } else {
                       handleChange(e);
                    }
                 }}
                 required
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500"
              />
              <p className="mt-1 text-xs text-gray-500">Title is required.</p>
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700">URL Slug</label>
              <input 
                 type="text" 
                 name="slug" 
                 value={formData.slug} 
                 onChange={handleChange}
                 required
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">Auto-generated from title.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div>
              <label className="block text-sm font-bold text-gray-700">Category</label>
              <select 
                 name="category" 
                 value={formData.category} 
                 onChange={handleChange}
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500"
              >
                 <option value="General">General</option>
                 <option value="Achievement">Achievement</option>
                 <option value="Admissions">Admissions</option>
                 <option value="Academics">Academics</option>
                 <option value="Sports">Sports</option>
                 <option value="Events">Events</option>
              </select>
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700">Publish Date</label>
              <input 
                 type="date" 
                 name="publishedDate" 
                 value={formData.publishedDate as string} 
                 onChange={handleChange}
                 className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500"
              />
           </div>
           <div className="flex items-end pb-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                 <input 
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="h-5 w-5 text-maroon-600 border-gray-300 rounded focus:ring-maroon-500"
                 />
                 <span className="text-sm font-bold text-gray-700">Pin to Homepage "Featured"</span>
              </label>
           </div>
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700">Summary (Excerpt)</label>
           <p className="text-xs text-gray-500 mb-1">Displayed on the homepage cards. Max 300 characters.</p>
           <textarea 
              name="summary" 
              rows={3} 
              value={formData.summary} 
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500"
           />
           <p className="text-xs text-right text-gray-400">{formData.summary?.length || 0}/300</p>
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700">Full Article Body (Rich Text)</label>
           <textarea 
              name="body" 
              rows={12} 
              value={formData.body} 
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-maroon-500 focus:border-maroon-500 font-mono text-sm"
              placeholder="<p>Write your article content here...</p>"
           />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
           <Link to="/admin/news" className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-bold">
              Cancel
           </Link>
           <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-maroon-800 text-white rounded hover:bg-maroon-900 disabled:opacity-50 font-bold uppercase tracking-wider text-sm"
           >
              {loading ? 'Saving...' : 'Save Article'}
           </button>
        </div>
      </form>
    </div>
  );
}
