import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BrandBar from './BrandBar';
import PrimaryNav from './PrimaryNav';
import SiteFooter from './SiteFooter';

const MainLayout: React.FC = () => {
  const location = useLocation();

  // Scroll to top instantly on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      <BrandBar />
      <PrimaryNav />
      
      {/* 
        The key={location.pathname} forces React to remount the main content 
        whenever the URL changes, triggering the CSS animation.
      */}
      <main 
        key={location.pathname} 
        className="flex-grow flex flex-col animate-page-enter"
      >
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;