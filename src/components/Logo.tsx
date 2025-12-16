
import React from 'react';
import { BRAND_MARK_URL } from '../config/branding';

interface LogoProps {
  className?: string;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12 md:w-16 md:h-16", // Slightly larger for image clarity
    lg: "w-20 h-20"
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} aria-label="UPSS Logo">
      <img
        src={BRAND_MARK_URL}
        alt="UPSS Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
