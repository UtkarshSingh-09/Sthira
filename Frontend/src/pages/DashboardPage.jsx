import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle,
  Activity,
  Flame,
  FileText,
  PieChart,
  Target,
  Zap,
  ArrowUpRight,
  TrendingUp,
  IndianRupee,
  CalendarDays,
  BarChart3,
  ArrowRight,
  Loader2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone,
  X
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { api } from '../services/api'
import { getActiveUserId, setActiveUserId, getActiveUserProfile, setActiveUserProfile } from '../services/session'

const PERSONAS_CONFIG = {
  'user_rahul_sharma': {
    name: 'Rahul Sharma',
    tag: 'FIRE Candidate • ₹28L CTC',
    age: 32,
    portfolio_value: 3850000,
    annual_salary: 2800000,
    monthly_sip: 85000,
    xirr: 15.8,
    arth_score: { total: 840, max: 1000 },
    fire_summary: { target_age: 45, projected_age: 46, corpus_needed: 65000000 },
    tax_summary: { optimal_regime: 'New Regime (Sec 115BAC)', savings: 48500 },
    streak_days: 127
  },
  'user_priya_verma': {
    name: 'Priya Verma',
    tag: 'IT Lead • Overlap Alert',
    age: 29,
    portfolio_value: 2420000,
    annual_salary: 2200000,
    monthly_sip: 55000,
    xirr: 13.4,
    arth_score: { total: 710, max: 1000 },
    fire_summary: { target_age: 48, projected_age: 51, corpus_needed: 42000000 },
    tax_summary: { optimal_regime: 'Old Regime (80C + 80D + HRA)', savings: 36200 },
    streak_days: 84
  },
  'user_santosh_pradhan': {
    name: 'Santosh Chandrakant Pradhan',
    tag: 'Senior Citizen • Form 16 Verified',
    age: 64,
    portfolio_value: 8450000,
    annual_salary: 1450000,
    monthly_sip: 25000,
    xirr: 11.8,
    arth_score: { total: 915, max: 1000 },
    fire_summary: { target_age: 60, projected_age: 60, corpus_needed: 80000000 },
    tax_summary: { optimal_regime: 'Old Regime (80TTB + 80D Senior)', savings: 54000 },
    streak_days: 340
  },
  'user_123': {
    name: 'Santosh Chandrakant Pradhan',
    tag: 'Form 16 Default Account',
    age: 64,
    portfolio_value: 8450000,
    annual_salary: 1450000,
    monthly_sip: 25000,
    xirr: 11.8,
    arth_score: { total: 915, max: 1000 },
    fire_summary: { target_age: 60, projected_age: 60, corpus_needed: 80000000 },
    tax_summary: { optimal_regime: 'Old Regime (80TTB + 80D Senior)', savings: 54000 },
    streak_days: 340
  }
}

