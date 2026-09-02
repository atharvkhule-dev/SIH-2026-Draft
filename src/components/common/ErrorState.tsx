import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  solution?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not process your request.',
  solution = 'Please check your mobile connection or try reloading the page.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50/70 border border-red-200 rounded-card my-4">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-semibold text-civic-text-primary mb-1">{title}</h4>
      <p className="text-sm text-civic-text-secondary mb-2">{message}</p>
      <p className="text-xs text-civic-status-error font-medium max-w-sm mb-4">
        💡 Solution: {solution}
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" icon={RefreshCw} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
