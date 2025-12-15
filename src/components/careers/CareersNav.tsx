import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CareersNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if applicant is logged in
    const token = localStorage.getItem('applicantToken');
    const name = localStorage.getItem('applicantName');
    if (token) {
      setIsLoggedIn(true);
      setApplicantName(name || 'Applicant');
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('applicantToken');
    localStorage.removeItem('applicantName');
    setIsLoggedIn(false);
    navigate('/careers');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/careers" className="flex items-center">
              <span className="text-2xl font-bold text-blue-900">UPSS</span>
              <span className="ml-2 text-gray-600 hidden sm:inline">Careers</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/careers" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/careers') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/careers/jobs" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/careers/jobs') 
                  ? 'text-blue-900 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              }`}
            >
              Browse Jobs
            </Link>

            {isLoggedIn ? (
              <>
                <Link 
                  to="/careers/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/careers/dashboard') 
                      ? 'text-blue-900 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/careers/my-applications" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/careers/my-applications') 
                      ? 'text-blue-900 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                  }`}
                >
                  My Applications
                </Link>
                <Link 
                  to="/careers/profile" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                >
                  {applicantName}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/careers/login" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link 
                  to="/careers/register" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-900 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              to="/careers" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/careers/jobs" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/careers/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/careers/my-applications" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Applications
                </Link>
                <Link 
                  to="/careers/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/careers/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/careers/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-900 hover:bg-blue-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default CareersNav;
