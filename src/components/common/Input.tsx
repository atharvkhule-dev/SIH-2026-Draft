import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  icon?: LucideIcon;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  errorMessage,
  icon: Icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-civic-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-civic-text-muted">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          className={`w-full min-h-[44px] px-3.5 py-2.5 text-base rounded-input bg-white border ${
            errorMessage ? 'border-civic-status-error focus:ring-red-500' : 'border-gray-300 focus:border-civic-blue focus:ring-civic-blue'
          } focus:outline-none focus:ring-2 focus:ring-opacity-20 text-civic-text-primary placeholder:text-civic-text-muted transition-colors ${
            Icon ? 'pl-11' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {errorMessage ? (
        <p className="text-sm text-civic-status-error font-medium flex items-center gap-1">
          <span>⚠️</span> {errorMessage}
        </p>
      ) : helperText ? (
        <p className="text-xs text-civic-text-secondary">{helperText}</p>
      ) : null}
    </div>
  );
};