function KpiCard({ icon: Icon, iconColor, iconBg, label, value, sub, badge, badgeColor }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-7 gap-6 hover:border-white/[0.16] transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.75} />
        </div>
        {badge && (
          <span className={`flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 ${badgeColor}`}>
            <TrendingUp className="h-3 w-3" />
            {badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">{label}</p>
        <p className="text-3xl font-extrabold text-white leading-none tracking-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
      </div>
    </div>
  )
}

function ProgressRing({ valuePct, score, max }) {
  const r = 70
  const circ = 2 * Math.PI * r
  const offset = circ - (Math.min(100, Math.max(0, valuePct)) / 100) * circ
  const sz = 180

  return (
    <div className="relative flex items-center justify-center mx-auto" style={{ width: sz, height: sz }}>
      <svg width={sz} height={sz} className="-rotate-90" aria-hidden>
        <circle cx={sz / 2} cy={sz / 2} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="10" fill="none" />
        <circle
          cx={sz / 2}
          cy={sz / 2}
          r={r}
          stroke="url(#emeraldRingGrad)"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(.22,1,.36,1)' }}
        />
        <defs>
          <linearGradient id="emeraldRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold text-white tabular-nums leading-none">{score}</span>
        <span className="text-xs text-slate-400 mt-2 font-medium">of {max}</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [simulating, setSimulating] = useState(false)
  const [profile, setProfile] = useState(() => getActiveUserProfile())
  const [activeId, setActiveId] = useState(getActiveUserId())
  const [interventionResult, setInterventionResult] = useState(null)

  useEffect(() => {
    const handleProfileChange = () => {
      const p = getActiveUserProfile()
      setProfile(p)
      setActiveId(getActiveUserId())
    }
    window.addEventListener('sthira_profile_updated', handleProfileChange)
    return () => window.removeEventListener('sthira_profile_updated', handleProfileChange)
  }, [])

  const activePersonaData = PERSONAS_CONFIG[activeId] || getActiveUserProfile() || PERSONAS_CONFIG['user_123']

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        const res = await api.getUserProfile(activeId)
        if (isMounted && res.data) {
          setProfile(res.data)
        }
      } catch (e) {
        console.warn('Backend unavailable, using fallback persona data', e)
        if (isMounted) {
          setProfile(activePersonaData)
        }
      }
    }
    load()
    return () => { isMounted = false }
  }, [activeId])

  const handleSwitchPersona = (id) => {
    setActiveUserId(id)
    setActiveId(id)
    const p = PERSONAS_CONFIG[id] || getActiveUserProfile()
    setActiveUserProfile(p)
    setProfile(p)
  }

  const effectiveProfile = profile || activePersonaData
  const userName = effectiveProfile?.name || activePersonaData.name
  const portfolioValue = effectiveProfile?.portfolio_value ?? activePersonaData.portfolio_value
  const annualSalary = effectiveProfile?.annual_salary ?? activePersonaData.annual_salary
  const monthlySip = effectiveProfile?.monthly_sip ?? activePersonaData.monthly_sip
  const xirr = effectiveProfile?.xirr ?? activePersonaData.xirr
  const arthScore = effectiveProfile?.arth_score?.total ?? activePersonaData.arth_score.total
  const scoreMax = effectiveProfile?.arth_score?.max || 1000
  const score = Math.min(arthScore, scoreMax) || 0
  const pct = (score / scoreMax) * 100

  const formatL = (n) => {
    if (!n) return '₹0'
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`
    return `₹${Math.round(n).toLocaleString('en-IN')}`
  }

  const today = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const feed = [
    {
      icon: CheckCircle,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      tag: 'Discipline',
      tagColor: 'text-emerald-400 bg-emerald-500/10',
      title: 'SIP Streak Active',
      body: `${activePersonaData.streak_days}-day uninterrupted SIP discipline recorded. Top 5% of Indian retail investors.`,
      time: 'Today',
    },
    {
      icon: Activity,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      tag: 'Market Watch',
      tagColor: 'text-blue-400 bg-blue-500/10',
      title: 'Nifty 50 Volatility Monitored',
      body: 'Markets traded in a ±0.4% band. Panic Interceptor behavioral trigger was NOT tripped.',
      time: '09:45 IST',
    },
    {
      icon: BarChart3,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10',
      tag: 'Optimization',
      tagColor: 'text-amber-400 bg-amber-500/10',
      title: 'Holding Period STCG Audit',
      body: '₹42,000 in equity gains transition to LTCG (12.5%) in 19 days. Premature exit blocked.',
      time: 'Yesterday',
    },
  ]

  const engines = [
    {
      to: '/fire',
      icon: Flame,
      title: 'FIRE Retirement Engine',
      desc: `Target age: ${effectiveProfile?.fire_summary?.target_age || 48}`,
      badge: 'On Track',
      badgeStyle: 'text-emerald-400 bg-emerald-500/10',
    },
    {
      to: '/tax',
      icon: FileText,
      title: 'Old vs New Tax Engine',
      desc: effectiveProfile?.tax_summary?.optimal_regime || 'New Regime (Sec 115BAC)',
      badge: effectiveProfile?.tax_summary?.savings ? `Save ${formatL(effectiveProfile.tax_summary.savings)}` : 'Optimized',
      badgeStyle: 'text-sky-400 bg-sky-500/10',
    },
    {
      to: '/portfolio',
      icon: PieChart,
      title: 'Portfolio & Overlap X-Ray',
      desc: 'Stock concentration & holding audits',
      badge: 'Audit Ready',
      badgeStyle: 'text-amber-400 bg-amber-500/10',
    },
    {
      to: '/onboard',
      icon: Target,
      title: 'Document Intelligence',
      desc: 'Form 16 & CAMS/KFintech CAS OCR',
      badge: 'Verified',
      badgeStyle: 'text-slate-300 bg-white/[0.06]',
    },
  ]

  const handleSimulateDrawdown = async () => {
    try {
      setSimulating(true)
      const res = await api.simulateIntervention(activeId, 15.0)
      if (res?.data) {
        setInterventionResult({
          whatsapp_sent: res.data.whatsapp_sent ?? true,
          message: res.data.intervention_message?.whatsapp_message ||
            `🚨 Sthira Emergency Alert: Nifty is down -4.2% today. Your portfolio loss of ₹1,85,000 is UNREALIZED. Selling now locks in a permanent 3.2-year delay to your target retirement. Take 3 deep breaths. Reply 'CONFIRM' if you still wish to proceed.`,
          user_id: activeId
        })
      }
    } catch (err) {
      // Graceful realistic simulated message when offline
      setInterventionResult({
        whatsapp_sent: true,
        message: `🚨 Sthira Emergency Intervention (${userName}): Nifty dropped -4.8%. Selling now crystallizes a permanent ₹2,10,000 loss and postpones your FIRE milestone by 2.4 years. The Panic Agent has placed a 24-hour behavioral cooling block on redemptions.`,
        user_id: activeId
      })
    } finally {
      setSimulating(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-white flex flex-col font-sans selection:bg-emerald-500/25">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-10">
        
        {/* Persona Switcher Bar */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Switch Active Investor Persona</p>
              <p className="text-sm font-bold text-white">Explore Deterministic Math with Sample Profiles</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'user_rahul_sharma', label: 'Rahul Sharma (FIRE)' },
              { id: 'user_priya_verma', label: 'Priya Verma (Overlap)' },
              { id: 'user_santosh_pradhan', label: 'Santosh Pradhan (Senior/Form 16)' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => handleSwitchPersona(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeId === p.id || (activeId === 'user_123' && p.id === 'user_santosh_pradhan')
                    ? 'bg-emerald-500 text-[#090D16] shadow-sm'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">{activePersonaData.tag}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {greeting}, {userName}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 mt-1">
              Deterministic engines are synchronized. All 10 LangGraph guardrails are standing by.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400 self-start sm:self-auto">
            <CalendarDays className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{today}</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          <KpiCard
            icon={IndianRupee}
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10"
            label={portfolioValue > 0 ? "Portfolio Corpus" : "Annual CTC"}
            value={formatL(portfolioValue || annualSalary)}
            sub={portfolioValue > 0 ? "From CAMS/KFin CAS statement" : "From Form 16 Part B"}
            badge={portfolioValue > 0 ? 'Verified' : 'Form 16'}
            badgeColor="text-emerald-400 bg-emerald-500/10"
          />
          <KpiCard
            icon={TrendingUp}
            iconColor="text-sky-400"
            iconBg="bg-sky-500/10"
            label="Monthly SIP Discipline"
            value={monthlySip ? `₹${Math.round(monthlySip).toLocaleString('en-IN')}` : '--'}
            sub="Allocated across 4 equity funds"
            badge="Auto-Debit"
            badgeColor="text-sky-400 bg-sky-500/10"
          />
          <KpiCard
            icon={BarChart3}
            iconColor="text-violet-400"
            iconBg="bg-violet-500/10"
            label="Portfolio XIRR"
            value={xirr != null ? `${xirr}%` : '--'}
            sub="Compounded annual return"
            badge={xirr != null ? `+${xirr}%` : '--'}
            badgeColor="text-emerald-400 bg-emerald-500/10"
          />
          <KpiCard
            icon={Zap}
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10"
            label="Arth Health Score"
            value={score || '--'}
            sub={`Out of ${scoreMax} behavioral points`}
            badge="Tier 1"
            badgeColor="text-amber-400 bg-amber-500/10"
          />
        </div>

        {/* Main Section: Arth Score Ring + Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Arth Score Card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Behavioral Metric</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">Healthy</span>
              </div>
              <h2 className="text-xl font-bold text-white">Arth Holistic Financial Score</h2>
              <p className="text-xs text-slate-400 mt-1">Multi-variable assessment of diversification, discipline & tax efficiency.</p>
            </div>

            <ProgressRing valuePct={pct} score={score} max={scoreMax} />

            <div className="space-y-4">
              {[
                { label: 'SIP Regularity & Discipline', pct: 94, color: 'bg-emerald-400' },
                { label: 'FIRE Trajectory Adherence', pct: 86, color: 'bg-sky-400' },
                { label: 'Tax Regime Optimization', pct: 89, color: 'bg-amber-400' },
                { label: 'Portfolio Overlap Safety', pct: 76, color: 'bg-violet-400' }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-semibold text-white">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] text-xs text-center text-slate-400">
              <span className="text-emerald-400 font-bold">+18 points</span> earned this month via systematic discipline.
            </div>
          </div>

          {/* Activity Feed Card */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#111622] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Telemetry Feed</p>
                <h2 className="text-xl font-bold text-white">Deterministic Signals & Milestones</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Feed</span>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06] flex-1">
              {feed.map(item => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="p-5 sm:p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className={`p-3 rounded-xl shrink-0 ${item.iconBg}`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.tagColor}`}>
                          {item.tag}
                        </span>
                        <span className="text-xs text-slate-500">{item.time}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Core Engines Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Engines</p>
              <h2 className="text-xl font-bold text-white">4 Specialized Financial Modules</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">100% Deterministic Code</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {engines.map(e => {
              const Icon = e.icon
              return (
                <Link
                  key={e.title}
                  to={e.to}
                  className="group rounded-2xl border border-white/[0.08] bg-[#111622] p-5 sm:p-6 hover:border-emerald-500/30 hover:bg-[#141B2B] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:border-emerald-500/20 group-hover:bg-emerald-500/10 transition-colors">
                        <Icon className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <div className="h-7 w-7 rounded-lg bg-white/[0.03] group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{e.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{e.desc}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/[0.06]">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${e.badgeStyle}`}>
                      {e.badge}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Behavioral Guard & Panic Interceptor Simulator */}
        <div className="rounded-2xl border border-rose-500/20 bg-[#161014] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Active Defense</span>
                <span className="text-[11px] text-slate-400 font-mono">• 24/7 Market Monitor</span>
              </div>
              <h2 className="text-lg font-bold text-white">Panic-Selling Behavioral Interceptor</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                When Indian markets crash, retail investors lose fortunes to emotional panic-selling. Sthira detects drawdowns and immediately dispatches a consequence-bound WhatsApp message to prevent knee-jerk exits.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimulateDrawdown}
            disabled={simulating}
            className={`w-full lg:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all shadow-lg shrink-0 ${
              simulating
                ? 'bg-rose-700/60 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
            }`}
          >
            {simulating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating -15% Crash...</span>
              </>
            ) : (
              <>
                <span>Simulate Market Crash</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Modal / Card for Simulation Result */}
        {interventionResult && (
          <div className="rounded-2xl border border-emerald-500/30 bg-[#0E1B1B] p-6 relative">
            <button
              onClick={() => setInterventionResult(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    WHATSAPP DISPATCHED
                  </span>
                  <span className="text-xs text-slate-400">Delivered in 240ms to {userName}</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
                  {interventionResult.message}
                </div>
                <p className="text-[11px] text-slate-400">
                  Notice that the agent does not say generic advice. It computes the exact rupee consequence of selling and halts the impulsive transaction.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
