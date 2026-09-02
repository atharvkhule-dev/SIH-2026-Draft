import React, { useState } from 'react';
import { SearchBar } from '../components/gig/SearchBar';
import { CategoryCard } from '../components/gig/CategoryCard';
import { GigCard } from '../components/gig/GigCard';
import { MOCK_CATEGORIES } from '../services/mockData';
import { useBookings } from '../context/BookingContext';
import { FilterModal, FilterOptions } from '../components/gig/FilterModal';

export const ExplorePage: React.FC = () => {
  const { gigs } = useBookings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    maxDistanceKm: 20,
    maxPrice: 3000,
    minRating: 0,
    verifiedOnly: false,
    sortBy: 'recommended',
  });

  const categoryGroups = ['All', 'Home Services', 'Vehicle Services', 'Moving & Logistics', 'Education', 'Technology', 'Creative', 'Student / Part-Time'];

  const displayedCategories = MOCK_CATEGORIES.filter(
    (cat) => selectedGroup === 'All' || cat.group === selectedGroup
  );

  const filteredGigs = gigs.filter((gig) => {
    if (selectedCatId && gig.categoryId !== selectedCatId) return false;
    if (selectedGroup !== 'All') {
      const catObj = MOCK_CATEGORIES.find((c) => c.id === gig.categoryId);
      if (catObj && catObj.group !== selectedGroup) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        gig.title.toLowerCase().includes(q) ||
        gig.categoryName.toLowerCase().includes(q) ||
        gig.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (gig.distanceKm > filters.maxDistanceKm) return false;
    if (gig.price > filters.maxPrice) return false;
    if (gig.rating < filters.minRating) return false;
    if (filters.verifiedOnly && !gig.isVerified) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-civic-text-primary">
          Explore Local Services
        </h1>
        <p className="text-xs text-civic-text-secondary mt-0.5">
          Browse vetted local services across 8 major categories
        </p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onFilterClick={() => setIsFilterOpen(true)}
      />

      {/* Category Group Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryGroups.map((group) => (
          <button
            key={group}
            onClick={() => {
              setSelectedGroup(group);
              setSelectedCatId(null);
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap border transition-all ${
              selectedGroup === group
                ? 'bg-civic-blue text-white border-civic-blue shadow-xs'
                : 'bg-white text-civic-text-secondary border-gray-200 hover:bg-gray-50'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {displayedCategories.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isSelected={selectedCatId === cat.id}
            onClick={() => setSelectedCatId(selectedCatId === cat.id ? null : cat.id)}
          />
        ))}
      </div>

      {/* Results Grid */}
      <div>
        <h2 className="text-base font-bold text-civic-text-primary mb-3">
          Available Services ({filteredGigs.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
          ))}
        </div>
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  );
};
