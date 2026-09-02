import React, { useState } from 'react';
import { QrCode, CheckCircle2, ShieldCheck, Camera, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Booking } from '../../types';
import { useBookings } from '../../context/BookingContext';
import { useNotifications } from '../../context/NotificationContext';

interface QRVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  type: 'start' | 'end';
}

export const QRVerificationModal: React.FC<QRVerificationModalProps> = ({
  isOpen,
  onClose,
  booking,
  type,
}) => {
  const { startJobScan, endJobScan } = useBookings();
  const { addNotification } = useNotifications();
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      if (type === 'start') {
        startJobScan(booking.id);
        addNotification(
          'Service Started!',
          `QR Verification verified! Service started for Booking #${booking.id}.`,
          'booking',
          '/bookings'
        );
      } else {
        endJobScan(booking.id);
        addNotification(
          'Service Completed & Escrow Released!',
          `Job finished! Payment of ₹${booking.providerPayout} released to provider and ₹${booking.cooperativeFee} added to Local Cooperative Fund.`,
          'payment',
          '/earnings'
        );
      }
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsScanning(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={type === 'start' ? 'Scan QR to Start Service' : 'Scan QR to Complete Service'}
      maxWidth="sm"
    >
      <div className="flex flex-col items-center text-center p-2">
        {!isSuccess ? (
          <>
            <p className="text-xs text-civic-text-secondary mb-4">
              {type === 'start'
                ? 'Provider & Customer must both verify arrival. Present this QR code to scan.'
                : 'Service completed! Present QR code to release held escrow payment.'}
            </p>

            {/* QR Visual Card */}
            <div className="relative p-5 bg-white border-2 border-dashed border-civic-blue rounded-card shadow-sm flex flex-col items-center mb-6 w-full max-w-[240px]">
              <div className="w-44 h-44 bg-gray-900 rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Simulated QR Code SVG matrix */}
                <QrCode className="w-full h-full text-white" />
                {isScanning && (
                  <div className="absolute inset-0 bg-civic-teal/20 backdrop-blur-xs flex items-center justify-center animate-pulse">
                    <div className="w-full h-1 bg-civic-teal shadow-lg shadow-civic-teal animate-bounce" />
                  </div>
                )}
              </div>
              <span className="text-[11px] font-mono font-bold text-civic-text-secondary mt-3 uppercase tracking-wider">
                {type === 'start' ? booking.qrCodeStart : booking.qrCodeEnd}
              </span>
            </div>

            <div className="w-full flex flex-col gap-2">
              <Button
                variant={type === 'start' ? 'primary' : 'secondary'}
                fullWidth
                icon={Camera}
                isLoading={isScanning}
                onClick={handleSimulateScan}
              >
                {type === 'start' ? 'Simulate Scan to Start Job' : 'Simulate Scan to Finish Job'}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center p-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-civic-text-primary mb-1">
              {type === 'start' ? 'Job Successfully Started!' : 'Job Completed & Funds Transferred!'}
            </h4>
            <p className="text-sm text-civic-text-secondary mb-4">
              {type === 'start'
                ? `Booking #${booking.id} is now In Progress.`
                : `Payment of ₹${booking.price} released. Provider payout: ₹${booking.providerPayout}. Community Fund: ₹${booking.cooperativeFee}.`}
            </p>

            <div className="w-full p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium mb-6 flex items-center gap-2 text-left">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Verified on platform ledger with timestamped GPS verification.
              </span>
            </div>

            <Button variant="primary" fullWidth onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
