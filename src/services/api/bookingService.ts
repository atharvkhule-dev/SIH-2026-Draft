import { Booking, BookingStatus, Gig } from '../../types';
import { MOCK_BOOKINGS } from '../mockData';

let localBookings: Booking[] = (() => {
  const saved = localStorage.getItem('coop_bookings');
  return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
})();

const saveToStorage = () => {
  localStorage.setItem('coop_bookings', JSON.stringify(localBookings));
};

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    return Promise.resolve([...localBookings]);
  },

  async getBookingById(id: string): Promise<Booking | undefined> {
    const found = localBookings.find((b) => b.id === id);
    return Promise.resolve(found);
  },

  async createBooking(gig: Gig, date: string, timeSlot: string, address: string): Promise<Booking> {
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
      qrCodeEnd: `QR-END-${Date.now().toString().slice(-4)}`,
    };

    localBookings = [newBooking, ...localBookings];
    saveToStorage();
    return Promise.resolve(newBooking);
  },

  async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<boolean> {
    localBookings = localBookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
    saveToStorage();
    return Promise.resolve(true);
  },

  async startJobScan(bookingId: string): Promise<boolean> {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    localBookings = localBookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'In Progress', startedAt: now } : b
    );
    saveToStorage();
    return Promise.resolve(true);
  },

  async endJobScan(bookingId: string): Promise<boolean> {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    localBookings = localBookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'Completed', completedAt: now } : b
    );
    saveToStorage();
    return Promise.resolve(true);
  },
};
