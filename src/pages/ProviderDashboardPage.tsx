import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Calendar, PlusCircle, TrendingUp, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { BookingCard } from '../components/booking/BookingCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ProviderDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { bookings, gigs } = useBookings();
  const navigate = useNavigate();

  const myGigs = gigs.filter((g) => g.providerId === user?.id || g.providerName === user?.name);
  const activeBookings = bookings.filter((b) => b.status === 'Upcoming' || b.status === 'In Progress');

  // Calculate earnings
  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const totalEarned = completedBookings.reduce((sum, b) => sum + b.providerPayout, 0);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-civic-teal to-civic-teal-dark text-white rounded-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-civic-teal-100 uppercase tracking-wider block mb-1">
            Provider Dashboard • Mode Active
          </span>
          <h1 className="text-2xl font-extrabold">Welcome, {user?.name} 👋</h1>
          <p className="text-xs text-civic-teal-100 mt-1">
            Manage your service listings, track active doorstep jobs, and review earnings.
          </p>
        </div>

        <Button
          variant="accent"
          size="sm"
          icon={PlusCircle}
          onClick={() => navigate('/provider/create-service')}
        >
          Offer a New Service
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-civic-text-secondary text-xs font-semibold">
            <span>This Month Earnings</span>
            <Wallet className="w-4 h-4 text-civic-teal" />
          </div>
          <div className="text-2xl font-extrabold text-civic-teal mt-2">
            ₹{totalEarned > 0 ? totalEarned.toLocaleString('en-IN') : '18,450'}
          </div>
          <Link to="/earnings" className="text-[11px] font-bold text-civic-blue hover:underline mt-2">
            View Earnings Details →
          </Link>
        </div>

        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-civic-text-secondary text-xs font-semibold">
            <span>Jobs Completed</span>
            <TrendingUp className="w-4 h-4 text-civic-blue" />
          </div>
          <div className="text-2xl font-extrabold text-civic-text-primary mt-2">
            {user?.jobsCompleted || 38}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-2">98% Completion Rate</span>
        </div>

        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-civic-text-secondary text-xs font-semibold">
            <span>Average Rating</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-civic-text-primary mt-2">
            ⭐ {user?.rating || 4.9}
          </div>
          <span className="text-[11px] text-civic-text-muted mt-2">126+ Neighborhood Reviews</span>
        </div>

        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-civic-text-secondary text-xs font-semibold">
            <span>Community Vouches</span>
            <Badge variant="verified" size="sm" />
          </div>
          <div className="text-2xl font-extrabold text-civic-text-primary mt-2">
            🤝 {user?.vouchCount || 14}
          </div>
          <span className="text-[11px] text-civic-text-muted mt-2">Verified Neighborhood Badge</span>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-civic-text-primary flex items-center gap-2">
            <Calendar className="w-5 h-5 text-civic-teal" /> Active & Upcoming Jobs ({activeBookings.length})
          </h2>
          <Link to="/bookings" className="text-xs font-semibold text-civic-teal hover:underline">
            Manage All Bookings →
          </Link>
        </div>

        {activeBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeBookings.map((b) => (
              <BookingCard key={b.id} booking={b} isProviderView={true} />
            ))}
          </div>
        ) : (
          <div className="p-6 bg-white rounded-card border border-gray-200 text-center text-xs text-civic-text-secondary">
            No active jobs scheduled right now. Active customer requests will appear here.
          </div>
        )}
      </div>

      {/* My Offered Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-civic-text-primary">
            My Offered Services ({myGigs.length})
          </h2>
          <Button variant="secondary" size="sm" icon={PlusCircle} onClick={() => navigate('/provider/create-service')}>
            Add New Service
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myGigs.map((gig) => (
            <div key={gig.id} className="p-4 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-civic-teal">{gig.categoryName}</span>
                <h4 className="font-bold text-sm text-civic-text-primary mt-1">{gig.title}</h4>
                <div className="text-xs text-civic-text-secondary mt-1">₹{gig.price} / ~{gig.durationMinutes} mins</div>
              </div>
              <div className="flex gap-2 border-t border-gray-100 pt-3">
                <Link to={`/gig/${gig.id}`} className="w-full">
                  <Button variant="outline" size="sm" fullWidth>
                    View Listing
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
