import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingStatus, Gig } from '../types';
import { MOCK_BOOKINGS, MOCK_GIGS } from '../services/mockData';

interface BookingContextType {
  bookings: Booking[];
  gigs: Gig[];
  savedGigIds: string[];
  createBooking: (gig: Gig, date: string, timeSlot: string, address: string) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  startJobScan: (bookingId: string) => boolean;
  endJobScan: (bookingId: string) => boolean;
  submitReview: (bookingId: string, rating: number, comment: string) => void;
  raiseDispute: (bookingId: string, reason: string) => void;
  addGig: (gig: Gig) => void;
  toggleSaveGig: (gigId: string) => void;
  isGigSaved: (gigId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('coop_bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [gigs, setGigs] = useState<Gig[]>(() => {
    const saved = localStorage.getItem('coop_gigs');
    return saved ? JSON.parse(saved) : MOCK_GIGS;
  });

  const [savedGigIds, setSavedGigIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('coop_saved_gigs');
    return saved ? JSON.parse(saved) : ['gig-1'];
  });

  useEffect(() => {
    localStorage.setItem('coop_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('coop_gigs', JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem('coop_saved_gigs', JSON.stringify(savedGigIds));
  }, [savedGigIds]);

  const createBooking = (gig: Gig, date: string, timeSlot: string, address: string): Booking => {
    // Standard transparent split calculation: 5% platform, 5% cooperative fund, 90% provider payout
    const platformFee = Math.round(gig.price * 0.05);
    const cooperativeFee = Math.round(gig.price * 0.05);
    const providerPayout = gig.price - platformFee - cooperativeFee;

    const newBooking: Booking = {
      id: `bk-${Date.now().toString().slice(-5)}`,
      gigId: gig.id,
      gigTitle: gig.title,
      gigImage: gig.images[0],
      customerId: 'usr-101',
      customerName: 'Aniket Sharma',
      customerPhone: '+91 98765 43210',
      providerId: gig.providerId,
      providerName: gig.providerName,
      providerPhone: '+91 91234 56789',
      date,
      timeSlot,
      serviceAddress: address,
      price: gig.price,
      platformFee,
      cooperativeFee,
      providerPayout,
      status: 'Confirmed',
      qrCodeStart: `QR-START-${Date.now().toString().slice(-4)}`,
      qrCodeEnd: `QR-END-${Date.now().toString().slice(-4)}`
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const startJobScan = (bookingId: string): boolean => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'In Progress', startedAt: now } : b
      )
    );
    return true;
  };

  const endJobScan = (bookingId: string): boolean => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'Completed', completedAt: now } : b
      )
    );
    return true;
  };

  const submitReview = (bookingId: string, _rating: number, _comment: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, hasCustomerRated: true } : b
      )
    );
  };

  const raiseDispute = (bookingId: string, reason: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'Disputed', disputeReason: reason } : b
      )
    );
  };

  const addGig = (gig: Gig) => {
    setGigs((prev) => [gig, ...prev]);
  };

  const toggleSaveGig = (gigId: string) => {
    setSavedGigIds((prev) =>
      prev.includes(gigId) ? prev.filter((id) => id !== gigId) : [...prev, gigId]
    );
  };

  const isGigSaved = (gigId: string) => savedGigIds.includes(gigId);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        gigs,
        savedGigIds,
        createBooking,
        updateBookingStatus,
        startJobScan,
        endJobScan,
        submitReview,
        raiseDispute,
        addGig,
        toggleSaveGig,
        isGigSaved,
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
