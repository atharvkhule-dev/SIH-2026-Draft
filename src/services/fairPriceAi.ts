import { FairPriceEstimate } from '../types';

interface FairPriceParams {
  categoryName: string;
  durationMinutes: number;
  providerExperienceYears?: number;
  location?: string;
  isUrgent?: boolean;
}

export function calculateFairPrice(params: FairPriceParams): FairPriceEstimate {
  const { categoryName, durationMinutes, providerExperienceYears = 2, isUrgent = false } = params;

  // Base labor rate per hour according to category benchmark (in INR ₹)
  let baseHourlyRate = 350;

  const lowerCat = categoryName.toLowerCase();
  if (lowerCat.includes('clean')) {
    baseHourlyRate = 320;
  } else if (lowerCat.includes('car') || lowerCat.includes('vehicle')) {
    baseHourlyRate = 450;
  } else if (lowerCat.includes('tutor') || lowerCat.includes('code') || lowerCat.includes('educat')) {
    baseHourlyRate = 550;
  } else if (lowerCat.includes('shift') || lowerCat.includes('move')) {
    baseHourlyRate = 500;
  } else if (lowerCat.includes('plumb') || lowerCat.includes('electr')) {
    baseHourlyRate = 400;
  } else if (lowerCat.includes('tech') || lowerCat.includes('laptop')) {
    baseHourlyRate = 480;
  }

  // Duration factor
  const hours = Math.max(0.5, durationMinutes / 60);
  const baseLabor = Math.round(baseHourlyRate * hours);

  // Experience multiplier (1.0 to 1.35)
  const expMultiplier = Math.min(1.35, 1.0 + providerExperienceYears * 0.05);

  // Location benchmark (urban local benchmark adjustment ~ 1.1)
  const locationBenchmark = 1.1;

  // Surge/urgency boost if marked urgent
  const urgencyFactor = isUrgent ? 1.15 : 1.0;

  const calculatedBase = Math.round(baseLabor * expMultiplier * locationBenchmark * urgencyFactor);

  const suggestedMin = Math.round(calculatedBase * 0.88);
  const suggestedMax = Math.round(calculatedBase * 1.15);
  const recommended = Math.round(calculatedBase);

  return {
    suggestedMin,
    suggestedMax,
    recommended,
    breakdown: {
      baseLabor: Math.round(baseLabor),
      durationFactor: Number(hours.toFixed(1)),
      experienceMultiplier: Number(expMultiplier.toFixed(2)),
      locationBenchmark: 100 // +10% local wage adjustment
    }
  };
}
