import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';
import { useUser, PRESET_PERSONAS } from '../../context/UserContext';

export default function LoginForm({ onSwitchToSignup }) {
  const { loginUser, switchPersona, setActivePage } = useUser();
  const [identifier, setIdentifier] = useState('ankit.sde@outlook.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [enable2FA, setEnable2FA] = useState(true);
  const [otpCode, setOtpCode] = useState('849201');
  const [otpStep, setOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enable2FA && !otpStep) {
      setOtpStep(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      let targetUser = PRESET_PERSONAS.ankit;
      if (identifier.toLowerCase().includes('priya')) {
        targetUser = PRESET_PERSONAS.priya;
      } else if (identifier.toLowerCase().includes('santosh')) {
        targetUser = PRESET_PERSONAS.santosh;
      } else {
        targetUser = {
          ...PRESET_PERSONAS.ankit,
          email: identifier,
          name: identifier.split('@')[0].toUpperCase()
        };
      }

      loginUser(targetUser);
      setIsLoading(false);
      setActivePage('dashboard');
    }, 500);
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D98324]/15 border border-[#D98324]/40 text-[11px] font-mono text-[#EFDCAB] mb-2">
          <ShieldCheck className="h-3 w-3 text-[#D98324]" />
          <span>RBI 2FA ENABLED</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F6D0] font-heading">
          Sign In
        </h2>
        <p className="text-xs text-[#EFDCAB]/75 mt-0.5">
          Access your autonomous wealth vault.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {!otpStep ? (
          <>
            {/* Identifier */}
            <div>
              <label className="block text-[11px] font-mono text-[#EFDCAB] uppercase tracking-wider mb-1">
                Email or PAN
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ankit@outlook.com or ABCPS1234F"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/30 text-xs focus:outline-none focus:border-[#D98324] font-mono"
                />
                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#EFDCAB]/50" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-mono text-[#EFDCAB] uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] text-[#D98324] hover:underline">
                  Forgot key?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/30 text-xs focus:outline-none focus:border-[#D98324] font-mono"
                />
                <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#EFDCAB]/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#EFDCAB]/50 hover:text-[#F2F6D0]"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1510] border border-[#443627]">
              <div className="flex items-center space-x-2">
                <KeyRound className="h-3.5 w-3.5 text-[#D98324]" />
                <div className="text-xs text-[#F2F6D0]">2FA Mobile OTP Verification</div>
              </div>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="w-3.5 h-3.5 rounded accent-[#D98324] cursor-pointer"
              />
            </div>
          </>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#443627]/40 border border-[#D98324]/50 space-y-2.5">
            <div className="flex items-center space-x-1.5 text-[#D98324]">
              <CheckCircle2 className="h-4 w-4" />
              <div className="text-xs font-semibold text-[#F2F6D0]">Enter 6-Digit OTP</div>
            </div>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full text-center text-lg font-mono tracking-widest py-2 rounded-lg bg-[#120E0A] border border-[#D98324]/60 text-[#EFDCAB] focus:outline-none focus:ring-1 focus:ring-[#D98324]"
            />
            <div className="flex justify-between items-center text-[10px] text-[#EFDCAB]/70">
              <button
                type="button"
                onClick={() => setOtpStep(false)}
                className="underline hover:text-[#F2F6D0]"
              >
                ← Back
              </button>
              <span>Demo OTP: 849201</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB] hover:brightness-105 text-[#271E16] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-[#D98324]/20 transition cursor-pointer disabled:opacity-50"
        >
          <span>{isLoading ? 'Verifying...' : otpStep ? 'Authorize Vault' : 'Unlock Vault'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>

      {/* Preset Personas */}
      <div className="mt-5 pt-4 border-t border-[#443627]">
        <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase tracking-wider mb-2 text-center">
          Quick Demo Login
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => {
              switchPersona('ankit');
              setActivePage('dashboard');
            }}
            className="p-1.5 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-left transition"
          >
            <div className="font-semibold text-[#F2F6D0] text-xs">Ankit</div>
            <div className="text-[9px] text-[#D98324] font-mono">SDE-2 • ₹24L</div>
          </button>
          <button
            type="button"
            onClick={() => {
              switchPersona('priya');
              setActivePage('dashboard');
            }}
            className="p-1.5 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#EFDCAB] text-left transition"
          >
            <div className="font-semibold text-[#F2F6D0] text-xs">Priya</div>
            <div className="text-[9px] text-[#EFDCAB] font-mono">Lead • ₹42L</div>
          </button>
          <button
            type="button"
            onClick={() => {
              switchPersona('santosh');
              setActivePage('dashboard');
            }}
            className="p-1.5 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-left transition"
          >
            <div className="font-semibold text-[#F2F6D0] text-xs">Santosh</div>
            <div className="text-[9px] text-[#D98324] font-mono">Senior • ₹18L</div>
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-[#EFDCAB]/70">
        New to Sthira?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[#D98324] hover:text-[#EFDCAB] font-semibold underline ml-1"
        >
          Create Account →
        </button>
      </div>
    </div>
  );
}
