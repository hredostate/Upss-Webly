import React from 'react';
import { Link } from 'react-router-dom';

const BrandBar: React.FC = () => {
  return (
    <div className="bg-maroon-900 text-white py-2 px-4 md:px-6 border-b border-maroon-800 hidden md:block" role="complementary" aria-label="Utility Navigation">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs tracking-wider uppercase font-medium">
        <div className="opacity-90 hover:opacity-100 transition-opacity cursor-default">
          University Preparatory Secondary School
        </div>
        <nav className="flex gap-4 md:gap-6" aria-label="Audience Navigation">
          <a 
            href="https://schoolguardian360.com/#Dashboard" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gold-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-gold-300 font-bold flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
            Guardian 360 Login
          </a>
          <div className="w-px h-3 bg-maroon-700"></div>
          <Link 
            to="/admin/login" 
            className="text-gray-300 hover:text-gold-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none focus:text-gold-300"
            aria-label="Admin Portal Login"
          >
            <span>Website Admin</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default BrandBar;