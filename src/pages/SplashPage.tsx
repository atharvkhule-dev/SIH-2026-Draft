import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-civic-blue text-white p-6 select-none animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 shadow-xl border border-white/20 animate-scale-up">
        <Shield className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
        Cooperative Gig Services
      </h1>
      <p className="text-sm font-medium text-civic-teal-100 mb-8">
        Trusted, Community-Driven Service Marketplace
      </p>
      <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
