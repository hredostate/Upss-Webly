import { Link, useLocation } from 'react-router-dom';
import { useAlumniAuth } from '../../context/AlumniAuthContext';

export function AlumniNav() {
  const location = useLocation();
  const { user, profile, signOut } = useAlumniAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkClass = (path: string) => {
    const base = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    return isActive(path)
      ? `${base} bg-blue-900 text-white`
      : `${base} text-gray-700 hover:bg-blue-50 hover:text-blue-900`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/alumni" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <div>
              <div className="font-bold text-blue-900">UPSS Alumni</div>
              <div className="text-xs text-gray-500">Stay Connected</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/alumni" className={navLinkClass('/alumni')}>
              Home
            </Link>
            <Link to="/alumni/directory" className={navLinkClass('/alumni/directory')}>
              Directory
            </Link>
            <Link to="/alumni/events" className={navLinkClass('/alumni/events')}>
              Events
            </Link>
            <Link to="/alumni/chapters" className={navLinkClass('/alumni/chapters')}>
              Chapters
            </Link>
            {user && (
              <>
                <Link to="/alumni/messages" className={navLinkClass('/alumni/messages')}>
                  Messages
                </Link>
                <Link to="/alumni/dashboard" className={navLinkClass('/alumni/dashboard')}>
                  Dashboard
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && profile ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={`/alumni/profile/${profile.id}`}
                  className="flex items-center space-x-2 hover:opacity-80"
                >
                  {profile.recent_photo_url ? (
                    <img
                      src={profile.recent_photo_url}
                      alt={`${profile.first_name} ${profile.last_name}`}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-900"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-semibold">
                      {profile.first_name[0]}{profile.last_name[0]}
                    </div>
                  )}
                  <span className="hidden md:inline text-sm font-medium text-gray-700">
                    {profile.first_name}
                  </span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-600 hover:text-blue-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/alumni/login"
                  className="px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/alumni/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-md"
                >
                  Join Network
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
