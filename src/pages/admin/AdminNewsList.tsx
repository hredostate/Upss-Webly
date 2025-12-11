
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminClient } from '../../api/adminClient';
import { NewsItem } from '../../types';

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await AdminClient.getNews();
      setNews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return;
    try {
      await AdminClient.deleteNewsItem(id);
      fetchNews();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading news...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">News & Events</h1>
        <Link 
          to="/admin/news/new" 
          className="bg-maroon-800 text-white px-4 py-2 rounded shadow-sm hover:bg-maroon-900 transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          + Post New Article
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Publish Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Featured?</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-400 font-mono">/{item.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.publishedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.isFeatured ? (
                     <span className="text-green-600 font-bold text-xs uppercase tracking-wide">Yes</span>
                  ) : (
                     <span className="text-gray-400 text-xs uppercase tracking-wide">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/admin/news/${item.id}`} className="text-maroon-600 hover:text-maroon-900 mr-4 font-bold uppercase text-xs">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-bold uppercase text-xs">Delete</button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
               <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                 No articles posted yet.
               </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
