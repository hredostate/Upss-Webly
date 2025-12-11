import React from 'react';
import { Outlet } from 'react-router-dom';
import BrandBar from './BrandBar';
import PrimaryNav from './PrimaryNav';
import SiteFooter from './SiteFooter';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
      <BrandBar />
      <PrimaryNav />
      
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;