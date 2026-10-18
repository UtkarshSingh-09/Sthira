const KEY = 'sthira_user_id'
const LEGACY_KEY = 'astraguard_user_id'
const PROFILE_KEY = 'sthira_active_profile'
const USERS_STORE_KEY = 'sthira_users_db'
const SIGNUP_FLAG_KEY = 'sthira_just_signed_up'
const AUTH_TOKEN_KEY = 'sthira_auth_token'

export const DEFAULT_PERSONAS = {
  'user_rahul_sharma': {
    user_id: 'user_rahul_sharma',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@techcorp.in',
    tag: 'FIRE Candidate • ₹28L CTC',
    age: 32,
    city: 'Bengaluru',
    annual_salary: 2800000,
    monthly_in_hand: 175000,
    monthly_expenses: 65000,
    tax_regime: 'NEW',
    portfolio_value: 3850000,
    total_invested: 2950000,
    monthly_sip: 85000,
    xirr: 15.8,
    equity_pct: 82,
    debt_pct: 18,
    overlap_score: 52,
    holdings: [
      { name: 'Parag Parikh Flexi Cap', code: 'PPFAS', invested: 1200000, current: 1650000, xirr: 21.2, category: 'Flexi Cap' },
      { name: 'HDFC Mid-Cap Opportunities', code: 'HDFC Mid', invested: 750000, current: 980000, xirr: 16.8, category: 'Mid Cap' },
      { name: 'SBI Small Cap Fund', code: 'SBI Small', invested: 450000, current: 620000, xirr: 24.1, category: 'Small Cap' },
      { name: 'Axis Bluechip Fund', code: 'Axis Blue', invested: 350000, current: 390000, xirr: 12.4, category: 'Large Cap' },
      { name: 'Mirae Asset Large Cap', code: 'Mirae Large', invested: 200000, current: 210000, xirr: 11.5, category: 'Large Cap' },
    ],
    red_flags: [
      'Axis Bluechip & Mirae Asset Large Cap share 65% common holdings in Nifty Top 10.',
      '₹1.4L in Parag Parikh Flexi Cap reaches LTCG 12.5% in 23 days. Premature exit costs ₹10,500 tax penalty.',
      'High equity concentration (82%). Consider debt rebalancing as retirement approaches.'
    ],
    arth_score: { total: 840, max: 1000, grade: 'Tier 1 Prime' },
    fire_summary: {
      current_age: 32,
      target_age: 45,
      projected_age: 46,
      corpus_needed: 65000000,
      current_corpus: 3850000,
      monthly_sip_needed_additional: 18500
    },
    tax_summary: {
      optimal_regime: 'New Regime (Sec 115BAC)',
      savings: 48500,
      old_regime_tax: 278200,
      new_regime_tax: 229700
    },
    behavioral: {
      panic_drop_threshold: 15,
      risk_stance: 'Aggressive Growth',
      emergency_months: 6,
      panic_action: 'Buy the Dip'
    },
    streak_days: 127
  },
  'user_priya_verma': {
    user_id: 'user_priya_verma',
    name: 'Priya Verma',
    email: 'priya.verma@fintech.co',
    tag: 'IT Lead • Overlap Alert',
    age: 29,
    city: 'Mumbai',
    annual_salary: 2200000,
    monthly_in_hand: 142000,
    monthly_expenses: 58000,
    tax_regime: 'OLD',
    portfolio_value: 2420000,
    total_invested: 1950000,
    monthly_sip: 55000,
    xirr: 13.4,
    equity_pct: 78,
    debt_pct: 22,
    overlap_score: 58,
    holdings: [
      { name: 'Mirae Asset Large Cap', code: 'Mirae Large', invested: 800000, current: 990000, xirr: 13.2, category: 'Large Cap' },
      { name: 'Axis Bluechip Fund', code: 'Axis Blue', invested: 650000, current: 780000, xirr: 11.9, category: 'Large Cap' },
      { name: 'Nippon India Small Cap', code: 'Nippon Small', invested: 300000, current: 410000, xirr: 19.5, category: 'Small Cap' },
      { name: 'HDFC Corporate Bond', code: 'HDFC Debt', invested: 200000, current: 240000, xirr: 7.8, category: 'Debt' },
    ],
    red_flags: [
      'Severe Large Cap overlap: 58% duplication between Mirae Large and Axis Bluechip.',
      'Emergency fund is below recommended 6-month buffer.'
    ],
    arth_score: { total: 710, max: 1000, grade: 'Tier 2 Guarded' },
    fire_summary: {
      current_age: 29,
      target_age: 48,
      projected_age: 51,
      corpus_needed: 42000000,
      current_corpus: 2420000,
      monthly_sip_needed_additional: 14200
    },
    tax_summary: {
      optimal_regime: 'Old Regime (80C + 80D + HRA)',
      savings: 36200,
      old_regime_tax: 194000,
      new_regime_tax: 230200
    },
    behavioral: {
      panic_drop_threshold: 12,
      risk_stance: 'Moderate Balanced',
      emergency_months: 6,
      panic_action: 'Hold'
    },
    streak_days: 84
  },
  'user_santosh_pradhan': {
    user_id: 'user_santosh_pradhan',
    name: 'Santosh Chandrakant Pradhan',
    email: 'santosh.pradhan@gov.in',
    tag: 'Senior Citizen • Form 16 Verified',
    age: 64,
    city: 'Pune',
    annual_salary: 1450000,
    monthly_in_hand: 105000,
    monthly_expenses: 42000,
    tax_regime: 'OLD',
    portfolio_value: 8450000,
    total_invested: 6200000,
    monthly_sip: 25000,
    xirr: 11.8,
    equity_pct: 45,
    debt_pct: 55,
    overlap_score: 24,
    holdings: [
      { name: 'SBI Equity Hybrid Fund', code: 'SBI Hybrid', invested: 3000000, current: 4100000, xirr: 12.8, category: 'Hybrid' },
      { name: 'HDFC Short Term Debt', code: 'HDFC Debt', invested: 2000000, current: 2650000, xirr: 7.4, category: 'Debt' },
      { name: 'ICICI Prudential Bluechip', code: 'ICICI Blue', invested: 1200000, current: 1700000, xirr: 13.5, category: 'Large Cap' },
    ],
    red_flags: [
      'Low equity upside potential, but excellent stability for post-retirement drawdown.',
      'Check Senior Citizen 80TTB interest deduction limits before FY closing.'
    ],
    arth_score: { total: 915, max: 1000, grade: 'Tier 1 Prime Sovereign' },
    fire_summary: {
      current_age: 64,
      target_age: 60,
      projected_age: 60,
      corpus_needed: 80000000,
      current_corpus: 8450000,
      monthly_sip_needed_additional: 0
    },
    tax_summary: {
      optimal_regime: 'Old Regime (80TTB + 80D Senior)',
      savings: 54000,
      old_regime_tax: 82000,
      new_regime_tax: 136000
    },
    behavioral: {
      panic_drop_threshold: 8,
      risk_stance: 'Conservative Capital Preservation',
      emergency_months: 12,
      panic_action: 'Hold'
    },
    streak_days: 340
  }
}

