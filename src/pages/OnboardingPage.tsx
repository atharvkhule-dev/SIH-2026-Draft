import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Globe, Search, PlusCircle, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppMode } from '../context/AppModeContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { setMode } = useAppMode();

  const [location, setLocation] = useState(user?.location || 'Kothrud, Pune, Maharashtra');
  const [language, setLanguage] = useState(user?.language || 'English');
  const [selectedIntent, setSelectedIntent] = useState<'customer' | 'provider'>('customer');

  const handleFinish = () => {
    updateUser({ location, language });
    setMode(selectedIntent);
    navigate(selectedIntent === 'customer' ? '/home' : '/provider/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-civic-bg">
      <div className="w-full max-w-lg bg-white rounded-modal shadow-modal border border-gray-200 p-6 sm:p-8 flex flex-col gap-6">
        <div className="text-center">
          <span className="text-xs font-bold text-civic-teal uppercase tracking-wider block mb-1">
            Step 2 of 2 • Welcome Setup
          </span>
          <h2 className="text-2xl font-extrabold text-civic-text-primary">
            Hello, {user?.name || 'Friend'} 👋
          </h2>
          <p className="text-xs text-civic-text-secondary mt-1">
            Let's customize your local neighborhood preferences.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Your Neighborhood / Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            icon={MapPin}
            helperText="Used to show services within your immediate neighborhood radius"
          />

          <div>
            <label className="block text-sm font-semibold text-civic-text-primary mb-1.5 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-civic-blue" /> Preferred Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base rounded-input bg-white border border-gray-300 focus:border-civic-blue focus:ring-2 focus:ring-civic-blue focus:ring-opacity-20 text-civic-text-primary focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Marathi">Marathi (मराठी)</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
              <option value="Telugu">Telugu (తెలుగు)</option>
            </select>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <label className="block text-sm font-bold text-civic-text-primary mb-2">
              What would you like to do right now?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedIntent('customer')}
                className={`p-4 rounded-card border-2 flex flex-col items-start gap-2 text-left transition-all ${
                  selectedIntent === 'customer'
                    ? 'border-civic-blue bg-civic-blue-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-full bg-civic-blue text-white flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  {selectedIntent === 'customer' && <Check className="w-5 h-5 text-civic-blue font-bold" />}
                </div>
                <span className="font-bold text-base text-civic-text-primary">Find a Service</span>
                <span className="text-xs text-civic-text-secondary">
                  Browse and book trusted services nearby
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedIntent('provider')}
                className={`p-4 rounded-card border-2 flex flex-col items-start gap-2 text-left transition-all ${
                  selectedIntent === 'provider'
                    ? 'border-civic-teal bg-civic-teal-50/50 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-full bg-civic-teal text-white flex items-center justify-center">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  {selectedIntent === 'provider' && <Check className="w-5 h-5 text-civic-teal font-bold" />}
                </div>
                <span className="font-bold text-base text-civic-text-primary">Offer a Service</span>
                <span className="text-xs text-civic-text-secondary">
                  List your skills and earn extra income
                </span>
              </button>
            </div>
            <p className="text-[11px] text-civic-text-muted mt-2 text-center">
              💡 Note: You can switch between finding and offering services anytime from the top bar!
            </p>
          </div>

          <Button variant="primary" fullWidth onClick={handleFinish} className="mt-2">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};
