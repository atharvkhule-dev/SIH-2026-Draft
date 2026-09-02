import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppModeProvider } from './context/AppModeContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';
import { MainLayout } from './components/layout/MainLayout';

import { SplashPage } from './pages/SplashPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { GigDetailPage } from './pages/GigDetailPage';
import { BookingFlowPage } from './pages/BookingFlowPage';
import { BookingsPage } from './pages/BookingsPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProviderDashboardPage } from './pages/ProviderDashboardPage';
import { CreateGigPage } from './pages/CreateGigPage';
import { EarningsPage } from './pages/EarningsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppModeProvider>
        <BookingProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Main Application Layout Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/gig/:id" element={<GigDetailPage />} />
                  <Route path="/book/:id" element={<BookingFlowPage />} />
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/provider/dashboard" element={<ProviderDashboardPage />} />
                  <Route path="/provider/create-service" element={<CreateGigPage />} />
                  <Route path="/earnings" element={<EarningsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </BookingProvider>
      </AppModeProvider>
    </AuthProvider>
  );
};

export default App;