// Fallback for user_123
DEFAULT_PERSONAS['user_123'] = DEFAULT_PERSONAS['user_santosh_pradhan']

export function getActiveUserId() {
  try {
    const v = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY)
    return v && String(v).trim() ? v : 'user_rahul_sharma'
  } catch (_) {
    return 'user_rahul_sharma'
  }
}

export function setActiveUserId(userId) {
  if (!userId) return
  try {
    localStorage.setItem(KEY, String(userId))
    localStorage.setItem(LEGACY_KEY, String(userId))
  } catch (_) {}
}

export function getStoredUsersDb() {
  try {
    const raw = localStorage.getItem(USERS_STORE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (_) {
    return {}
  }
}

export function saveUserToDb(profile) {
  if (!profile || !profile.email) return
  try {
    const db = getStoredUsersDb()
    const emailKey = profile.email.toLowerCase().trim()
    db[emailKey] = profile
    if (profile.user_id) {
      db[profile.user_id] = profile
    }
    localStorage.setItem(USERS_STORE_KEY, JSON.stringify(db))
  } catch (_) {}
}

export function getActiveUserProfile() {
  try {
    // 1. Try explicitly stored custom active profile
    const rawActive = localStorage.getItem(PROFILE_KEY)
    if (rawActive) {
      const parsed = JSON.parse(rawActive)
      if (parsed && parsed.name) {
        return parsed
      }
    }

    // 2. Try looking up current user id in DB
    const currentId = getActiveUserId()
    const db = getStoredUsersDb()
    if (db[currentId]) {
      return db[currentId]
    }

    // 3. Fallback to predefined personas
    if (DEFAULT_PERSONAS[currentId]) {
      return DEFAULT_PERSONAS[currentId]
    }

    return DEFAULT_PERSONAS['user_rahul_sharma']
  } catch (_) {
    return DEFAULT_PERSONAS['user_rahul_sharma']
  }
}

export function setActiveUserProfile(profile) {
  if (!profile) return
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    if (profile.user_id) {
      setActiveUserId(profile.user_id)
    }
    saveUserToDb(profile)
    // Dispatch custom storage event for live components
    window.dispatchEvent(new Event('sthira_profile_updated'))
  } catch (_) {}
}

export function signupUser(formData) {
  const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
  
  // Calculate reasonable portfolio holdings if user specified a total portfolio value
  const totalVal = Number(formData.portfolio_value) || 1500000
  const totalInv = Number(formData.total_invested) || Math.round(totalVal * 0.78)
  const monthlySip = Number(formData.monthly_sip) || Math.round((Number(formData.annual_salary) || 1800000) * 0.12 / 12)
  const age = Number(formData.age) || 30
  const targetAge = Number(formData.target_retire_age) || 48
  const annualSalary = Number(formData.annual_salary) || 1800000
  const monthlyExpenses = Number(formData.monthly_expenses) || Math.round((annualSalary * 0.4) / 12)

  // Selected funds or standard diversified portfolio
  const selectedFundNames = (formData.selected_funds && formData.selected_funds.length > 0)
    ? formData.selected_funds
    : ['Parag Parikh Flexi Cap', 'HDFC Mid-Cap Opportunities', 'Axis Bluechip Fund']

  const defaultPool = [
    { name: 'Parag Parikh Flexi Cap', code: 'PPFAS', category: 'Flexi Cap', xirr: 18.5, weight: 0.45 },
    { name: 'HDFC Mid-Cap Opportunities', code: 'HDFC Mid', category: 'Mid Cap', xirr: 16.2, weight: 0.30 },
    { name: 'Axis Bluechip Fund', code: 'Axis Blue', category: 'Large Cap', xirr: 12.8, weight: 0.25 },
    { name: 'SBI Small Cap Fund', code: 'SBI Small', category: 'Small Cap', xirr: 21.0, weight: 0.20 },
    { name: 'Mirae Asset Large Cap', code: 'Mirae Large', category: 'Large Cap', xirr: 13.1, weight: 0.20 },
  ]

  const holdings = selectedFundNames.map((fundName) => {
    const match = defaultPool.find(p => p.name.toLowerCase().includes(fundName.toLowerCase())) || {
      name: fundName,
      code: fundName.split(' ')[0],
      category: 'Diversified Equity',
      xirr: 15.2,
      weight: 1 / selectedFundNames.length
    }
    const share = 1 / selectedFundNames.length
    return {
      name: match.name,
      code: match.code,
      category: match.category,
      invested: Math.round(totalInv * share),
      current: Math.round(totalVal * share),
      xirr: match.xirr
    }
  })

  // Calculate Overlap Score (heuristic based on large cap duplication)
  const hasAxis = selectedFundNames.some(f => f.toLowerCase().includes('axis'))
  const hasMirae = selectedFundNames.some(f => f.toLowerCase().includes('mirae'))
  const overlapScore = (hasAxis && hasMirae) ? 62 : selectedFundNames.length > 2 ? 46 : 28

  // Calculate FIRE metrics
  const yearsToRetire = Math.max(1, targetAge - age)
  const annualExpenseAtRetire = monthlyExpenses * 12 * Math.pow(1.06, yearsToRetire)
  const corpusNeeded = Math.round(annualExpenseAtRetire * 25)

  // Calculate estimated Arth Score (0-1000)
  const savingsRate = Math.min(1, (annualSalary - (monthlyExpenses * 12)) / annualSalary)
  const emergencyCoverage = totalVal / (monthlyExpenses * 6)
  const baseScore = Math.round(500 + (savingsRate * 250) + Math.min(150, emergencyCoverage * 30))
  const arthScore = Math.min(960, Math.max(450, baseScore))

  const newProfile = {
    user_id: userId,
    name: formData.name || 'Verified Member',
    email: formData.email,
    password: formData.password || 'password123',
    tag: `Custom Profile • ₹${(annualSalary / 100000).toFixed(1)}L CTC`,
    age: age,
    city: formData.city || 'India',
    annual_salary: annualSalary,
    monthly_in_hand: Number(formData.monthly_in_hand) || Math.round(annualSalary * 0.72 / 12),
    monthly_expenses: monthlyExpenses,
    tax_regime: formData.tax_regime || 'NEW',
    portfolio_value: totalVal,
    total_invested: totalInv,
    monthly_sip: monthlySip,
    xirr: 15.2,
    equity_pct: Number(formData.equity_pct) || 80,
    debt_pct: 100 - (Number(formData.equity_pct) || 80),
    overlap_score: overlapScore,
    holdings: holdings,
    red_flags: [
      `Portfolio overlap score is ${overlapScore}%. Consolidating common large-cap holdings will save estimated ₹${Math.round(totalVal * 0.0045).toLocaleString('en-IN')}/year in TER fees.`,
      `Emergency fund target: Maintain ₹${(monthlyExpenses * 6).toLocaleString('en-IN')} (6 months living costs) in liquid debt.`
    ],
    arth_score: {
      total: arthScore,
      max: 1000,
      grade: arthScore > 800 ? 'Tier 1 Prime' : 'Tier 2 Guarded'
    },
    fire_summary: {
      current_age: age,
      target_age: targetAge,
      projected_age: Math.min(70, targetAge + (corpusNeeded > totalVal * 3 ? 2 : 0)),
      corpus_needed: corpusNeeded,
      current_corpus: totalVal,
      monthly_sip_needed_additional: Math.max(0, Math.round((corpusNeeded - totalVal) / (yearsToRetire * 12 * 2.2)))
    },
    tax_summary: {
      optimal_regime: 'New Regime (Sec 115BAC)',
      savings: Math.round(annualSalary * 0.018),
      old_regime_tax: Math.round(annualSalary * 0.12),
      new_regime_tax: Math.round(annualSalary * 0.10)
    },
    behavioral: {
      panic_drop_threshold: Number(formData.panic_drop_threshold) || 15,
      risk_stance: formData.risk_stance || 'Moderate Growth',
      emergency_months: Number(formData.emergency_months) || 6,
      panic_action: formData.panic_action || 'Hold'
    },
    streak_days: 1,
    created_at: new Date().toISOString()
  }

  // Save profile and mark session
  setActiveUserProfile(newProfile)
  try {
    localStorage.setItem(SIGNUP_FLAG_KEY, 'true')
    localStorage.setItem(AUTH_TOKEN_KEY, 'token_' + Date.now())
  } catch (_) {}

  return newProfile
}

export function isJustSignedUp() {
  try {
    return localStorage.getItem(SIGNUP_FLAG_KEY) === 'true'
  } catch (_) {
    return false
  }
}

export function clearJustSignedUpFlag() {
  try {
    localStorage.removeItem(SIGNUP_FLAG_KEY)
  } catch (_) {}
}

export function loginUser(emailOrUserId, password) {
  const query = (emailOrUserId || '').toLowerCase().trim()
  
  // 1. Check if matches persona id or email
  for (const [id, persona] of Object.entries(DEFAULT_PERSONAS)) {
    if (id.toLowerCase() === query || persona.email.toLowerCase() === query || persona.name.toLowerCase() === query) {
      setActiveUserProfile(persona)
      try { localStorage.setItem(AUTH_TOKEN_KEY, 'token_' + Date.now()) } catch (_) {}
      return { success: true, profile: persona }
    }
  }

  // 2. Check registered users DB
  const db = getStoredUsersDb()
  if (db[query]) {
    setActiveUserProfile(db[query])
    try { localStorage.setItem(AUTH_TOKEN_KEY, 'token_' + Date.now()) } catch (_) {}
    return { success: true, profile: db[query] }
  }

  // 3. Fallback check: if user entered demo or custom credentials, create clean session
  if (query) {
    const fallback = {
      ...DEFAULT_PERSONAS['user_rahul_sharma'],
      name: emailOrUserId.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Investor Member',
      email: emailOrUserId.includes('@') ? emailOrUserId : `${query}@sthira.ai`,
      user_id: `user_${Date.now()}`
    }
    setActiveUserProfile(fallback)
    try { localStorage.setItem(AUTH_TOKEN_KEY, 'token_' + Date.now()) } catch (_) {}
    return { success: true, profile: fallback }
  }

  return { success: false, message: 'Invalid credentials' }
}

export function logoutUser() {
  try {
    localStorage.removeItem(PROFILE_KEY)
    localStorage.removeItem(SIGNUP_FLAG_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
    // Revert to demo default persona
    setActiveUserId('user_rahul_sharma')
    window.dispatchEvent(new Event('sthira_profile_updated'))
  } catch (_) {}
}

export function extractUserId(payload) {
  if (!payload || typeof payload !== 'object') return null
  return (
    payload.user_id ||
    payload.userId ||
    payload?.extraction?.user_id ||
    payload?.summary?.user_id ||
    payload?.meta?.user_id ||
    null
  )
}

export function isAuthenticated() {
  try {
    return !!localStorage.getItem(AUTH_TOKEN_KEY)
  } catch (_) {
    return false
  }
}
