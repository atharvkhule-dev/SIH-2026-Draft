export interface ParsedQuery {
  rawQuery: string;
  detectedCategory?: string;
  detectedPropertySize?: string;
  detectedDate?: string;
  detectedTimeOfDay?: string;
  detectedKeywords: string[];
}

export function parseNaturalLanguageQuery(query: string): ParsedQuery {
  const lower = query.toLowerCase();
  const keywords: string[] = [];

  let category: string | undefined;
  let propertySize: string | undefined;
  let date: string | undefined;
  let timeOfDay: string | undefined;

  // Detect category
  if (lower.includes('clean') || lower.includes('sweeping') || lower.includes('wash')) {
    if (lower.includes('car') || lower.includes('vehicle') || lower.includes('auto')) {
      category = 'Car Wash';
      keywords.push('Car Wash');
    } else if (lower.includes('deep')) {
      category = 'Deep Cleaning';
      keywords.push('Deep Cleaning');
    } else {
      category = 'House Cleaning';
      keywords.push('House Cleaning');
    }
  } else if (lower.includes('tutor') || lower.includes('teach') || lower.includes('study') || lower.includes('math') || lower.includes('science')) {
    category = 'School Tutoring';
    keywords.push('School Tutoring');
  } else if (lower.includes('shift') || lower.includes('move') || lower.includes('pack')) {
    category = 'House Shifting';
    keywords.push('House Shifting');
  } else if (lower.includes('plumb') || lower.includes('leak') || lower.includes('tap') || lower.includes('pipe')) {
    category = 'Plumbing';
    keywords.push('Plumbing');
  } else if (lower.includes('laptop') || lower.includes('computer') || lower.includes('wifi') || lower.includes('tech')) {
    category = 'Laptop & Tech Help';
    keywords.push('Tech Help');
  }

  // Detect Property size
  if (lower.includes('1bhk') || lower.includes('1 bhk') || lower.includes('1 bed')) {
    propertySize = '1BHK';
    keywords.push('1BHK');
  } else if (lower.includes('2bhk') || lower.includes('2 bhk') || lower.includes('2 bed')) {
    propertySize = '2BHK';
    keywords.push('2BHK');
  } else if (lower.includes('3bhk') || lower.includes('3 bhk') || lower.includes('3 bed')) {
    propertySize = '3BHK';
    keywords.push('3BHK');
  }

  // Detect Date
  if (lower.includes('today')) {
    date = 'Today';
    keywords.push('Today');
  } else if (lower.includes('tomorrow')) {
    date = 'Tomorrow';
    keywords.push('Tomorrow');
  } else if (lower.includes('weekend') || lower.includes('saturday') || lower.includes('sunday')) {
    date = 'This Weekend';
    keywords.push('This Weekend');
  }

  // Detect Time
  if (lower.includes('morning')) {
    timeOfDay = 'Morning (8 AM - 12 PM)';
    keywords.push('Morning');
  } else if (lower.includes('afternoon')) {
    timeOfDay = 'Afternoon (12 PM - 4 PM)';
    keywords.push('Afternoon');
  } else if (lower.includes('evening') || lower.includes('night')) {
    timeOfDay = 'Evening (4 PM - 8 PM)';
    keywords.push('Evening');
  }

  return {
    rawQuery: query,
    detectedCategory: category,
    detectedPropertySize: propertySize,
    detectedDate: date,
    detectedTimeOfDay: timeOfDay,
    detectedKeywords: keywords
  };
}
