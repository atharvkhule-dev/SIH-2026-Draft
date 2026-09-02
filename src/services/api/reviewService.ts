import { Review } from '../../types';

let localReviews: Review[] = [
  {
    id: 'rev-1',
    bookingId: 'bk-901',
    reviewerName: 'Sanjay Mehta',
    reviewerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100',
    rating: 5,
    comment: 'Rahul arrived exactly on time with all his high-pressure equipment. Car shines like brand new!',
    date: '2025-02-20',
    categoryScores: { quality: 5, professionalism: 5, timeliness: 5, value: 5 },
  },
];

export const reviewService = {
  async getReviewsForBooking(bookingId: string): Promise<Review[]> {
    return Promise.resolve(localReviews.filter((r) => r.bookingId === bookingId));
  },

  async submitReview(bookingId: string, rating: number, comment: string): Promise<Review> {
    const newReview: Review = {
      id: `rev-${Date.now().toString().slice(-4)}`,
      bookingId,
      reviewerName: 'Aniket Sharma',
      reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    localReviews = [newReview, ...localReviews];
    return Promise.resolve(newReview);
  },
};
