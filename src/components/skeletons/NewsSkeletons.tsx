import React from 'react';

export function NewsListSkeleton() {
  return (
    <div className="bg-white min-h-screen animate-page-enter">
      <div className="bg-maroon-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 space-y-4 animate-pulse">
          <div className="h-4 w-24 bg-white/30 rounded" />
          <div className="h-10 w-2/3 bg-white/40 rounded" />
          <div className="h-4 w-3/4 bg-white/30 rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-8 animate-pulse">
                <div className="h-4 w-32 bg-slate-200 rounded mb-3" />
                <div className="h-8 w-11/12 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 space-y-6 animate-pulse">
            <div className="h-48 bg-slate-100 rounded-2xl" />
            <div className="h-32 bg-slate-100 rounded-2xl" />
            <div className="h-24 bg-slate-100 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <article className="bg-white min-h-screen animate-page-enter">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 space-y-6 animate-pulse">
        <div className="h-4 w-40 bg-slate-200 rounded" />
        <div className="h-10 w-4/5 bg-slate-200 rounded" />
        <div className="h-6 w-3/4 bg-slate-200 rounded" />
        <div className="space-y-3 pt-4">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-4 w-full bg-slate-100 rounded" />
          ))}
        </div>
      </div>
    </article>
  );
}
