import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRoleIntent } from '../types';
import { INITIAL_USER } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string) => Promise<boolean>;
  signup: (name: string, phone: string, email: string, roleIntent: UserRoleIntent) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('coop_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('coop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('coop_user');
    }
  }, [user]);

  const login = async (_emailOrPhone: string): Promise<boolean> => {
    // Simulated auth API call
    setUser(INITIAL_USER);
    return true;
  };

  const signup = async (name: string, phone: string, email: string, roleIntent: UserRoleIntent): Promise<boolean> => {
    const newUser: User = {
      ...INITIAL_USER,
      id: `usr-${Date.now()}`,
      name,
      phone,
      email,
      roleIntent,
    };
    setUser(newUser);
    return true;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Standard mock OTP verification (any 4 or 6 digit code works for demo)
    return otp.length >= 4;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updated: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        verifyOtp,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
