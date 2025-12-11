import React from 'react';
import { Link } from 'react-router-dom';

const BrandBar: React.FC = () => {
  return (
    <div className="bg-maroon-900 text-white py-2 px-6 border-b border-maroon-800 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-xs tracking-wide uppercase font-medium">
        <div className="opacity-90 hover:opacity-100 transition-opacity">
          University Preparatory Secondary School
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold-300 transition-colors">Faculty & Staff</a>
          <a href="#" className="hover:text-gold-300 transition-colors">Parents</a>
          <a href="#" className="hover:text-gold-300 transition-colors">Alumni</a>
          <Link to="/admin/login" className="hover:text-gold-300 transition-colors flex items-center gap-1">
            <span>Admin</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandBar;