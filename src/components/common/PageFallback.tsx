import { BrandSpinner } from './BrandSpinner';

interface PageFallbackProps {
  label?: string;
}

export function PageFallback({ label = 'Loading content' }: PageFallbackProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <BrandSpinner label={label} />
    </div>
  );
}

