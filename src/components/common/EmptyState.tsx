import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-card border border-gray-100 shadow-card my-4">
      <div className="w-14 h-14 rounded-full bg-civic-blue-50 flex items-center justify-center text-civic-blue mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-semibold text-civic-text-primary mb-1">{title}</h4>
      <p className="text-sm text-civic-text-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
