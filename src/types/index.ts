export type UserRoleIntent = 'customer' | 'provider' | 'both';
export type AppMode = 'customer' | 'provider';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  language: string;
  roleIntent: UserRoleIntent;
  isProviderVerified: boolean;
  vouchCount: number;
  rating: number;
  jobsCompleted: number;
  joinedDate: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  group: 'Home Services' | 'Vehicle Services' | 'Moving & Logistics' | 'Personal Services' | 'Education' | 'Technology' | 'Creative' | 'Student / Part-Time';
  description: string;
}

export interface Gig {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  description: string;
  whatsIncluded: string[];
  price: number;
  durationMinutes: number;
  images: string[];
  providerId: string;
  providerName: string;
  providerAvatar: string;
  isVerified: boolean;
  vouchCount: number;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  location: string;
  serviceRadiusKm: number;
  availableDays: string[];
  createdAt: string;
}

export interface ProviderProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  isCommunityVerified: boolean;
  vouchCount: number;
  rating: number;
  jobsCompleted: number;
  completionRate: number; // e.g., 98%
  availableDays: string[];
  serviceRadiusKm: number;
  location: string;
  memberSince: string;
  reviews: Review[];
}

export type BookingStatus =
  | 'Requested'
  | 'Confirmed'
  | 'Upcoming'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Disputed';

export interface Booking {
  id: string;
  gigId: string;
  gigTitle: string;
  gigImage: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  date: string;
  timeSlot: string;
  serviceAddress: string;
  price: number;
  platformFee: number; // Platform share
  cooperativeFee: number; // Community fund contribution
  providerPayout: number; // Net earnings to provider
  status: BookingStatus;
  startedAt?: string;
  completedAt?: string;
  qrCodeStart?: string;
  qrCodeEnd?: string;
  hasCustomerRated?: boolean;
  hasProviderRated?: boolean;
  disputeReason?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  categoryScores?: {
    quality: number;
    professionalism: number;
    timeliness: number;
    value: number;
  };
}

export interface Message {
  id: string;
  bookingId?: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'verification' | 'review' | 'system';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface FairPriceEstimate {
  suggestedMin: number;
  suggestedMax: number;
  recommended: number;
  breakdown: {
    baseLabor: number;
    durationFactor: number;
    experienceMultiplier: number;
    locationBenchmark: number;
  };
}

export interface AdminStats {
  totalUsers: number;
  totalProviders: number;
  activeGigs: number;
  bookingsToday: number;
  platformRevenue: number;
  pendingVerificationsCount: number;
  openDisputesCount: number;
  communityFundBalance: number;
}
