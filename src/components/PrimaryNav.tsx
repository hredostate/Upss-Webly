
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'News & Events', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" role="navigation" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20 md:h-28">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 md:gap-4 group focus:outline-none">
            <Logo size="md" />
            <div className="flex flex-col justify-center">
              <span className="font-serif text-xl md:text-2xl lg:text-3xl text-maroon-900 leading-none tracking-tight group-hover:text-maroon-700 transition-colors">
                UPSS
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mt-0.5 md:mt-1">
                Benin City
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs xl:text-sm font-bold uppercase tracking-wide transition-all duration-300 relative py-2 group ${
                      isActive ? 'text-maroon-800' : 'text-gray-600 hover:text-maroon-800'
                    }`
                  }
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-maroon-800 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                </NavLink>
              ))}
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-maroon-800 transition-colors p-1" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <Link 
                to="/admissions"
                className="bg-transparent border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
              >
                Apply
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-800 p-2 focus:outline-none hover:text-maroon-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '80px' }} // Adjusted for taller header
      >
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          <div className="px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block text-2xl font-serif ${isActive ? 'text-maroon-800 font-bold' : 'text-gray-800 hover:text-maroon-800'} transition-colors border-b border-gray-100 pb-4`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="mt-auto bg-gray-50 px-6 py-8 space-y-4">
            <Link 
              to="/admissions"
              className="block w-full text-center py-4 bg-maroon-800 text-white text-sm font-bold uppercase tracking-widest hover:bg-maroon-900 transition-colors rounded-sm shadow-md"
            >
              Apply Now
            </Link>
            <Link 
              to="/admin/login" 
              className="block w-full text-center py-4 bg-white border border-gray-300 text-gray-700 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors rounded-sm"
            >
              Faculty Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;
