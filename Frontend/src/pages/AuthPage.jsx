import React, { useState } from 'react';
import { ShieldCheck, Lock, Activity, Sparkles, Building, Layers } from 'lucide-react';
import VirtualIdentityCard from '../components/auth/VirtualIdentityCard';
import SecurityBadgeStrip from '../components/auth/SecurityBadgeStrip';
import LoginForm from '../components/auth/LoginForm';
import SignupWizard from '../components/auth/SignupWizard';
import { useUser } from '../context/UserContext';

export default function AuthPage() {
  const { currentUser } = useUser();
  const [authMode, setAuthMode] = useState('signup');

  // Form state for live card preview in signup
  const [signupForm, setSignupForm] = useState({
    name: 'Utkarsh Singh',
    pan: 'ABCPS1234F',
    email: 'utkarsh@sthira.ai',
    phone: '9876543210',
    age: 28,
    city_type: 'metro',
    annual_salary: 2400000,
    monthly_expenses: 65000,
    existing_mf: 950000,
    monthly_sip: 45000,
    existing_epf: 440000,
    existing_stocks: 60000,
    panic_threshold: -15,
    wealth_goal: 'FIRE Early Retirement (Age 42)',
    consent_cas: true,
    consent_behavioral: true,
    consent_terms: true,
  });

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F2F6D0] flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D98324]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFDCAB]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 w-full border-b border-[#443627] bg-[#120E0A]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#D98324] to-[#EFDCAB] p-0.5 flex items-center justify-center shadow-lg shadow-[#D98324]/20">
            <div className="w-full h-full bg-[#120E0A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-[#D98324]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-[#F2F6D0] font-sans">
                STHIRA
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D98324]/15 text-[#EFDCAB] border border-[#D98324]/30 font-semibold">
                OS v2.4
              </span>
            </div>
            <div className="text-[11px] text-[#EFDCAB]/75 font-mono tracking-wider">
              AUTONOMOUS BEHAVIORAL WEALTH SYSTEM
            </div>
          </div>
        </div>

        {/* System telemetry pill */}
        <div className="hidden sm:flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1C1510] border border-[#443627] text-[#EFDCAB]">
            <span className="w-2 h-2 rounded-full bg-[#D98324] animate-pulse" />
            <span>SEBI REGULATOR GUARD: ONLINE</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[#EFDCAB]/80">
            <Lock className="h-3.5 w-3.5 text-[#D98324]" />
            <span>RBI DATA LOCALIZED (IN)</span>
          </div>
        </div>
      </header>

      {/* Main Dual-Column Container */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual & Compliance Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D98324]/15 border border-[#D98324]/30 text-xs font-mono text-[#EFDCAB] mb-3">
                <Sparkles className="h-3.5 w-3.5 text-[#D98324]" />
                <span>Next-Gen Fiduciary Architecture</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#F2F6D0] tracking-tight leading-tight">
                Deterministic Wealth Math. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB]">
                  Zero Human Panic.
                </span>
              </h1>
              <p className="text-sm text-[#EFDCAB]/80 mt-2 leading-relaxed">
                Replace biased human advisers with 10 autonomous LangGraph agents and deterministic SEBI/RBI mathematical engines.
              </p>
            </div>

            {/* 21st-Inspired Virtual KYC Identity Card */}
            <VirtualIdentityCard 
              user={currentUser}
              formData={signupForm}
              isSignup={authMode === 'signup'}
            />

            {/* Statutory Compliance Badges */}
            <SecurityBadgeStrip />
          </div>

          {/* Right Interaction Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-[#443627] bg-[#1C1510]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              {/* Mode Switcher Tabs */}
              <div className="flex p-1 rounded-xl bg-[#120E0A] border border-[#443627] mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-[#D98324] to-[#EFDCAB] text-[#271E16] shadow-md font-bold'
                      : 'text-[#EFDCAB]/70 hover:text-[#F2F6D0]'
                  }`}
                >
                  <Building className="h-3.5 w-3.5" />
                  <span>Open Protected Account (Sign Up)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-[#D98324] to-[#EFDCAB] text-[#271E16] shadow-md font-bold'
                      : 'text-[#EFDCAB]/70 hover:text-[#F2F6D0]'
                  }`}
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Sign In to Vault</span>
                </button>
              </div>

              {/* Form Render */}
              {authMode === 'signup' ? (
                <SignupWizard
                  formData={signupForm}
                  setFormData={setSignupForm}
                  onSwitchToLogin={() => setAuthMode('login')}
                />
              ) : (
                <LoginForm
                  onSwitchToSignup={() => setAuthMode('signup')}
                />
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer Statutory Disclosures */}
      <footer className="relative z-10 w-full border-t border-[#443627] bg-[#120E0A]/90 py-4 px-6 text-center text-xs text-[#EFDCAB]/70 font-mono">
        <p>
          ⚖️ SEBI Statutory Notice: Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.
          All calculations are deterministic and compliant with RBI Master Direction on Digital Security & PMLA 2002.
        </p>
      </footer>
    </div>
  );
}
