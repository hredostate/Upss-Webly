import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavDropdown } from './NavDropdown';

const PrimaryNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedSection(null);
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

  const navStructure = [
    {
      name: 'About',
      path: '/about',
      children: [
        { name: 'About UPSS', path: '/about' },
        { name: 'Leadership & Management', path: '/leadership-management' },
        { name: 'School Culture', path: '/school-culture' },
        { name: 'Staff Excellence', path: '/staff-excellence' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Community Impact', path: '/community-impact' },
      ]
    },
    {
      name: 'Academics',
      path: '/academics',
      children: [
        { name: 'Academic Overview', path: '/academics' },
        { name: 'Junior Secondary (JSS)', path: '/junior-secondary' },
        { name: 'Senior Secondary - Science', path: '/senior-secondary-science' },
        { name: 'Senior Secondary - Humanities', path: '/senior-secondary-humanities' },
        { name: 'Senior Secondary - Business', path: '/senior-secondary-business' },
        { name: 'Technology & Coding', path: '/technology-coding' },
        { name: 'Competitions', path: '/competitions' },
      ]
    },
    {
      name: 'Admissions',
      path: '/admissions',
      children: null // No dropdown, direct link
    },
    {
      name: 'Student Life',
      path: '/student-life',
      children: [
        { name: 'Student Life Overview', path: '/student-life' },
        { name: 'Guidance & Counselling', path: '/guidance-counselling' },
        { name: 'Discipline Policy', path: '/discipline-policy' },
        { name: 'Transport Services', path: '/transport-services' },
        { name: 'Cafeteria & Dining', path: '/cafeteria-dining' },
      ]
    },
    {
      name: 'Alumni',
      path: '/alumni',
      children: [
        { name: 'Alumni Hub', path: '/alumni' },
        { name: 'Alumni Directory', path: '/alumni/directory' },
        { name: 'Events & Reunions', path: '/alumni/events' },
        { name: 'Chapters', path: '/alumni/chapters' },
        { name: 'Register as Alumni', path: '/alumni/register' },
      ]
    },
    {
      name: 'Careers',
      path: '/careers',
      children: [
        { name: 'Open Positions', path: '/careers/jobs' },
        { name: 'Why Work at UPSS', path: '/careers' },
        { name: 'Applicant Portal', path: '/careers/login' },
      ]
    },
    {
      name: 'News & Events',
      path: '/news',
      children: null // No dropdown, direct link
    },
    {
      name: 'Contact',
      path: '/contact',
      children: null // No dropdown, direct link
    },
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
              {navStructure.map((section) => (
                section.children ? (
                  <NavDropdown
                    key={section.name}
                    label={section.name}
                    path={section.path}
                    items={section.children}
                  />
                ) : (
                  <NavLink
                    key={section.name}
                    to={section.path}
                    className={({ isActive }) =>
                      `text-xs xl:text-sm font-bold uppercase tracking-wide transition-all duration-300 relative py-2 group ${
                        isActive ? 'text-maroon-800' : 'text-gray-600 hover:text-maroon-800'
                      }`
                    }
                  >
                    {section.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-maroon-800 transition-all duration-300 ease-out group-hover:w-full opacity-0 group-hover:opacity-100"></span>
                  </NavLink>
                )
              ))}
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-maroon-800 transition-colors p-1" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <a 
                href="https://upss.teachmint.institute/admission"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-maroon-800 text-maroon-800 hover:bg-maroon-800 hover:text-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
              >
                Apply
              </a>
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
          <div className="px-6 py-8 space-y-2">
            {navStructure.map((section) => (
              <div key={section.name} className="border-b border-gray-100">
                {section.children ? (
                  <>
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.name ? null : section.name)}
                      className="flex items-center justify-between w-full text-left text-xl font-serif text-gray-800 hover:text-maroon-800 py-4"
                    >
                      {section.name}
                      <svg 
                        className={`w-5 h-5 transition-transform ${expandedSection === section.name ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedSection === section.name && (
                      <div className="pb-4 pl-4 space-y-2">
                        {section.children.map((child) => (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            className={({ isActive }) =>
                              `block py-2 text-base ${isActive ? 'text-maroon-800 font-semibold' : 'text-gray-600 hover:text-maroon-800'}`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={section.path}
                    className={({ isActive }) =>
                      `block text-xl font-serif py-4 ${isActive ? 'text-maroon-800 font-bold' : 'text-gray-800 hover:text-maroon-800'}`
                    }
                  >
                    {section.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-auto bg-gray-50 px-6 py-8 space-y-4">
            <a 
              href="https://upss.teachmint.institute/admission"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 bg-maroon-800 text-white text-sm font-bold uppercase tracking-widest hover:bg-maroon-900 transition-colors rounded-sm shadow-md"
            >
              Apply Now
            </a>
            <a 
              href="https://schoolguardian360.com/#Dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-4 bg-gold-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-colors rounded-sm shadow-sm"
            >
              Guardian 360 Login
            </a>
            <Link 
              to="/admin/login" 
              className="block w-full text-center py-4 bg-white border border-gray-300 text-gray-400 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-sm"
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