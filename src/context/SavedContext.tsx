import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedContextType {
  savedGigIds: string[];
  toggleSaveGig: (gigId: string) => void;
  isGigSaved: (gigId: string) => boolean;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedGigIds, setSavedGigIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('coop_saved_gigs');
    return saved ? JSON.parse(saved) : ['gig-1'];
  });

  useEffect(() => {
    localStorage.setItem('coop_saved_gigs', JSON.stringify(savedGigIds));
  }, [savedGigIds]);

  const toggleSaveGig = (gigId: string) => {
    setSavedGigIds((prev) =>
      prev.includes(gigId) ? prev.filter((id) => id !== gigId) : [...prev, gigId]
    );
  };

  const isGigSaved = (gigId: string) => savedGigIds.includes(gigId);

  return (
    <SavedContext.Provider value={{ savedGigIds, toggleSaveGig, isGigSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
};
