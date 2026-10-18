import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, Sparkles, IndianRupee, Flame, Scale, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { isAuthenticated } from '../../services/session'

export default function HeroSection() {
  const scrollToPlayground = () => {
    document.getElementById('interactive-playground')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-10 sm:pb-24">
      {/* Background ambient lighting (grounded, institutional) */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-emerald-500/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-blue-500/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Value Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                Autonomous Behavioral Wealth OS • 10 Multi-Agents
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.15]">
              Financial Intelligence Built to{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
                Prevent Costly Mistakes.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Most financial tools only show numbers after mistakes are locked in. Sthira binds your Form 16 and mutual funds to <strong className="text-white font-medium">deterministic Python math engines</strong> guarded by <strong className="text-white font-medium">10 LangGraph agents</strong> — catching tax leaks, optimizing retirement, and intervening before you panic-sell in a crash.
            </p>

            {/* Strict Architecture Principle Banner */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3 max-w-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-normal">
                <span className="text-white font-semibold block mb-0.5">Strict Architecture Principle</span>
                Deterministic code performs 100% of the financial math. LLMs only narrate and intervene. Zero hallucinations.
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              {!isAuthenticated() ? (
                <Link
                  to="/signup"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start One-Time Intake (Sign Up)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090D16] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <span>Explore Full Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <button
                type="button"
                onClick={scrollToPlayground}
                className="px-6 py-3.5 rounded-xl bg-[#111622] hover:bg-[#161D2C] text-white font-semibold text-sm border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Test Live Playground</span>
              </button>

              <Link
                to="/onboard"
                className="px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-medium text-sm border border-white/[0.08] transition-all flex items-center justify-center"
              >
                <span>Upload Form 16 / CAS</span>
              </Link>
            </div>

            {/* Architecture Assurance Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 mt-8 border-t border-white/[0.08] max-w-xl">
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Math Accuracy</span>
                <span className="text-xs font-bold text-emerald-400">0% Hallucinations</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Regulatory Rules</span>
                <span className="text-xs font-bold text-slate-200">SEBI RAG Guarded</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block mb-0.5">Crisis Defense</span>
                <span className="text-xs font-bold text-slate-200">WhatsApp Alert</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Terminal Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/[0.12] bg-[#111622] p-5 sm:p-6 shadow-2xl shadow-emerald-950/20 flex flex-col gap-4">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Sthira Telemetry Stream
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/20">
                  Dual 8B/70B Active
                </span>
              </div>

              {/* Active User Snapshot */}
              <div className="flex items-center justify-between text-xs bg-[#0E131F] p-3 rounded-xl border border-white/[0.05]">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Active Portfolio</span>
                  <span className="font-semibold text-white">Santosh Pradhan (61y, Retiree)</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Verification</span>
                  <span className="text-emerald-400 font-semibold">Form 16 + CAS Verified</span>
                </div>
              </div>

              {/* Metric Grid 2x2 */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0E131F] border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block mb-1">Invested Assets</span>
                  <span className="text-xl font-bold text-white">₹75,00,000</span>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1">+17.4% XIRR</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E131F] border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block mb-1">Arth Wellness Score</span>
                  <span className="text-xl font-bold text-white">785 <span className="text-xs text-slate-500 font-normal">/ 1000</span></span>
                  <span className="text-[11px] text-amber-400 font-semibold block mt-1">Top 8% Discipline</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E131F] border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block mb-1">Tax Optimized</span>
                  <span className="text-xl font-bold text-emerald-400">+₹44,200</span>
                  <span className="text-[11px] text-slate-400 block mt-1">Old Regime (Sec 24b)</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0E131F] border border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block mb-1">FIRE Retirement</span>
                  <span className="text-xl font-bold text-white">Age 48</span>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1">₹3.8 Cr Locked</span>
                </div>
              </div>

              {/* Behavioral Intervention Alert Simulation */}
              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/[0.06] flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    Market -3.4% Panic Intercept
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">WhatsApp Triggered</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Santosh, pausing your SIP today delays your retirement by 18 months. Compounding is protected."
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-400 font-semibold">SIP Streak Preserved: 412 Days</span>
                  <span className="text-slate-400">Guard: Active</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
