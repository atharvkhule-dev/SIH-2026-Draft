import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Bell, Repeat, PlusCircle, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppMode } from '../../context/AppModeContext';
import { useNotifications } from '../../context/NotificationContext';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { mode, toggleMode, isProviderMode } = useAppMode();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-civic-blue flex items-center justify-center text-white font-bold text-xl shadow-xs group-hover:bg-civic-blue-dark transition-colors">
            <Shield className="w-6 h-6 fill-white/20" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-civic-blue block leading-tight">
              Cooperative Gig
            </span>
            <span className="text-[10px] font-medium text-civic-teal uppercase tracking-wider block leading-none">
              Services Platform
            </span>
          </div>
        </Link>

        {/* Center / Mode Toggle Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMode}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 shadow-2xs ${
              isProviderMode
                ? 'bg-civic-teal-50 border-civic-teal text-civic-teal'
                : 'bg-civic-blue-50 border-civic-blue text-civic-blue'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Mode: {isProviderMode ? 'Offering Services' : 'Finding Services'}</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Admin Access */}
          <Link
            to="/admin"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 border border-gray-200"
          >
            <ShieldAlert className="w-4 h-4 text-civic-blue" />
            <span>Admin Portal</span>
          </Link>

          {/* Offer Service CTA in Customer Mode */}
          {!isProviderMode ? (
            <Button
              variant="outline"
              size="sm"
              icon={PlusCircle}
              onClick={() => {
                toggleMode();
                navigate('/provider/create-service');
              }}
              className="hidden sm:inline-flex"
            >
              Offer a Service
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              icon={PlusCircle}
              onClick={() => navigate('/provider/create-service')}
              className="hidden sm:inline-flex"
            >
              Add Service
            </Button>
          )}

          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative p-2 text-civic-text-secondary hover:text-civic-text-primary hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-civic-status-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Profile Avatar */}
          <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-civic-blue-100 shadow-2xs"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
