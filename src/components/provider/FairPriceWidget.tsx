import React from 'react';
import { Sparkles, Info, Check } from 'lucide-react';
import { calculateFairPrice } from '../../services/fairPriceAi';

interface FairPriceWidgetProps {
  categoryName: string;
  durationMinutes: number;
  onApplyRecommendedPrice: (price: number) => void;
  currentPrice?: number;
}

export const FairPriceWidget: React.FC<FairPriceWidgetProps> = ({
  categoryName,
  durationMinutes,
  onApplyRecommendedPrice,
  currentPrice,
}) => {
  const estimate = calculateFairPrice({
    categoryName,
    durationMinutes,
    providerExperienceYears: 3,
  });

  return (
    <div className="p-4 rounded-card bg-amber-50/80 border border-amber-200 text-civic-text-primary flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>FairPrice AI Recommendation</span>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
          Neighborhood Benchmark
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-amber-200/60 shadow-2xs">
        <div>
          <span className="text-xs text-civic-text-secondary block">Suggested Price Range:</span>
          <span className="text-base font-extrabold text-civic-text-primary">
            ₹{estimate.suggestedMin} - ₹{estimate.suggestedMax}
          </span>
          <span className="text-xs text-amber-800 font-bold block mt-0.5">
            Recommended: ₹{estimate.recommended}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onApplyRecommendedPrice(estimate.recommended)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-button bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-2xs transition-colors"
        >
          {currentPrice === estimate.recommended ? (
            <>
              <Check className="w-4 h-4" /> Applied ₹{estimate.recommended}
            </>
          ) : (
            `Apply Recommended (₹${estimate.recommended})`
          )}
        </button>
      </div>

      <div className="text-[11px] text-amber-900/80 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
        <span>
          <strong>Rule:</strong> AI recommends prices based on local market rates. You retain 100% full control to set your own final price.
        </span>
      </div>
    </div>
  );
};
