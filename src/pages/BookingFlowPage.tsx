import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useGigs } from '../context/GigContext';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const BookingFlowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { gigs } = useGigs();
  const { createBooking } = useBookings();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const gig = gigs.find((g) => g.id === id) || gigs[0];

  const [date, setDate] = useState('Tomorrow');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [address, setAddress] = useState(user?.location || 'Flat 302, Green Acres, Paud Road, Kothrud, Pune');
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  const datesList = ['Today', 'Tomorrow', 'Day After Tomorrow', 'Saturday', 'Sunday'];
  const slotsList = ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const platformFee = Math.round(gig.price * 0.05);
  const cooperativeFee = Math.round(gig.price * 0.05);
  const providerPayout = gig.price - platformFee - cooperativeFee;

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    const booking = await createBooking(gig, date, timeSlot, address);
    setIsProcessing(false);
    addNotification(
      'Booking Confirmed & Payment Held',
      `Your payment of ₹${gig.price} is safely held in escrow. Booking ID #${booking.id}.`,
      'booking',
      '/bookings'
    );
    setStep('confirmed');
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 text-civic-text-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-civic-text-primary">
            {step === 'confirmed' ? 'Booking Confirmed 🎉' : 'Complete Service Booking'}
          </h1>
          <p className="text-xs text-civic-text-secondary">
            {step === 'details'
              ? 'Select date, time slot, and delivery address'
              : step === 'payment'
              ? 'Review transparent fee breakdown & authorize escrow hold'
              : 'Your provider has been notified'}
          </p>
        </div>
      </div>

      {step !== 'confirmed' && (
        <div className="flex items-center gap-3 p-4 rounded-card bg-white border border-gray-200 shadow-card">
          <img
            src={gig.images[0]}
            alt={gig.title}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-bold text-sm text-civic-text-primary line-clamp-1">
              {gig.title}
            </h3>
            <p className="text-xs text-civic-text-secondary">
              Provider: <strong>{gig.providerName}</strong>
            </p>
            <PriceDisplay amount={gig.price} size="sm" className="mt-1" />
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-2 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-civic-blue" /> Select Date
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {datesList.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDate(d)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                    date === d
                      ? 'bg-civic-blue text-white border-civic-blue shadow-xs'
                      : 'bg-white text-civic-text-primary border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-civic-blue" /> Select Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {slotsList.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                    timeSlot === slot
                      ? 'bg-civic-blue text-white border-civic-blue shadow-xs'
                      : 'bg-white text-civic-text-primary border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Service Address / Location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            icon={MapPin}
          />

          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('payment')}>
            Proceed to Payment Review →
          </Button>
        </div>
      )}

      {step === 'payment' && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <h3 className="text-base font-bold text-civic-text-primary pb-2 border-b border-gray-100">
            Booking & Payment Summary
          </h3>

          <div className="text-xs text-civic-text-secondary flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <strong className="text-civic-text-primary">{date} at {timeSlot}</strong>
            </div>
            <div className="flex justify-between">
              <span>Address:</span>
              <strong className="text-civic-text-primary text-right">{address}</strong>
            </div>
          </div>

          <div className="p-4 rounded-card bg-civic-blue-50 border border-civic-blue-100 flex flex-col gap-2 text-xs">
            <div className="text-sm font-bold text-civic-blue mb-1">
              Transparent Price & Cooperative Split
            </div>
            <div className="flex justify-between text-civic-text-primary font-semibold">
              <span>Service Total:</span>
              <span>₹{gig.price}</span>
            </div>
            <div className="flex justify-between text-civic-teal font-bold pt-1 border-t border-civic-blue-200">
              <span>Provider Payout (90%):</span>
              <span>₹{providerPayout}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee (5%):</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="flex justify-between text-civic-teal font-bold">
              <span>Local Cooperative Community Fund (5%):</span>
              <span>+₹{cooperativeFee}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Escrow Protection: Payment of ₹{gig.price} will be held safely until you confirm QR completion.</span>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" fullWidth onClick={() => setStep('details')}>
              Back
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              isLoading={isProcessing}
              onClick={handleConfirmPayment}
            >
              Confirm Escrow Payment
            </Button>
          </div>
        </div>
      )}

      {step === 'confirmed' && (
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-card border border-gray-200 shadow-modal gap-4 animate-scale-up">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-civic-text-primary">
            Booking Placed Successfully!
          </h2>
          <p className="text-xs text-civic-text-secondary max-w-sm">
            Provider <strong>{gig.providerName}</strong> has received your request for <strong>{date} at {timeSlot}</strong>.
          </p>

          <div className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 text-left text-xs flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Service:</span>
              <strong className="text-civic-text-primary">{gig.title}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Escrow Payment Held:</span>
              <strong className="text-emerald-700">₹{gig.price}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Next Action:</span>
              <strong className="text-civic-blue">Scan QR upon provider arrival</strong>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <Button variant="primary" fullWidth onClick={() => navigate('/bookings')}>
              View My Bookings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
