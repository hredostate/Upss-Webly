import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { careersApi } from '../../api/careersClient';
import { JobListing } from '../../types/careers';

const JobDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return;
      
      try {
        const data = await careersApi.getJobBySlug(slug);
        setJob(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The job you are looking for does not exist.'}</p>
          <Link 
            to="/careers/jobs"
            className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyClick = () => {
    const token = localStorage.getItem('applicantToken');
    if (token) {
      navigate(`/careers/jobs/${job.slug}/apply`);
    } else {
      // Redirect to login with return URL
      localStorage.setItem('applyAfterLogin', job.slug);
      navigate('/careers/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/careers" className="hover:text-blue-900">Careers</Link>
            <span>›</span>
            <Link to="/careers/jobs" className="hover:text-blue-900">Jobs</Link>
            <span>›</span>
            <span className="text-gray-900">{job.title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            {job.location && <span className="flex items-center gap-1">📍 {job.location}</span>}
            {job.employmentType && (
              <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
            )}
            {job.experienceLevel && (
              <span className="capitalize">{job.experienceLevel} Level</span>
            )}
            {job.isRemote && <span>🌐 Remote Available</span>}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {job.isFeatured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Featured
              </span>
            )}
            {job.isUrgent && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                🔥 Urgent
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {job.status === 'open' ? '✅ Open for Applications' : job.status}
            </span>
          </div>

          {/* Apply Button */}
          {job.status === 'open' && (
            <button
              onClick={handleApplyClick}
              className="px-8 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {job.summary && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-lg text-gray-800">{job.summary}</p>
              </div>
            )}

            {/* Description */}
            {job.description && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div 
                  className="prose prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                <div className="whitespace-pre-line text-gray-700">{job.responsibilities}</div>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="whitespace-pre-line text-gray-700">{job.requirements}</div>
              </div>
            )}

            {/* Qualifications */}
            {job.qualifications && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
                <div className="whitespace-pre-line text-gray-700">{job.qualifications}</div>
              </div>
            )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                <div className="whitespace-pre-line text-gray-700">{job.benefits}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Job Details</h3>

              {/* Salary */}
              {job.showSalary && job.salaryMin && job.salaryMax && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Salary Range</div>
                  <div className="text-lg font-semibold text-green-600">
                    ₦{job.salaryMin.toLocaleString()} - ₦{job.salaryMax.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">per month</div>
                </div>
              )}

              {/* Experience */}
              {job.minExperienceYears !== undefined && job.minExperienceYears > 0 && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Experience Required</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {job.minExperienceYears}+ years
                  </div>
                </div>
              )}

              {/* Deadline */}
              {job.applicationDeadline && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Application Deadline</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              )}

              {/* Posted Date */}
              {job.postedAt && (
                <div>
                  <div className="text-sm text-gray-600 mb-1">Posted</div>
                  <div className="text-sm text-gray-700">
                    {new Date(job.postedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              )}

              {/* Apply Button */}
              {job.status === 'open' && (
                <button
                  onClick={handleApplyClick}
                  className="w-full px-6 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition-colors"
                >
                  Apply for this Position
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
