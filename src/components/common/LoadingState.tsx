import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading services...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center my-6">
      <div className="w-10 h-10 border-4 border-civic-blue border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm font-medium text-civic-text-secondary">{message}</p>
    </div>
  );
};
