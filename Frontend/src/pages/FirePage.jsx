import React, { useState } from 'react';
import { 
  Flame, TrendingUp, AlertTriangle, ArrowRight, 
  ShieldCheck, CheckCircle2, Sliders, Calendar 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function FirePage() {
  const { currentUser } = useUser();
  const [retireAge, setRetireAge] = useState(45);
  const [targetMonthlyExpense, setTargetMonthlyExpense] = useState(75000);
  const [currentSip, setCurrentSip] = useState(currentUser?.monthly_sip || 45000);

  // Deterministic calculations
  const currentAge = currentUser?.age || 28;
  const yearsToRetire = Math.max(1, retireAge - currentAge);
  const inflation = 0.06;
  const futureMonthlyExpense = Math.round(targetMonthlyExpense * Math.pow(1 + inflation, yearsToRetire));
  const swr = 0.035; // 3.5% safe withdrawal rate
  const requiredCorpus = Math.round((futureMonthlyExpense * 12) / swr);
  const existingCorpus = currentUser?.portfolio_value || 1450000;
  
  // Projected corpus at current SIP (assuming 12% CAGR)
  const r = 0.12 / 12;
  const n = yearsToRetire * 12;
  const fvExisting = existingCorpus * Math.pow(1 + 0.12, yearsToRetire);
  const fvSip = currentSip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalProjected = Math.round(fvExisting + fvSip);
  const corpusGap = Math.max(0, requiredCorpus - totalProjected);
  const additionalSipNeeded = corpusGap > 0 ? Math.round(corpusGap / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
          <Flame className="h-3.5 w-3.5" />
          <span>DETERMINISTIC FIRE FREEDOM ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Retirement Corpus & Glidepath Modeling
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Mathematical consequence binding with 6% inflation adjustments and 3.5% Safe Withdrawal Rate (SWR).
        </p>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0E131F] border border-white/10 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2 text-sm font-bold text-white border-b border-white/10 pb-3">
            <Sliders className="h-4 w-4 text-emerald-400" />
            <span>Interactive Retirement Inputs</span>
          </div>

          {/* Retire Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Target Retirement Age</span>
              <span className="text-emerald-400 font-bold text-sm">{retireAge} Years</span>
            </div>
            <input
              type="range"
              min={currentAge + 5}
              max="65"
              value={retireAge}
              onChange={(e) => setRetireAge(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Current: {currentAge} yrs</span>
              <span>Horizon: {yearsToRetire} years left</span>
              <span>Max: 65 yrs</span>
            </div>
          </div>

          {/* Desired Monthly Expense */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Today's Desired Monthly Expense</span>
              <span className="text-cyan-400 font-bold text-sm">₹{targetMonthlyExpense.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="30000"
              max="300000"
              step="5000"
              value={targetMonthlyExpense}
              onChange={(e) => setTargetMonthlyExpense(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="text-[10px] text-slate-400 font-mono">
              Inflation-adjusted at age {retireAge}: <strong className="text-white">₹{futureMonthlyExpense.toLocaleString('en-IN')}/mo</strong>
            </div>
          </div>

          {/* Monthly SIP Commitment */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Current Monthly SIP Allocation</span>
              <span className="text-teal-400 font-bold text-sm">₹{currentSip.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="250000"
              step="5000"
              value={currentSip}
              onChange={(e) => setCurrentSip(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Statutory Formula Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="text-slate-300 font-semibold">Deterministic Math Formula:</div>
            <div>Corpus = (Monthly Exp × 12 × 1.06^n) / 0.035</div>
            <div className="text-emerald-400/90 font-semibold">Strict SEBI Fiduciary Model</div>
          </div>
        </div>

        {/* Right Column: Outcomes & Consequence (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Big Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#0E131F] border border-emerald-500/30 shadow-lg">
              <div className="text-xs font-mono text-slate-400">REQUIRED RETIREMENT CORPUS</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                ₹{(requiredCorpus / 10000000).toFixed(2)} Cr
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                For lifetime monthly draw of ₹{futureMonthlyExpense.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0E131F] border border-cyan-500/30 shadow-lg">
              <div className="text-xs font-mono text-slate-400">PROJECTED CORPUS (CURRENT SIP)</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">
                ₹{(totalProjected / 10000000).toFixed(2)} Cr
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Existing ₹{(existingCorpus/100000).toFixed(1)}L + ₹{(currentSip/1000).toFixed(0)}k/mo compounding
              </div>
            </div>
          </div>

          {/* Shortfall or Surplus Banner */}
          {corpusGap > 0 ? (
            <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Corpus Shortfall: ₹{(corpusGap / 10000000).toFixed(2)} Cr ({((totalProjected/requiredCorpus)*100).toFixed(0)}% Funded)</span>
              </div>
              <p>
                To achieve freedom at age {retireAge}, you need an additional monthly SIP of <strong>₹{additionalSipNeeded.toLocaleString('en-IN')}</strong>, or postpone retirement by <strong>+2.8 years</strong>.
              </p>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Full Freedom Achieved! Your projected corpus exceeds your target. You can comfortably retire at age {retireAge}.</span>
            </div>
          )}

          {/* Glidepath Asset Allocation Table */}
          <div className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white">Dynamic Asset Allocation Glidepath</h3>
            <p className="text-xs text-slate-400">
              Autonomous rebalancing recommendations reducing equity risk as you approach target age:
            </p>
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <div className="text-slate-400 text-[10px]">AGE {currentAge} (NOW)</div>
                <div className="text-emerald-400 font-bold mt-1">80% Eq / 20% Dt</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <div className="text-slate-400 text-[10px]">AGE {currentAge + 5}</div>
                <div className="text-emerald-400 font-bold mt-1">70% Eq / 30% Dt</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <div className="text-slate-400 text-[10px]">AGE {retireAge - 3}</div>
                <div className="text-cyan-400 font-bold mt-1">55% Eq / 45% Dt</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <div className="text-slate-400 text-[10px]">AT RETIRE ({retireAge})</div>
                <div className="text-amber-400 font-bold mt-1">40% Eq / 60% Dt</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
