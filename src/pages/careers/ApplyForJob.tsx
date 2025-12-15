import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { careersApi, applicantApi } from '../../api/careersClient';
import { JobListing } from '../../types/careers';

const ApplyForJob: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    coverLetter: '',
    yearsExperience: '',
    expectedSalary: '',
    availableStartDate: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!slug) return;

      // Check if user is logged in
      const token = localStorage.getItem('applicantToken');
      if (!token) {
        localStorage.setItem('applyAfterLogin', slug);
        navigate('/careers/login');
        return;
      }

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
  }, [slug, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const token = localStorage.getItem('applicantToken');
    if (!token || !job) return;

    try {
      await applicantApi.submitApplication(token, {
        jobId: job.id,
        coverLetter: formData.coverLetter,
        yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
        expectedSalary: formData.expectedSalary ? parseFloat(formData.expectedSalary) : undefined,
        availableStartDate: formData.availableStartDate || undefined
      });

      // Redirect to applications page
      navigate('/careers/my-applications');
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          <p className="mt-4 text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link to="/careers" className="hover:text-blue-900">Careers</Link>
            <span>›</span>
            <Link to="/careers/jobs" className="hover:text-blue-900">Jobs</Link>
            <span>›</span>
            <Link to={`/careers/jobs/${job?.slug}`} className="hover:text-blue-900">
              {job?.title}
            </Link>
            <span>›</span>
            <span className="text-gray-900">Apply</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Apply for {job?.title}
          </h1>
          <p className="text-gray-600">
            Complete the form below to submit your application
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter *
              </label>
              <textarea
                id="coverLetter"
                required
                rows={8}
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Introduce yourself and explain why you're the right person for this role.
              </p>
            </div>

            {/* Years of Experience */}
            <div>
              <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                id="yearsExperience"
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 3"
              />
            </div>

            {/* Expected Salary */}
            <div>
              <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Monthly Salary (₦)
              </label>
              <input
                id="expectedSalary"
                type="number"
                min="0"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 150000"
              />
            </div>

            {/* Available Start Date */}
            <div>
              <label htmlFor="availableStartDate" className="block text-sm font-medium text-gray-700 mb-2">
                Earliest Start Date
              </label>
              <input
                id="availableStartDate"
                type="date"
                value={formData.availableStartDate}
                onChange={(e) => setFormData({ ...formData, availableStartDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Note about resume */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Your resume from your profile will be automatically attached to this application. 
                Make sure your{' '}
                <Link to="/careers/profile" className="underline hover:text-blue-700">
                  profile
                </Link>
                {' '}is up to date before submitting.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
              <Link
                to={`/careers/jobs/${job?.slug}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Additional Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Application Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Be specific about your relevant experience and achievements</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Proofread your cover letter for spelling and grammar</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Highlight skills that match the job requirements</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Show enthusiasm for the role and UPSS's mission</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplyForJob;
