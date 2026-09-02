import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  count,
  size = 'md',
  interactive = false,
  onChange,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
  };

  return (
    <div className={`inline-flex items-center gap-1 text-amber-500 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(value);
          const isHalf = starValue === Math.ceil(value) && !Number.isInteger(value);

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} p-0.5 transition-transform`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  isFilled || isHalf ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>
      <span className={`${textClasses[size]} text-civic-text-primary ml-0.5`}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className="text-xs text-civic-text-muted">({count})</span>
      )}
    </div>
  );
};
