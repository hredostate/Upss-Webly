import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy authentication
    if (email === 'admin@upss.edu.ng' && password === 'admin') {
      localStorage.setItem('upss_auth_token', 'dummy_token');
      navigate('/admin');
    } else {
      alert('Invalid credentials. Try admin@upss.edu.ng / admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 bg-maroon-800 rounded-sm flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-4">
           U
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to manage website content
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maroon-800 hover:bg-maroon-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500"
              >
                Sign in
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-400">
               Use: admin@upss.edu.ng / admin
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}