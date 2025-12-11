
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminClient } from '../../api/adminClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await AdminClient.login(email, password);
      if (data && data.token) {
        setSuccess('Authentication successful. Redirecting to dashboard...');
        localStorage.setItem('upss_auth_token', data.token);
        localStorage.setItem('upss_user', JSON.stringify(data.user));
        setTimeout(() => navigate('/admin'), 1000);
      }
    } catch (err: any) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 bg-maroon-800 rounded-sm flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-6 shadow-md">
           U
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900">UPSS Website Builder</h2>
        <p className="mt-2 text-sm text-gray-600 font-medium tracking-wide uppercase">
          Faculty & Administrator Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border-t-4 border-maroon-800 sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Email Address
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
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                  placeholder="name@upss.edu.ng"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700">
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
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-500 disabled:opacity-50 transition-colors uppercase tracking-widest"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>

            <div className="text-center">
              <a href="#" className="text-xs text-gray-500 hover:text-maroon-800 transition-colors">
                Forgot your password? Contact IT Support.
              </a>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center space-y-2">
          <p className="text-xs text-gray-400">
            Authorized personnel only. All access logs are monitored for security purposes.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-green-600 font-medium">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             System Online (v1.0.2)
          </div>
        </div>
      </div>
    </div>
  );
}
