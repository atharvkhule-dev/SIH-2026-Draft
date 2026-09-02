import React, { useState } from 'react';
import { Globe, Phone, Shield, Bell, HelpCircle, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [language, setLanguage] = useState(user?.language || 'English');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateUser({ phone, language });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-civic-text-primary">
          Settings & Preferences
        </h1>
        <p className="text-xs text-civic-text-secondary mt-0.5">
          Account details, language support, and security controls
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
        <h3 className="text-base font-bold text-civic-text-primary border-b border-gray-100 pb-2">
          Account & Contact
        </h3>

        <Input
          label="Mobile Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          icon={Phone}
        />

        <div>
          <label className="block text-sm font-semibold text-civic-text-primary mb-1.5 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-civic-blue" /> Preferred App Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full min-h-[44px] px-3.5 py-2.5 text-base rounded-input bg-white border border-gray-300 focus:border-civic-blue"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-civic-blue" />
            <div>
              <span className="block text-sm font-semibold text-civic-text-primary">
                Push & SMS Notifications
              </span>
              <span className="text-xs text-civic-text-secondary">
                Booking status updates & QR scan alerts
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={pushNotifs}
            onChange={(e) => setPushNotifs(e.target.checked)}
            className="w-5 h-5 accent-civic-blue cursor-pointer"
          />
        </div>

        <Button variant="primary" fullWidth onClick={handleSave}>
          {isSaved ? '✓ Saved Changes!' : 'Save Preferences'}
        </Button>
      </div>

      {/* Support & Legal */}
      <div className="bg-white p-6 rounded-card border border-gray-200 shadow-card flex flex-col gap-3 text-xs">
        <h3 className="text-base font-bold text-civic-text-primary border-b border-gray-100 pb-2">
          Support & Legal
        </h3>
        <button
          onClick={() => alert('Cooperative Help Center: Contact support@cooperativegig.org or call 1800-123-COOP')}
          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-left font-semibold text-civic-blue"
        >
          <HelpCircle className="w-4 h-4" /> Help Center & Dispute Resolution
        </button>
        <button
          onClick={() => alert('Platform Terms & Neighborhood Cooperative Operating Charter')}
          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded text-left text-gray-700"
        >
          <FileText className="w-4 h-4" /> Terms of Service & Privacy Policy
        </button>
        <div className="flex items-center gap-2 p-2 text-emerald-800 bg-emerald-50 rounded font-semibold">
          <Shield className="w-4 h-4" /> Local Cooperative Fund Governance Rule v1.0
        </div>
      </div>
    </div>
  );
};
