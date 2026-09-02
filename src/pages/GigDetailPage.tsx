import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, Heart, MessageSquare, Check, ArrowLeft, Calendar, Share2, AlertCircle } from 'lucide-react';
import { useGigs } from '../context/GigContext';
import { useSaved } from '../context/SavedContext';
import { Rating } from '../components/common/Rating';
import { Badge } from '../components/common/Badge';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { Button } from '../components/common/Button';
import { MOCK_PROVIDERS } from '../services/mockData';

export const GigDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { gigs } = useGigs();
  const { isGigSaved, toggleSaveGig } = useSaved();

  const gig = gigs.find((g) => g.id === id) || gigs[0];
  const saved = isGigSaved(gig.id);
  const [selectedImg, setSelectedImg] = useState(gig.images[0]);

  const provider = MOCK_PROVIDERS.find((p) => p.id === gig.providerId) || {
    id: gig.providerId,
    name: gig.providerName,
    avatar: gig.providerAvatar,
    bio: 'Trusted local community service provider verified by neighborhood members.',
    skills: [gig.categoryName],
    isCommunityVerified: gig.isVerified,
    vouchCount: gig.vouchCount,
    rating: gig.rating,
    jobsCompleted: gig.reviewCount + 10,
    completionRate: 98,
    availableDays: gig.availableDays,
    serviceRadiusKm: gig.serviceRadiusKm,
    location: gig.location,
    memberSince: '2024',
    reviews: []
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-civic-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveGig(gig.id)}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-red-500 shadow-2xs transition-colors"
            title="Save Service"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText?.(window.location.href);
              alert('Service link copied to clipboard!');
            }}
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-civic-blue shadow-2xs transition-colors"
            title="Share Service"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="rounded-card overflow-hidden bg-gray-100 border border-gray-200 aspect-16/9 shadow-sm">
            <img
              src={selectedImg || gig.images[0]}
              alt={gig.title}
              className="w-full h-full object-cover"
            />
          </div>

          {gig.images.length > 1 && (
            <div className="flex gap-2">
              {gig.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImg === img ? 'border-civic-blue scale-102' : 'border-gray-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-civic-blue-50 text-civic-blue">
                {gig.categoryName}
              </span>
              {gig.isVerified && <Badge variant="verified" size="sm" />}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-civic-text-primary leading-tight">
              {gig.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-civic-text-secondary mt-2">
              <Rating value={gig.rating} count={gig.reviewCount} size="md" />
              <div className="flex items-center gap-1 font-medium">
                <MapPin className="w-4 h-4 text-civic-blue" />
                <span>{gig.location} ({gig.distanceKm} km away)</span>
              </div>
              <div className="flex items-center gap-1 font-medium">
                <Clock className="w-4 h-4 text-civic-blue" />
                <span>~{gig.durationMinutes} mins</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-card bg-white border border-gray-200 shadow-card">
            <h3 className="text-base font-bold text-civic-text-primary mb-2">
              Service Description
            </h3>
            <p className="text-sm text-civic-text-secondary leading-relaxed">
              {gig.description}
            </p>
          </div>

          <div className="p-5 rounded-card bg-white border border-gray-200 shadow-card">
            <h3 className="text-base font-bold text-civic-text-primary mb-3">
              What's Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {gig.whatsIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs font-medium text-civic-text-primary">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-card bg-white border border-gray-200 shadow-card flex flex-col gap-4">
            <h3 className="text-base font-bold text-civic-text-primary">
              About the Provider
            </h3>
            <div className="flex items-start gap-3">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-civic-blue-100 shadow-2xs"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-civic-text-primary">
                    {provider.name}
                  </h4>
                  {provider.isCommunityVerified && <Badge variant="verified" size="sm" />}
                </div>
                <p className="text-xs text-civic-text-secondary mt-1">{provider.bio}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-civic-text-secondary mt-2">
                  <span>⭐ <strong>{provider.rating}</strong> ({provider.reviews.length || 10}+ reviews)</span>
                  <span>🏆 <strong>{provider.jobsCompleted}</strong> jobs completed</span>
                  <span>🤝 <strong>{provider.vouchCount}</strong> community vouches</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <Link to="/messages" className="w-full">
                <Button variant="outline" size="sm" fullWidth icon={MessageSquare}>
                  Message Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white rounded-card border border-gray-200 shadow-md p-5 flex flex-col gap-4">
            <div>
              <span className="text-xs text-civic-text-secondary block">Total Service Price</span>
              <PriceDisplay amount={gig.price} durationMinutes={gig.durationMinutes} size="lg" />
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Escrow Protected: Payment held until job completion confirmation.</span>
            </div>

            <div className="text-xs text-civic-text-secondary flex flex-col gap-2 py-2 border-y border-gray-100">
              <div className="flex items-center justify-between">
                <span>Availability:</span>
                <span className="font-semibold text-civic-text-primary">{gig.availableDays.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Service Radius:</span>
                <span className="font-semibold text-civic-text-primary">Within {gig.serviceRadiusKm} km</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={Calendar}
              onClick={() => navigate(`/book/${gig.id}`)}
            >
              Book Service
            </Button>

            <button
              onClick={() => alert('Report submitted to admin for community safety review.')}
              className="text-xs text-civic-text-muted hover:text-red-600 text-center underline flex items-center justify-center gap-1 mt-1"
            >
              <AlertCircle className="w-3.5 h-3.5" /> Report Service Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
