import React from 'react';

interface SectionSkeletonProps {
  variant?: 'split' | 'stack';
}

export function SectionSkeleton({ variant = 'stack' }: SectionSkeletonProps) {
  if (variant === 'split') {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-10 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
            <div className="flex gap-3 pt-4">
              <div className="h-10 w-28 bg-slate-200 rounded" />
              <div className="h-10 w-24 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="h-64 bg-slate-100 rounded-2xl border border-dashed border-slate-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-6 space-y-4 animate-pulse">
        <div className="h-4 w-28 bg-slate-200 rounded" />
        <div className="h-9 w-2/3 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-11/12 bg-slate-200 rounded" />
        <div className="h-4 w-3/4 bg-slate-200 rounded" />
      </div>
    </section>
  );
}

export function SectionsScaffold() {
  return (
    <div className="space-y-0">
      <SectionSkeleton variant="split" />
      <SectionSkeleton />
      <SectionSkeleton variant="split" />
    </div>
  );
}
