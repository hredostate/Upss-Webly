
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Section, NewsItem } from '../../types';
import { CmsClient } from '../../api/cmsClient';
import { useReveal } from '../../hooks/useReveal';

export const NewsListSection: React.FC<{ section: Section }> = ({ section }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const { limit } = section.contentJson;
  const { ref, isVisible } = useReveal(0.1);

  useEffect(() => {
    CmsClient.getNews(true, limit || 3)
      .then(setNews)
      .catch(() => {
        console.warn("Using mock news data");
        setNews(CmsClient.getMockNews().slice(0, limit || 3));
      });
  }, [limit]);

  return (
    <section ref={ref} className="section bg-white" aria-labelledby="news-heading">
      <div className="container-wide">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b border-gray-100 pb-8 gap-8 reveal ${isVisible ? 'active' : ''}`}>
          <div className="max-w-2xl">
            <h2 id="news-heading" className="heading-2 mb-6">{section.title}</h2>
            {section.subtitle && <p className="text-gray-500 text-lg font-light leading-relaxed">{section.subtitle}</p>}
          </div>
          <Link 
            to="/news" 
            className="link hidden md:inline-flex items-center font-bold uppercase tracking-wider text-xs md:text-sm group"
          >
            View All News 
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {news.map((item, idx) => (
            <article 
              key={item.id} 
              className={`group flex flex-col h-full border-b border-gray-100 md:border-0 pb-12 md:pb-0 last:border-0 reveal stagger-${idx + 1} ${isVisible ? 'active' : ''}`}
            >
              <div className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                <span className="text-gold-600">{item.category}</span>
                <span className="text-gray-300">•</span>
                <time dateTime={item.publishedDate}>{new Date(item.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-5 leading-tight group-hover:text-maroon-800 transition-colors duration-300">
                <Link to={`/news/${item.slug}`} className="focus:outline-none">{item.title}</Link>
              </h3>
              <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                {item.summary}
              </p>
              <Link 
                to={`/news/${item.slug}`} 
                className="inline-block text-maroon-800 text-xs font-bold uppercase tracking-wider border-b-2 border-transparent hover:border-maroon-800 transition-all self-start pb-1"
                aria-label={`Read full story: ${item.title}`}
              >
                Read Story
              </Link>
            </article>
          ))}
        </div>

        <div className={`mt-16 md:hidden text-center reveal stagger-3 ${isVisible ? 'active' : ''}`}>
          <Link to="/news" className="inline-block bg-gray-100 text-gray-800 px-10 py-4 font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-gray-200 transition-colors">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};
