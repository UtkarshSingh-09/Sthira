import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, X, PieChart, Flame, Scale } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/sections/HeroSection'
import QuickDemoPersonas from '../components/sections/QuickDemoPersonas'
import HowItWorksSimple from '../components/sections/HowItWorksSimple'
import InteractiveEnginePlayground from '../components/sections/InteractiveEnginePlayground'
import AgentArchitectureExplorer from '../components/sections/AgentArchitectureExplorer'
import Footer from '../components/layout/Footer'
import { getActiveUserProfile, isJustSignedUp, clearJustSignedUpFlag } from '../services/session'

function formatINR(num) {
  if (num == null || isNaN(num)) return '₹0'
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakhs`
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

export default function LandingPage() {
  const [profile, setProfile] = useState(() => getActiveUserProfile())
  const [showWelcome, setShowWelcome] = useState(() => isJustSignedUp())

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getActiveUserProfile())
      if (isJustSignedUp()) {
        setShowWelcome(true)
      }
    }
    window.addEventListener('sthira_profile_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('sthira_profile_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  const handleDismiss = () => {
    setShowWelcome(false)
    clearJustSignedUpFlag()
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-white">
      {/* Institutional Top Navbar */}
      <Navbar />

      {/* Onboarding Welcome Banner if just registered */}
      {showWelcome && (
        <aside aria-label="Onboarding Notification" className="w-full bg-emerald-500/10 border-b border-emerald-500/20 px-4 py-3.5 relative z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    Welcome to Sthira OS, {profile?.name || 'Investor'}!
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    Profile Initialized
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Your portfolio of <strong className="text-emerald-400">{formatINR(profile?.portfolio_value)}</strong> and monthly SIP of <strong className="text-white">{formatINR(profile?.monthly_sip)}</strong> are now wired into the autonomous behavioral engine.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                to="/portfolio"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D16] text-xs font-bold transition-all shadow-sm"
              >
                <PieChart className="h-3.5 w-3.5" />
                <span>Open Portfolio X-Ray</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                title="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col gap-20 sm:gap-28">
        {/* 1. Hero Section: Core Philosophy, System Stats, Immediate Action */}
        <HeroSection />

        {/* 2. 1-Click Interactive Personas for instant zero-friction exploration */}
        <QuickDemoPersonas />

        {/* 3. Plain English 3-Step Process: Ingest -> Deterministic Engines -> Autonomous Agents */}
        <HowItWorksSimple />

        {/* 4. The Star: Live Interactive Engine Playground (FIRE, Tax, Portfolio Overlap, Panic Interceptor) */}
        <InteractiveEnginePlayground />

        {/* 5. Deep Multi-Agent Architecture: 10 Agents, Latency, Llama 8B/70B, Guardrails */}
        <AgentArchitectureExplorer />
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  )
}
