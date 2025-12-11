
import React from 'react';

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

  const logoUrl = "https://tyvufbldcucgmmlattct.supabase.co/storage/v1/object/public/Images/imageedit_1_5058819643%20(1).png";

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`} aria-label="UPSS Logo">
      <img 
        src={logoUrl} 
        alt="UPSS Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};
