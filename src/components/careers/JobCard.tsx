import React from 'react';
import { Link } from 'react-router-dom';
import { JobListing } from '../../types/careers';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link 
      to={`/careers/jobs/${job.slug}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            {job.location && (
              <span className="flex items-center gap-1">
                📍 {job.location}
              </span>
            )}
            {job.employmentType && (
              <span className="capitalize">{job.employmentType.replace('-', ' ')}</span>
            )}
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-col gap-2 ml-4">
          {job.isFeatured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
              ⭐ Featured
            </span>
          )}
          {job.isUrgent && (
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
              🔥 Urgent
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {job.summary && (
        <p className="text-gray-700 mb-4 line-clamp-2">{job.summary}</p>
      )}

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        {job.experienceLevel && (
          <span className="flex items-center gap-1">
            💼 {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)} Level
          </span>
        )}
        {job.minExperienceYears !== undefined && job.minExperienceYears > 0 && (
          <span className="flex items-center gap-1">
            📅 {job.minExperienceYears}+ years
          </span>
        )}
        {job.isRemote && (
          <span className="flex items-center gap-1">
            🌐 Remote Available
          </span>
        )}
      </div>

      {/* Salary Range */}
      {job.showSalary && job.salaryMin && job.salaryMax && (
        <div className="mb-4">
          <span className="text-green-600 font-semibold">
            ₦{job.salaryMin.toLocaleString()} - ₦{job.salaryMax.toLocaleString()}/month
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {job.postedAt && (
            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
          )}
          {job.applicationsCount > 0 && (
            <span>{job.applicationsCount} applicant{job.applicationsCount !== 1 ? 's' : ''}</span>
          )}
        </div>
        
        {job.applicationDeadline && (
          <span className="text-xs text-gray-600">
            Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default JobCard;
