import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart, Star, Settings, LogOut, Repeat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppMode } from '../context/AppModeContext';
import { useGigs } from '../context/GigContext';
import { useSaved } from '../context/SavedContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { GigCard } from '../components/gig/GigCard';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { mode, toggleMode } = useAppMode();
  const { gigs } = useGigs();
  const { savedGigIds } = useSaved();
  const navigate = useNavigate();

  const savedGigs = gigs.filter((g) => savedGigIds.includes(g.id));

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="p-6 bg-white rounded-card border border-gray-200 shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-civic-blue-100 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-civic-text-primary">
                {user?.name}
              </h1>
              {user?.isProviderVerified && <Badge variant="verified" size="md" />}
            </div>
            <p className="text-xs text-civic-text-secondary mt-1">
              📍 {user?.location} • Joined {user?.joinedDate}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-civic-text-primary mt-3">
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {user?.rating} Rating
              </span>
              <span>🏆 {user?.jobsCompleted} Jobs Completed</span>
              <span className="flex items-center gap-1 text-purple-700">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                {user?.vouchCount} Neighborhood Vouches
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={toggleMode}
            className="px-4 py-2 rounded-button bg-civic-blue-50 hover:bg-civic-blue-100 text-civic-blue font-bold text-xs border border-civic-blue-200 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Repeat className="w-4 h-4" />
            Switch Mode ({mode === 'customer' ? 'Offer Services' : 'Find Services'})
          </button>
          <Link to="/settings" className="w-full">
            <Button variant="outline" size="sm" fullWidth icon={Settings}>
              Settings & Preferences
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-civic-text-primary mb-3 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Saved Services ({savedGigs.length})
        </h2>
        {savedGigs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedGigs.map((g) => (
              <GigCard key={g.id} gig={g} />
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-card bg-white border border-gray-200 text-center text-xs text-civic-text-secondary">
            No saved services yet. Click the heart icon on any gig to save it here!
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button
          variant="danger"
          size="md"
          icon={LogOut}
          onClick={() => {
            logout();
            navigate('/auth');
          }}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
