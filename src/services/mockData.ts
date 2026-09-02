import { ServiceCategory, Gig, ProviderProfile, Booking, NotificationItem, AdminStats, User } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-101',
  name: 'Aniket Sharma',
  email: 'aniket.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  location: 'Kothrud, Pune, Maharashtra',
  language: 'English',
  roleIntent: 'both',
  isProviderVerified: true,
  vouchCount: 14,
  rating: 4.9,
  jobsCompleted: 38,
  joinedDate: 'Jan 2025'
};

export const MOCK_CATEGORIES: ServiceCategory[] = [
  // Home Services
  { id: 'cat-house-clean', name: 'House Cleaning', iconName: 'Sparkles', group: 'Home Services', description: 'Regular & deep home cleaning services' },
  { id: 'cat-deep-clean', name: 'Deep Cleaning', iconName: 'SprayCan', group: 'Home Services', description: 'Thorough sanitization & deep cleaning' },
  { id: 'cat-plumbing', name: 'Plumbing', iconName: 'Wrench', group: 'Home Services', description: 'Pipe repairs, leak fix, installation' },
  { id: 'cat-electrical', name: 'Electrical Work', iconName: 'Zap', group: 'Home Services', description: 'Wiring, light fitting & fuse repair' },
  { id: 'cat-painting', name: 'Home Painting', iconName: 'Paintbrush', group: 'Home Services', description: 'Wall touch-ups & full home painting' },
  { id: 'cat-furniture', name: 'Furniture Assembly', iconName: 'Hammer', group: 'Home Services', description: 'IKEA & custom furniture setup' },

  // Vehicle Services
  { id: 'cat-car-wash', name: 'Car Wash', iconName: 'Car', group: 'Vehicle Services', description: 'Foam wash & exterior cleaning at doorstep' },
  { id: 'cat-car-detail', name: 'Car Detailing', iconName: 'ShieldCheck', group: 'Vehicle Services', description: 'Interior polishing & ceramic coating' },
  { id: 'cat-bike-wash', name: 'Bike Wash', iconName: 'Bike', group: 'Vehicle Services', description: 'Doorstep bike pressure washing & oiling' },

  // Moving & Logistics
  { id: 'cat-house-shift', name: 'House Shifting', iconName: 'Truck', group: 'Moving & Logistics', description: 'Local packing, loading & shifting' },
  { id: 'cat-local-delivery', name: 'Local Delivery', iconName: 'Package', group: 'Moving & Logistics', description: 'Quick parcel pickup & delivery' },

  // Education
  { id: 'cat-tutoring', name: 'School Tutoring', iconName: 'BookOpen', group: 'Education', description: 'Math, Science & English home tuition' },
  { id: 'cat-coding', name: 'Coding Lessons', iconName: 'Code', group: 'Education', description: 'Python, Web Dev & Scratch for beginners' },

  // Tech & Creative
  { id: 'cat-laptop-setup', name: 'Laptop & Tech Help', iconName: 'Laptop', group: 'Technology', description: 'OS setup, wifi fix, printer config' },
  { id: 'cat-photo', name: 'Photography', iconName: 'Camera', group: 'Creative', description: 'Portraits, event photography & shoots' },
  { id: 'cat-event-help', name: 'Event Assistance', iconName: 'Users', group: 'Student / Part-Time', description: 'Part-time event staffing & management' },
];

