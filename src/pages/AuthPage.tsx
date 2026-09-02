import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, verifyOtp } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [phoneOrEmail, setPhoneOrEmail] = useState('9876543210');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [roleIntent, setRoleIntent] = useState<'customer' | 'provider' | 'both'>('both');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      setErrorMsg('Please enter your mobile number or email address.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode('otp');
    }, 600);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      setErrorMsg('Please enter your mobile number.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMode('otp');
    }, 600);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg('Please enter the 4-digit code sent to your phone (e.g. 1234).');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    const valid = await verifyOtp(otp);
    setIsLoading(false);
    if (valid) {
      if (mode === 'signup') {
        await signup(name, phoneOrEmail, `${name.toLowerCase()}@example.com`, roleIntent);
        navigate('/onboarding');
      } else {
        await login(phoneOrEmail);
        navigate('/home');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-civic-bg">
      <div className="w-full max-w-md bg-white rounded-modal shadow-modal border border-gray-200 p-6 sm:p-8 flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-civic-blue text-white flex items-center justify-center shadow-xs">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-civic-text-primary">
            {mode === 'otp' ? 'Enter Verification Code' : mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-civic-text-secondary">
            {mode === 'otp'
              ? `We sent a 4-digit SMS OTP code to ${phoneOrEmail}`
              : mode === 'login'
              ? 'Sign in with your mobile number to access your account'
              : 'Join your local cooperative service marketplace'}
          </p>
        </div>

        {/* Forms */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <Input
              label="Mobile Number or Email"
              placeholder="e.g. 9876543210"
              icon={Phone}
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              errorMessage={errorMsg}
            />
            <Button variant="primary" fullWidth isLoading={isLoading} type="submit">
              Continue with OTP
            </Button>
            <div className="text-center pt-2 border-t border-gray-100">
              <span className="text-xs text-civic-text-secondary">Don't have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg('');
                }}
                className="text-xs font-bold text-civic-blue hover:underline"
              >
                Sign Up Now
              </button>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Rahul Kumar"
              icon={UserIcon}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Mobile Number"
              placeholder="e.g. 9876543210"
              icon={Phone}
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              errorMessage={errorMsg}
            />

            <div>
              <label className="block text-xs font-semibold text-civic-text-primary mb-1.5">
                What would you primarily like to do?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRoleIntent('customer')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                    roleIntent === 'customer'
                      ? 'bg-civic-blue text-white border-civic-blue shadow-xs'
                      : 'bg-white text-civic-text-primary border-gray-300'
                  }`}
                >
                  Find Services
                </button>
                <button
                  type="button"
                  onClick={() => setRoleIntent('provider')}
                  className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                    roleIntent === 'provider'
                      ? 'bg-civic-teal text-white border-civic-teal shadow-xs'
                      : 'bg-white text-civic-text-primary border-gray-300'
                  }`}
                >
                  Offer Services
                </button>
              </div>
            </div>

            <Button variant="primary" fullWidth isLoading={isLoading} type="submit">
              Send Verification Code
            </Button>

            <div className="text-center pt-2 border-t border-gray-100">
              <span className="text-xs text-civic-text-secondary">Already have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                }}
                className="text-xs font-bold text-civic-blue hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {mode === 'otp' && (
          <form onSubmit={handleOtpVerify} className="flex flex-col gap-4">
            <Input
              label="Enter 4-Digit OTP Code"
              placeholder="e.g. 1234 (Demo code)"
              icon={Lock}
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
              errorMessage={errorMsg}
            />
            <Button variant="primary" fullWidth isLoading={isLoading} type="submit">
              Verify & Complete Sign In
            </Button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-xs text-civic-text-secondary hover:underline text-center"
            >
              ← Back to Mobile Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
