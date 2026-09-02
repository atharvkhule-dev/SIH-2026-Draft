import { Gig, ServiceCategory } from '../../types';
import { MOCK_GIGS, MOCK_CATEGORIES } from '../mockData';

// Simulating asynchronous storage / backend fetch
let localGigs: Gig[] = (() => {
  const saved = localStorage.getItem('coop_gigs');
  return saved ? JSON.parse(saved) : MOCK_GIGS;
})();

const saveToStorage = () => {
  localStorage.setItem('coop_gigs', JSON.stringify(localGigs));
};

export const gigService = {
  async getGigs(): Promise<Gig[]> {
    return Promise.resolve([...localGigs]);
  },

  async getGigById(id: string): Promise<Gig | undefined> {
    const found = localGigs.find((g) => g.id === id);
    return Promise.resolve(found);
  },

  async getCategories(): Promise<ServiceCategory[]> {
    return Promise.resolve(MOCK_CATEGORIES);
  },

  async createGig(newGig: Gig): Promise<Gig> {
    localGigs = [newGig, ...localGigs];
    saveToStorage();
    return Promise.resolve(newGig);
  },
};
