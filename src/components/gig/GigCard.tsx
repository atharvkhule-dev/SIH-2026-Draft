import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Heart } from 'lucide-react';
import { Gig } from '../../types';
import { Rating } from '../common/Rating';
import { Badge } from '../common/Badge';
import { PriceDisplay } from '../common/PriceDisplay';
import { useBookings } from '../../context/BookingContext';

interface GigCardProps {
  gig: Gig;
}

export const GigCard: React.FC<GigCardProps> = ({ gig }) => {
  const { isGigSaved, toggleSaveGig } = useBookings();
  const saved = isGigSaved(gig.id);

  return (
    <div className="group bg-white rounded-card border border-gray-200 shadow-card hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image & Overlay Save Button */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
          <img
            src={gig.images[0]}
            alt={gig.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSaveGig(gig.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-red-500 shadow-xs transition-colors"
            aria-label="Save service"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-black/65 text-white backdrop-blur-xs">
              {gig.categoryName}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <Link to={`/gig/${gig.id}`}>
            <h3 className="font-semibold text-base text-civic-text-primary group-hover:text-civic-blue transition-colors line-clamp-2 leading-snug">
              {gig.title}
            </h3>
          </Link>

          {/* Rating & Distance */}
          <div className="flex items-center justify-between text-xs text-civic-text-secondary">
            <Rating value={gig.rating} count={gig.reviewCount} size="sm" />
            <div className="flex items-center gap-1 font-medium text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-civic-blue" />
              <span>{gig.distanceKm} km</span>
            </div>
          </div>

          {/* Provider snippet */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-100 mt-1">
            <img
              src={gig.providerAvatar}
              alt={gig.providerName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-civic-text-primary truncate">
              {gig.providerName}
            </span>
            {gig.isVerified && <Badge variant="verified" size="sm" />}
          </div>
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="px-4 pb-4 pt-2 flex items-center justify-between border-t border-gray-50 bg-gray-50/50">
        <div className="flex flex-col">
          <PriceDisplay amount={gig.price} size="sm" />
          <div className="flex items-center gap-1 text-[11px] text-civic-text-muted">
            <Clock className="w-3 h-3" />
            <span>~{gig.durationMinutes} mins</span>
          </div>
        </div>
        <Link
          to={`/gig/${gig.id}`}
          className="px-3 py-2 text-xs font-bold rounded-button bg-civic-blue text-white hover:bg-civic-blue-dark transition-colors shadow-2xs"
        >
          View Service
        </Link>
      </div>
    </div>
  );
};
