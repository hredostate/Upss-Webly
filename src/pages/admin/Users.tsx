

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">User Management</h1>
        <button className="btn-primary">
           + Add User
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
             <tr>
               <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Administrator</div>
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  admin@upss.edu.ng
               </td>
               <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                     Super Admin
                  </span>
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Just now
               </td>
               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <span className="text-gray-400 cursor-not-allowed">Edit</span>
               </td>
             </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
         <div className="flex">
            <div className="ml-3">
               <h3 className="text-sm font-bold text-blue-800">Role Definitions</h3>
               <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
                  <li><strong>Administrator:</strong> Full access to all settings, pages, media, and user management.</li>
                  <li><strong>Editor:</strong> Access to Pages, News, and Media only. Cannot change global settings or manage users.</li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
