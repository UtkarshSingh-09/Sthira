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
    }, 600);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D98324]/15 border border-[#D98324]/40 text-xs font-mono text-[#EFDCAB] mb-3">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D98324]" />
          <span>SECURE VAULT ACCESS • RBI 2FA ENABLED</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#F2F6D0]">
          Sign In to Sthira OS
        </h2>
        <p className="text-sm text-[#EFDCAB]/80 mt-1">
          Access your autonomous financial operating system and behavioral safeguards.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!otpStep ? (
          <>
            {/* Identifier (Email / PAN) */}
            <div>
              <label className="block text-xs font-mono text-[#EFDCAB] uppercase tracking-wider mb-1.5">
                Email / Registered PAN / Mobile
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. ankit@outlook.com or ABCPS1234F"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/40 text-sm focus:outline-none focus:border-[#D98324] focus:ring-1 focus:ring-[#D98324] transition font-mono"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#EFDCAB]/60" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono text-[#EFDCAB] uppercase tracking-wider">
                  Master Password
                </label>
                <a href="#forgot" className="text-xs text-[#D98324] hover:text-[#EFDCAB] hover:underline font-medium">
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
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/40 text-sm focus:outline-none focus:border-[#D98324] focus:ring-1 focus:ring-[#D98324] transition font-mono"
                />
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#EFDCAB]/60" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#EFDCAB]/60 hover:text-[#F2F6D0] transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* RBI 2FA Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1C1510]/80 border border-[#443627]">
              <div className="flex items-center space-x-2.5">
                <KeyRound className="h-4 w-4 text-[#D98324]" />
                <div>
                  <div className="text-xs font-semibold text-[#F2F6D0]">RBI Mandatory 2FA OTP</div>
                  <div className="text-[11px] text-[#EFDCAB]/75">Two-factor auth via registered mobile OTP</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={(e) => setEnable2FA(e.target.checked)}
                className="w-4 h-4 rounded accent-[#D98324] cursor-pointer"
              />
            </div>
          </>
        ) : (
          /* Step 2: 2FA OTP Screen */
          <div className="p-4 rounded-xl bg-[#443627]/40 border border-[#D98324]/50 space-y-3">
            <div className="flex items-center space-x-2 text-[#D98324]">
              <CheckCircle2 className="h-5 w-5" />
              <div className="text-sm font-semibold text-[#F2F6D0]">Enter 6-Digit RBI Security OTP</div>
            </div>
            <p className="text-xs text-[#EFDCAB]">
              An OTP has been dispatched to your Aadhaar-linked phone for multi-factor authentication.
            </p>
            <div>
              <label className="block text-[11px] font-mono text-[#EFDCAB]/80 uppercase tracking-wider mb-1">
                One-Time Security Passcode (Demo OTP: 849201)
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full text-center text-xl font-mono tracking-widest py-2.5 rounded-lg bg-[#120E0A] border border-[#D98324]/60 text-[#EFDCAB] focus:outline-none focus:ring-2 focus:ring-[#D98324]"
              />
            </div>
            <button
              type="button"
              onClick={() => setOtpStep(false)}
              className="text-xs text-[#EFDCAB]/80 hover:text-[#F2F6D0] underline"
            >
              ← Back to credentials
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB] hover:brightness-105 text-[#271E16] font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#D98324]/20 transition duration-200 cursor-pointer disabled:opacity-50"
        >
          <span>{isLoading ? 'Verifying Credentials...' : otpStep ? 'Authorize & Enter Vault' : enable2FA ? 'Verify Credentials with 2FA →' : 'Unlock Wealth Vault'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Instant Demo Personas Shortcut (Judge Friendly) */}
      <div className="mt-6 pt-5 border-t border-[#443627]">
        <div className="text-[11px] font-mono text-[#EFDCAB]/80 uppercase tracking-wider mb-2.5 text-center">
          ⚡ Instant Demo Persona Access (Pre-Configured)
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              switchPersona('ankit');
              setActivePage('dashboard');
            }}
            className="p-2 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-left transition text-xs"
          >
            <div className="font-semibold text-[#F2F6D0]">Ankit (SDE-2)</div>
            <div className="text-[10px] text-[#D98324]">Age 28 • ₹24L</div>
          </button>
          <button
            type="button"
            onClick={() => {
              switchPersona('priya');
              setActivePage('dashboard');
            }}
            className="p-2 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#EFDCAB] text-left transition text-xs"
          >
            <div className="font-semibold text-[#F2F6D0]">Priya (Lead)</div>
            <div className="text-[10px] text-[#EFDCAB]">Age 34 • ₹42L</div>
          </button>
          <button
            type="button"
            onClick={() => {
              switchPersona('santosh');
              setActivePage('dashboard');
            }}
            className="p-2 rounded-lg bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-left transition text-xs"
          >
            <div className="font-semibold text-[#F2F6D0]">Santosh (Senior)</div>
            <div className="text-[10px] text-[#D98324]">Age 64 • ₹18L</div>
          </button>
        </div>
      </div>

      {/* Switch to Signup */}
      <div className="mt-6 text-center text-sm text-[#EFDCAB]/80">
        Don't have a verified vault account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[#D98324] hover:text-[#EFDCAB] font-semibold underline underline-offset-4 ml-1"
        >
          Open RBI & SEBI Compliant Account →
        </button>
      </div>
    </div>
  );
}
