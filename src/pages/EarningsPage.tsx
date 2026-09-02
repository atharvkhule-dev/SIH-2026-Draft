import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useNotifications } from '../context/NotificationContext';

export const EarningsPage: React.FC = () => {
  const { addNotification } = useNotifications();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawSuccess, setIsWithdrawSuccess] = useState(false);

  const totalEarningsThisMonth = 18450;
  const pendingEscrow = 1200;
  const availableToWithdraw = 17250;

  const payoutsList = [
    { id: 'pout-1', gigTitle: 'Doorstep Car Wash & Detailing', date: 'Yesterday', netPayout: 449, platformFee: 25, coopFee: 25 },
    { id: 'pout-2', gigTitle: '2BHK Deep Home & Kitchen Cleaning', date: 'Feb 24, 2025', netPayout: 629, platformFee: 35, coopFee: 35 },
    { id: 'pout-3', gigTitle: 'Class 9 Math Home Tutoring Session', date: 'Feb 20, 2025', netPayout: 720, platformFee: 40, coopFee: 40 },
    { id: 'pout-4', gigTitle: 'Emergency Plumbing Tap Repair', date: 'Feb 15, 2025', netPayout: 315, platformFee: 17.5, coopFee: 17.5 },
  ];

  const handleWithdraw = () => {
    setIsWithdrawSuccess(true);
    addNotification(
      'Withdrawal Initiated',
      `₹${availableToWithdraw.toLocaleString('en-IN')} has been sent to your registered UPI account.`,
      'payment',
      '/earnings'
    );
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-civic-text-primary">
            Earnings & Cooperative Payouts
          </h1>
          <p className="text-xs text-civic-text-secondary mt-0.5">
            Transparent breakdown of your net income, escrow status, and community fund contributions
          </p>
        </div>

        <Button
          variant="secondary"
          icon={ArrowUpRight}
          onClick={() => setIsWithdrawOpen(true)}
        >
          Withdraw Available Funds
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-card bg-gradient-to-br from-civic-teal to-civic-teal-dark text-white shadow-card flex flex-col justify-between">
          <span className="text-xs font-bold text-civic-teal-100 uppercase tracking-wider">
            Total Monthly Revenue
          </span>
          <div className="text-3xl font-extrabold mt-2">
            ₹{totalEarningsThisMonth.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-civic-teal-100 mt-2 block">Feb 2025 Payout Period</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <span className="text-xs font-bold text-civic-text-secondary uppercase tracking-wider">
            Available to Withdraw
          </span>
          <div className="text-3xl font-extrabold text-civic-teal mt-2">
            ₹{availableToWithdraw.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-2">Ready for instant UPI payout</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-gray-200 shadow-card flex flex-col justify-between">
          <span className="text-xs font-bold text-civic-text-secondary uppercase tracking-wider">
            Pending Escrow Hold
          </span>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">
            ₹{pendingEscrow.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-civic-text-muted mt-2">Releases upon QR job scan completion</span>
        </div>
      </div>

      {/* Community Fund Impact Banner */}
      <div className="p-5 rounded-card bg-civic-blue-50 border border-civic-blue-100 text-civic-blue flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-civic-blue" />
        <div>
          <h4 className="font-bold text-sm">Your Local Cooperative Impact</h4>
          <p className="text-xs text-civic-text-secondary mt-1">
            Through your 42 completed jobs this month, you have contributed <strong>₹922.50</strong> to the Local Pune Cooperative Emergency & Community Skill Fund.
          </p>
        </div>
      </div>

      {/* Recent Payouts Table / List */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card p-5">
        <h3 className="text-base font-bold text-civic-text-primary mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-civic-blue" /> Recent Job Payouts History
        </h3>

        <div className="flex flex-col gap-3">
          {payoutsList.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg border border-gray-100 bg-gray-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-sm text-civic-text-primary block">{item.gigTitle}</span>
                <span className="text-civic-text-muted">{item.date} • ID #{item.id}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="block text-gray-500 text-[11px]">Platform: ₹{item.platformFee} | Fund: ₹{item.coopFee}</span>
                  <span className="font-extrabold text-sm text-civic-teal">+₹{item.netPayout}</span>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                  Paid Out
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Modal */}
      <Modal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} title="Withdraw Available Funds">
        {!isWithdrawSuccess ? (
          <div className="flex flex-col gap-4 text-center">
            <p className="text-xs text-civic-text-secondary">
              Transfer <strong>₹{availableToWithdraw.toLocaleString('en-IN')}</strong> directly to your linked UPI VPA or bank account.
            </p>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs font-mono">
              Destination: aniket.sharma@okicici (Verified UPI)
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" fullWidth onClick={() => setIsWithdrawOpen(false)}>
                Cancel
              </Button>
              <Button variant="secondary" fullWidth onClick={handleWithdraw}>
                Confirm Payout
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-civic-text-primary">Payout Transferred!</h4>
            <p className="text-xs text-civic-text-secondary mb-4">
              ₹{availableToWithdraw.toLocaleString('en-IN')} has been sent to your bank account.
            </p>
            <Button variant="primary" fullWidth onClick={() => { setIsWithdrawOpen(false); setIsWithdrawSuccess(false); }}>
              Done
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
