import React from 'react';

interface PageFallbackProps {
  label?: string;
}

export function PageFallback({ label = 'Loading content' }: PageFallbackProps) {
  return (
    <div className="min-h-[60vh] bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-4 w-28 bg-slate-200 rounded" />
          <div className="h-10 w-2/3 bg-slate-200 rounded" />
          <p className="text-sm text-slate-500">{label}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-28 bg-white/80 border border-slate-100 rounded-xl shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

