import React from 'react';
import { Outlet } from 'react-router-dom';
import CareersNav from './CareersNav';

const CareersLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CareersNav />
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} University Preparatory Secondary School. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Where Future Scholars Rise
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CareersLayout;
