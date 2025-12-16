
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CmsClient } from '../../api/cmsClient';
import { NewsItem } from '../../types';
import { BrandSpinner } from '../../components/common/BrandSpinner';

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      CmsClient.getNewsBySlug(slug)
        .then(setArticle)
        .catch(() => {
          // Mock data fallback check
          const mocks = CmsClient.getMockNews();
          const found = mocks.find(n => n.slug === slug);
          if (found) setArticle(found);
          else setError("Article not found");
        })
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <BrandSpinner fullscreen label="Loading article" />;
  if (error || !article) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-serif text-gray-900 mb-4">Article Not Found</h1>
      <Link to="/news" className="text-maroon-800 underline">Back to News</Link>
    </div>
  );

  return (
    <article className="bg-white min-h-screen pb-20 animate-page-enter">
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
          <Link to="/news" className="hover:text-maroon-800 transition-colors">&larr; News</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gold-600">{article.category}</span>
          <span className="text-gray-300">•</span>
          <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-8">
          {article.title}
        </h1>

        <div className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-12 border-l-4 border-maroon-800 pl-6">
          {article.summary}
        </div>

        <div className="prose prose-lg prose-headings:font-serif prose-a:text-maroon-800 max-w-none text-gray-800">
           {article.body ? (
             <div dangerouslySetInnerHTML={{ __html: article.body.replace(/\n/g, '<br/>') }} />
           ) : (
             <p className="italic text-gray-500">[No content body provided for this article]</p>
           )}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
           <div className="text-sm text-gray-500 italic">
              Share this story
           </div>
           <div className="flex gap-4">
              <button className="text-gray-400 hover:text-maroon-800 transition-colors">Twitter</button>
              <button className="text-gray-400 hover:text-maroon-800 transition-colors">Facebook</button>
              <button className="text-gray-400 hover:text-maroon-800 transition-colors">LinkedIn</button>
           </div>
        </div>
      </div>
    </article>
  );
}
