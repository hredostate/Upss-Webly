import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* Top Utility Bar */}
      <div className="bg-maroon-900 text-white text-xs py-2 px-6 flex justify-end gap-6 tracking-wide uppercase hidden md:flex">
        <Link to="/admin/login" className="hover:text-maroon-200 transition-colors">Faculty & Staff</Link>
        <a href="#" className="hover:text-maroon-200 transition-colors">Parents</a>
        <a href="#" className="hover:text-maroon-200 transition-colors">Alumni</a>
        <Link to="/admin" className="hover:text-maroon-200 transition-colors font-bold">Admin Portal</Link>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          isScrolled ? 'bg-white shadow-md py-2 border-gray-200' : 'bg-white py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-maroon-800 rounded-sm flex items-center justify-center text-white font-serif font-bold text-xl md:text-2xl group-hover:bg-maroon-700 transition-colors">
              U
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl leading-none text-maroon-800 tracking-tight">UPSS</span>
              <span className="text-[0.6rem] md:text-xs uppercase tracking-widest text-gray-500">Benin City</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800">
            {['About', 'Admissions', 'Academics', 'Campus Life', 'News', 'Contact'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-maroon-800 transition-colors py-2 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-maroon-800 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <button className="ml-4 border border-maroon-800 text-maroon-800 px-5 py-2 hover:bg-maroon-800 hover:text-white transition-all text-sm font-bold uppercase tracking-wider">
              Apply Now
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-gray-800 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-screen overflow-y-auto pb-40">
            <nav className="flex flex-col p-6 gap-4 text-lg">
              {['About', 'Admissions', 'Academics', 'Campus Life', 'News', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="py-3 border-b border-gray-100 text-gray-800 hover:text-maroon-800"
                >
                  {item}
                </Link>
              ))}
              <div className="pt-6 flex flex-col gap-4">
                <Link to="/admin/login" className="text-sm text-gray-500 uppercase tracking-wide">Faculty Login</Link>
                <button className="bg-maroon-800 text-white py-4 w-full font-bold uppercase tracking-widest">
                  Apply Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-maroon-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-3xl mb-6 text-white">University Preparatory<br/>Secondary School</h3>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Dedicated to rigorous inquiry and intellectual freedom. We prepare students not just for examinations, but for a life of purpose and contribution.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors cursor-pointer">FB</div>
               <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors cursor-pointer">TW</div>
               <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors cursor-pointer">IG</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Academics</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Curriculum</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Departments</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Admissions</h4>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">How to Apply</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tuition & Fees</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Visit Us</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} UPSS Benin City. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;