import React, { useEffect, useState } from 'react';
import { ContentService } from '../../services/mockBackend';
import { PageData } from '../../types';

export default function Home() {
  const [data, setData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ContentService.getPage('home')
      .then(setData)
      .catch((err) => console.error("Failed to load page content", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-800"></div>
      </div>
    );
  }

  if (!data) return null;

  const heroSection = data.sections.find(s => s.type === 'hero');
  const textSection = data.sections.find(s => s.type === 'text');
  const statsSection = data.sections.find(s => s.type === 'stats');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-60">
           {/* Fallback pattern if image fails */}
           {heroSection?.imageUrl ? (
             <img 
               src={heroSection.imageUrl} 
               alt="UPSS Campus" 
               className="w-full h-full object-cover"
             />
           ) : (
             <div className="w-full h-full bg-gradient-to-br from-maroon-900 to-gray-900"></div>
           )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 md:pb-32">
          <div className="max-w-4xl animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6">
              {heroSection?.title || 'Knowledge for Service'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed">
              {heroSection?.subtitle || 'Excellence in education.'}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
               <button className="bg-maroon-700 hover:bg-maroon-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all transform hover:-translate-y-1">
                 Virtual Tour
               </button>
               <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all">
                 Admissions Inquiry
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction / Mission */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
             <div className="h-1 w-20 bg-maroon-800 mb-8"></div>
             <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
               {textSection?.title}
             </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed mb-8">
              {textSection?.content}
            </p>
            <a href="#" className="inline-flex items-center text-maroon-800 font-bold uppercase tracking-wider text-sm hover:underline">
              Read Our Strategic Plan 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Grid Navigation */}
      <section className="bg-gray-50 py-20">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
               {['Academic Excellence', 'Student Life', 'Community Impact'].map((item, idx) => (
                  <div key={idx} className="relative h-80 group overflow-hidden bg-gray-200 cursor-pointer">
                     <img src={`https://picsum.photos/id/${idx + 50}/800/800`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                     <div className="absolute inset-0 bg-maroon-900/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center p-8 text-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                           <h3 className="text-white font-serif text-2xl mb-2">{item}</h3>
                           <p className="text-maroon-100 text-sm">Explore More &rarr;</p>
                        </div>
                     </div>
                     <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity">
                        <h3 className="text-white font-serif text-2xl">{item}</h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-maroon-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-maroon-700 pt-12">
            {statsSection?.stats?.map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="font-serif text-5xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-maroon-200 uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-24 bg-gray-100 text-center">
         <div className="max-w-3xl mx-auto px-6">
           <h2 className="font-serif text-4xl mb-6 text-gray-900">Join the UPSS Community</h2>
           <p className="text-gray-600 mb-10 text-lg">Applications for the next academic session are now open. Discover what makes a UPSS education unique.</p>
           <button className="bg-transparent border-2 border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all">
             Start Application
           </button>
         </div>
      </section>
    </div>
  );
}