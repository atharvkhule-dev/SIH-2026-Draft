import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes according to PRD Rules:
  // - Minimum 44px height touch targets
  // - Clear text + icon combinations
  // - 8px border radius (`rounded-button`)
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-button transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none min-h-[44px]';

  const variantClasses = {
    primary:
      'bg-civic-blue hover:bg-civic-blue-dark text-white focus:ring-civic-blue shadow-sm',
    secondary:
      'bg-civic-teal hover:bg-civic-teal-dark text-white focus:ring-civic-teal shadow-sm',
    accent:
      'bg-civic-accent hover:bg-civic-accent-dark text-civic-text-primary focus:ring-civic-accent shadow-sm',
    outline:
      'border-2 border-civic-blue text-civic-blue hover:bg-civic-blue-50 focus:ring-civic-blue',
    ghost:
      'text-civic-text-secondary hover:bg-gray-100 hover:text-civic-text-primary focus:ring-gray-300',
    danger:
      'bg-civic-status-error hover:bg-red-800 text-white focus:ring-red-500 shadow-sm',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3.5 text-lg gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-5 h-5 flex-shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-5 h-5 flex-shrink-0" />
      )}
    </button>
  );
};
