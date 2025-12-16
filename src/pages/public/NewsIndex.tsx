
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CmsClient } from '../../api/cmsClient';
import { NewsItem } from '../../types';
import { BrandSpinner } from '../../components/common/BrandSpinner';

export default function NewsIndex() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CmsClient.getNews()
      .then(setNews)
      .catch((err) => {
        console.error("Failed to load news, using mock", err);
        setNews(CmsClient.getMockNews());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <BrandSpinner fullscreen label="Loading stories" />;
  }

  return (
    <div className="bg-white min-h-screen animate-page-enter">
      <div className="bg-maroon-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-serif text-5xl md:text-6xl mb-4">News & Events</h1>
          <p className="text-xl text-maroon-100 max-w-2xl">
            Stay up to date with the latest achievements, gatherings, and announcements from the UPSS community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main List */}
          <div className="md:col-span-8 space-y-12">
             {news.map(item => (
                <div key={item.id} className="group border-b border-gray-100 pb-12 last:border-0">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                    <span className="text-gold-600">{item.category}</span>
                    <span>•</span>
                    <span>{new Date(item.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-serif text-3xl text-gray-900 mb-4 group-hover:text-maroon-800 transition-colors">
                    <Link to={`/news/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {item.summary}
                  </p>
                  <Link 
                    to={`/news/${item.slug}`} 
                    className="inline-flex items-center text-maroon-800 text-sm font-bold uppercase tracking-wider hover:underline"
                  >
                    Read Full Story &rarr;
                  </Link>
                </div>
             ))}
             {news.length === 0 && (
               <div className="text-center py-20 text-gray-500">
                 No news items found at this time.
               </div>
             )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-8">
             <div className="bg-gray-50 p-8 border border-gray-100">
                <h3 className="font-serif text-2xl mb-4 text-gray-900">Categories</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                   <li><a href="#" className="hover:text-maroon-800 block py-1">Achievements</a></li>
                   <li><a href="#" className="hover:text-maroon-800 block py-1">Admissions</a></li>
                   <li><a href="#" className="hover:text-maroon-800 block py-1">Alumni</a></li>
                   <li><a href="#" className="hover:text-maroon-800 block py-1">Campus Life</a></li>
                   <li><a href="#" className="hover:text-maroon-800 block py-1">Events</a></li>
                </ul>
             </div>

             <div className="bg-maroon-900 text-white p-8">
                <h3 className="font-serif text-2xl mb-4">Media Inquiries</h3>
                <p className="text-maroon-100 text-sm mb-6">
                   For press releases and official statements, please contact our communications office.
                </p>
                <a href="mailto:media@upss.edu.ng" className="text-white font-bold border-b border-white hover:text-gold-300 hover:border-gold-300 transition-colors">
                   media@upss.edu.ng
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
