import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { applicantApi } from '../../api/careersClient';
import { JobApplication, ApplicationStatusHistory } from '../../types/careers';
import StatusTracker from '../../components/careers/StatusTracker';
import StatusBadge from '../../components/careers/StatusBadge';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [history, setHistory] = useState<ApplicationStatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      const token = localStorage.getItem('applicantToken');
      if (!token) {
        window.location.href = '/#/careers/login';
        return;
      }

      try {
        const [appData, historyData] = await Promise.all([
          applicantApi.getApplication(token, id),
          applicantApi.getApplicationHistory(token, id)
        ]);
        setApplication(appData);
        setHistory(historyData);
      } catch (err: any) {
        setError(err.message || 'Failed to load application details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          <p className="mt-4 text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/careers/my-applications"
            className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            View My Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/careers/dashboard" className="hover:text-blue-900">Dashboard</Link>
            <span>›</span>
            <Link to="/careers/my-applications" className="hover:text-blue-900">My Applications</Link>
            <span>›</span>
            <span className="text-gray-900">Application #{application.id.slice(0, 8)}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Application Details
              </h1>
              <p className="text-gray-600">
                Submitted on {new Date(application.submittedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <StatusBadge status={application.status} />
          </div>
        </div>

        {/* Status Tracker */}
        <div className="mb-8">
          <StatusTracker 
            currentStatus={application.status} 
            statusHistory={history}
          />
        </div>

        {/* Application Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Letter */}
            {application.coverLetter && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cover Letter</h2>
                <div className="text-gray-700 whitespace-pre-line">{application.coverLetter}</div>
              </div>
            )}

            {/* Interview Details */}
            {application.interviewDate && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">📅 Interview Details</h2>
                <div className="space-y-2 text-gray-800">
                  <div>
                    <span className="font-semibold">Date & Time:</span>{' '}
                    {new Date(application.interviewDate).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  {application.interviewLocation && (
                    <div>
                      <span className="font-semibold">Location:</span> {application.interviewLocation}
                    </div>
                  )}
                  {application.interviewType && (
                    <div>
                      <span className="font-semibold">Type:</span> {application.interviewType}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900">Application Info</h3>

              {/* Years of Experience */}
              {application.yearsExperience !== undefined && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Years of Experience</div>
                  <div className="font-semibold text-gray-900">{application.yearsExperience} years</div>
                </div>
              )}

              {/* Expected Salary */}
              {application.expectedSalary && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Expected Salary</div>
                  <div className="font-semibold text-gray-900">
                    ₦{application.expectedSalary.toLocaleString()}/month
                  </div>
                </div>
              )}

              {/* Available Start Date */}
              {application.availableStartDate && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Available From</div>
                  <div className="font-semibold text-gray-900">
                    {new Date(application.availableStartDate).toLocaleDateString()}
                  </div>
                </div>
              )}

              {/* Resume */}
              {application.resumeUrl && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Resume</div>
                  <a 
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-900 hover:text-blue-700 font-medium"
                  >
                    View Resume →
                  </a>
                </div>
              )}

              {/* Rating (if reviewed) */}
              {application.rating && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Rating</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < application.rating! ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
