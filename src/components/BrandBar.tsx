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
          <a href="#" className="hover:text-gold-300 transition-colors duration-200 focus:outline-none focus:text-gold-300">Faculty & Staff</a>
          <a href="#" className="hover:text-gold-300 transition-colors duration-200 focus:outline-none focus:text-gold-300">Parents</a>
          <a href="#" className="hover:text-gold-300 transition-colors duration-200 focus:outline-none focus:text-gold-300">Alumni</a>
          <Link 
            to="/admin/login" 
            className="hover:text-gold-300 transition-colors duration-200 flex items-center gap-1 focus:outline-none focus:text-gold-300"
            aria-label="Admin Portal Login"
          >
            <span>Admin</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default BrandBar;