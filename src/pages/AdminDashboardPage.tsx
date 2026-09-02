import React, { useState } from 'react';
import { ShieldCheck, Users, Briefcase, Calendar, Wallet, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';
import { MOCK_ADMIN_STATS } from '../services/mockData';
import { Button } from '../components/common/Button';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState(MOCK_ADMIN_STATS);
  const [activeTab, setActiveTab] = useState<'verifications' | 'disputes' | 'coopFund'>('verifications');

  const [pendingVerifications, setPendingVerifications] = useState([
    { id: 'v-1', name: 'Ramesh Sawant', service: 'Plumbing', location: 'Kothrud, Pune', vouches: 8 },
    { id: 'v-2', name: 'Sujata Kulkarni', service: 'Home Tutoring', location: 'Deccan, Pune', vouches: 12 },
  ]);

  const [openDisputes, setOpenDisputes] = useState([
    { id: 'd-1', bookingId: 'bk-990', customer: 'Rohan Patil', provider: 'Santosh Kulkarni', reason: 'Plumber arrived 2 hours late and tap leak persisted.', amount: 350 },
  ]);

  const [cooperativeFundPercent, setCooperativeFundPercent] = useState(5.0);

  const handleApproveVerification = (id: string) => {
    setPendingVerifications((prev) => prev.filter((item) => item.id !== id));
    setStats((prev) => ({
      ...prev,
      pendingVerificationsCount: prev.pendingVerificationsCount - 1,
      totalProviders: prev.totalProviders + 1,
    }));
  };

  const handleResolveDispute = (id: string, action: 'refund' | 'payout') => {
    setOpenDisputes((prev) => prev.filter((item) => item.id !== id));
    setStats((prev) => ({
      ...prev,
      openDisputesCount: prev.openDisputesCount - 1,
    }));
    alert(`Dispute resolved with action: ${action === 'refund' ? 'Full Refund to Customer' : 'Payment Released to Provider'}`);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-civic-blue to-civic-blue-dark text-white p-6 rounded-card shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-civic-teal-100 uppercase tracking-wider block mb-1">
            Platform Operations & Governance
          </span>
          <h1 className="text-2xl font-extrabold">Cooperative Admin Portal</h1>
          <p className="text-xs text-civic-blue-100 mt-1">
            Monitor real-time metrics, verify community providers, resolve disputes & manage cooperative funds.
          </p>
        </div>
      </div>

      {/* Metrics Grid (PRD Section 48) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card">
          <div className="flex justify-between items-center text-xs text-civic-text-secondary">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-civic-blue" />
          </div>
          <div className="text-2xl font-extrabold text-civic-text-primary mt-2">
            {stats.totalUsers.toLocaleString()}
          </div>
          <span className="text-[11px] text-civic-text-muted mt-1 block">{stats.totalProviders} Verified Providers</span>
        </div>

        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card">
          <div className="flex justify-between items-center text-xs text-civic-text-secondary">
            <span>Active Gigs Published</span>
            <Briefcase className="w-4 h-4 text-civic-teal" />
          </div>
          <div className="text-2xl font-extrabold text-civic-text-primary mt-2">
            {stats.activeGigs}
          </div>
          <span className="text-[11px] text-civic-text-muted mt-1 block">{stats.bookingsToday} Bookings Today</span>
        </div>

        <div className="p-4 rounded-card bg-white border border-gray-200 shadow-card">
          <div className="flex justify-between items-center text-xs text-civic-text-secondary">
            <span>Platform Gross Revenue</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-2">
            ₹{stats.platformRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">5% Commission Retained</span>
        </div>

        <div className="p-4 rounded-card bg-civic-blue-50 border border-civic-blue-200 shadow-card">
          <div className="flex justify-between items-center text-xs text-civic-blue font-bold">
            <span>Cooperative Fund Balance</span>
            <ShieldCheck className="w-4 h-4 text-civic-blue" />
          </div>
          <div className="text-2xl font-extrabold text-civic-blue mt-2">
            ₹{stats.communityFundBalance.toLocaleString()}
          </div>
          <span className="text-[11px] text-civic-teal font-semibold mt-1 block">Neighborhood Grants Pool</span>
        </div>
      </div>

      {/* Admin Action Tabs */}
      <div className="bg-white rounded-card border border-gray-200 shadow-card p-5">
        <div className="flex gap-2 border-b border-gray-200 pb-3 mb-4">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'verifications'
                ? 'bg-civic-blue text-white shadow-2xs'
                : 'text-civic-text-secondary hover:bg-gray-100'
            }`}
          >
            Pending Verifications ({pendingVerifications.length})
          </button>

          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'disputes'
                ? 'bg-civic-blue text-white shadow-2xs'
                : 'text-civic-text-secondary hover:bg-gray-100'
            }`}
          >
            Open Disputes ({openDisputes.length})
          </button>

          <button
            onClick={() => setActiveTab('coopFund')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'coopFund'
                ? 'bg-civic-blue text-white shadow-2xs'
                : 'text-civic-text-secondary hover:bg-gray-100'
            }`}
          >
            Cooperative Fund Rules
          </button>
        </div>

        {/* Tab 1: Verifications */}
        {activeTab === 'verifications' && (
          <div className="flex flex-col gap-3">
            {pendingVerifications.length > 0 ? (
              pendingVerifications.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-sm text-civic-text-primary block">{item.name}</span>
                    <span className="text-civic-text-secondary">
                      Service: <strong>{item.service}</strong> • Location: {item.location} • Neighborhood Vouches: 🤝 <strong>{item.vouches}</strong>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={CheckCircle2}
                      onClick={() => handleApproveVerification(item.id)}
                    >
                      Approve Verified Badge
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-civic-text-muted">
                No pending provider verification requests.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Disputes */}
        {activeTab === 'disputes' && (
          <div className="flex flex-col gap-3">
            {openDisputes.length > 0 ? (
              openDisputes.map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-lg bg-red-50/60 border border-red-200 flex flex-col gap-3 text-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-sm text-red-900 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" /> Booking #{d.bookingId} Dispute
                      </span>
                      <span className="text-civic-text-secondary mt-0.5 block">
                        Customer: {d.customer} vs Provider: {d.provider} (Amount: ₹{d.amount})
                      </span>
                    </div>
                  </div>
                  <p className="p-2.5 rounded bg-white border border-red-100 text-civic-text-primary">
                    "{d.reason}"
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleResolveDispute(d.id, 'refund')}
                    >
                      Issue Full Refund
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleResolveDispute(d.id, 'payout')}
                    >
                      Release Escrow to Provider
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-civic-text-muted">
                No active disputes open.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Cooperative Fund */}
        {activeTab === 'coopFund' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 rounded-lg bg-civic-teal-50 border border-civic-teal-200">
              <h4 className="font-bold text-sm text-civic-teal mb-1 flex items-center gap-1.5">
                <Sliders className="w-4 h-4" /> Cooperative Community Split Configuration
              </h4>
              <p className="text-civic-text-secondary">
                Configurable platform economics split rule across customer payments.
              </p>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
              <label className="font-bold text-civic-text-primary">
                Cooperative Community Fund Contribution (%):
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="15"
                value={cooperativeFundPercent}
                onChange={(e) => setCooperativeFundPercent(Number(e.target.value))}
                className="p-2 rounded border border-gray-300 font-bold"
              />
              <span className="text-[11px] text-civic-text-muted">
                Current Split: Provider (90%) | Platform (5%) | Community Fund ({cooperativeFundPercent}%)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
