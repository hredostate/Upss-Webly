import React from 'react';
import { BRAND_MARK_URL } from '../../config/branding';

interface BrandSpinnerProps {
  label?: string;
  fullscreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES: Record<NonNullable<BrandSpinnerProps['size']>, string> = {
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-28 h-28'
};

export const BrandSpinner: React.FC<BrandSpinnerProps> = ({
  label = 'Loading',
  fullscreen = false,
  size = 'md'
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullscreen ? 'min-h-screen' : 'py-8'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={`relative ${SIZE_CLASSES[size]}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 opacity-70 animate-spin blur-[1px]" />
        <div className="absolute inset-1 rounded-full bg-white shadow-lg" />
        <div className="absolute inset-2 rounded-full bg-slate-50 shadow-inner" />
        <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={BRAND_MARK_URL}
            alt="UPSS brand mark"
            className="w-full h-full object-contain drop-shadow-md"
            loading="lazy"
          />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 tracking-wide">{label}…</p>
    </div>
  );
};

export default BrandSpinner;
