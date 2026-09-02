import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem } from '../types';
import { MOCK_NOTIFICATIONS } from '../services/mockData';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (title: string, message: string, type: NotificationItem['type'], link?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('coop_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('coop_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addNotification = (
    title: string,
    message: string,
    type: NotificationItem['type'],
    link?: string
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'usr-101',
      title,
      message,
      type,
      timestamp: 'Just now',
      isRead: false,
      link,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
