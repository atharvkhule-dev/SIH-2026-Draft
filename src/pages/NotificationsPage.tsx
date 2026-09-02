import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, ShieldCheck, Wallet, Calendar } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { Button } from '../components/common/Button';

export const NotificationsPage: React.FC = () => {
  const { notifications, markAllAsRead, markAsRead } = useNotifications();

  const getIcon = (type: string) => {
    if (type === 'booking') return <Calendar className="w-5 h-5 text-civic-blue" />;
    if (type === 'payment') return <Wallet className="w-5 h-5 text-civic-teal" />;
    if (type === 'verification') return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
    return <Bell className="w-5 h-5 text-civic-accent" />;
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-civic-text-primary">
            Notifications
          </h1>
          <p className="text-xs text-civic-text-secondary mt-0.5">
            Real-time updates on your bookings, QR scans, and payouts
          </p>
        </div>

        <Button variant="ghost" size="sm" icon={CheckCheck} onClick={markAllAsRead}>
          Mark All Read
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markAsRead(notif.id)}
            className={`p-4 rounded-card border transition-colors flex items-start gap-3.5 cursor-pointer ${
              notif.isRead
                ? 'bg-white border-gray-200 shadow-2xs'
                : 'bg-civic-blue-50/70 border-civic-blue-200 shadow-xs font-medium'
            }`}
          >
            <div className="p-2 rounded-full bg-white border border-gray-200 shadow-2xs shrink-0">
              {getIcon(notif.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-civic-text-primary">{notif.title}</h4>
                <span className="text-[10px] text-civic-text-muted">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-civic-text-secondary mt-1">{notif.message}</p>
              {notif.link && (
                <Link
                  to={notif.link}
                  className="inline-block text-xs font-bold text-civic-blue hover:underline mt-2"
                >
                  View Details →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
