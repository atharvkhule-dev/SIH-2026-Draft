import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNavigation } from './BottomNavigation';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-civic-bg text-civic-text-primary">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
