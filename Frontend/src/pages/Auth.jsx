import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  PieChart,
  Wallet,
  TrendingUp,
  AlertTriangle,
  Building,
  Calendar,
  DollarSign,
  HeartHandshake,
  Layers,
  ChevronRight,
  Zap,
  Eye,
  EyeOff,
  Activity,
  Check,
  Info
} from 'lucide-react'
import { signupUser, loginUser, DEFAULT_PERSONAS, setActiveUserId } from '../services/session'

const POPULAR_FUNDS = [
  { id: 'ppfas', name: 'Parag Parikh Flexi Cap', category: 'Flexi Cap', xirr: '19.4%' },
  { id: 'hdfc_mid', name: 'HDFC Mid-Cap Opportunities', category: 'Mid Cap', xirr: '17.2%' },
  { id: 'sbi_small', name: 'SBI Small Cap Fund', category: 'Small Cap', xirr: '22.8%' },
  { id: 'axis_blue', name: 'Axis Bluechip Fund', category: 'Large Cap', xirr: '12.4%' },
  { id: 'mirae_large', name: 'Mirae Asset Large Cap', category: 'Large Cap', xirr: '13.5%' },
  { id: 'uti_nifty', name: 'UTI Nifty 50 Index Fund', category: 'Index', xirr: '14.1%' },
  { id: 'nippon_small', name: 'Nippon India Small Cap', category: 'Small Cap', xirr: '23.5%' },
  { id: 'icici_prud', name: 'ICICI Prudential Bluechip', category: 'Large Cap', xirr: '14.8%' },
]

function formatINR(num) {
  if (num == null || isNaN(num)) return '₹0'
  const abs = Math.abs(Math.round(num))
  const sign = num < 0 ? '-' : ''
  const str = abs.toString()
  if (str.length <= 3) return sign + '₹' + str
  let lastThree = str.slice(-3)
  let rest = str.slice(0, -3)
  if (rest.length > 0) lastThree = ',' + lastThree
  return sign + '₹' + rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
}

