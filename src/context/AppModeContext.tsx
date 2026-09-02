import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppMode } from '../types';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  isProviderMode: boolean;
  isCustomerMode: boolean;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<AppMode>(() => {
    const saved = localStorage.getItem('coop_app_mode');
    return (saved as AppMode) || 'customer';
  });

  useEffect(() => {
    localStorage.setItem('coop_app_mode', mode);
  }, [mode]);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'customer' ? 'provider' : 'customer'));
  };

  return (
    <AppModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isProviderMode: mode === 'provider',
        isCustomerMode: mode === 'customer',
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};
