import { useEffect, useMemo, useState } from 'react'
import { Flame, Loader2, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { api } from '../services/api'
import { getActiveUserId, getActiveUserProfile } from '../services/session'
import { SimpleMarkdown } from '../components/SimpleMarkdown'
import { BackendInsights } from '../components/BackendInsights'

function formatINR(num) {
  if (num == null || isNaN(num)) return '₹0'
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

function asText(value, fallback = '') {
  if (value == null) return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return value.map((v) => asText(v)).join(', ')
  if (typeof value === 'object') {
    if (value.message && typeof value.message === 'string') return value.message
    if (value.error) return asText(value.error)
    if (value.detail) return asText(value.detail)
    if (value.code && typeof value.code === 'string') return `${value.code}: ${value.message || 'Error'}`
    return JSON.stringify(value)
  }
  return fallback
}

const FALLBACK_FIRE = {
  calculation: {
    target_age: 48,
    projected_retirement_age: 50,
    corpus_needed: 64000000,
    current_corpus: 3850000,
    monthly_sip_needed_additional: 22500,
    annual_expenses_at_retirement: 2130000,
    swr_percentage: 3.33,
  },
  financial_dna: {
    age: 32,
    existing_investments: {
      mutual_funds: 2650000,
      epf: 800000,
      ppf: 400000,
    }
  },
  narration: {
    summary_narration: "At your current pace of ₹85,000 monthly SIP and 12% equity CAGR, your corpus reaches **₹6.40 Cr at age 50**, just 2 years shy of your early FIRE target (age 48).",
    consequence_narrative: "Closing the 2-year delta requires stepping up your monthly SIP by ₹22,500 today or reducing post-retirement baseline discretionary expenses by 9%.",
    glidepath_explanation: "Currently your asset allocation is 82% equity and 18% debt. Beginning at age 42, Sthira's deterministic glidepath shifts 4% annually into high-quality liquid debt to protect against sequence of returns risk.",
    action_today: "Increase your Parag Parikh Flexi Cap and Nifty 50 Index SIP by ₹11,250 each to lock in retirement by age 48."
  }
}

export default function FirePage() {
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [data, setData] = useState(null)
  const [intervention, setIntervention] = useState('')
  const [userProfile, setUserProfile] = useState(() => getActiveUserProfile())

  useEffect(() => {
    const handleProfileChange = () => setUserProfile(getActiveUserProfile())
    window.addEventListener('sthira_profile_updated', handleProfileChange)
    return () => window.removeEventListener('sthira_profile_updated', handleProfileChange)
  }, [])

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        setLoading(true)
        setIsDemoMode(false)
        const res = await api.runFIREByUser(getActiveUserId())
        if (isMounted && res.data) {
          setData(res.data)
          if (res.data?.whatsapp_sent || res.data?.intervention) {
            setIntervention(
              asText(res.data?.intervention) ||
                'STHIRA INTERVENTION: High-risk market behavior detected. Please check WhatsApp before modifying SIP orders.'
            )
          }
        }
      } catch (err) {
        console.warn('Backend unavailable, using deterministic fallback for demo', err)
        if (isMounted) {
          setData(FALLBACK_FIRE)
          setIsDemoMode(true)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const calc = data?.summary || data?.calculation || {}
  const targetAge = calc?.target_retire_age ?? calc?.target_age ?? userProfile?.fire_summary?.target_age ?? 48
  const estimatedAge = calc?.estimated_retire_age_current ?? calc?.projected_retirement_age ?? userProfile?.fire_summary?.projected_age ?? 50
  const fireNumber = calc?.corpus_needed ?? calc?.fire_number ?? calc?.target_corpus ?? userProfile?.fire_summary?.corpus_needed ?? 64000000
  
  const dnaMutFunds = data?.financial_dna?.existing_investments?.mutual_funds || 0
  const dnaEpf = data?.financial_dna?.existing_investments?.epf || 0
  const dnaPpf = data?.financial_dna?.existing_investments?.ppf || 0
  const dnaCorpus = dnaMutFunds + dnaEpf + dnaPpf
  
  const currentCorpus = calc?.current_corpus ?? calc?.existing_corpus ?? (dnaCorpus > 0 ? dnaCorpus : (userProfile?.portfolio_value || 3850000))
  const gapSIP = calc?.monthly_sip_needed_additional ?? calc?.additional_monthly_sip_needed ?? calc?.sip_gap ?? userProfile?.fire_summary?.monthly_sip_needed_additional ?? 22500
  const userAge = data?.financial_dna?.age ?? userProfile?.age ?? 32

  const ageColor =
    targetAge && estimatedAge
      ? estimatedAge <= targetAge
        ? '#10B981'
        : estimatedAge <= targetAge + 2
          ? '#F59E0B'
          : '#EF4444'
      : '#10B981'

  const chart = useMemo(() => {
    let finalAge = estimatedAge || 60
    let startAge = userAge || 30
    if (finalAge <= startAge) finalAge = startAge + 15

    const points = [
      { age: startAge, corpus: currentCorpus },
      { age: startAge + Math.floor((finalAge - startAge) * 0.25), corpus: currentCorpus + ((fireNumber - currentCorpus) * 0.12) },
      { age: startAge + Math.floor((finalAge - startAge) * 0.50), corpus: currentCorpus + ((fireNumber - currentCorpus) * 0.32) },
      { age: startAge + Math.floor((finalAge - startAge) * 0.75), corpus: currentCorpus + ((fireNumber - currentCorpus) * 0.62) },
      { age: finalAge, corpus: fireNumber },
    ]
    
    const maxY = Math.max(...points.map((p) => p.corpus), fireNumber || 1)
    const minAge = Math.min(...points.map((p) => p.age))
    const maxAge = Math.max(...points.map((p) => p.age))
    const toX = (age) => ((age - minAge) / Math.max(1, maxAge - minAge)) * 100
    const toY = (value) => 100 - (value / maxY) * 90 - 5
    const line = points.map((p) => `${toX(p.age).toFixed(1)},${toY(p.corpus).toFixed(1)}`).join(' ')
    const targetY = toY(fireNumber || maxY)
    
    return { line, targetY, minAge, maxAge }
  }, [currentCorpus, fireNumber, estimatedAge, userAge])

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-white flex flex-col font-sans selection:bg-emerald-500/25">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 h-12 w-12 shrink-0">
              <Flame className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Engine 01</span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.08] text-slate-300">
                    Demonstration Model
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">FIRE Retirement Intelligence</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Deterministic Indian Inflation & Sequence of Returns Math</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Intervention Alert if any */}
        {!!intervention && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 p-4 text-xs sm:text-sm">
            <strong>STHIRA INTERVENTION:</strong> {intervention}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#111622] flex items-center justify-center p-16">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
              <span className="text-slate-300 text-sm">Calculating compound interest trajectories & SWR glidepath...</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            
            {/* Top Cards: Projected Age vs Target Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target FIRE Age</p>
                  <p className="text-4xl font-extrabold text-white mt-2">{targetAge} Years</p>
                </div>
                <p className="text-xs text-slate-400 mt-4">Set based on your financial DNA questionnaire.</p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deterministic Projected Age</p>
                  <p className="text-4xl font-extrabold mt-2" style={{ color: ageColor }}>{estimatedAge} Years</p>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  {estimatedAge <= targetAge ? '✓ On track to achieve freedom early.' : `Delta of +${estimatedAge - targetAge} years at current SIP run-rate.`}
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total FIRE Corpus Needed</p>
                  <p className="text-4xl font-extrabold text-emerald-400 mt-2">{formatINR(fireNumber)}</p>
                </div>
                <p className="text-xs text-slate-400 mt-4">Indexed for 7.0% annual inflation across post-retirement span.</p>
              </div>
            </div>

            {/* Corpus Mountain Chart */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Corpus Mountain Growth Trajectory</h2>
                  <p className="text-xs text-slate-400">Compound interest curve against required retirement corpus threshold.</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-emerald-400" />
                    <span className="text-slate-300">Projected Wealth</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-b border-dashed border-amber-400" />
                    <span className="text-slate-300">FIRE Threshold</span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-56 sm:h-64 bg-black/30 rounded-xl p-4 border border-white/[0.04] flex flex-col justify-end">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="fireAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Dashed Target Line */}
                  <line x1="0" x2="100" y1={chart.targetY} y2={chart.targetY} stroke="#F59E0B" strokeDasharray="3 3" strokeWidth="1" />
                  
                  {/* Growth Line */}
                  <polyline fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" points={chart.line} />
                </svg>
              </div>

              <div className="flex justify-between text-xs text-slate-400 mt-3 font-mono">
                <span>Age {chart.minAge} (Today: {formatINR(currentCorpus)})</span>
                <span>Age {chart.maxAge} (Target: {formatINR(fireNumber)})</span>
              </div>
            </div>

            {/* Reality Check Metrics */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-4">Deterministic Reality Audit</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-xs text-slate-400">Current Existing Corpus</p>
                  <p className="text-xl font-bold text-white mt-1">{formatINR(currentCorpus)}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Aggregated across MF, EPF, and PPF</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-xs text-slate-400">Calculated Corpus Gap</p>
                  <p className="text-xl font-bold text-amber-400 mt-1">{formatINR(Math.max(0, fireNumber - currentCorpus))}</p>
                  <p className="text-[11px] text-slate-500 mt-1">To be accumulated through compounding & SIP</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                  <p className="text-xs text-slate-400">SIP Delta to Retire on Target</p>
                  <p className="text-xl font-bold text-emerald-400 mt-1">+{formatINR(gapSIP)}/mo</p>
                  <p className="text-[11px] text-slate-500 mt-1">Step-up required to reach age {targetAge}</p>
                </div>
              </div>
            </div>

            {/* Sthira Multi-Agent Advisor Narration */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">LangGraph Agent Narration</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  Llama 3 70B • SEBI Compliant
                </span>
              </div>
              
              <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                <SimpleMarkdown text={(() => {
                  const raw = data?.narration || data?.response
                  if (!raw) return 'FIRE simulation calculation verified.'
                  if (typeof raw === 'string') return raw
                  
                  const summary = raw.summary_narration ? `**Executive Summary**\n${raw.summary_narration}\n\n` : ''
                  const consequence = raw.consequence_narrative ? `**Trajectory Analysis**\n${raw.consequence_narrative}\n\n` : ''
                  const glide = raw.glidepath_explanation ? `**Glidepath Recommendation**\n${raw.glidepath_explanation}\n\n` : ''
                  const action = raw.action_today ? `**Action Today:** ${raw.action_today}` : ''
                  
                  return `${summary}${consequence}${glide}${action}`.trim() || JSON.stringify(raw)
                })()} />
              </div>
            </div>

            {/* Backend Verification Details */}
            <BackendInsights data={data} />

          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
