import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Calendar, MessageSquare, User, LayoutDashboard } from 'lucide-react';
import { useAppMode } from '../../context/AppModeContext';
import { useBookings } from '../../context/BookingContext';

export const BottomNavigation: React.FC = () => {
  const { isProviderMode } = useAppMode();
  const { bookings } = useBookings();

  const activeBookingsCount = bookings.filter(
    (b) => b.status === 'Upcoming' || b.status === 'In Progress' || b.status === 'Requested'
  ).length;

  const customerNavItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/bookings', label: 'Bookings', icon: Calendar, badge: activeBookingsCount },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const providerNavItems = [
    { to: '/provider/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/explore', label: 'Services', icon: Compass },
    { to: '/bookings', label: 'Bookings', icon: Calendar, badge: activeBookingsCount },
    { to: '/messages', label: 'Messages', icon: MessageSquare },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const navItems = isProviderMode ? providerNavItems : customerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full py-1 gap-1 transition-colors select-none ${
                  isActive
                    ? isProviderMode
                      ? 'text-civic-teal font-bold'
                      : 'text-civic-blue font-bold'
                    : 'text-civic-text-secondary font-medium hover:text-civic-text-primary'
                }`
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 bg-civic-accent text-civic-text-primary text-[10px] font-extrabold rounded-full flex items-center justify-center border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] leading-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
