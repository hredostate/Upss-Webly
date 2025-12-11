
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BrandBar from './BrandBar';
import PrimaryNav from './PrimaryNav';
import SiteFooter from './SiteFooter';

const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      <div className="z-50 relative">
        <BrandBar />
        <div className={`sticky top-0 w-full transition-all duration-500 ease-in-out ${isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-md' : 'bg-white'}`}>
          <PrimaryNav />
        </div>
      </div>
      
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default PublicLayout;
