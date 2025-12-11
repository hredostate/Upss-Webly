

export default function MediaLibrary() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Media Library</h1>
        <button className="bg-maroon-800 text-white px-4 py-2 rounded shadow-sm hover:bg-maroon-900 transition-colors text-sm font-bold uppercase tracking-wider flex items-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
           Upload Assets
        </button>
      </div>

      <div className="bg-white p-10 border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors cursor-pointer">
         <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
         </svg>
         <div className="mt-4 flex text-sm text-gray-600 justify-center">
            <span className="font-bold text-maroon-600 hover:text-maroon-500">Upload a file</span>
            <p className="pl-1">or drag and drop</p>
         </div>
         <p className="text-xs text-gray-500 mt-2">
            PNG, JPG, PDF up to 5MB
         </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
         <h3 className="text-lg font-bold text-gray-900 mb-4">All Media</h3>
         <div className="text-center py-10 text-gray-500">
            No media uploaded yet.
         </div>
      </div>
    </div>
  );
}
