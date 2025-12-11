import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'News & Events', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-maroon-800 text-white flex items-center justify-center rounded-sm shadow-sm group-hover:bg-maroon-900 transition-colors">
              <span className="font-serif font-bold text-2xl md:text-3xl leading-none pt-1">U</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-2xl md:text-3xl text-maroon-900 leading-none tracking-tight">UPSS</span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">Benin City</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide uppercase transition-colors relative py-2 group ${
                    isActive ? 'text-maroon-800' : 'text-gray-600 hover:text-maroon-800'
                  }`
                }
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-maroon-800 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </NavLink>
            ))}
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <button className="text-gray-500 hover:text-maroon-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="bg-white border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all">
              Apply
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-800 p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-6 flex flex-col gap-4 animate-fade-in-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-serif text-gray-800 py-3 border-b border-gray-100 hover:text-maroon-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-4 pt-4 mt-2">
            <Link to="/admin/login" className="text-center py-3 bg-gray-100 text-gray-700 text-sm font-bold uppercase tracking-wide hover:bg-gray-200">
              Staff Login
            </Link>
            <button className="py-3 bg-maroon-800 text-white text-sm font-bold uppercase tracking-wide hover:bg-maroon-900">
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PrimaryNav;