
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminClient } from '../../api/adminClient';
import { Page } from '../../types';

export default function AdminPageForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id && id !== 'new';

  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    isHomePage: false,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      setFetching(true);
      AdminClient.getPage(id)
        .then(data => setFormData({
          title: data.title,
          slug: data.slug,
          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',
          isHomePage: data.isHomePage,
        }))
        .catch(err => setError('Failed to fetch page data: ' + err.message))
        .finally(() => setFetching(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode && id) {
        await AdminClient.updatePage(id, formData);
      } else {
        await AdminClient.createPage(formData);
      }
      navigate('/admin/pages');
    } catch (err: any) {
      setError(err.message || 'Failed to save page');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading form...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold font-serif text-gray-900">
          {isEditMode ? 'Page Configuration' : 'Page Configuration'}
        </h1>
        <Link to="/admin/pages" className="text-gray-600 hover:text-gray-900">
          &larr; Back to List
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">Page Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={(e) => {
                // Auto-generate slug from title if in create mode and slug is empty
                if (!isEditMode && !formData.slug) {
                  const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  setFormData(prev => ({ ...prev, title: e.target.value, slug }));
                } else {
                  handleChange(e);
                }
              }}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
              placeholder="e.g., Admissions, About Us"
            />
            <p className="mt-1 text-xs text-gray-500">This appears in the browser tab and search results.</p>
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-bold text-gray-700">URL Slug</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                https://upss.edu.ng/
              </span>
              <input
                type="text"
                name="slug"
                id="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md border border-gray-300 focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                placeholder="about-us"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Slug must be unique and contain only lowercase letters, numbers, and hyphens.</p>
          </div>

          {/* SEO Section */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO & Metadata</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700">SEO Meta Description</label>
                <textarea
                  name="seoDescription"
                  id="seoDescription"
                  rows={3}
                  maxLength={160}
                  value={formData.seoDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                  placeholder="A brief summary of this page for search engines..."
                />
                <p className="mt-1 text-xs text-gray-500 text-right">{formData.seoDescription?.length || 0}/160 characters</p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Homepage Configuration</h3>
            <div className="flex items-start bg-yellow-50 p-4 rounded border border-yellow-200">
              <div className="flex items-center h-5">
                <input
                  id="isHomePage"
                  name="isHomePage"
                  type="checkbox"
                  checked={formData.isHomePage}
                  onChange={handleCheckboxChange}
                  className="focus:ring-maroon-500 h-4 w-4 text-maroon-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isHomePage" className="font-bold text-gray-800">Set as Front Page</label>
                {formData.isHomePage && (
                  <p className="mt-1 text-yellow-800 font-medium">
                    <strong>Caution:</strong> Enabling this will replace the current homepage. Only one page can serve as the front page at a time.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end gap-3">
             <Link
               to="/admin/pages"
               className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none"
             >
               Cancel
             </Link>
             <button
               type="submit"
               disabled={loading}
               className="btn-primary disabled:opacity-50"
             >
               {loading ? 'Saving...' : 'Save Page Settings'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
