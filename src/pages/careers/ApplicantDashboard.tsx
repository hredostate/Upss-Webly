import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicantApi, careersApi } from '../../api/careersClient';
import { JobApplication, JobListing } from '../../types/careers';
import StatusBadge from '../../components/careers/StatusBadge';

const ApplicantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [applicantName, setApplicantName] = useState('');
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('applicantToken');
    const name = localStorage.getItem('applicantName');
    
    if (!token) {
      navigate('/careers/login');
      return;
    }

    setApplicantName(name || 'Applicant');

    const fetchData = async () => {
      try {
        const [appsData, jobsData] = await Promise.all([
          applicantApi.getMyApplications(token),
          careersApi.getJobs({ status: 'open', featured: true })
        ]);
        setApplications(appsData.slice(0, 5));
        setFeaturedJobs(jobsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    total: applications.length,
    active: applications.filter(a => !['rejected', 'withdrawn', 'hired'].includes(a.status)).length,
    interviews: applications.filter(a => a.status.includes('interview')).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {applicantName}!
          </h1>
          <p className="text-gray-600">
            Track your applications and discover new opportunities at UPSS.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Applications</div>
                <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Active Applications</div>
                <div className="text-3xl font-bold text-blue-900">{stats.active}</div>
              </div>
              <div className="text-4xl">🔄</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Interviews</div>
                <div className="text-3xl font-bold text-green-600">{stats.interviews}</div>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                <Link 
                  to="/careers/my-applications"
                  className="text-blue-900 hover:text-blue-700 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>
              
              {loading ? (
                <div className="p-8 text-center text-gray-600">Loading...</div>
              ) : applications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-5xl mb-4">📭</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600 mb-4">Start applying for jobs to see them here.</p>
                  <Link 
                    to="/careers/jobs"
                    className="inline-block px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {applications.map(app => (
                    <Link
                      key={app.id}
                      to={`/careers/my-applications/${app.id}`}
                      className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900">
                          Application #{app.id.slice(0, 8)}
                        </div>
                        <StatusBadge status={app.status} />
                      </div>
                      <div className="text-sm text-gray-600">
                        Submitted {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/careers/jobs"
                  className="block w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors text-center"
                >
                  Browse Jobs
                </Link>
                <Link 
                  to="/careers/my-applications"
                  className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  My Applications
                </Link>
                <Link 
                  to="/careers/profile"
                  className="block w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Featured Jobs */}
            {featuredJobs.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Jobs</h3>
                <div className="space-y-4">
                  {featuredJobs.map(job => (
                    <Link
                      key={job.id}
                      to={`/careers/jobs/${job.slug}`}
                      className="block pb-4 border-b border-gray-100 last:border-0 hover:opacity-80"
                    >
                      <div className="font-semibold text-gray-900 mb-1">{job.title}</div>
                      <div className="text-sm text-gray-600">{job.location}</div>
                    </Link>
                  ))}
                </div>
                <Link 
                  to="/careers/jobs"
                  className="block mt-4 text-blue-900 hover:text-blue-700 font-medium text-sm text-center"
                >
                  View All Jobs →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
