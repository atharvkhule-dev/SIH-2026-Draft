import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Check, Plus, Trash2 } from 'lucide-react';
import { MOCK_CATEGORIES } from '../services/mockData';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { FairPriceWidget } from '../components/provider/FairPriceWidget';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Gig } from '../types';

export const CreateGigPage: React.FC = () => {
  const navigate = useNavigate();
  const { addGig } = useBookings();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([
    'Doorstep service delivery',
    'Professional tools & equipment included'
  ]);
  const [price, setPrice] = useState<number>(499);
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600'
  );
  const [availableDays, setAvailableDays] = useState<string[]>(['Mon', 'Wed', 'Fri', 'Sat']);
  const [serviceRadiusKm, setServiceRadiusKm] = useState<number>(8);

  const selectedCategoryObj = MOCK_CATEGORIES.find((c) => c.id === categoryId) || MOCK_CATEGORIES[0];

  const handleAddIncluded = () => {
    if (includedInput.trim()) {
      setWhatsIncluded([...whatsIncluded, includedInput.trim()]);
      setIncludedInput('');
    }
  };

  const handleRemoveIncluded = (idx: number) => {
    setWhatsIncluded(whatsIncluded.filter((_, i) => i !== idx));
  };

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handlePublish = () => {
    const newGig: Gig = {
      id: `gig-${Date.now()}`,
      title: title.trim() || `${selectedCategoryObj.name} Service by ${user?.name}`,
      categoryId,
      categoryName: selectedCategoryObj.name,
      description: description.trim() || 'Professional, reliable doorstep service in your neighborhood.',
      whatsIncluded,
      price,
      durationMinutes,
      images: [imageUrl],
      providerId: user?.id || 'usr-101',
      providerName: user?.name || 'Aniket Sharma',
      providerAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      isVerified: true,
      vouchCount: user?.vouchCount || 14,
      rating: 5.0,
      reviewCount: 0,
      distanceKm: 0.5,
      location: user?.location || 'Kothrud, Pune',
      serviceRadiusKm,
      availableDays,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addGig(newGig);
    addNotification(
      'Service Published Live!',
      `Your service "${newGig.title}" is now active and visible to local customers.`,
      'system',
      `/gig/${newGig.id}`
    );
    navigate(`/gig/${newGig.id}`);
  };

  const daysOptions = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-civic-text-secondary" />
          </button>
          <div>
            <span className="text-xs font-bold text-civic-teal uppercase">Step {step} of 4</span>
            <h1 className="text-xl font-extrabold text-civic-text-primary">
              Offer a New Service
            </h1>
          </div>
        </div>
      </div>

      {/* Wizard Step 1: Category & Basic Details */}
      {step === 1 && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-2">
              Select Service Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base rounded-input bg-white border border-gray-300 focus:border-civic-blue focus:ring-2 focus:ring-civic-blue focus:outline-none"
            >
              {MOCK_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.group} → {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Service Title"
            placeholder="e.g. Professional 2BHK Doorstep Deep Cleaning"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-1.5">
              Service Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what makes your service reliable, tools used, experience..."
              className="w-full p-3 text-sm rounded-input border border-gray-300 focus:border-civic-blue focus:ring-2 focus:ring-civic-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-1.5">
              Image URL (Photo)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-input border border-gray-300 focus:border-civic-blue"
            />
          </div>

          <Button variant="primary" fullWidth onClick={() => setStep(2)}>
            Next: Pricing & Duration →
          </Button>
        </div>
      )}

      {/* Wizard Step 2: Pricing & FairPrice AI */}
      {step === 2 && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <h3 className="text-base font-bold text-civic-text-primary pb-2 border-b border-gray-100">
            Set Your Service Price & Duration
          </h3>

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-1">
              Estimated Duration (Minutes)
            </label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-base rounded-input bg-white border border-gray-300"
            >
              <option value={30}>30 Minutes (~0.5 hr)</option>
              <option value={60}>60 Minutes (~1.0 hr)</option>
              <option value={90}>90 Minutes (~1.5 hrs)</option>
              <option value={120}>120 Minutes (~2.0 hrs)</option>
              <option value={180}>180 Minutes (~3.0 hrs)</option>
            </select>
          </div>

          {/* FairPrice AI Recommendation Widget */}
          <FairPriceWidget
            categoryName={selectedCategoryObj.name}
            durationMinutes={durationMinutes}
            currentPrice={price}
            onApplyRecommendedPrice={(recPrice) => setPrice(recPrice)}
          />

          <div>
            <Input
              label="Your Set Price (₹ INR)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              helperText="You retain full control over your final published price"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" fullWidth onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" fullWidth onClick={() => setStep(3)}>
              Next: Included Checklist →
            </Button>
          </div>
        </div>
      )}

      {/* Wizard Step 3: What's Included & Schedule */}
      {step === 3 && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <h3 className="text-base font-bold text-civic-text-primary pb-2 border-b border-gray-100">
            What's Included & Availability
          </h3>

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-1.5">
              Add Included Deliverables
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={includedInput}
                onChange={(e) => setIncludedInput(e.target.value)}
                placeholder="e.g. High-pressure foam wash included"
                className="flex-1 min-h-[44px] px-3.5 text-sm rounded-input border border-gray-300"
              />
              <Button variant="secondary" icon={Plus} onClick={handleAddIncluded}>
                Add
              </Button>
            </div>
            <div className="flex flex-col gap-1.5">
              {whatsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-gray-50 text-xs border border-gray-200">
                  <span>✓ {item}</span>
                  <button onClick={() => handleRemoveIncluded(idx)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-civic-text-primary mb-2">
              Available Days
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOptions.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDay(d)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    availableDays.includes(d)
                      ? 'bg-civic-teal text-white border-civic-teal'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-civic-text-primary">
                Service Radius (Kilometers)
              </label>
              <span className="text-xs font-bold text-civic-blue">{serviceRadiusKm} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={serviceRadiusKm}
              onChange={(e) => setServiceRadiusKm(Number(e.target.value))}
              className="w-full accent-civic-blue"
            />
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" fullWidth onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="primary" fullWidth onClick={() => setStep(4)}>
              Review & Publish →
            </Button>
          </div>
        </div>
      )}

      {/* Wizard Step 4: Final Review */}
      {step === 4 && (
        <div className="flex flex-col gap-5 bg-white p-6 rounded-card border border-gray-200 shadow-card">
          <h3 className="text-lg font-extrabold text-civic-text-primary">
            Review & Publish Your Service Listing
          </h3>

          <div className="p-4 rounded-card bg-gray-50 border border-gray-200 text-xs flex flex-col gap-2">
            <div>Category: <strong>{selectedCategoryObj.name}</strong></div>
            <div>Title: <strong>{title || `${selectedCategoryObj.name} Service`}</strong></div>
            <div>Price: <strong>₹{price}</strong> per {durationMinutes} mins</div>
            <div>Availability: <strong>{availableDays.join(', ')}</strong></div>
            <div>Radius: <strong>Within {serviceRadiusKm} km</strong></div>
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" fullWidth onClick={() => setStep(3)}>
              Back
            </Button>
            <Button variant="secondary" size="lg" fullWidth icon={Sparkles} onClick={handlePublish}>
              Publish Service Live
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
