import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' },
  { name: 'News', path: '/news' },
];

const secondaryLinks = [
  { name: 'Alumni', path: '/alumni' },
  { name: 'Careers', path: '/careers' },
];

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'text-primary-900' : 'text-gray-600 hover:text-primary-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-primary-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500">
            <Logo size="md" />
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl text-primary-900 leading-none">UPSS</span>
              <span className="text-[10px] text-gray-500">Benin City</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkClass}>
                {({ isActive }) => (
                  <span className="relative inline-flex items-center gap-1">
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-2 h-0.5 rounded-full transition-all ${
                        isActive ? 'w-full bg-primary-700' : 'w-0 bg-transparent'
                      }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {secondaryLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 shadow-sm'
                      : 'text-primary-900 hover:bg-primary-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href="https://upss.teachmint.institute/admission"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary whitespace-nowrap"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-full border border-gray-200 text-primary-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
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

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed inset-x-0 top-0 z-50 h-screen bg-white shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-20 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Logo size="sm" />
            <div className="flex flex-col">
              <span className="font-serif text-lg text-primary-900 leading-none">UPSS</span>
              <span className="text-[10px] text-gray-500">Benin City</span>
            </div>
          </Link>
          <button
            className="p-2 text-primary-900"
            aria-label="Close navigation"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-[calc(100%-5rem)] overflow-y-auto px-6 pb-10">
          <div className="py-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive ? 'bg-primary-50 text-primary-900' : 'text-gray-800 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">More</p>
            {secondaryLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-lg text-base font-semibold transition-colors ${
                    isActive ? 'bg-primary-50 text-primary-900' : 'text-gray-800 hover:bg-gray-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-6 space-y-3">
            <a
              href="https://upss.teachmint.institute/admission"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full justify-center"
            >
              Apply Now
            </a>
            <a
              href="https://schoolguardian360.com/#Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary w-full justify-center"
            >
              Parent Portal
            </a>
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-gray-500 text-sm font-semibold hover:text-primary-900"
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