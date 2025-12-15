
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">Welcome back, Administrator.</h1>
        <p className="text-gray-600">Use this console to manage the UPSS public website content, publish news, and configure system settings.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="card-body">
            <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-2">Total Pages (Active)</div>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <div className="mt-2 text-green-600 text-xs font-medium flex items-center">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> All systems operational
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-2">Recent Articles</div>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <div className="mt-2 text-gray-400 text-xs">Last post: Today</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="text-gray-500 text-xs uppercase tracking-wider font-bold mb-2">System Health</div>
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="mt-2 text-gray-400 text-xs">Uptime: 24 days</div>
          </div>
        </div>
      </div>

      <div className="card">
         <div className="card-header">
            <h3 className="font-bold text-gray-700">Quick Actions</h3>
         </div>
         <div className="card-body grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/pages" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               </div>
               <span className="font-semibold text-gray-700 text-sm">Create New Page</span>
            </Link>
            
            <Link to="/admin/news/new" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
               </div>
               <span className="font-semibold text-gray-700 text-sm">Post News Article</span>
            </Link>

            <Link to="/admin/media" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </div>
               <span className="font-semibold text-gray-700 text-sm">Upload Media</span>
            </Link>

            <Link to="/admin/settings" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <span className="font-semibold text-gray-700 text-sm">Site Configuration</span>
            </Link>
         </div>
      </div>
    </div>
  );
}
