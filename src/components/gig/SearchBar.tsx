import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, History } from 'lucide-react';
import { parseNaturalLanguageQuery, ParsedQuery } from '../../services/naturalLanguageSearch';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  onFilterClick?: () => void;
  onParsedQueryChange?: (parsed: ParsedQuery | null) => void;
  placeholder?: string;
}

const POPULAR_SEARCHES = [
  'House Cleaning',
  'Car Wash',
  'Home Painting',
  'Plumbing',
  'Furniture Assembly',
  'Tutoring',
  'Laptop Setup',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onFilterClick,
  onParsedQueryChange,
  placeholder = 'Search for a service or ask natural query...',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false);
  const [parsed, setParsed] = useState<ParsedQuery | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.trim().length > 3) {
      const result = parseNaturalLanguageQuery(value);
      if (result.detectedKeywords.length > 0) {
        setParsed(result);
        onParsedQueryChange?.(result);
        return;
      }
    }
    setParsed(null);
    onParsedQueryChange?.(null);
  }, [value, onParsedQueryChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (text: string) => {
    onChange(text);
    setIsFocused(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Container */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 flex items-center">
          <div className="absolute left-3.5 text-civic-blue">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={value}
            onFocus={() => setIsFocused(true)}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isAiMode ? 'e.g. I need someone to clean my 2BHK tomorrow evening' : placeholder}
            className="w-full min-h-[48px] pl-11 pr-24 py-3 text-base rounded-input bg-white border border-gray-300 focus:border-civic-blue focus:ring-2 focus:ring-civic-blue focus:ring-opacity-20 text-civic-text-primary placeholder:text-civic-text-muted shadow-xs transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1">
            {value && (
              <button
                onClick={() => onChange('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsAiMode(!isAiMode)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                isAiMode ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-gray-100 text-civic-text-secondary hover:bg-gray-200'
              }`}
              title="Toggle AI Natural Language Query Parser"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">AI Search</span>
            </button>
          </div>
        </div>

        {/* Filter button */}
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className="min-h-[48px] px-4 py-3 rounded-input bg-white border border-gray-300 text-civic-text-primary hover:bg-gray-50 flex items-center justify-center gap-2 font-semibold shadow-xs transition-colors shrink-0"
            aria-label="Open Filters"
          >
            <SlidersHorizontal className="w-5 h-5 text-civic-blue" />
            <span className="hidden sm:inline text-sm">Filter</span>
          </button>
        )}
      </div>

      {/* AI Parsed Intent Pill */}
      {parsed && (
        <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-wrap items-center gap-2 animate-fade-in">
          <span className="font-bold flex items-center gap-1 text-amber-800">
            <Sparkles className="w-3.5 h-3.5" /> AI Intent Detected:
          </span>
          {parsed.detectedCategory && (
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-semibold">
              Category: {parsed.detectedCategory}
            </span>
          )}
          {parsed.detectedPropertySize && (
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-semibold">
              Size: {parsed.detectedPropertySize}
            </span>
          )}
          {parsed.detectedDate && (
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-semibold">
              Date: {parsed.detectedDate}
            </span>
          )}
          {parsed.detectedTimeOfDay && (
            <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-semibold">
              Time: {parsed.detectedTimeOfDay}
            </span>
          )}
        </div>
      )}

      {/* Dropdown Suggestions */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-card shadow-modal border border-gray-200 p-3 max-h-72 overflow-y-auto animate-fade-in">
          <div className="text-xs font-bold text-civic-text-muted uppercase tracking-wider mb-2 px-2 flex items-center gap-1">
            <History className="w-3.5 h-3.5" /> Popular Searches Near You
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                onClick={() => handleSelectSuggestion(item)}
                className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-civic-blue-50 hover:text-civic-blue text-xs font-semibold text-civic-text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
