import React from 'react';
import { ShieldCheck, Cpu, Lock, CheckCircle2, AlertTriangle, Fingerprint } from 'lucide-react';

export default function VirtualIdentityCard({ user, formData, isSignup, currentStep }) {
  const displayName = isSignup ? (formData?.name || 'INVESTOR HOLDER') : (user?.name || 'INVESTOR HOLDER');
  const rawPan = isSignup ? (formData?.pan || 'ABCPS1234F') : (user?.pan || 'ABCPS1234F');
  const maskedPan = rawPan.length >= 10 
    ? `${rawPan.slice(0, 5)}••••${rawPan.slice(9)}` 
    : (rawPan || 'ABCDE••••F');
  
  const displayGoal = isSignup ? (formData?.wealth_goal || 'FIRE Early Retirement') : (user?.wealth_goal || 'FIRE Early Retirement');
  const displayPanic = isSignup ? (formData?.panic_threshold || -15) : (user?.panic_threshold || -15);
  const displaySalary = isSignup ? (formData?.annual_salary ? `₹${(Number(formData.annual_salary)/100000).toFixed(1)}L PA` : '₹24.0L PA') : `₹${((user?.annual_salary || 2400000)/100000).toFixed(1)}L PA`;

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/10 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

      {/* Main Metal Identity Card */}
      <div className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-[#121927] via-[#0E1420] to-[#090D15] p-6 text-white shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Holographic micro-circuit watermark */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 font-semibold uppercase">
                STHIRA IDENTITY VAULT
              </div>
              <div className="text-xs font-semibold text-slate-200 tracking-tight">
                SEBI & RBI COMPLIANT
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>256-BIT ENCRYPTED</span>
          </div>
        </div>

        {/* EMV Chip & Contactless Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {/* Metallic Gold EMV Chip */}
            <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-amber-100 p-0.5 shadow-inner border border-amber-600/30">
              <div className="w-full h-full rounded border border-amber-800/20 grid grid-cols-2 grid-rows-2 gap-0.5 opacity-70">
                <div className="border-r border-b border-amber-900/20" />
                <div className="border-b border-amber-900/20" />
                <div className="border-r border-amber-900/20" />
                <div />
              </div>
            </div>
            <Cpu className="h-5 w-5 text-slate-400/80" />
          </div>

          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">KYC Verification</div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center justify-end space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>UIDAI e-KYC VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Masked PAN & Identity Info */}
        <div className="mb-6 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            PERMANENT ACCOUNT NUMBER (PAN)
          </div>
          <div className="text-xl font-mono font-bold tracking-wider text-slate-100 flex items-center space-x-3">
            <span>{maskedPan}</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50 font-sans font-medium">
              Individual
            </span>
          </div>
        </div>

        {/* Name and Financial Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">LEGAL HOLDER</div>
            <div className="font-semibold text-slate-100 truncate tracking-tight uppercase">
              {displayName}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">INCOME BRACKET</div>
            <div className="font-semibold text-emerald-400 font-mono">
              {displaySalary}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">PRIMARY GOAL</div>
            <div className="font-medium text-slate-200 truncate">
              {displayGoal}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">PANIC INTERCEPT AT</div>
            <div className="font-semibold text-amber-400 font-mono flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{displayPanic}% Drawdown</span>
            </div>
          </div>
        </div>

        {/* Card Footer Security Watermark */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
          <div className="flex items-center space-x-1">
            <Lock className="h-2.5 w-2.5 text-emerald-400" />
            <span>ISO 27001 • RBI DATA LOCALIZED</span>
          </div>
          <div className="text-slate-400 font-semibold">
            TOKEN: STH-09X
          </div>
        </div>
      </div>
    </div>
  );
}
