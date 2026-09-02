import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, Gig } from '../types';
import { bookingService } from '../services/api/bookingService';
import { disputeService } from '../services/api/disputeService';
import { reviewService } from '../services/api/reviewService';

interface BookingContextType {
  bookings: Booking[];
  createBooking: (gig: Gig, date: string, timeSlot: string, address: string) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;
  startJobScan: (bookingId: string) => Promise<boolean>;
  endJobScan: (bookingId: string) => Promise<boolean>;
  submitReview: (bookingId: string, rating: number, comment: string) => Promise<void>;
  raiseDispute: (bookingId: string, reason: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const list = await bookingService.getBookings();
    setBookings(list);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const createBooking = async (gig: Gig, date: string, timeSlot: string, address: string): Promise<Booking> => {
    const created = await bookingService.createBooking(gig, date, timeSlot, address);
    setBookings((prev) => [created, ...prev]);
    return created;
  };

  const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    await bookingService.updateBookingStatus(bookingId, status);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const startJobScan = async (bookingId: string): Promise<boolean> => {
    const success = await bookingService.startJobScan(bookingId);
    if (success) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, status: 'In Progress', startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : b
        )
      );
    }
    return success;
  };

  const endJobScan = async (bookingId: string): Promise<boolean> => {
    const success = await bookingService.endJobScan(bookingId);
    if (success) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, status: 'Completed', completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            : b
        )
      );
    }
    return success;
  };

  const submitReview = async (bookingId: string, rating: number, comment: string) => {
    await reviewService.submitReview(bookingId, rating, comment);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, hasCustomerRated: true } : b))
    );
  };

  const raiseDispute = async (bookingId: string, reason: string) => {
    await disputeService.raiseDispute(bookingId, reason);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Disputed', disputeReason: reason } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        updateBookingStatus,
        startJobScan,
        endJobScan,
        submitReview,
        raiseDispute,
        refreshBookings: fetchBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
