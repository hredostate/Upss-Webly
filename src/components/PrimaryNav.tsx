import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Minimalist: Only 4 main links in header
  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  // Extra links for mobile menu only
  const mobileExtraLinks = [
    { name: 'News', path: '/news' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Logo size="md" />
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl text-gray-900 leading-none">UPSS</span>
              <span className="text-[10px] text-gray-500">Benin City</span>
            </div>
          </Link>

          {/* Desktop Navigation - Only 4 links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-maroon-800' : 'text-gray-600 hover:text-maroon-800'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a 
              href="https://upss.teachmint.institute/admission"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 bg-maroon-800 text-white px-5 py-2 text-sm font-medium hover:bg-maroon-900 transition-colors rounded"
            >
              Apply
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} 
        style={{ top: '64px' }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => 
                  `block py-3 text-lg font-medium border-b border-gray-100 ${isActive ? 'text-maroon-800' : 'text-gray-700'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">More</p>
              {mobileExtraLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  className={({ isActive }) => 
                    `block py-3 text-lg font-medium border-b border-gray-100 ${isActive ? 'text-maroon-800' : 'text-gray-700'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="mt-auto bg-gray-50 px-6 py-6 space-y-3">
            <a 
              href="https://upss.teachmint.institute/admission" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full text-center py-3 bg-maroon-800 text-white font-medium rounded"
            >
              Apply Now
            </a>
            <a 
              href="https://schoolguardian360.com/#Dashboard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full text-center py-3 bg-gold-500 text-white font-medium rounded"
            >
              Parent Portal
            </a>
            <Link 
              to="/admin/login" 
              className="block w-full text-center py-3 text-gray-400 text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrimaryNav;