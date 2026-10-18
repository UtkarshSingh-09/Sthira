import React from 'react';
import { 
  ShieldCheck, ArrowUpRight, TrendingUp, AlertTriangle, 
  Flame, Receipt, PieChart, Activity, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function DashboardPage() {
  const { currentUser, setActivePage } = useUser();

  const netWorth = currentUser?.portfolio_value || 1450000;
  const monthlySip = currentUser?.monthly_sip || 45000;
  const xirr = currentUser?.xirr || 15.8;
  const panicThreshold = currentUser?.panic_threshold || -15;

  const arthScores = [
    { pillar: 'Emergency Fund', score: 92, status: 'OPTIMAL (6.5 Mo Expenses)', color: 'text-emerald-400' },
    { pillar: 'Insurance Cover', score: 85, status: 'ADEQUATE (₹1.5 Cr Term)', color: 'text-emerald-400' },
    { pillar: 'Tax Efficiency', score: 78, status: 'OLD REGIME SAVES ₹20.8K', color: 'text-cyan-400' },
    { pillar: 'Portfolio Diversification', score: 72, status: '28% OVERLAP DETECTED', color: 'text-amber-400' },
    { pillar: 'FIRE Velocity', score: 88, status: 'ON TRACK FOR AGE 44', color: 'text-emerald-400' },
    { pillar: 'Behavioral Discipline', score: 85, status: 'HIGH STOIC PROFILE', color: 'text-emerald-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Welcome & Persona Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-white/10">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>SEBI & RBI COMPLIANT ACCOUNT ACTIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {currentUser?.name || 'Investor'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            PAN: <span className="font-mono text-slate-300">{currentUser?.pan || 'ABCPS1234F'}</span> • Primary Goal: <span className="text-emerald-400 font-semibold">{currentUser?.wealth_goal || 'FIRE Early Retirement'}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActivePage('shield')}
            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold flex items-center space-x-1.5 transition"
          >
            <Activity className="h-4 w-4" />
            <span>Test Panic Intercept →</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Net Worth */}
        <div className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-emerald-500/30 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PORTFOLIO VALUATION</span>
            <span className="text-emerald-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" /> +{xirr}% XIRR
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
            ₹{netWorth.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Mutual Funds + EPF + PPF + Stocks
          </div>
        </div>

        {/* Monthly SIP */}
        <div className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-cyan-500/30 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>MONTHLY SIP INFLOW</span>
            <span className="text-cyan-400 font-mono">100% On-Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-2">
            ₹{monthlySip.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Active auto-debit velocity
          </div>
        </div>

        {/* Arth Score */}
        <div className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-emerald-500/30 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ARTH SCORE (WELLNESS)</span>
            <span className="text-emerald-400 font-mono">Tier: High</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-2 flex items-baseline space-x-1">
            <span>83</span>
            <span className="text-sm text-slate-500 font-normal">/100</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            6-pillar composite financial health
          </div>
        </div>

        {/* Behavioral Shield Status */}
        <div className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-amber-500/30 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PANIC GUARD</span>
            <span className="text-amber-400 font-mono">Arm Active</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono mt-2">
            {panicThreshold}%
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            Autonomous WhatsApp trigger threshold
          </div>
        </div>
      </div>

      {/* 6-Pillar Arth Score Breakdown */}
      <div className="p-6 rounded-2xl bg-[#0E131F] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Arth Score — 6-Dimensional Wealth Diagnostics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              SEBI fiduciary audit framework quantifying risk readiness and financial discipline.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
            OVERALL SCORE: 83/100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {arthScores.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300">{item.pillar}</span>
                <span className="font-mono font-bold text-white">{item.score}/100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <div className="text-[10px] font-mono font-semibold text-slate-400">
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Launch Cards for Deep Engines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => setActivePage('portfolio')}
          className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-emerald-500/40 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <PieChart className="h-6 w-6 text-emerald-400" />
            <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 transition" />
          </div>
          <h3 className="text-base font-bold text-white">Portfolio X-Ray & Overlap</h3>
          <p className="text-xs text-slate-400 mt-1">
            Detect duplicate stocks across AMCs and inspect STCG/LTCG tax harvesting.
          </p>
        </div>

        <div 
          onClick={() => setActivePage('fire')}
          className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-cyan-500/40 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <Flame className="h-6 w-6 text-cyan-400" />
            <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition" />
          </div>
          <h3 className="text-base font-bold text-white">FIRE Freedom Planner</h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate your inflation-adjusted retirement corpus and SIP gap.
          </p>
        </div>

        <div 
          onClick={() => setActivePage('tax')}
          className="p-5 rounded-2xl bg-[#0E131F] border border-white/10 hover:border-teal-500/40 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <Receipt className="h-6 w-6 text-teal-400" />
            <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-teal-400 transition" />
          </div>
          <h3 className="text-base font-bold text-white">Tax Arbitrage (New vs Old)</h3>
          <p className="text-xs text-slate-400 mt-1">
            Find missed deductions under 80C, 80D, 80CCD and declare the optimal regime.
          </p>
        </div>
      </div>
    </div>
  );
}
