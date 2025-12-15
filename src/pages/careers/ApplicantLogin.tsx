import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { careersApi } from '../../api/careersClient';

const ApplicantLogin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await careersApi.login(formData.email, formData.password);
      
      // Store token and user info
      localStorage.setItem('applicantToken', response.token);
      localStorage.setItem('applicantName', `${response.applicant.firstName} ${response.applicant.lastName}`);
      localStorage.setItem('applicantId', response.applicant.id);
      
      // Check if user was trying to apply for a job
      const applyAfterLogin = localStorage.getItem('applyAfterLogin');
      if (applyAfterLogin) {
        localStorage.removeItem('applyAfterLogin');
        navigate(`/careers/jobs/${applyAfterLogin}/apply`);
      } else {
        navigate('/careers/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicant Login</h1>
          <p className="text-gray-600">Sign in to your UPSS careers account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/careers/register" className="text-blue-900 font-medium hover:text-blue-700">
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/careers" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Careers Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantLogin;