export default function Auth({ defaultMode }) {
  const navigate = useNavigate()
  const location = useLocation()

  // Determine initial mode based on route or prop
  const initialMode = useMemo(() => {
    if (defaultMode === 'login' || location.pathname.includes('/login')) return 'login'
    return 'signup'
  }, [defaultMode, location.pathname])

  const [mode, setMode] = useState(initialMode)
  const isLogin = mode === 'login'

  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup Multi-Step Form State
  const [signupData, setSignupData] = useState({
    // Step 1: Identity & Credentials
    name: '',
    email: '',
    password: '',
    age: 29,
    city: 'Bengaluru',

    // Step 2: Income & Cash Flows
    annual_salary: 2400000,
    monthly_in_hand: 155000,
    monthly_expenses: 60000,
    tax_regime: 'NEW',

    // Step 3: Wealth & Portfolio Details (For Portfolio Page)
    portfolio_value: 1850000,
    total_invested: 1400000,
    monthly_sip: 45000,
    equity_pct: 80,
    selected_funds: ['Parag Parikh Flexi Cap', 'HDFC Mid-Cap Opportunities', 'Axis Bluechip Fund'],

    // Step 4: Behavioral DNA & Goals
    target_retire_age: 48,
    panic_drop_threshold: 15,
    risk_stance: 'Aggressive Growth',
    emergency_months: 6,
    panic_action: 'Buy the Dip'
  })

  // Synchronize mode if path changes
  useEffect(() => {
    if (location.pathname.includes('/login')) {
      setMode('login')
    } else if (location.pathname.includes('/signup')) {
      setMode('signup')
    }
  }, [location.pathname])

  // Calculations for live preview
  const savingsRate = useMemo(() => {
    const annualExp = signupData.monthly_expenses * 12
    const rate = Math.max(0, Math.min(100, Math.round(((signupData.annual_salary - annualExp) / signupData.annual_salary) * 100)))
    return isNaN(rate) ? 50 : rate
  }, [signupData.annual_salary, signupData.monthly_expenses])

  const calculatedOverlap = useMemo(() => {
    const funds = signupData.selected_funds || []
    const hasAxis = funds.some(f => f.toLowerCase().includes('axis'))
    const hasMirae = funds.some(f => f.toLowerCase().includes('mirae'))
    if (hasAxis && hasMirae) return 65
    if (funds.length >= 4) return 52
    if (funds.length >= 2) return 38
    return 15
  }, [signupData.selected_funds])

  const handleFundToggle = (fundName) => {
    setSignupData(prev => {
      const current = prev.selected_funds || []
      const exists = current.includes(fundName)
      if (exists) {
        if (current.length <= 1) return prev
        return { ...prev, selected_funds: current.filter(f => f !== fundName) }
      } else {
        return { ...prev, selected_funds: [...current, fundName] }
      }
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!loginIdentifier) {
      setError('Please provide your email address or user account ID.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const res = loginUser(loginIdentifier, loginPassword)
      setIsSubmitting(false)
      if (res.success) {
        navigate('/')
      } else {
        setError(res.message || 'Login failed')
      }
    }, 400)
  }

  const handleFastPersonaLogin = (personaKey) => {
    const persona = DEFAULT_PERSONAS[personaKey]
    if (persona) {
      loginUser(persona.email, 'demo')
      navigate('/')
    }
  }

  const handleSignupSubmit = () => {
    setError('')
    if (!signupData.name || !signupData.email) {
      setError('Name and Email are required.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      signupUser(signupData)
      setIsSubmitting(false)
      navigate('/')
    }, 600)
  }

  const nextStep = () => {
    setError('')
    if (step === 1) {
      if (!signupData.name.trim()) {
        setError('Please enter your full name.')
        return
      }
      if (!signupData.email.trim() || !signupData.email.includes('@')) {
        setError('Please enter a valid email address.')
        return
      }
    }
    setStep(s => Math.min(4, s + 1))
  }

  const prevStep = () => {
    setError('')
    setStep(s => Math.max(1, s - 1))
  }

  return (
    <div className="min-h-screen w-full bg-[#080B11] text-slate-100 flex flex-col selection:bg-emerald-500/25 selection:text-white">
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* ========================================================= */}
        {/* LEFT PANEL: 21st.dev Cinematic Institutional Showcase    */}
        {/* ========================================================= */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 xl:p-14 overflow-hidden border-r border-white/[0.08] bg-[#0A0E18]">
          {/* Ambient Lighting & Mesh Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          
          {/* Background Micro Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Top Brand & Back Link */}
          <div className="relative z-10 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-sm transition-transform group-hover:scale-105">
                <ShieldCheck className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                  Sthira<span className="text-emerald-400">.</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mt-1">
                  Autonomous Wealth OS
                </span>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>10 LangGraph Agents • SEBI RAG Guarded</span>
            </div>
          </div>

          {/* Middle: Live Simulated Crisis Telemetry Card */}
          <div className="relative z-10 flex flex-col gap-5 my-8">
            <div className="rounded-2xl border border-white/10 bg-[#111726]/80 backdrop-blur-xl p-5 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-white tracking-wide">Crisis Defense Interceptor</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  SEBI Compliant
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Simulated Event:</span>
                  <span className="font-bold text-rose-400">Nifty -14.8% Market Drawdown</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 font-semibold block mb-1">WhatsApp Intervention Triggered:</strong>
                  "Halting your Parag Parikh Flexi Cap SIP today locks in market losses and delays your age 48 FIRE milestone by 19 months. Stay disciplined."
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.06]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase">Panic Protection</span>
                  <span className="text-xs font-bold text-emerald-400">₹4.8 Lakhs Saved</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase">SIP Streak</span>
                  <span className="text-xs font-bold text-slate-200">Protected (412 Days)</span>
                </div>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <div className="h-5 w-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span><strong>0% Hallucinations:</strong> 100% deterministic Python math engines.</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <div className="h-5 w-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span><strong>Portfolio Overlap Auditor:</strong> Cosine similarity on stock holdings.</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <div className="h-5 w-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span><strong>Zero-Knowledge:</strong> Encrypted, private financial profiles.</span>
              </div>
            </div>
          </div>

          {/* Bottom: Return link */}
          <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Overview</span>
            </Link>
            <span className="text-[11px] text-slate-500">AES-256 Encrypted</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: Interactive Form (Sign In / Sign Up Intake)   */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 overflow-y-auto max-h-screen">
          
          {/* Mobile Top Header */}
          <div className="flex lg:hidden items-center justify-between pb-6 mb-4 border-b border-white/[0.08]">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              <span className="font-extrabold text-white text-lg">Sthira<span className="text-emerald-400">.</span></span>
            </Link>
            <Link to="/" className="text-xs text-slate-400 hover:text-white">
              Back to Home
            </Link>
          </div>

          <div className="w-full max-w-xl mx-auto flex flex-col gap-6 my-auto">
            
            {/* Fluid Segmented Tab Switcher */}
            <div className="flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !isLogin
                    ? 'bg-emerald-500 text-[#080B11] shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Sign Up (One-Time Intake)
              </button>
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isLogin
                    ? 'bg-emerald-500 text-[#080B11] shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Sign In (Existing User)
              </button>
            </div>

            {/* Error Message Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-medium"
                >
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================== */}
            {/* TAB 1: SIGN IN VIEW                                */}
            {/* =================================================== */}
            {isLogin ? (
              <motion.div
                key="login-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Welcome to Sthira Terminal
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Authenticate to access your active financial telemetry, portfolio x-ray, and panic interceptors.
                  </p>
                </div>

                {/* 1-Click Fast Evaluator Personas */}
                <div className="flex flex-col gap-2.5 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Instant Evaluator Personas (1-Click)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Zero Typing</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleFastPersonaLogin('user_rahul_sharma')}
                      className="flex flex-col text-left p-2.5 rounded-xl border border-white/[0.06] bg-[#0E131F] hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all cursor-pointer group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400">Rahul Sharma</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">₹38.5L • ₹28L CTC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFastPersonaLogin('user_priya_verma')}
                      className="flex flex-col text-left p-2.5 rounded-xl border border-white/[0.06] bg-[#0E131F] hover:border-amber-500/40 hover:bg-amber-500/10 transition-all cursor-pointer group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-amber-400">Priya Verma</span>
                      <span className="text-[10px] text-amber-400 font-semibold">₹24.2L • Overlap Alert</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFastPersonaLogin('user_santosh_pradhan')}
                      className="flex flex-col text-left p-2.5 rounded-xl border border-white/[0.06] bg-[#0E131F] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all cursor-pointer group"
                    >
                      <span className="text-xs font-bold text-white group-hover:text-blue-400">Santosh Pradhan</span>
                      <span className="text-[10px] text-blue-400 font-semibold">₹84.5L • Senior</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 my-1">
                  <div className="h-px bg-white/[0.08] flex-1" />
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Or Enter Credentials</span>
                  <div className="h-px bg-white/[0.08] flex-1" />
                </div>

                {/* Login Form */}
                <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-slate-300">Email Address or Account ID</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="you@domain.com or user_rahul_sharma"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        className="w-full bg-[#111726] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-300">Passphrase</label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        <span>{showPassword ? 'Hide' : 'Show'}</span>
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-[#111726] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3.5 text-sm font-bold text-[#080B11] shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Authenticating Terminal...' : 'Authenticate & Enter Sthira OS'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); }}
                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    Don't have an identity profile? <strong className="text-white underline">Sign up here</strong>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup-mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Build Your Financial DNA
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    One-time intake. Enter your portfolio and cash flows once to autonomously power all analytical engines.
                  </p>
                </div>

                {/* Progress Stepper Bar */}
                <div className="flex flex-col gap-2 p-4 rounded-2xl border border-white/10 bg-[#111726]">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-400">Step {step} of 4:</span>
                      <span className="text-slate-200 font-semibold">
                        {step === 1 && '1. Identity & Account Credentials'}
                        {step === 2 && '2. Salary, Cash Flows & Tax Stance'}
                        {step === 3 && '3. Mutual Fund Portfolio & Holdings'}
                        {step === 4 && '4. Behavioral DNA & Stress Testing'}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                      {Math.round((step / 4) * 100)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-white/[0.08] rounded-full h-2 overflow-hidden mt-1">
                    <motion.div
                      className="bg-emerald-500 h-full rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      initial={{ width: '25%' }}
                      animate={{ width: `${(step / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* STEP 1: Identity & Credentials */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Utkarsh Singh"
                          value={signupData.name}
                          onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Email Address *</label>
                        <input
                          type="email"
                          placeholder="you@domain.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Passphrase</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Current Age</label>
                        <input
                          type="number"
                          min="18"
                          max="80"
                          value={signupData.age}
                          onChange={(e) => setSignupData({ ...signupData, age: Number(e.target.value) })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Base City</label>
                        <input
                          type="text"
                          placeholder="Bengaluru, Mumbai, Delhi..."
                          value={signupData.city}
                          onChange={(e) => setSignupData({ ...signupData, city: e.target.value })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Income & Cash Flows */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-slate-300">Annual Gross CTC / Income</label>
                        <span className="text-sm font-bold text-emerald-400">{formatINR(signupData.annual_salary)}</span>
                      </div>
                      <input
                        type="range"
                        min="600000"
                        max="8000000"
                        step="100000"
                        value={signupData.annual_salary}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          setSignupData({
                            ...signupData,
                            annual_salary: val,
                            monthly_in_hand: Math.round((val * 0.72) / 12)
                          })
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex gap-2 mt-1">
                        {[1200000, 1800000, 2400000, 3600000, 5000000].map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSignupData({ ...signupData, annual_salary: s, monthly_in_hand: Math.round((s * 0.72) / 12) })}
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                              signupData.annual_salary === s
                                ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-400'
                                : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                            }`}
                          >
                            ₹{(s / 100000).toFixed(0)}L
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Monthly In-Hand</label>
                        <input
                          type="number"
                          step="5000"
                          value={signupData.monthly_in_hand}
                          onChange={(e) => setSignupData({ ...signupData, monthly_in_hand: Number(e.target.value) })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-300">Monthly Fixed Expenses</label>
                        <input
                          type="number"
                          step="5000"
                          value={signupData.monthly_expenses}
                          onChange={(e) => setSignupData({ ...signupData, monthly_expenses: Number(e.target.value) })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-slate-300">Preferred Tax Regime</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, tax_regime: 'NEW' })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            signupData.tax_regime === 'NEW'
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-emerald-400">New Regime (115BAC)</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Slabs up to 30%, ₹75k std deduction</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, tax_regime: 'OLD' })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            signupData.tax_regime === 'OLD'
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-emerald-400">Old Regime (Exemptions)</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Utilizes 80C, 80D, HRA & Home Loan</div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Mutual Fund Portfolio & Holdings (Crucial for Portfolio Page!) */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-slate-300">Total Portfolio Value</label>
                          <span className="text-sm font-bold text-emerald-400">{formatINR(signupData.portfolio_value)}</span>
                        </div>
                        <input
                          type="number"
                          step="50000"
                          value={signupData.portfolio_value}
                          onChange={(e) => {
                            const val = Number(e.target.value)
                            setSignupData({
                              ...signupData,
                              portfolio_value: val,
                              total_invested: Math.round(val * 0.78)
                            })
                          }}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-slate-300">Monthly SIP Amount</label>
                          <span className="text-sm font-bold text-emerald-400">{formatINR(signupData.monthly_sip)}/mo</span>
                        </div>
                        <input
                          type="number"
                          step="5000"
                          value={signupData.monthly_sip}
                          onChange={(e) => setSignupData({ ...signupData, monthly_sip: Number(e.target.value) })}
                          className="bg-[#111726] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Selectable Mutual Funds */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-slate-300">Active Schemes (Powers the Overlap Engine)</label>
                        <span className="text-[10px] text-slate-400">Select all you currently hold</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {POPULAR_FUNDS.map(fund => {
                          const isSelected = signupData.selected_funds.includes(fund.name)
                          return (
                            <button
                              key={fund.id}
                              type="button"
                              onClick={() => handleFundToggle(fund.name)}
                              className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span className={`text-xs font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`}>
                                  {fund.name}
                                </span>
                                <span className="text-[10px] text-slate-500">{fund.category} • Avg {fund.xirr}</span>
                              </div>
                              <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-emerald-400 bg-emerald-400 text-[#080B11]' : 'border-slate-600'
                              }`}>
                                {isSelected && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Asset Allocation Slider */}
                    <div className="flex flex-col gap-2 pt-1">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                        <span>Allocation: {signupData.equity_pct}% Equity</span>
                        <span className="text-slate-400">{100 - signupData.equity_pct}% Debt & Liquid</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="95"
                        step="5"
                        value={signupData.equity_pct}
                        onChange={(e) => setSignupData({ ...signupData, equity_pct: Number(e.target.value) })}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Behavioral DNA & Risk Shield */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-slate-300">Target Early Retirement (FIRE) Age</label>
                        <span className="text-sm font-bold text-emerald-400">{signupData.target_retire_age} yrs old</span>
                      </div>
                      <input
                        type="range"
                        min="38"
                        max="65"
                        step="1"
                        value={signupData.target_retire_age}
                        onChange={(e) => setSignupData({ ...signupData, target_retire_age: Number(e.target.value) })}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-medium text-slate-300">
                        Stress Test: If Nifty crashes 15% in 3 weeks, you would:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, panic_action: 'Buy the Dip', panic_drop_threshold: 18 })}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            signupData.panic_action === 'Buy the Dip'
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold text-emerald-400 block">🟢 Buy Dip</span>
                          <span className="text-[10px] text-slate-400">Deploy dry powder</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, panic_action: 'Hold', panic_drop_threshold: 12 })}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            signupData.panic_action === 'Hold'
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold text-amber-400 block">🟡 Hold Steady</span>
                          <span className="text-[10px] text-slate-400">Continue SIP</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, panic_action: 'Panic Protect', panic_drop_threshold: 8 })}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            signupData.panic_action === 'Panic Protect'
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-bold text-rose-400 block">🔴 Stop SIP</span>
                          <span className="text-[10px] text-slate-400">High panic anxiety</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-slate-300">Target Emergency Fund Buffer</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, emergency_months: 6 })}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            signupData.emergency_months === 6
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold text-xs'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 text-xs'
                          }`}
                        >
                          6 Months ({formatINR(signupData.monthly_expenses * 6)})
                        </button>
                        <button
                          type="button"
                          onClick={() => setSignupData({ ...signupData, emergency_months: 12 })}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            signupData.emergency_months === 12
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-bold text-xs'
                              : 'border-white/10 bg-white/[0.02] text-slate-400 text-xs'
                          }`}
                        >
                          12 Months ({formatINR(signupData.monthly_expenses * 12)})
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Real-time Calculated Preview Banner */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Savings Rate</span>
                      <span className="font-bold text-emerald-400">{savingsRate}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Overlap Score</span>
                      <span className={`font-bold ${calculatedOverlap > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {calculatedOverlap}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">FIRE Horizon</span>
                      <span className="font-bold text-white">{Math.max(1, signupData.target_retire_age - signupData.age)} yrs</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">Deterministic Math</span>
                </div>

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Previous</span>
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-[#080B11] shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <span>Continue</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSignupSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-[#080B11] shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>{isSubmitting ? 'Configuring Sthira OS...' : 'Complete Intake & Launch Sthira'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    Already have an account? <strong className="text-white underline">Sign in here</strong>
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer note */}
          <div className="w-full text-center text-[11px] text-slate-500 pt-6">
            Sthira Autonomous Behavioral Wealth Operating System • Grounded Deterministic Projections
          </div>
        </div>

      </div>
    </div>
  )
}
