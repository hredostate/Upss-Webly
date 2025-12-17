import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Student Life', path: '/student-life' },
  { name: 'Contact', path: '/contact' },
  { name: 'News', path: '/news' },
];

const programLinks = [
  { name: 'Academics Overview', path: '/academics', description: 'How we deliver rigorous, future-ready learning.' },
  { name: 'Junior Secondary', path: '/junior-secondary', description: 'Foundational habits, literacy, numeracy, and curiosity.' },
  { name: 'Senior Secondary – Science', path: '/senior-secondary-science', description: 'Laboratory strength, research, and Olympiad readiness.' },
  { name: 'Senior Secondary – Humanities', path: '/senior-secondary-humanities', description: 'Communication, debate, and civic leadership.' },
  { name: 'Senior Secondary – Business', path: '/senior-secondary-business', description: 'Enterprise thinking, finance literacy, and leadership.' },
];

const exploreLinks = [
  { name: 'Facilities', path: '/facilities', description: 'Campus designed for serious learning.' },
  { name: 'Leadership & Management', path: '/leadership-management', description: 'Visionary, disciplined leadership.' },
  { name: 'Competitions', path: '/competitions', description: 'Internal and external challenges.' },
  { name: 'Technology & Coding', path: '/technology-coding', description: 'Digital literacy and robotics.' },
  { name: 'School Culture', path: '/school-culture', description: 'Discipline, respect, and learning.' },
  { name: 'Discipline Policy', path: '/discipline-policy', description: 'Clear standards that build character.' },
  { name: 'Guidance & Counselling', path: '/guidance-counselling', description: 'Academic and personal support.' },
  { name: 'Transport Services', path: '/transport-services', description: 'Safe, reliable student transport.' },
  { name: 'Cafeteria & Dining', path: '/cafeteria-dining', description: 'Balanced meals and etiquette.' },
  { name: 'Alumni Network', path: '/alumni-network', description: 'Stay connected and mentor students.' },
  { name: 'Community Impact', path: '/community-impact', description: 'Leadership through service.' },
  { name: 'Staff Excellence', path: '/staff-excellence', description: 'Prepared, disciplined teachers.' },
  { name: 'Quick Links', path: '/quick-links', description: 'Forms, calendars, and key downloads.' },
];

const secondaryLinks = [
  { name: 'Alumni', path: '/alumni' },
  { name: 'Careers', path: '/careers' },
];

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setExploreOpen(false);
    setProgramsOpen(false);
    setMobileExploreOpen(false);
    setMobileProgramsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
        setProgramsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setExploreOpen(false);
        setProgramsOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickAway);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleClickAway);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
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
          <div className="hidden lg:flex items-center gap-2" ref={navRef}>
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

            <div className="relative">
              <button
                className={`px-3 py-2 text-sm font-semibold transition-colors inline-flex items-center gap-2 ${
                  programsOpen ? 'text-primary-900' : 'text-gray-600 hover:text-primary-800'
                }`}
                onClick={() => {
                  setProgramsOpen((prev) => !prev);
                  setExploreOpen(false);
                }}
                aria-expanded={programsOpen}
                aria-haspopup="true"
              >
                Programs
                <svg
                  className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute left-0 mt-3 w-[520px] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 transition-all duration-200 origin-top-left ${
                  programsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-2 gap-4">
                  {programLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `block rounded-xl border transition p-4 ${
                          isActive
                            ? 'border-primary-200 bg-primary-50 text-primary-900'
                            : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50'
                        }`
                      }
                    >
                      <span className="block text-sm font-semibold text-primary-900">{link.name}</span>
                      <span className="block text-xs text-gray-600 leading-snug">{link.description}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                className={`px-3 py-2 text-sm font-semibold transition-colors inline-flex items-center gap-2 ${
                  exploreOpen ? 'text-primary-900' : 'text-gray-600 hover:text-primary-800'
                }`}
                onClick={() => {
                  setExploreOpen((prev) => !prev);
                  setProgramsOpen(false);
                }}
                aria-expanded={exploreOpen}
                aria-haspopup="true"
              >
                Explore
                <svg
                  className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 mt-3 w-[520px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 transition-all duration-200 origin-top-right ${
                  exploreOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-2 gap-3">
                  {exploreLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `block rounded-xl border transition p-3 ${
                          isActive
                            ? 'border-primary-200 bg-primary-50 text-primary-900'
                            : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50'
                        }`
                      }
                    >
                      <span className="block text-sm font-semibold text-primary-900">{link.name}</span>
                      <span className="block text-xs text-gray-600 leading-snug">{link.description}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
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

          <div className="pt-2 space-y-4">
            <button
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg border border-gray-200 text-base font-semibold text-gray-800 hover:bg-gray-50"
              onClick={() => setMobileProgramsOpen((prev) => !prev)}
              aria-expanded={mobileProgramsOpen}
            >
              Programs
              <svg className={`w-5 h-5 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileProgramsOpen && (
              <div className="grid grid-cols-1 gap-2">
                {programLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-3 rounded-lg border text-base font-semibold transition-colors ${
                        isActive
                          ? 'border-primary-200 bg-primary-50 text-primary-900'
                          : 'border-gray-100 text-gray-800 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span className="block leading-tight">{link.name}</span>
                    <span className="block text-xs text-gray-500">{link.description}</span>
                  </NavLink>
                ))}
              </div>
            )}

            <button
              className="w-full flex items-center justify-between py-3 px-3 rounded-lg border border-gray-200 text-base font-semibold text-gray-800 hover:bg-gray-50"
              onClick={() => setMobileExploreOpen((prev) => !prev)}
              aria-expanded={mobileExploreOpen}
            >
              Explore
              <svg className={`w-5 h-5 transition-transform ${mobileExploreOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileExploreOpen && (
              <div className="grid grid-cols-1 gap-2">
                {exploreLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-3 rounded-lg border text-base font-semibold transition-colors ${
                        isActive
                          ? 'border-primary-200 bg-primary-50 text-primary-900'
                          : 'border-gray-100 text-gray-800 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span className="block leading-tight">{link.name}</span>
                    <span className="block text-xs text-gray-500">{link.description}</span>
                  </NavLink>
                ))}
              </div>
            )}
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