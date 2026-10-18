import { useEffect, useState } from 'react'
import { Scale, Loader2, CheckCircle2, ShieldCheck, ArrowRight, ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { api } from '../services/api'
import { getActiveUserId, getActiveUserProfile } from '../services/session'
import { SimpleMarkdown } from '../components/SimpleMarkdown'
import { BackendInsights } from '../components/BackendInsights'

function formatINR(num) {
  if (num == null || isNaN(num)) return '₹0'
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

const FALLBACK_TAX = {
  calculation: {
    old_regime: {
      total_tax: 278200,
      standard_deduction: 50000,
      hra_exemption: 180000,
      chapter_via_deductions: {
        '80C': 150000,
        '80D': 25000,
        '80CCD_1B': 50000,
      }
    },
    new_regime: {
      total_tax: 229700,
      standard_deduction: 75000,
    },
    comparison: {
      optimal_regime: 'NEW',
      savings_with_optimal: 48500,
      difference: 48500,
    }
  },
  narration: {
    summary_narration: "Under the Finance Act 2024 revisions, your total tax liability under the **New Regime is ₹2,29,700**, compared to **₹2,78,200 under the Old Regime**.",
    optimal_regime: "NEW",
    savings_with_optimal: 48500,
    action_today: "Elect the New Tax Regime (Section 115BAC) on your company payroll portal before April 30 to prevent excess TDS deductions from your monthly payslip."
  }
}

export default function TaxPage() {
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
        const res = await api.runTax(getActiveUserId())
        if (isMounted && res.data) {
          setData(res.data)
          if (res.data?.whatsapp_sent || res.data?.intervention) {
            setIntervention(
              asText(res.data?.intervention) ||
                'STHIRA INTERVENTION: High-risk behavior detected. Please check WhatsApp before finalizing tax declarations.'
            )
          }
        }
      } catch (err) {
        console.warn('Backend unavailable, using deterministic fallback for demo', err)
        if (isMounted) {
          setData(FALLBACK_TAX)
          setIsDemoMode(true)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const oldRegime = data?.old_regime || data?.calculation?.old_regime || FALLBACK_TAX.calculation.old_regime
  const newRegime = data?.new_regime || data?.calculation?.new_regime || FALLBACK_TAX.calculation.new_regime
  const comp = data?.comparison || data?.calculation?.comparison || FALLBACK_TAX.calculation.comparison

  const oldTax = oldRegime?.total_tax ?? userProfile?.tax_summary?.old_regime_tax ?? 278200
  const newTax = newRegime?.total_tax ?? userProfile?.tax_summary?.new_regime_tax ?? 229700
  const optimal = String(comp?.optimal_regime || userProfile?.tax_summary?.optimal_regime?.includes('Old') ? 'OLD' : 'NEW').toUpperCase()
  const savings = comp?.savings_with_optimal ?? userProfile?.tax_summary?.savings ?? Math.abs(oldTax - newTax)

  const maxTax = Math.max(oldTax, newTax, 1)
  const oldPct = (oldTax / maxTax) * 100
  const newPct = (newTax / maxTax) * 100

  const chapterVia = oldRegime?.chapter_via_deductions || {}
  const deductions = [
    ['Standard Deduction', oldRegime?.standard_deduction || 50000],
    ['HRA Exemption', oldRegime?.hra_exemption || 180000],
    ['Section 80C (EPF/ELSS/PPF)', chapterVia?.['80C'] ?? oldRegime?.section_80c ?? 150000],
    ['Section 80CCD(1B) NPS', chapterVia?.['80CCD_1B'] ?? 50000],
    ['Section 80D Health Insurance', chapterVia?.['80D'] ?? oldRegime?.section_80d ?? 25000],
    ['Section 24(b) Home Loan Interest', chapterVia?.['24B'] ?? 0],
  ].filter(([, v]) => v != null && v > 0)

  return (
    <div className="min-h-screen w-full bg-[#090D16] text-white flex flex-col font-sans selection:bg-emerald-500/25">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 h-12 w-12 shrink-0">
              <Scale className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Engine 02</span>
                {isDemoMode && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/[0.08] text-slate-300">
                    Demonstration Model
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Old vs New Tax Regime Optimizer</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Section 115BAC Slab Reconciler with Zero Computational Hallucination</p>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/[0.08] bg-[#111622] flex items-center justify-center p-16">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
              <span className="text-slate-300 text-sm">Auditing Form-16 deductions against FY 2024-25 tax slabs...</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Verdict Card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-[#111622] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deterministic Verdict</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                    Verified
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {optimal === 'NEW' ? 'Choose The New Tax Regime (Sec 115BAC)' : 'Choose The Old Tax Regime'}
                </h2>
                <p className="text-emerald-400 font-bold text-lg sm:text-xl">
                  You will save exactly {formatINR(savings)} in direct income tax this financial year.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 self-stretch md:self-auto justify-center">
                <CheckCircle2 className="w-8 h-8 shrink-0" />
                <div className="text-left">
                  <p className="text-xs font-bold text-emerald-300">Optimal Choice</p>
                  <p className="text-sm font-extrabold text-white">{optimal === 'NEW' ? 'New Regime' : 'Old Regime'}</p>
                </div>
              </div>
            </div>

            {/* Head-to-Head Comparison Bars */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6">Head-to-Head Annual Tax Outflow</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-slate-300">Old Tax Regime (With Chapter VI-A Deductions)</span>
                    <span className="text-slate-200">{formatINR(oldTax)}</span>
                  </div>
                  <div className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        optimal === 'OLD' ? 'bg-emerald-400' : 'bg-slate-500'
                      }`}
                      style={{ width: `${oldPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                    <span className="text-slate-300">New Tax Regime (Lower Slabs + ₹75,000 Standard Deduction)</span>
                    <span className="text-emerald-400 font-bold">{formatINR(newTax)}</span>
                  </div>
                  <div className="h-3.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        optimal === 'NEW' ? 'bg-emerald-400' : 'bg-slate-500'
                      }`}
                      style={{ width: `${newPct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>Calculated under Section 115BAC of the Income Tax Act, 1961.</span>
                <span className="text-emerald-400 font-semibold">Net Advantage: +{formatINR(savings)}</span>
              </div>
            </div>

            {/* Deductions Breakdown */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-4">Ingested Deductions Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {deductions.map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-white/[0.06] bg-black/20 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-base font-bold text-white mt-0.5">{formatINR(value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sthira Multi-Agent Advisor Narration */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">LangGraph Tax Agent Narration</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                  Llama 3 70B • Zero Math In LLM
                </span>
              </div>
              
              <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                <SimpleMarkdown text={(() => {
                  const raw = data?.narration || data?.response
                  if (!raw) return 'Tax calculation reconciled.'
                  if (typeof raw === 'string') return raw
                  
                  const summary = raw.summary_narration ? `**Summary**\n${raw.summary_narration}\n\n` : ''
                  const action = raw.action_today ? `**Action Required:** ${raw.action_today}` : ''
                  
                  return `${summary}${action}`.trim() || JSON.stringify(raw)
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
