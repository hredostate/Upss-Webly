
import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem('upss_auth_token');
      localStorage.removeItem('upss_user');
      navigate('/admin/login');
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-300 flex-shrink-0 flex flex-col shadow-xl z-20 hidden md:flex">
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 bg-gray-950 border-b border-gray-800">
          <div className="w-8 h-8 bg-maroon-800 text-white flex items-center justify-center rounded-sm mr-3 font-serif font-bold">U</div>
          <div>
            <div className="font-bold text-white tracking-wide text-sm">UPSS Builder</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-500">Admin Console</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow py-6 px-3 space-y-1">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>

          <div className="pt-4 pb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Content Management
          </div>

          <Link
            to="/admin/pages"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/pages')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Pages
          </Link>

          <Link
            to="/admin/news"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/news')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            News & Events
          </Link>

          <Link
            to="/admin/media"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/media')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Media Library
          </Link>

          <div className="pt-4 pb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            System
          </div>

          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/settings')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
             <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
             </svg>
            Settings
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              isActive('/admin/users')
                ? 'bg-maroon-900/50 text-white border-l-4 border-maroon-500' 
                : 'hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
            }`}
          >
             <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
            Users
          </Link>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-800">
           <div className="flex items-center gap-3 mb-4 px-2">
             <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white font-bold">AD</div>
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-white truncate">Administrator</p>
               <p className="text-xs text-gray-500 truncate">admin@upss.edu.ng</p>
             </div>
           </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-6 md:px-10">
           <div className="flex items-center gap-4">
             {/* Mobile Menu Button */}
             <button className="md:hidden text-gray-600">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
             <h1 className="text-lg font-bold text-gray-800">
               {location.pathname === '/admin' && 'Dashboard Overview'}
               {location.pathname.startsWith('/admin/pages') && 'Page Management'}
               {location.pathname.startsWith('/admin/news') && 'News & Events'}
               {location.pathname.startsWith('/admin/media') && 'Media Library'}
               {location.pathname.startsWith('/admin/settings') && 'Site Configuration'}
               {location.pathname.startsWith('/admin/users') && 'User Management'}
             </h1>
           </div>
           <div className="flex gap-4">
             <Link to="/" target="_blank" className="text-sm text-maroon-800 hover:underline flex items-center gap-1">
               View Live Site
               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
             </Link>
           </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
