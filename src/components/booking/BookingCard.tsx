import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, QrCode, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Booking } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { PriceDisplay } from '../common/PriceDisplay';
import { Button } from '../common/Button';
import { QRVerificationModal } from './QRVerificationModal';
import { Modal } from '../common/Modal';
import { useBookings } from '../../context/BookingContext';

interface BookingCardProps {
  booking: Booking;
  isProviderView?: boolean;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isProviderView = false,
}) => {
  const navigate = useNavigate();
  const { raiseDispute, submitReview } = useBookings();
  const [activeQrModal, setActiveQrModal] = useState<'start' | 'end' | null>(null);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleDisputeSubmit = () => {
    if (!disputeReason.trim()) return;
    raiseDispute(booking.id, disputeReason);
    setIsDisputeOpen(false);
  };

  const handleReviewSubmit = () => {
    submitReview(booking.id, ratingVal, reviewComment);
    setIsRatingOpen(false);
  };

  return (
    <div className="bg-white rounded-card border border-gray-200 shadow-card p-5 flex flex-col gap-4">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={booking.gigImage}
            alt={booking.gigTitle}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <span className="text-xs font-semibold text-civic-text-muted">
              Booking #{booking.id}
            </span>
            <h4 className="font-bold text-base text-civic-text-primary line-clamp-1">
              {booking.gigTitle}
            </h4>
            <div className="text-xs text-civic-text-secondary mt-0.5">
              {isProviderView ? (
                <span>Customer: <strong className="text-civic-text-primary">{booking.customerName}</strong> ({booking.customerPhone})</span>
              ) : (
                <span>Provider: <strong className="text-civic-text-primary">{booking.providerName}</strong></span>
              )}
            </div>
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-civic-text-secondary bg-gray-50/70 p-3 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-civic-blue shrink-0" />
          <span>Scheduled: <strong>{booking.date}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-civic-blue shrink-0" />
          <span>Time: <strong>{booking.timeSlot}</strong></span>
        </div>
        <div className="flex items-start gap-2 sm:col-span-2">
          <MapPin className="w-4 h-4 text-civic-blue shrink-0 mt-0.5" />
          <span className="line-clamp-2">{booking.serviceAddress}</span>
        </div>
      </div>

      {/* Transparent Cooperative Payment Breakdown */}
      <div className="p-3 rounded-lg bg-civic-blue-50/50 border border-civic-blue-100 text-xs">
        <div className="flex justify-between items-center font-bold text-civic-text-primary mb-1">
          <span>Total Price Paid:</span>
          <PriceDisplay amount={booking.price} size="sm" />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-civic-blue-100 text-[11px] text-civic-text-secondary">
          <div>
            <span className="block text-gray-500">Provider Net:</span>
            <span className="font-bold text-civic-teal">₹{booking.providerPayout}</span>
          </div>
          <div>
            <span className="block text-gray-500">Platform Fee:</span>
            <span className="font-semibold text-gray-700">₹{booking.platformFee}</span>
          </div>
          <div>
            <span className="block text-civic-teal font-semibold">Community Fund:</span>
            <span className="font-bold text-civic-teal">₹{booking.cooperativeFee}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons depending on Booking Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
        {(booking.status === 'Confirmed' || booking.status === 'Upcoming') && (
          <Button
            variant="primary"
            size="sm"
            icon={QrCode}
            onClick={() => setActiveQrModal('start')}
          >
            Start Job (Scan QR)
          </Button>
        )}

        {booking.status === 'In Progress' && (
          <Button
            variant="secondary"
            size="sm"
            icon={QrCode}
            onClick={() => setActiveQrModal('end')}
          >
            Complete Job (Scan QR)
          </Button>
        )}

        {booking.status === 'Completed' && (
          <div className="flex flex-wrap items-center gap-2 w-full justify-between">
            <div className="flex gap-2">
              {!booking.hasCustomerRated && !isProviderView && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={CheckCircle2}
                  onClick={() => setIsRatingOpen(true)}
                >
                  Rate & Review
                </Button>
              )}
              {!isProviderView && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={RotateCcw}
                  onClick={() => navigate(`/gig/${booking.gigId}`)}
                >
                  Rebook Service
                </Button>
              )}
            </div>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              ✓ Escrow Released
            </span>
          </div>
        )}

        {/* Dispute Button */}
        {booking.status !== 'Completed' && booking.status !== 'Cancelled' && booking.status !== 'Disputed' && (
          <button
            onClick={() => setIsDisputeOpen(true)}
            className="text-xs text-red-600 hover:text-red-800 font-semibold underline flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Raise Dispute
          </button>
        )}
      </div>

      {/* QR Code Modal */}
      {activeQrModal && (
        <QRVerificationModal
          isOpen={!!activeQrModal}
          onClose={() => setActiveQrModal(null)}
          booking={booking}
          type={activeQrModal}
        />
      )}

      {/* Dispute Modal */}
      <Modal isOpen={isDisputeOpen} onClose={() => setIsDisputeOpen(false)} title="Raise a Booking Dispute">
        <div className="flex flex-col gap-4">
          <p className="text-xs text-civic-text-secondary">
            Payments are held securely in escrow. Submitting a dispute will pause payout until admin review.
          </p>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-civic-text-primary">Reason for Dispute</label>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={3}
              placeholder="e.g. Provider did not show up, incomplete service delivered..."
              className="w-full p-3 text-sm rounded-input border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" fullWidth onClick={() => setIsDisputeOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" fullWidth onClick={handleDisputeSubmit}>
              Submit Dispute
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rating Modal */}
      <Modal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} title="Rate & Review Service">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs text-civic-text-secondary">
            How was your service with {booking.providerName}?
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatingVal(star)}
                className={`text-2xl p-1 transition-transform ${ratingVal >= star ? 'scale-110 text-amber-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            rows={3}
            placeholder="Write a brief review to help your local community..."
            className="w-full p-3 text-sm rounded-input border border-gray-300 focus:ring-2 focus:ring-civic-blue focus:outline-none"
          />
          <Button variant="primary" fullWidth onClick={handleReviewSubmit}>
            Submit Feedback
          </Button>
        </div>
      </Modal>
    </div>
  );
};
