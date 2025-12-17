
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CmsClient } from '../../api/cmsClient';
import { NewsItem } from '../../types';
import { NewsListSkeleton } from '../../components/skeletons/NewsSkeletons';

export default function NewsIndex() {
  const cached = (() => {
    const stored = sessionStorage.getItem('upss-news');
    if (stored) {
      try {
        return JSON.parse(stored) as NewsItem[];
      } catch (err) {
        console.warn('Unable to hydrate cached news', err);
      }
    }
    return [] as NewsItem[];
  })();

  const [news, setNews] = useState<NewsItem[]>(cached);
  const [loading, setLoading] = useState(() => cached.length === 0);

  useEffect(() => {
    CmsClient.getNews()
      .then((items) => {
        setNews(items);
        sessionStorage.setItem('upss-news', JSON.stringify(items));
      })
      .catch((err) => {
        console.error("Failed to load news, using mock", err);
        const mocks = CmsClient.getMockNews();
        setNews(mocks);
        sessionStorage.setItem('upss-news', JSON.stringify(mocks));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading && news.length === 0) {
    return <NewsListSkeleton />;
  }

  return (
    <div className="bg-white min-h-screen animate-page-enter">
      <div className="bg-maroon-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-4 md:space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-gold-300">Updates</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">UPSS News & Updates</h1>
              <p className="text-lg md:text-xl text-maroon-100 max-w-2xl">
                Stay informed on school events, achievements, announcements, and learning highlights.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 w-full lg:w-80">
              <h2 className="font-semibold text-lg mb-3">Categories</h2>
              <div className="grid grid-cols-2 gap-2 text-sm text-maroon-50">
                {['Announcements', 'Academic Updates', 'Events & Activities', 'Student Achievements', 'Staff Highlights', 'Community & Partnerships'].map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-300" />
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-12">
            <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary-900 to-maroon-900 text-white p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-gold-200 mb-2">Featured Story</p>
                <h2 className="font-serif text-3xl md:text-4xl mb-3">UPSS Academic Excellence Spotlight: Term Highlights</h2>
                <p className="text-maroon-100 text-base md:text-lg max-w-3xl">
                  Short excerpt… (placeholder)
                </p>
              </div>
              <div className="p-8 bg-white">
                <div className="aspect-video rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-sm mb-6">
                  Hero image/video placeholder
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Announcements · {new Date().toLocaleDateString()}</span>
                  <a href="#" className="text-maroon-800 font-semibold text-sm hover:underline">Read the full story →</a>
                </div>
              </div>
            </div>

            {news.map((item) => (
              <div key={item.id} className="group border-b border-gray-100 pb-12 last:border-0">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  <span className="text-gold-600">{item.category}</span>
                  <span>•</span>
                  <span>{new Date(item.publishedDate).toLocaleDateString()}</span>
                </div>
                <h2 className="font-serif text-3xl text-gray-900 mb-4 group-hover:text-maroon-800 transition-colors">
                  <Link to={`/news/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{item.summary}</p>
                <Link
                  to={`/news/${item.slug}`}
                  className="inline-flex items-center text-maroon-800 text-sm font-bold uppercase tracking-wider hover:underline"
                >
                  Read Full Story &rarr;
                </Link>
              </div>
            ))}
            {news.length === 0 && (
              <div className="text-center py-20 text-gray-500">No news items found at this time.</div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 p-8 border border-gray-100 rounded-2xl shadow-sm space-y-3">
              <h3 className="font-serif text-2xl text-gray-900">Latest News List (Sample Placeholders)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Mid-Term Assessments Schedule Released',
                  'Inter-House Sports Day: Date & Participation Guidelines',
                  'Debate Team Wins Regional Competition',
                  'Parents’ Forum: Key Updates & Next Steps',
                  'Graduation & Valedictory Service Highlights',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-maroon-900 text-white p-8 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif text-2xl">Newsletter Signup</h3>
              <p className="text-maroon-100 text-sm">“Get UPSS updates by email.”</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-300"
                />
                <button className="btn btn-secondary w-full justify-center">Subscribe</button>
              </div>
            </div>

            <div className="bg-white p-8 border border-gray-100 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-serif text-2xl text-gray-900">Media Inquiries</h3>
              <p className="text-gray-600 text-sm">
                For press releases and official statements, please contact our communications office.
              </p>
              <a
                href="mailto:media@upss.edu.ng"
                className="text-maroon-800 font-bold border-b border-maroon-200 w-fit hover:text-gold-600 hover:border-gold-400 transition-colors"
              >
                media@upss.edu.ng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
