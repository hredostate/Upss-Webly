

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 font-serif">Site Configuration</h1>

      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">General Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Basic site information and SEO defaults.</p>
         </div>
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700">Site Name</label>
                  <input type="text" defaultValue="University Preparatory Secondary School" className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700">Browser Title Format</label>
                  <input type="text" defaultValue="[Page Title] | UPSS" className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
               </div>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700">Footer Copyright Text</label>
               <input type="text" defaultValue="© 2024 UPSS Benin City. All rights reserved." className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
            </div>
         </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
            <p className="text-sm text-gray-500 mt-1">Displayed in the footer and contact page.</p>
         </div>
         <div className="p-6 space-y-6">
            <div>
               <label className="block text-sm font-bold text-gray-700">School Address</label>
               <textarea rows={3} defaultValue="123 Education Drive, GRA, Benin City, Edo State, Nigeria" className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700">Contact Email</label>
                  <input type="email" defaultValue="info@upss.edu.ng" className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                  <input type="text" defaultValue="+234 800 123 4567" className="mt-1 w-full p-2 border border-gray-300 rounded shadow-sm" />
               </div>
            </div>
         </div>
      </div>

      <div className="flex justify-end">
         <button className="bg-maroon-800 text-white px-6 py-2 rounded shadow-sm hover:bg-maroon-900 font-bold uppercase tracking-wide">
            Save Configuration
         </button>
      </div>
    </div>
  );
}
