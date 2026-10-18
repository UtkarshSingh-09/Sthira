import React, { useState } from 'react';
import { ShieldCheck, Lock, Sparkles, Building } from 'lucide-react';
import VirtualIdentityCard from '../components/auth/VirtualIdentityCard';
import SecurityBadgeStrip from '../components/auth/SecurityBadgeStrip';
import LoginForm from '../components/auth/LoginForm';
import SignupWizard from '../components/auth/SignupWizard';
import { useUser } from '../context/UserContext';

export default function AuthPage() {
  const { currentUser } = useUser();
  const [authMode, setAuthMode] = useState('signup');

  // Completely dynamic initial form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    pan: '',
    email: '',
    phone: '',
    password: '',
    age: 28,
    city_type: 'metro',
    annual_salary: '',
    monthly_expenses: '',
    existing_mf: '',
    monthly_sip: '',
    existing_epf: '',
    existing_stocks: '',
    panic_threshold: -15,
    wealth_goal: 'FIRE Early Retirement (Age 42)',
    consent_cas: true,
    consent_behavioral: true,
    consent_terms: true,
  });

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F2F6D0] flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D98324]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFDCAB]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Main Dual-Column Container */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#D98324]/15 border border-[#D98324]/30 text-xs font-mono text-[#EFDCAB] mb-2">
                <Sparkles className="h-3 w-3 text-[#D98324]" />
                <span>Autonomous Fiduciary</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F2F6D0] tracking-tight leading-tight font-heading">
                Deterministic Math. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB]">
                  Zero Human Panic.
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#EFDCAB]/75 mt-1.5 leading-relaxed">
                Autonomous behavioral safeguards & deterministic mathematical engines.
              </p>
            </div>

            {/* Virtual Card */}
            <VirtualIdentityCard 
              user={currentUser}
              formData={signupForm}
              isSignup={authMode === 'signup'}
            />

            {/* Badges */}
            <SecurityBadgeStrip />
          </div>

          {/* Right Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-[#443627] bg-[#1C1510]/95 backdrop-blur-xl p-5 sm:p-7 shadow-2xl">
              {/* Mode Tabs */}
              <div className="flex p-1 rounded-xl bg-[#120E0A] border border-[#443627] mb-5">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-[#D98324] to-[#EFDCAB] text-[#271E16] shadow font-bold'
                      : 'text-[#EFDCAB]/70 hover:text-[#F2F6D0]'
                  }`}
                >
                  <Building className="h-3.5 w-3.5" />
                  <span>Sign Up</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 rounded-lg text-xs font-mono font-semibold transition flex items-center justify-center space-x-1.5 cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-[#D98324] to-[#EFDCAB] text-[#271E16] shadow font-bold'
                      : 'text-[#EFDCAB]/70 hover:text-[#F2F6D0]'
                  }`}
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>
              </div>

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

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-[#443627] bg-[#120E0A]/90 py-3 px-6 text-center text-[11px] text-[#EFDCAB]/70 font-mono">
        <p>
          ⚖️ SEBI Fiduciary Compliant • RBI Data Localization (IN) • PMLA 2002
        </p>
      </footer>
    </div>
  );
}
