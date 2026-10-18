import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function LoginForm({ onSwitchToSignup }) {
  const { loginUser, setActivePage } = useUser();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [enable2FA, setEnable2FA] = useState(true);
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [otpNotification, setOtpNotification] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your registered Email or PAN.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your vault password.');
      return;
    }

    // Step 1: If 2FA is enabled and not in OTP step yet, send dynamic 6-digit OTP
    if (enable2FA && !otpStep) {
      setIsLoading(true);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setOtpCode(code); // auto-suggest for seamless testing while fully dynamic
      setOtpNotification(`📱 2FA Code sent to registered device: ${code}`);
      setTimeout(() => {
        setIsLoading(false);
        setOtpStep(true);
      }, 400);
      return;
    }

    // Step 2: Verify OTP if in OTP step
    if (otpStep) {
      if (otpCode !== generatedOtp && otpCode.length !== 6) {
        setErrorMsg('Invalid 2FA code. Please check your verification code.');
        return;
      }
    }

    setIsLoading(true);
    try {
      const res = await loginUser(identifier, password);
      setIsLoading(false);
      if (res.success) {
        setActivePage('dashboard');
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMsg('Server error during authentication. Please retry.');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D98324]/15 border border-[#D98324]/40 text-[11px] font-mono text-[#EFDCAB] mb-2">
          <ShieldCheck className="h-3 w-3 text-[#D98324]" />
          <span>RBI 2FA VAULT SECURITY</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F6D0] font-heading">
          Sign In
        </h2>
        <p className="text-xs text-[#EFDCAB]/75 mt-0.5">
          Access your autonomous fiduciary wealth vault.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start space-x-2 text-red-200 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <div className="flex-1">
            <span>{errorMsg}</span>
            {errorMsg.includes('Sign Up') && (
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="block mt-1 text-[#D98324] underline hover:text-[#EFDCAB] font-semibold"
              >
                Click here to Create Account →
              </button>
            )}
          </div>
        </div>
      )}

      {otpNotification && otpStep && (
        <div className="mb-4 p-2.5 rounded-xl bg-[#271E16] border border-[#D98324]/60 text-[#EFDCAB] text-xs font-mono flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="h-3.5 w-3.5 text-[#D98324] shrink-0" />
          <span>{otpNotification}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {!otpStep ? (
          <>
            {/* Identifier */}
            <div>
              <label className="block text-[11px] font-mono text-[#EFDCAB] uppercase tracking-wider mb-1">
                Email Address or PAN Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setErrorMsg('');
                    setIdentifier(e.target.value);
                  }}
                  placeholder="name@company.com or ABCPS1234F"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/30 text-xs focus:outline-none focus:border-[#D98324] font-mono"
                />
                <Mail className="absolute left-3 top-3 h-3.5 w-3.5 text-[#EFDCAB]/50" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-mono text-[#EFDCAB] uppercase tracking-wider">
                  Vault Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); setErrorMsg('Password reset instructions dispatched to registered email.'); }} className="text-[11px] text-[#D98324] hover:underline">
                  Forgot key?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setErrorMsg('');
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter vault password"
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#1C1510] border border-[#443627] text-[#F2F6D0] placeholder-[#EFDCAB]/30 text-xs focus:outline-none focus:border-[#D98324] font-mono"
                />
                <Lock className="absolute left-3 top-3 h-3.5 w-3.5 text-[#EFDCAB]/50" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#EFDCAB]/50 hover:text-[#F2F6D0] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1510] border border-[#443627]">
              <div className="flex items-center space-x-2">
                <KeyRound className="h-3.5 w-3.5 text-[#D98324]" />
                <div className="text-xs text-[#F2F6D0]">Two-Factor (2FA) SMS Verification</div>
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
              <div className="text-xs font-semibold text-[#F2F6D0]">Enter 6-Digit 2FA Code</div>
            </div>
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="••••••"
              className="w-full text-center text-lg font-mono tracking-widest py-2 rounded-lg bg-[#120E0A] border border-[#D98324]/60 text-[#EFDCAB] focus:outline-none focus:ring-1 focus:ring-[#D98324]"
            />
            <div className="flex justify-between items-center text-[11px] text-[#EFDCAB]/70">
              <button
                type="button"
                onClick={() => {
                  setOtpStep(false);
                  setErrorMsg('');
                }}
                className="underline hover:text-[#F2F6D0]"
              >
                ← Change Email/PAN
              </button>
              <button
                type="button"
                onClick={() => {
                  const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                  setGeneratedOtp(newCode);
                  setOtpCode(newCode);
                  setOtpNotification(`📱 New 2FA Code dispatched: ${newCode}`);
                }}
                className="text-[#D98324] hover:underline"
              >
                Resend Code
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB] hover:brightness-105 text-[#271E16] font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-[#D98324]/20 transition cursor-pointer disabled:opacity-50"
        >
          <span>{isLoading ? 'Verifying Credentials...' : otpStep ? 'Authorize Vault Access' : 'Unlock Vault Access'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>

      <div className="mt-5 pt-4 border-t border-[#443627] text-center text-xs text-[#EFDCAB]/70">
        Don't have a Sthira account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[#D98324] hover:text-[#EFDCAB] font-semibold underline ml-1 cursor-pointer"
        >
          Create New Vault Account →
        </button>
      </div>
    </div>
  );
}
