import { useState, useMemo } from 'react'
import { Flame, Scale, PieChart, ShieldAlert, TrendingUp, CheckCircle, AlertTriangle, ArrowRight, Sparkles, Clock, IndianRupee, Layers } from 'lucide-react'

function formatINR(val) {
  if (val == null || isNaN(val)) return '₹0'
  const rounded = Math.round(val)
  if (Math.abs(rounded) >= 10000000) {
    return `₹${(rounded / 10000000).toFixed(2)} Cr`
  }
  if (Math.abs(rounded) >= 100000) {
    return `₹${(rounded / 100000).toFixed(1)} L`
  }
  return `₹${rounded.toLocaleString('en-IN')}`
}

export default function InteractiveEnginePlayground() {
  const [activeTab, setActiveTab] = useState('fire')

  // FIRE Inputs
  const [age, setAge] = useState(29)
  const [targetRetireAge, setTargetRetireAge] = useState(48)
  const [monthlyExpenses, setMonthlyExpenses] = useState(60000)
  const [existingCorpus, setExistingCorpus] = useState(1200000)
  const [monthlySip, setMonthlySip] = useState(35000)

  // Tax Inputs
  const [salary, setSalary] = useState(2000000)
  const [rentMonthly, setRentMonthly] = useState(30000)
  const [sec80c, setSec80c] = useState(150000)
  const [sec80ccd, setSec80ccd] = useState(50000)
  const [sec80d, setSec80d] = useState(25000)
  const [sec24b, setSec24b] = useState(120000)

  // Behavioral Crash Simulator Inputs
  const [marketDrop, setMarketDrop] = useState(9.5)
  const userPanicThreshold = 15.0

  // 1. Deterministic FIRE Math
  const fireCalc = useMemo(() => {
    const years = Math.max(1, targetRetireAge - age)
    const inflation = 0.06
    const equityReturn = 0.12
    const swr = 0.04

    // Monthly need at retirement
    const monthlyNeedAtRetire = monthlyExpenses * Math.pow(1 + inflation, years)
    const corpusNeeded = (monthlyNeedAtRetire * 12) / swr

    // Future value of existing corpus
    const fvExisting = existingCorpus * Math.pow(1 + equityReturn, years)

    // Future value of current SIP
    const monthlyRate = equityReturn / 12
    const totalMonths = years * 12
    const fvSipCurrent = monthlySip * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)

    const projectedCorpus = fvExisting + fvSipCurrent
    const gap = Math.max(0, corpusNeeded - projectedCorpus)

    // Required total SIP for target
    const targetFvForSip = Math.max(0, corpusNeeded - fvExisting)
    const requiredSip = targetFvForSip / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    const additionalSip = Math.max(0, requiredSip - monthlySip)

    // Current trajectory retirement age estimate
    let trajectoryAge = age + years
    if (projectedCorpus < corpusNeeded) {
      trajectoryAge = Math.min(65, age + years + Math.round((gap / (corpusNeeded * 0.15)) * 10) / 10)
    }

    return {
      corpusNeeded,
      projectedCorpus,
      monthlyNeedAtRetire,
      additionalSip,
      requiredSip,
      trajectoryAge,
      years,
      gap,
    }
  }, [age, targetRetireAge, monthlyExpenses, existingCorpus, monthlySip])

  // 2. Deterministic Tax Math
  const taxCalc = useMemo(() => {
    // Standard Deductions
    const stdOld = 50000
    const stdNew = 75000

    // HRA Exemption (min of 3)
    const annualRent = rentMonthly * 12
    const hraReceived = salary * 0.25
    const hraExemption = Math.min(hraReceived, salary * 0.5, Math.max(0, annualRent - salary * 0.1))

    // Old Regime Deductions
    const totalOldDeductions =
      Math.min(150000, sec80c) +
      Math.min(50000, sec80ccd) +
      Math.min(75000, sec80d) +
      Math.min(200000, sec24b) +
      hraExemption +
      stdOld

    const taxableOld = Math.max(0, salary - totalOldDeductions)
    const taxableNew = Math.max(0, salary - stdNew)

    // Old Progressive Slabs
    let taxOld = 0
    if (taxableOld > 1000000) taxOld += (taxableOld - 1000000) * 0.3 + 112500
    else if (taxableOld > 500000) taxOld += (taxableOld - 500000) * 0.2 + 12500
    else if (taxableOld > 250000) taxOld += (taxableOld - 250000) * 0.05
    taxOld *= 1.04 // 4% cess

    // New Progressive Slabs (FY 2025-26 Budget)
    let taxNew = 0
    if (taxableNew > 2400000) taxNew += (taxableNew - 2400000) * 0.3 + 300000
    else if (taxableNew > 2000000) taxNew += (taxableNew - 2000000) * 0.25 + 200000
    else if (taxableNew > 1600000) taxNew += (taxableNew - 1600000) * 0.2 + 120000
    else if (taxableNew > 1200000) taxNew += (taxableNew - 1200000) * 0.15 + 60000
    else if (taxableNew > 800000) taxNew += (taxableNew - 800000) * 0.1 + 20000
    else if (taxableNew > 400000) taxNew += (taxableNew - 400000) * 0.05
    taxNew *= 1.04 // 4% cess

    const savings = Math.abs(taxOld - taxNew)
    const optimal = taxOld <= taxNew ? 'OLD' : 'NEW'

    return {
      taxOld,
      taxNew,
      savings,
      optimal,
      totalOldDeductions,
      hraExemption,
    }
  }, [salary, rentMonthly, sec80c, sec80ccd, sec80d, sec24b])

  // 3. Behavioral Proximity Math
  const proximityPct = Math.min(100, (marketDrop / userPanicThreshold) * 100)
  const severity = proximityPct >= 90 ? 'CRITICAL' : proximityPct >= 75 ? 'HARD' : proximityPct >= 50 ? 'SOFT' : 'MONITORING'
  const severityBadge =
    severity === 'CRITICAL'
      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
      : severity === 'HARD'
      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'

  return (
    <section id="interactive-playground" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive Engine Playground
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Test the Core Intelligence. <span className="text-emerald-400">Zero Setup Required.</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Experience Sthira’s deterministic financial math and behavioral consequence modeling live in your browser right now.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-2xl bg-[#0E131F] border border-white/[0.08] max-w-3xl mx-auto">
        <button
          onClick={() => setActiveTab('fire')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'fire'
              ? 'bg-emerald-500 text-[#090D16] shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>FIRE Retirement</span>
        </button>

        <button
          onClick={() => setActiveTab('tax')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'tax'
              ? 'bg-emerald-500 text-[#090D16] shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Tax Optimizer</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'portfolio'
              ? 'bg-emerald-500 text-[#090D16] shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Portfolio X-Ray</span>
        </button>

        <button
          onClick={() => setActiveTab('panic')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'panic'
              ? 'bg-emerald-500 text-[#090D16] shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Panic Interceptor</span>
        </button>
      </div>

      {/* Tab 1: FIRE Retirement Planner */}
      {activeTab === 'fire' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8 flex flex-col gap-6">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-emerald-400" />
                <span>Adjust Your Trajectory</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Deterministic retirement math with inflation-adjusted safe withdrawal rate.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Current Age</span>
                  <span className="text-emerald-400 font-bold">{age} years</span>
                </div>
                <input
                  type="range"
                  min="21"
                  max="55"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Target Retirement Age</span>
                  <span className="text-emerald-400 font-bold">{targetRetireAge} years</span>
                </div>
                <input
                  type="range"
                  min={age + 1}
                  max="65"
                  value={targetRetireAge}
                  onChange={(e) => setTargetRetireAge(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Current Monthly Expenses</span>
                  <span className="text-emerald-400 font-bold">{formatINR(monthlyExpenses)}/mo</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Current Monthly SIP</span>
                  <span className="text-emerald-400 font-bold">{formatINR(monthlySip)}/mo</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="2500"
                  value={monthlySip}
                  onChange={(e) => setMonthlySip(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                  <span>Existing Invested Corpus</span>
                  <span className="text-emerald-400 font-bold">{formatINR(existingCorpus)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="100000"
                  value={existingCorpus}
                  onChange={(e) => setExistingCorpus(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Results Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Required Target Corpus</span>
                <p className="text-3xl font-extrabold text-white mt-2">{formatINR(fireCalc.corpusNeeded)}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Covers inflation-adjusted draw of <strong className="text-slate-200">{formatINR(fireCalc.monthlyNeedAtRetire)}/mo</strong> at age {targetRetireAge}.
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Projected at Current Rate</span>
                <p className="text-3xl font-extrabold text-emerald-400 mt-2">{formatINR(fireCalc.projectedCorpus)}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {fireCalc.gap > 0 ? (
                    <span>
                      Gap of <span className="text-amber-400 font-semibold">{formatINR(fireCalc.gap)}</span>. Increase SIP by{' '}
                      <strong className="text-emerald-400">{formatINR(fireCalc.additionalSip)}/mo</strong>.
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-semibold">Fully funded on your current trajectory!</span>
                  )}
                </p>
              </div>
            </div>

            {/* Glidepath Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Asset Allocation Glidepath</span>
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { phase: 'Phase 1: Aggressive Growth', range: `Age ${age} – ${targetRetireAge - 6}`, equity: 80, debt: 20, desc: 'Maximizing equity compounding' },
                  { phase: 'Phase 2: Transition Buffer', range: `Age ${targetRetireAge - 5} – ${targetRetireAge - 2}`, equity: 60, debt: 40, desc: 'De-risking sequence of returns' },
                  { phase: 'Phase 3: Capital Preservation', range: `Age ${targetRetireAge - 1} – ${targetRetireAge}`, equity: 40, debt: 60, desc: 'Shielding terminal corpus' },
                ].map((p, idx) => (
                  <div key={idx} className="rounded-xl border border-white/[0.05] bg-black/20 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{p.phase}</span>
                        <span className="text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded-full">{p.range}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{p.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-emerald-400">{p.equity}% Equity</span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs font-semibold text-blue-400">{p.debt}% Debt</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Agent Narrative Preview */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>FIREAgent Audit Preview</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Retiring at {targetRetireAge} requires locking in {formatINR(fireCalc.corpusNeeded)} as an inflation shield. At your current SIP rate of {formatINR(monthlySip)}/month, compounding accumulates {formatINR(fireCalc.projectedCorpus)}. By adding {formatINR(fireCalc.additionalSip)}/month today, you preserve {targetRetireAge} as your freedom year without equity overexposure."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tax Regime Optimizer */}
      {activeTab === 'tax' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8 flex flex-col gap-6">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <span>Income & Deductions</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing Section 115BAC New Regime vs. Old Regime with exact slab math.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Annual Gross Salary (CTC)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="50000"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-mono">INR</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Monthly Rent Paid (For HRA)</label>
                <input
                  type="number"
                  step="2000"
                  value={rentMonthly}
                  onChange={(e) => setRentMonthly(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">Section 80C (EPF/PPF)</label>
                  <input
                    type="number"
                    value={sec80c}
                    onChange={(e) => setSec80c(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">80CCD(1B) NPS</label>
                  <input
                    type="number"
                    value={sec80ccd}
                    onChange={(e) => setSec80ccd(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">80D Health Insurance</label>
                  <input
                    type="number"
                    value={sec80d}
                    onChange={(e) => setSec80d(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">24(b) Home Loan Int.</label>
                  <input
                    type="number"
                    value={sec24b}
                    onChange={(e) => setSec24b(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tax Comparison Results */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Optimal Strategy Verdict</span>
                <h4 className="text-2xl font-bold text-white mt-1">
                  Choose <span className="text-emerald-400">{taxCalc.optimal} REGIME</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Saves you <strong className="text-white">{formatINR(taxCalc.savings)}</strong> annually in direct taxes.
                </p>
              </div>
              <div className="px-5 py-3 rounded-xl bg-emerald-500 text-[#090D16] font-extrabold text-lg text-center shrink-0">
                +{formatINR(taxCalc.savings)} / yr
              </div>
            </div>

            {/* Side by Side Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-6 ${taxCalc.optimal === 'OLD' ? 'border-emerald-500/40 bg-[#111622]' : 'border-white/[0.08] bg-[#0E131F]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white">Old Tax Regime</span>
                  {taxCalc.optimal === 'OLD' && (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      OPTIMAL
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-white">{formatINR(taxCalc.taxOld)}</p>
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Recognized Deductions:</span>
                    <span className="text-slate-200">{formatINR(taxCalc.totalOldDeductions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HRA Exemption:</span>
                    <span className="text-slate-200">{formatINR(taxCalc.hraExemption)}</span>
                  </div>
                </div>
              </div>

              <div className={`rounded-2xl border p-6 ${taxCalc.optimal === 'NEW' ? 'border-emerald-500/40 bg-[#111622]' : 'border-white/[0.08] bg-[#0E131F]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-white">New Regime (115BAC)</span>
                  {taxCalc.optimal === 'NEW' && (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      OPTIMAL
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-white">{formatINR(taxCalc.taxNew)}</p>
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-col gap-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Standard Deduction:</span>
                    <span className="text-slate-200">₹75,000 (Updated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deduction Headroom:</span>
                    <span className="text-slate-200">Simplified Zero Rebate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Missed Deductions Alert */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
              <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>TaxAgent Missed Deduction Scanner</span>
              </div>
              <ul className="text-xs text-slate-300 flex flex-col gap-1.5 list-disc list-inside">
                <li>Section 80D: If your parents are senior citizens, you can claim up to ₹50,000 extra health coverage.</li>
                <li>Section 80TTA: Up to ₹10,000 in savings bank account interest is 100% tax-free in the Old Regime.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mutual Fund Portfolio X-Ray */}
      {activeTab === 'portfolio' && (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio XIRR</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">17.4%</p>
              <p className="text-xs text-slate-400 mt-1">vs. Nifty 50 benchmark of 12.8% (+4.6% Alpha)</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overlap Severity</span>
              <p className="text-3xl font-extrabold text-amber-400 mt-2">52% (Medium)</p>
              <p className="text-xs text-slate-400 mt-1">High stock duplication across Large-Cap funds</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Regular Plan Drag</span>
              <p className="text-3xl font-extrabold text-rose-400 mt-2">₹14,200 / yr</p>
              <p className="text-xs text-slate-400 mt-1">Potential 10-year loss to distributor commissions</p>
            </div>
          </div>

          {/* Overlap & STCG Matrix */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8">
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-400" />
              <span>Real Mutual Fund Overlap Matrix & Tax Penalty Countdown</span>
            </h4>
            <p className="text-xs text-slate-400 mb-6">
              Sthira inspects every underlying stock holding. When rebalancing, it checks holding periods to protect you from the 20% Short-Term Capital Gains tax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detected Overlap Hotspots</span>
                {[
                  { f1: 'Axis Bluechip Fund', f2: 'Mirae Asset Large Cap', overlap: 65, common: 'Reliance, HDFC Bank, TCS, L&T' },
                  { f1: 'Parag Parikh Flexi Cap', f2: 'Mirae Asset Large Cap', overlap: 52, common: 'Bajaj Finance, ICICI Bank, ITC' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-white/[0.06] bg-black/30 p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{item.f1} ↔ {item.f2}</span>
                      <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                        {item.overlap}% Overlap
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Common holdings: {item.common}</p>
                  </div>
                ))}
              </div>

              {/* Tax-Aware Action */}
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.04] p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>STCG Holding Window Guard</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Axis Bluechip Fund</strong> was started only 274 days ago. Exiting now incurs an immediate <strong>20% STCG tax penalty</strong>.
                </p>
                <div className="rounded-lg bg-black/40 p-3 text-xs text-slate-300 border border-white/[0.05]">
                  <p className="text-emerald-400 font-bold mb-1">Recommended Action: WAIT_AND_REDIRECT</p>
                  <p>Wait <strong>91 more days</strong> to qualify for 12.5% LTCG. In the meantime, redirect fresh monthly SIPs to lower-overlap funds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Panic Interceptor Simulator */}
      {activeTab === 'panic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Crash Trigger Slider */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-8 flex flex-col gap-6">
            <div className="border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>Simulate a Market Crash</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Drag the slider to test how Sthira intercepts emotional panic selling.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Simulated Nifty Index Drop</span>
                <span className="text-rose-400 font-bold">-{marketDrop}%</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="25.0"
                step="0.5"
                value={marketDrop}
                onChange={(e) => setMarketDrop(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>-1% (Normal Dip)</span>
                <span>-15% (User Threshold)</span>
                <span>-25% (2020 Crash)</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">User Panic Threshold:</span>
                <span className="text-white font-mono">-15.0%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Proximity to Threshold:</span>
                <span className="font-bold text-white">{proximityPct.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Intervention Tier:</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${severityBadge}`}>
                  {severity}
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Mockup Preview */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/[0.1] bg-[#0E131F] p-6 max-w-lg mx-auto shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-[#090D16]">
                  ST
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Sthira Behavioral Interceptor</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[11px] text-slate-400">Twilio WhatsApp Sandbox • Live Dispatch</p>
                </div>
              </div>

              {/* Chat Bubble */}
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/30 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Market Alert: -{marketDrop}% Drop Intercepted</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  "📉 Market aaj {marketDrop}% gira hai. <strong>COVID March 2020</strong> yaad hai jab panic mein SIP ruki thi? Agar aaj SIP rok diya toh tumhara retirement target <strong>2.4 saal delay</strong> hoga aur ₹18.4L extra bachat karni padegi.
                  <br /><br />
                  Yeh dip discount hai, loss nahi. Stay strong! 💪"
                </p>
                <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-slate-400">
                  ⚠️ AI guidance only. Not SEBI-registered advisory. Past performance does not guarantee future returns.
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 text-[#090D16] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-400 transition-colors"
              >
                <span>Continue My SIP 💪</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
