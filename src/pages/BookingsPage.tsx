import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';
import { useAppMode } from '../context/AppModeContext';
import { BookingCard } from '../components/booking/BookingCard';
import { EmptyState } from '../components/common/EmptyState';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookings } = useBookings();
  const { isProviderMode } = useAppMode();

  const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'In Progress' | 'Completed' | 'Disputed'>('All');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status === activeTab;
  });

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-civic-text-primary">
            {isProviderMode ? 'Provider Service Bookings' : 'My Bookings'}
          </h1>
          <p className="text-xs text-civic-text-secondary mt-0.5">
            Track status, scan QR codes for start/end verification, and view payouts
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'Upcoming', 'In Progress', 'Completed', 'Disputed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap border transition-all ${
              activeTab === tab
                ? isProviderMode
                  ? 'bg-civic-teal text-white border-civic-teal shadow-xs'
                  : 'bg-civic-blue text-white border-civic-blue shadow-xs'
                : 'bg-white text-civic-text-secondary border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBookings.map((b) => (
            <BookingCard key={b.id} booking={b} isProviderView={isProviderMode} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No Bookings Found"
          description={
            isProviderMode
              ? 'You do not have any bookings in this status tab currently.'
              : 'You have not booked any services in this status category yet.'
          }
          actionLabel={isProviderMode ? undefined : 'Find a Service'}
          onAction={() => navigate('/explore')}
        />
      )}
    </div>
  );
};
