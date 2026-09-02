import React from 'react';

interface PriceDisplayProps {
  amount: number;
  durationMinutes?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  durationMinutes,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
  };

  return (
    <div className={`inline-flex items-baseline gap-1 text-civic-blue ${className}`}>
      <span className={sizeClasses[size]}>₹{amount.toLocaleString('en-IN')}</span>
      {durationMinutes && (
        <span className="text-xs text-civic-text-secondary font-normal">
          / ~{durationMinutes >= 60 ? `${(durationMinutes / 60).toFixed(1)} hrs` : `${durationMinutes} mins`}
        </span>
      )}
    </div>
  );
};
