import React from 'react';
import { ApplicationStatus } from '../../types/careers';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusStyles = {
  submitted: 'bg-blue-100 text-blue-800 border-blue-200',
  under_review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  shortlisted: 'bg-green-100 text-green-800 border-green-200',
  interview_scheduled: 'bg-purple-100 text-purple-800 border-purple-200',
  interview_completed: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  offer_extended: 'bg-teal-100 text-teal-800 border-teal-200',
  offer_accepted: 'bg-green-100 text-green-800 border-green-200',
  hired: 'bg-green-100 text-green-900 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  withdrawn: 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusLabels = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  shortlisted: 'Shortlisted',
  interview_scheduled: 'Interview Scheduled',
  interview_completed: 'Interview Completed',
  offer_extended: 'Offer Extended',
  offer_accepted: 'Offer Accepted',
  hired: 'Hired',
  rejected: 'Not Selected',
  withdrawn: 'Withdrawn'
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
};

export default StatusBadge;
