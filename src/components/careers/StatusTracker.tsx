import React from 'react';
import { ApplicationStatus, ApplicationStatusHistory } from '../../types/careers';

interface StatusTrackerProps {
  currentStatus: ApplicationStatus;
  statusHistory?: ApplicationStatusHistory[];
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    message: 'Your application has been received and is being processed.'
  },
  under_review: {
    label: 'Under Review',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    message: 'Your application is currently being reviewed by our team.'
  },
  shortlisted: {
    label: 'Shortlisted',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    message: "Congratulations! You've been shortlisted for an interview."
  },
  interview_scheduled: {
    label: 'Interview',
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    message: 'An interview has been scheduled. Check your email for details.'
  },
  interview_completed: {
    label: 'Interview Done',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-600',
    message: 'Interview completed. We are finalizing our decision.'
  },
  offer_extended: {
    label: 'Offer',
    color: 'bg-teal-500',
    textColor: 'text-teal-600',
    message: 'Congratulations! An offer has been extended to you.'
  },
  offer_accepted: {
    label: 'Offer Accepted',
    color: 'bg-green-600',
    textColor: 'text-green-700',
    message: 'You have accepted the offer. Welcome to the team!'
  },
  hired: {
    label: 'Hired',
    color: 'bg-green-600',
    textColor: 'text-green-700',
    message: 'Congratulations! You have been successfully hired.'
  },
  rejected: {
    label: 'Not Selected',
    color: 'bg-red-500',
    textColor: 'text-red-600',
    message: 'Thank you for your interest. Unfortunately, we will not be moving forward with your application.'
  },
  withdrawn: {
    label: 'Withdrawn',
    color: 'bg-gray-500',
    textColor: 'text-gray-600',
    message: 'You have withdrawn your application.'
  }
};

const progressStatuses: ApplicationStatus[] = [
  'submitted',
  'under_review',
  'shortlisted',
  'interview_scheduled',
  'offer_extended',
  'hired'
];

const StatusTracker: React.FC<StatusTrackerProps> = ({ currentStatus, statusHistory }) => {
  const config = statusConfig[currentStatus];
  
  // Handle terminal statuses (rejected, withdrawn)
  if (currentStatus === 'rejected' || currentStatus === 'withdrawn') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${config.color} mb-4`}>
            <span className="text-white text-2xl">✕</span>
          </div>
          <h3 className={`text-xl font-semibold ${config.textColor} mb-2`}>{config.label}</h3>
          <p className="text-gray-600">{config.message}</p>
        </div>
      </div>
    );
  }

  // Find current position in progress
  const currentIndex = progressStatuses.indexOf(currentStatus);
  
  // Handle special statuses
  const displayStatuses = currentStatus === 'interview_completed' || currentStatus === 'offer_accepted'
    ? [...progressStatuses]
    : progressStatuses;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Status Message */}
      <div className="mb-8 text-center">
        <h3 className={`text-2xl font-bold ${config.textColor} mb-2`}>
          Current Status: {config.label.toUpperCase()}
        </h3>
        <p className="text-gray-700 text-lg">{config.message}</p>
      </div>

      {/* Visual Timeline */}
      <div className="relative">
        {/* Progress Bar Container */}
        <div className="flex items-center justify-between relative">
          {/* Background Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
          
          {/* Progress Line */}
          <div 
            className={`absolute top-1/2 left-0 h-1 ${config.color} -translate-y-1/2 transition-all duration-500`}
            style={{ width: `${(currentIndex / (displayStatuses.length - 1)) * 100}%` }}
          />

          {/* Status Nodes */}
          {displayStatuses.map((status, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = status === currentStatus;
            const statusConf = statusConfig[status];
            
            return (
              <div key={status} className="relative z-10 flex flex-col items-center flex-1">
                {/* Node Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all ${
                    isCompleted 
                      ? `${statusConf.color} border-white` 
                      : 'bg-white border-gray-300'
                  } ${isCurrent ? 'ring-4 ring-offset-2 ring-blue-300' : ''}`}
                >
                  {isCompleted ? (
                    <span className="text-white font-bold">✓</span>
                  ) : (
                    <span className="text-gray-400">○</span>
                  )}
                </div>
                
                {/* Label */}
                <div className={`mt-3 text-center text-sm font-medium ${
                  isCompleted ? statusConf.textColor : 'text-gray-500'
                }`}>
                  {statusConf.label}
                </div>
                
                {/* Date if available */}
                {statusHistory && statusHistory.length > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    {statusHistory
                      .filter(h => h.newStatus === status)
                      .map(h => new Date(h.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      }))
                      .slice(-1)[0] || ''}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status History Timeline */}
      {statusHistory && statusHistory.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Status History</h4>
          <div className="space-y-3">
            {statusHistory.slice().reverse().map((history, index) => (
              <div key={history.id} className="flex gap-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gray-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">
                      {statusConfig[history.newStatus as ApplicationStatus]?.label || history.newStatus}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(history.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  {history.notes && (
                    <p className="text-sm text-gray-600 mt-1">{history.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusTracker;
