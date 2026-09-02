import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export interface FilterOptions {
  maxDistanceKm: number;
  maxPrice: number;
  minRating: number;
  verifiedOnly: boolean;
  sortBy: 'recommended' | 'nearest' | 'lowestPrice' | 'highestRated';
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [local, setLocal] = useState<FilterOptions>(filters);

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      maxDistanceKm: 15,
      maxPrice: 3000,
      minRating: 0,
      verifiedOnly: false,
      sortBy: 'recommended',
    };
    setLocal(defaultFilters);
  };

  const handleApply = () => {
    onApplyFilters(local);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter & Sort Services" maxWidth="md">
      <div className="flex flex-col gap-6 py-2">
        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-civic-text-primary mb-2">
            Sort By
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'recommended', label: 'Recommended' },
              { id: 'nearest', label: 'Nearest First' },
              { id: 'lowestPrice', label: 'Lowest Price' },
              { id: 'highestRated', label: 'Highest Rated' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLocal({ ...local, sortBy: item.id as FilterOptions['sortBy'] })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  local.sortBy === item.id
                    ? 'bg-civic-blue text-white border-civic-blue shadow-xs'
                    : 'bg-white text-civic-text-primary border-gray-300 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Distance Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-civic-text-primary">
              Maximum Distance
            </label>
            <span className="text-xs font-bold text-civic-blue">{local.maxDistanceKm} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={local.maxDistanceKm}
            onChange={(e) => setLocal({ ...local, maxDistanceKm: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-civic-blue"
          />
          <div className="flex justify-between text-[11px] text-civic-text-muted mt-1">
            <span>1 km</span>
            <span>10 km</span>
            <span>25 km</span>
          </div>
        </div>

        {/* Max Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-semibold text-civic-text-primary">
              Maximum Price
            </label>
            <span className="text-xs font-bold text-civic-blue">₹{local.maxPrice}</span>
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            step="100"
            value={local.maxPrice}
            onChange={(e) => setLocal({ ...local, maxPrice: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-civic-blue"
          />
        </div>

        {/* Minimum Rating */}
        <div>
          <label className="block text-sm font-semibold text-civic-text-primary mb-2">
            Minimum Provider Rating
          </label>
          <div className="flex gap-2">
            {[0, 4.0, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setLocal({ ...local, minRating: rating })}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  local.minRating === rating
                    ? 'bg-civic-teal text-white border-civic-teal shadow-xs'
                    : 'bg-white text-civic-text-primary border-gray-300 hover:bg-gray-50'
                }`}
              >
                {rating === 0 ? 'Any Rating' : `⭐ ${rating}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Verified Providers Switch */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div>
            <span className="block text-sm font-semibold text-civic-text-primary">
              ✓ Community Verified Only
            </span>
            <span className="text-xs text-civic-text-secondary">
              Only show providers with neighborhood vouches
            </span>
          </div>
          <input
            type="checkbox"
            checked={local.verifiedOnly}
            onChange={(e) => setLocal({ ...local, verifiedOnly: e.target.checked })}
            className="w-5 h-5 text-civic-blue rounded border-gray-300 focus:ring-civic-blue accent-civic-blue cursor-pointer"
          />
        </div>

        {/* Footer buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" fullWidth onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" fullWidth onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>
    </Modal>
  );
};
