import React from 'react';
import { ShieldCheck, Cpu, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function VirtualIdentityCard({ user, formData, isSignup }) {
  const activeData = isSignup ? formData : user;
  
  const displayName = activeData?.name?.trim() ? activeData.name.toUpperCase() : 'YOUR NAME';
  const rawPan = (activeData?.pan || '').trim().toUpperCase();
  
  let maskedPan = '••••••••••';
  if (rawPan.length >= 10) {
    maskedPan = `${rawPan.slice(0, 5)}••••${rawPan.slice(9)}`;
  } else if (rawPan.length > 0) {
    maskedPan = `${rawPan}${'•'.repeat(Math.max(0, 10 - rawPan.length))}`;
  }

  const displayGoal = activeData?.wealth_goal || 'FIRE Early Retirement';
  const displayPanic = activeData?.panic_threshold !== undefined && activeData?.panic_threshold !== '' 
    ? activeData.panic_threshold 
    : -15;

  const salaryNum = Number(activeData?.annual_salary);
  const displaySalary = salaryNum > 0 
    ? `₹${(salaryNum / 100000).toFixed(1)}L PA` 
    : '₹--.-L PA';

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#D98324]/30 via-[#EFDCAB]/20 to-[#D98324]/15 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

      {/* Main Metal Identity Card */}
      <div className="relative rounded-2xl border border-[#EFDCAB]/25 bg-gradient-to-br from-[#271E16] via-[#1C1510] to-[#120E0A] p-6 text-[#F2F6D0] shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Holographic glows */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 rounded-full bg-[#D98324]/15 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 rounded-full bg-[#EFDCAB]/10 blur-2xl pointer-events-none" />
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#D98324]/20 border border-[#D98324]/50 flex items-center justify-center text-[#D98324]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#D98324] font-bold uppercase">
                STHIRA VAULT
              </div>
              <div className="text-xs font-semibold text-[#EFDCAB] tracking-tight">
                SEBI & RBI COMPLIANT
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#443627]/80 border border-[#EFDCAB]/30 text-[10px] font-mono text-[#F2F6D0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D98324] animate-pulse" />
            <span>256-BIT</span>
          </div>
        </div>

        {/* EMV Chip & Contactless Indicator */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#EFDCAB] via-[#D98324] to-[#EFDCAB] p-0.5 shadow-inner border border-[#443627]">
              <div className="w-full h-full rounded border border-[#443627]/40 grid grid-cols-2 grid-rows-2 gap-0.5 opacity-80">
                <div className="border-r border-b border-[#443627]/40" />
                <div className="border-b border-[#443627]/40" />
                <div className="border-r border-[#443627]/40" />
                <div />
              </div>
            </div>
            <Cpu className="h-5 w-5 text-[#EFDCAB]/70" />
          </div>

          <div className="text-right">
            <div className="text-xs font-semibold text-[#D98324] flex items-center justify-end space-x-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{rawPan.length >= 10 ? 'e-KYC VERIFIED' : 'PENDING ONBOARDING'}</span>
            </div>
          </div>
        </div>

        {/* Masked PAN */}
        <div className="mb-5 space-y-1">
          <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase tracking-widest">
            PERMANENT ACCOUNT NUMBER
          </div>
          <div className="text-xl font-mono font-bold tracking-wider text-[#F2F6D0] flex items-center space-x-3">
            <span className="tracking-widest">{maskedPan}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#443627]/90 text-[#EFDCAB] border border-[#EFDCAB]/20 font-sans">
              Individual
            </span>
          </div>
        </div>

        {/* Clean Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#EFDCAB]/15 text-xs">
          <div>
            <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase">HOLDER</div>
            <div className="font-semibold text-[#F2F6D0] truncate uppercase">
              {displayName}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase">INCOME</div>
            <div className="font-semibold text-[#D98324] font-mono">
              {displaySalary}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase">GOAL</div>
            <div className="font-medium text-[#EFDCAB] truncate">
              {displayGoal}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase">TRIGGER</div>
            <div className="font-semibold text-[#D98324] font-mono flex items-center space-x-1">
              <AlertTriangle className="h-3 w-3" />
              <span>{displayPanic}% Drawdown</span>
            </div>
          </div>
        </div>

        {/* Card Footer Security Watermark */}
        <div className="mt-4 pt-3 border-t border-[#EFDCAB]/10 flex items-center justify-between text-[9px] font-mono text-[#EFDCAB]/70">
          <div className="flex items-center space-x-1">
            <Lock className="h-2.5 w-2.5 text-[#D98324]" />
            <span>ISO 27001 • RBI ENCRYPTED</span>
          </div>
          <div className="text-[#EFDCAB] font-semibold">
            TOKEN: STH-{activeData?.user_id ? activeData.user_id.slice(-4).toUpperCase() : 'VAULT'}
          </div>
        </div>
      </div>
    </div>
  );
}
