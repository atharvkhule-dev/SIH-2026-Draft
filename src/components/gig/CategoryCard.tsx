import React from 'react';
import * as Icons from 'lucide-react';
import { ServiceCategory } from '../../types';

interface CategoryCardProps {
  category: ServiceCategory;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onClick,
}) => {
  // Dynamically resolve icon component from lucide-react
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[category.iconName] || Icons.Sparkles;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-card border transition-all duration-150 select-none text-center gap-2 group ${
        isSelected
          ? 'bg-civic-blue-50 border-civic-blue text-civic-blue shadow-xs font-bold'
          : 'bg-white border-gray-200 text-civic-text-primary hover:border-civic-blue-100 hover:bg-gray-50 shadow-2xs'
      }`}
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
          isSelected ? 'bg-civic-blue text-white' : 'bg-civic-blue-50 text-civic-blue group-hover:bg-civic-blue group-hover:text-white'
        }`}
      >
        <IconComponent className="w-5 h-5" />
      </div>
      <span className="text-xs sm:text-sm font-semibold line-clamp-1">
        {category.name}
      </span>
    </button>
  );
};
