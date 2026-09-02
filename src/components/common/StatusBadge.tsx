import React from 'react';
import { BookingStatus } from '../../types';

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusStyles: Record<BookingStatus, string> = {
    Requested: 'bg-blue-50 text-blue-700 border-blue-200',
    Confirmed: 'bg-amber-50 text-amber-800 border-amber-200',
    Upcoming: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'In Progress': 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold animate-pulse',
    Completed: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold',
    Cancelled: 'bg-gray-100 text-gray-700 border-gray-300',
    Disputed: 'bg-red-50 text-red-700 border-red-200 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border select-none ${statusStyles[status]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </span>
  );
};
