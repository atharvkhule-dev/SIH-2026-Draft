import React, { createContext, useContext, useState, useEffect } from 'react';
import { Gig, ServiceCategory } from '../types';
import { gigService } from '../services/api/gigService';

interface GigContextType {
  gigs: Gig[];
  categories: ServiceCategory[];
  addGig: (gig: Gig) => Promise<Gig>;
  refreshGigs: () => Promise<void>;
}

const GigContext = createContext<GigContextType | undefined>(undefined);

export const GigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);

  const fetchInitialData = async () => {
    const loadedGigs = await gigService.getGigs();
    const loadedCats = await gigService.getCategories();
    setGigs(loadedGigs);
    setCategories(loadedCats);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const addGig = async (gig: Gig): Promise<Gig> => {
    const created = await gigService.createGig(gig);
    setGigs((prev) => [created, ...prev]);
    return created;
  };

  const refreshGigs = async () => {
    await fetchInitialData();
  };

  return (
    <GigContext.Provider value={{ gigs, categories, addGig, refreshGigs }}>
      {children}
    </GigContext.Provider>
  );
};

export const useGigs = () => {
  const context = useContext(GigContext);
  if (!context) {
    throw new Error('useGigs must be used within a GigProvider');
  }
  return context;
};
