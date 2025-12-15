import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicantApi } from '../../api/careersClient';
import { JobApplication } from '../../types/careers';
import StatusBadge from '../../components/careers/StatusBadge';

const MyApplications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const token = localStorage.getItem('applicantToken');
    
    if (!token) {
      navigate('/careers/login');
      return;
    }

    const fetchApplications = async () => {
      try {
        const data = await applicantApi.getMyApplications(token);
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'active') return !['rejected', 'withdrawn', 'hired'].includes(app.status);
    if (filter === 'completed') return ['hired', 'rejected', 'withdrawn'].includes(app.status);
    return app.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track all your job applications in one place
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({applications.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'active'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({applications.filter(a => !['rejected', 'withdrawn', 'hired'].includes(a.status)).length})
            </button>
            <button
              onClick={() => setFilter('submitted')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'submitted'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Submitted
            </button>
            <button
              onClick={() => setFilter('under_review')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'under_review'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under Review
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {filter === 'all' ? 'No applications yet' : `No ${filter} applications`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'Start applying for jobs to see them here.'
                : 'Try changing the filter to view other applications.'}
            </p>
            {filter === 'all' && (
              <Link 
                to="/careers/jobs"
                className="inline-block px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
              >
                Browse Jobs
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map(app => (
              <Link
                key={app.id}
                to={`/careers/my-applications/${app.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Application #{app.id.slice(0, 8)}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Job ID: {app.jobId.slice(0, 8)}
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Submitted</div>
                    <div className="font-medium text-gray-900">
                      {new Date(app.submittedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  {app.yearsExperience !== undefined && (
                    <div>
                      <div className="text-gray-600 mb-1">Experience</div>
                      <div className="font-medium text-gray-900">{app.yearsExperience} years</div>
                    </div>
                  )}

                  {app.expectedSalary && (
                    <div>
                      <div className="text-gray-600 mb-1">Expected Salary</div>
                      <div className="font-medium text-gray-900">
                        ₦{app.expectedSalary.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>

                {app.interviewDate && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-purple-700">
                      <span>📅</span>
                      <span className="font-medium">
                        Interview scheduled for {new Date(app.interviewDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 text-sm text-blue-900 font-medium">
                  View Details →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
