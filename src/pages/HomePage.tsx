import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { MOCK_CATEGORIES } from '../services/mockData';
import { SearchBar } from '../components/gig/SearchBar';
import { CategoryCard } from '../components/gig/CategoryCard';
import { GigCard } from '../components/gig/GigCard';
import { FilterModal, FilterOptions } from '../components/gig/FilterModal';
import { Button } from '../components/common/Button';
import { ParsedQuery } from '../services/naturalLanguageSearch';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { gigs } = useBookings();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [parsedIntent, setParsedIntent] = useState<ParsedQuery | null>(null);

  const [filters, setFilters] = useState<FilterOptions>({
    maxDistanceKm: 15,
    maxPrice: 3000,
    minRating: 0,
    verifiedOnly: false,
    sortBy: 'recommended',
  });

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      // Category filter
      if (selectedCategory && gig.categoryId !== selectedCategory) {
        return false;
      }
      // AI parsed category override if present
      if (parsedIntent?.detectedCategory && !gig.categoryName.toLowerCase().includes(parsedIntent.detectedCategory.toLowerCase())) {
        // Soft match allowed
      }
      // Text query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = gig.title.toLowerCase().includes(q);
        const matchesCat = gig.categoryName.toLowerCase().includes(q);
        const matchesDesc = gig.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCat && !matchesDesc) return false;
      }
      // Distance filter
      if (gig.distanceKm > filters.maxDistanceKm) return false;
      // Price filter
      if (gig.price > filters.maxPrice) return false;
      // Rating filter
      if (gig.rating < filters.minRating) return false;
      // Verified only
      if (filters.verifiedOnly && !gig.isVerified) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'nearest') return a.distanceKm - b.distanceKm;
      if (filters.sortBy === 'lowestPrice') return a.price - b.price;
      if (filters.sortBy === 'highestRated') return b.rating - a.rating;
      return 0;
    });
  }, [gigs, selectedCategory, searchQuery, filters, parsedIntent]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Hello Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-civic-text-primary tracking-tight">
            Hello, {user?.name.split(' ')[0] || 'Neighbor'} 👋
          </h1>
          <p className="text-sm font-medium text-civic-text-secondary">
            What service do you need in {user?.location.split(',')[0] || 'your area'} today?
          </p>
        </div>

        <Link to="/provider/create-service">
          <Button variant="secondary" size="sm" icon={PlusCircle}>
            + Offer a Service
          </Button>
        </Link>
      </div>

      {/* Free-text & Natural Language Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onFilterClick={() => setIsFilterOpen(true)}
        onParsedQueryChange={setParsedIntent}
      />

      {/* Restrained Civic Promotional Banner */}
      <div className="relative overflow-hidden rounded-card bg-gradient-to-r from-civic-blue to-civic-blue-dark text-white p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-civic-teal-100" /> Neighborhood Cooperative Assurance
          </span>
          <h3 className="text-lg sm:text-xl font-bold leading-snug">
            Verified Local Service Providers
          </h3>
          <p className="text-xs sm:text-sm text-civic-blue-100 mt-1">
            Every job includes QR verification, transparent escrow payments, and a 5% contribution to your local neighborhood community fund.
          </p>
        </div>
        <Link to="/explore">
          <button className="relative z-10 px-4 py-2.5 rounded-button bg-white text-civic-blue font-bold text-xs hover:bg-gray-100 transition-colors shadow-xs shrink-0 flex items-center gap-1.5">
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* Popular Categories Near You */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-civic-text-primary">
            Popular Categories Near You
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-civic-blue hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {MOCK_CATEGORIES.slice(0, 8).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Recommended Gigs Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-civic-text-primary flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-civic-accent" />
            Recommended Services Near You ({filteredGigs.length})
          </h2>
          <Link to="/explore" className="text-xs font-semibold text-civic-blue hover:underline">
            View All →
          </Link>
        </div>

        {filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-card border border-gray-200 text-center flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-civic-text-secondary">
              No services match your exact filter criteria.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setFilters({
                  maxDistanceKm: 25,
                  maxPrice: 3000,
                  minRating: 0,
                  verifiedOnly: false,
                  sortBy: 'recommended',
                });
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
};