export const MOCK_GIGS: Gig[] = [
  {
    id: 'gig-1',
    title: 'Eco-Friendly Exterior & Interior Doorstep Car Wash',
    categoryId: 'cat-car-wash',
    categoryName: 'Car Wash',
    description: 'Complete water-saving foam wash, tire dressing, dashboard vacuuming, and mirror glass shine right at your home parking lot.',
    whatsIncluded: [
      'High-pressure foam exterior wash',
      'Vacuuming of seats & floor mats',
      'Dashboard & console wiping',
      'Tire cleaning & gloss shine'
    ],
    price: 499,
    durationMinutes: 60,
    images: [
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'prv-1',
    providerName: 'Rahul Kumar',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 28,
    rating: 4.8,
    reviewCount: 126,
    distanceKm: 2.4,
    location: 'Kothrud, Pune',
    serviceRadiusKm: 8,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    createdAt: '2025-01-10'
  },
  {
    id: 'gig-2',
    title: '2BHK / 3BHK Deep Home & Kitchen Cleaning',
    categoryId: 'cat-deep-clean',
    categoryName: 'Deep Cleaning',
    description: 'Thorough chemical-free deep cleaning of kitchen grease, bathroom tiles, window tracks, and floor scrubbing by trained professionals.',
    whatsIncluded: [
      'Kitchen degreasing & chimney wipe',
      'Bathroom tile scrubbing & descaling',
      'Floor buffing & mop sanitization',
      'Dusting of fans, fixtures & cobwebs'
    ],
    price: 699,
    durationMinutes: 120,
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'prv-2',
    providerName: 'Priya Shinde',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 42,
    rating: 4.9,
    reviewCount: 94,
    distanceKm: 1.8,
    location: 'Erandwane, Pune',
    serviceRadiusKm: 10,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
    createdAt: '2025-01-15'
  },
  {
    id: 'gig-3',
    title: 'Class 8-10 Mathematics & Science Home Tutoring',
    categoryId: 'cat-tutoring',
    categoryName: 'School Tutoring',
    description: 'Experienced B.Sc tutor offering personalized conceptual guidance, homework support, and exam prep for CBSE & State Board students.',
    whatsIncluded: [
      '1-on-1 personalized teaching',
      'Weekly doubt-solving sessions',
      'Formula sheets & mock practice tests',
      'Progress updates for parents'
    ],
    price: 800,
    durationMinutes: 90,
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'prv-3',
    providerName: 'Amit Deshmukh',
    providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 19,
    rating: 4.7,
    reviewCount: 45,
    distanceKm: 3.1,
    location: 'Deccan Gymkhana, Pune',
    serviceRadiusKm: 6,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    createdAt: '2025-02-01'
  },
  {
    id: 'gig-4',
    title: 'Local House & Furniture Moving Assistance',
    categoryId: 'cat-house-shift',
    categoryName: 'House Shifting',
    description: 'Careful packing with bubble wrap, safe loading onto pickup vehicles, and unloading at your new apartment without damages.',
    whatsIncluded: [
      'Cardboard box & bubble wrapping',
      '2 helper loaders included',
      'Furniture dismantling & reassembly',
      'Local transport within 15 km'
    ],
    price: 1499,
    durationMinutes: 180,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'prv-4',
    providerName: 'Vikram Singh',
    providerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 35,
    rating: 4.85,
    reviewCount: 68,
    distanceKm: 4.2,
    location: 'Baner, Pune',
    serviceRadiusKm: 15,
    availableDays: ['Sat', 'Sun'],
    createdAt: '2025-01-20'
  },
  {
    id: 'gig-5',
    title: 'Emergency Plumbing Repair & Tap/Leak Installation',
    categoryId: 'cat-plumbing',
    categoryName: 'Plumbing',
    description: 'Quick repair for leaking taps, clogged drains, flush tank issues, and shower fitting replacement by certified local plumber.',
    whatsIncluded: [
      'Leakage diagnosis & sealing',
      'Tap, mixer & flush valve replacement',
      'Drain unblocking with wire tools',
      '30-day service warranty'
    ],
    price: 350,
    durationMinutes: 45,
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'prv-5',
    providerName: 'Santosh Kulkarni',
    providerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 15,
    rating: 4.6,
    reviewCount: 52,
    distanceKm: 1.2,
    location: 'Kothrud, Pune',
    serviceRadiusKm: 5,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    createdAt: '2025-02-05'
  },
  {
    id: 'gig-6',
    title: 'Laptop Windows/Mac Troubleshooting & Software Setup',
    categoryId: 'cat-laptop-setup',
    categoryName: 'Laptop & Tech Help',
    description: 'In-person tech help for slow laptops, virus cleanup, SSD upgrade advice, printer connection, and MS Office setup.',
    whatsIncluded: [
      'System speed optimization & junk removal',
      'Antivirus & software setup',
      'Wifi router & printer configuration',
      'Data backup guidance'
    ],
    price: 500,
    durationMinutes: 60,
    images: [
      'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&q=80&w=600'
    ],
    providerId: 'usr-101', // Current user is also a provider!
    providerName: 'Aniket Sharma',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    isVerified: true,
    vouchCount: 14,
    rating: 4.9,
    reviewCount: 38,
    distanceKm: 0.5,
    location: 'Kothrud, Pune',
    serviceRadiusKm: 8,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    createdAt: '2025-02-10'
  }
];

export const MOCK_PROVIDERS: ProviderProfile[] = [
  {
    id: 'prv-1',
    name: 'Rahul Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    bio: 'Experienced doorstep vehicle specialist with 4+ years of passion in eco-friendly waterless and foam detailing.',
    skills: ['Doorstep Car Wash', 'Interior Foam Scrub', 'Ceramic Coating', 'Bike Polishing'],
    isCommunityVerified: true,
    vouchCount: 28,
    rating: 4.8,
    jobsCompleted: 87,
    completionRate: 98,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    serviceRadiusKm: 8,
    location: 'Kothrud, Pune',
    memberSince: 'Oct 2024',
    reviews: [
      {
        id: 'rev-1',
        bookingId: 'bk-901',
        reviewerName: 'Sanjay Mehta',
        reviewerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100',
        rating: 5,
        comment: 'Rahul arrived exactly on time with all his high-pressure equipment. Car shines like brand new!',
        date: '2025-02-20',
        categoryScores: { quality: 5, professionalism: 5, timeliness: 5, value: 5 }
      },
      {
        id: 'rev-2',
        bookingId: 'bk-902',
        reviewerName: 'Neha Joshi',
        reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        rating: 4.5,
        comment: 'Very polite behavior and honest pricing. Will definitely rebook monthly.',
        date: '2025-02-14',
        categoryScores: { quality: 5, professionalism: 4, timeliness: 4.5, value: 4.5 }
      }
    ]
  },
  {
    id: 'prv-2',
    name: 'Priya Shinde',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    bio: 'Leader of women cooperative cleaning team. We bring sanitized tools and biodegradable solutions.',
    skills: ['Deep Home Cleaning', 'Kitchen Degreasing', 'Bathroom Descaling', 'Home Organization'],
    isCommunityVerified: true,
    vouchCount: 42,
    rating: 4.9,
    jobsCompleted: 112,
    completionRate: 99,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat', 'Sun'],
    serviceRadiusKm: 10,
    location: 'Erandwane, Pune',
    memberSince: 'Aug 2024',
    reviews: [
      {
        id: 'rev-3',
        bookingId: 'bk-903',
        reviewerName: 'Rohan Patil',
        reviewerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
        rating: 5,
        comment: 'Priya and her team worked tirelessly for 2.5 hours. Kitchen grease is completely gone.',
        date: '2025-02-18',
        categoryScores: { quality: 5, professionalism: 5, timeliness: 5, value: 5 }
      }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    gigId: 'gig-1',
    gigTitle: 'Eco-Friendly Exterior & Interior Doorstep Car Wash',
    gigImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=600',
    customerId: 'usr-101',
    customerName: 'Aniket Sharma',
    customerPhone: '+91 98765 43210',
    providerId: 'prv-1',
    providerName: 'Rahul Kumar',
    providerPhone: '+91 91234 56789',
    date: 'Tomorrow',
    timeSlot: '10:30 AM',
    serviceAddress: 'Flat 302, Green Acres, Paud Road, Kothrud, Pune',
    price: 499,
    platformFee: 25,
    cooperativeFee: 25,
    providerPayout: 449,
    status: 'Upcoming',
    startedAt: undefined,
    completedAt: undefined,
    qrCodeStart: 'QR-START-BK101-7781',
    qrCodeEnd: 'QR-END-BK101-7782'
  },
  {
    id: 'bk-102',
    gigId: 'gig-2',
    gigTitle: '2BHK / 3BHK Deep Home & Kitchen Cleaning',
    gigImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
    customerId: 'usr-101',
    customerName: 'Aniket Sharma',
    customerPhone: '+91 98765 43210',
    providerId: 'prv-2',
    providerName: 'Priya Shinde',
    providerPhone: '+91 98111 22233',
    date: 'Yesterday',
    timeSlot: '02:00 PM',
    serviceAddress: 'Flat 302, Green Acres, Paud Road, Kothrud, Pune',
    price: 699,
    platformFee: 35,
    cooperativeFee: 35,
    providerPayout: 629,
    status: 'Completed',
    startedAt: '14:02 PM',
    completedAt: '16:15 PM',
    hasCustomerRated: true,
    hasProviderRated: true
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-101',
    title: 'Booking Confirmed!',
    message: 'Rahul Kumar accepted your doorstep Car Wash for Tomorrow at 10:30 AM.',
    type: 'booking',
    timestamp: '10 mins ago',
    isRead: false,
    link: '/bookings'
  },
  {
    id: 'notif-2',
    userId: 'usr-101',
    title: 'Cooperative Fund Contribution',
    message: '₹35 from your completed Home Cleaning was safely added to the Local Pune Cooperative Fund.',
    type: 'payment',
    timestamp: 'Yesterday',
    isRead: true,
    link: '/earnings'
  },
  {
    id: 'notif-3',
    userId: 'usr-101',
    title: 'Community Vouch Badge',
    message: 'You received 2 new community vouches from local neighborhood members!',
    type: 'verification',
    timestamp: '3 days ago',
    isRead: true,
    link: '/profile'
  }
];

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 1420,
  totalProviders: 310,
  activeGigs: 485,
  bookingsToday: 64,
  platformRevenue: 124500,
  pendingVerificationsCount: 8,
  openDisputesCount: 2,
  communityFundBalance: 48920
};
