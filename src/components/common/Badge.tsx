import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'verified' | 'vouch' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center gap-1 font-medium rounded-full select-none';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  const variantClasses = {
    primary: 'bg-civic-blue-50 text-civic-blue border border-civic-blue-100',
    secondary: 'bg-civic-teal-50 text-civic-teal border border-civic-teal-100',
    accent: 'bg-amber-50 text-amber-800 border border-amber-200',
    verified: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold',
    vouch: 'bg-purple-50 text-purple-800 border border-purple-200 font-semibold',
    neutral: 'bg-gray-100 text-civic-text-secondary border border-gray-200',
  };

  if (variant === 'verified') {
    return (
      <span className={`${baseClasses} ${variantClasses.verified} ${sizeClasses[size]} ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>{children || '✓ Community Verified'}</span>
      </span>
    );
  }

  if (variant === 'vouch') {
    return (
      <span className={`${baseClasses} ${variantClasses.vouch} ${sizeClasses[size]} ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
        <span>{children}</span>
      </span>
    );
  }

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};
