import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 font-serif mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">Total Pages</div>
          <div className="text-3xl font-bold text-gray-900">12</div>
          <div className="mt-2 text-green-600 text-sm flex items-center">
             <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> All systems operational
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">Last Update</div>
          <div className="text-3xl font-bold text-gray-900">Today</div>
          <div className="mt-2 text-gray-400 text-sm">By Admin User</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">Admissions</div>
          <div className="text-3xl font-bold text-gray-900">Open</div>
          <div className="mt-2 text-maroon-600 text-sm cursor-pointer hover:underline">Manage Cycle &rarr;</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-700">Quick Actions</h3>
         </div>
         <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/admin/pages" className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-maroon-300 hover:bg-maroon-50 transition-all cursor-pointer group">
               <div className="w-10 h-10 rounded-full bg-maroon-100 text-maroon-600 flex items-center justify-center mb-3 group-hover:bg-maroon-600 group-hover:text-white transition-colors">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
               </div>
               <span className="font-semibold text-gray-700">Edit Homepage</span>
            </Link>
            
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
               </div>
               <span className="font-semibold text-gray-700">Post News</span>
            </div>

            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </div>
               <span className="font-semibold text-gray-700">Events Calendar</span>
            </div>

            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </div>
               <span className="font-semibold text-gray-700">Site Settings</span>
            </div>
         </div>
      </div>
    </div>
  );
}