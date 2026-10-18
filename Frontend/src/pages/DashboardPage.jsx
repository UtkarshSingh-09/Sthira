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
    { pillar: 'Emergency Fund', score: 92, status: 'OPTIMAL (6.5 Mo Expenses)', color: 'text-[#D98324]' },
    { pillar: 'Insurance Cover', score: 85, status: 'ADEQUATE (₹1.5 Cr Term)', color: 'text-[#D98324]' },
    { pillar: 'Tax Efficiency', score: 78, status: 'OLD REGIME SAVES ₹20.8K', color: 'text-[#EFDCAB]' },
    { pillar: 'Portfolio Diversification', score: 72, status: '28% OVERLAP DETECTED', color: 'text-[#D98324]' },
    { pillar: 'FIRE Velocity', score: 88, status: 'ON TRACK FOR AGE 44', color: 'text-[#D98324]' },
    { pillar: 'Behavioral Discipline', score: 85, status: 'HIGH STOIC PROFILE', color: 'text-[#D98324]' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Welcome & Persona Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#1C1510] via-[#271E16] to-[#120E0A] border border-[#443627]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#D98324] mb-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>SEBI & RBI COMPLIANT ACCOUNT ACTIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F2F6D0]">
            Welcome, {currentUser?.name || 'Investor'}
          </h1>
          <p className="text-xs text-[#EFDCAB]/80 mt-0.5">
            PAN: <span className="font-mono text-[#F2F6D0]">{currentUser?.pan || 'ABCPS1234F'}</span> • Primary Goal: <span className="text-[#D98324] font-semibold">{currentUser?.wealth_goal || 'FIRE Early Retirement'}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActivePage('shield')}
            className="px-4 py-2 rounded-xl bg-[#D98324]/15 hover:bg-[#D98324]/25 border border-[#D98324]/40 text-[#EFDCAB] text-xs font-mono font-semibold flex items-center space-x-1.5 transition"
          >
            <Activity className="h-4 w-4 text-[#D98324]" />
            <span>Test Panic Intercept →</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Net Worth */}
        <div className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/50 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-[#EFDCAB]/70">
            <span>PORTFOLIO VALUATION</span>
            <span className="text-[#D98324] flex items-center">
              <TrendingUp className="h-3 w-3 mr-0.5" /> +{xirr}% XIRR
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#F2F6D0] font-mono mt-2">
            ₹{netWorth.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#EFDCAB]/60 mt-2">
            Mutual Funds + EPF + PPF + Stocks
          </div>
        </div>

        {/* Monthly SIP */}
        <div className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#EFDCAB]/50 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-[#EFDCAB]/70">
            <span>MONTHLY SIP INFLOW</span>
            <span className="text-[#EFDCAB] font-mono">100% On-Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#EFDCAB] font-mono mt-2">
            ₹{monthlySip.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-[#EFDCAB]/60 mt-2">
            Active auto-debit velocity
          </div>
        </div>

        {/* Arth Score */}
        <div className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/50 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-[#EFDCAB]/70">
            <span>ARTH SCORE (WELLNESS)</span>
            <span className="text-[#D98324] font-mono">Tier: High</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D98324] font-mono mt-2 flex items-baseline space-x-1">
            <span>83</span>
            <span className="text-sm text-[#EFDCAB]/60 font-normal">/100</span>
          </div>
          <div className="text-[11px] text-[#EFDCAB]/60 mt-2">
            6-pillar composite financial health
          </div>
        </div>

        {/* Behavioral Shield Status */}
        <div className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/50 transition shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-[#EFDCAB]/70">
            <span>PANIC GUARD</span>
            <span className="text-[#D98324] font-mono">Arm Active</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#D98324] font-mono mt-2">
            {panicThreshold}%
          </div>
          <div className="text-[11px] text-[#EFDCAB]/60 mt-2">
            Autonomous WhatsApp trigger threshold
          </div>
        </div>
      </div>

      {/* 6-Pillar Arth Score Breakdown */}
      <div className="p-6 rounded-2xl bg-[#1C1510] border border-[#443627] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F2F6D0]">
              Arth Score — 6-Dimensional Wealth Diagnostics
            </h2>
            <p className="text-xs text-[#EFDCAB]/75 mt-0.5">
              SEBI fiduciary audit framework quantifying risk readiness and financial discipline.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#D98324]/15 border border-[#D98324]/40 text-xs font-mono text-[#EFDCAB]">
            OVERALL SCORE: 83/100
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {arthScores.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#271E16]/80 border border-[#443627] space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#EFDCAB]">{item.pillar}</span>
                <span className="font-mono font-bold text-[#F2F6D0]">{item.score}/100</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#120E0A] overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#D98324] to-[#EFDCAB]"
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <div className="text-[10px] font-mono font-semibold text-[#D98324]">
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
          className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/60 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <PieChart className="h-6 w-6 text-[#D98324]" />
            <ArrowUpRight className="h-4 w-4 text-[#EFDCAB]/60 group-hover:text-[#D98324] transition" />
          </div>
          <h3 className="text-base font-bold text-[#F2F6D0]">Portfolio X-Ray & Overlap</h3>
          <p className="text-xs text-[#EFDCAB]/75 mt-1">
            Detect duplicate stocks across AMCs and inspect STCG/LTCG tax harvesting.
          </p>
        </div>

        <div 
          onClick={() => setActivePage('fire')}
          className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#EFDCAB]/60 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <Flame className="h-6 w-6 text-[#EFDCAB]" />
            <ArrowUpRight className="h-4 w-4 text-[#EFDCAB]/60 group-hover:text-[#EFDCAB] transition" />
          </div>
          <h3 className="text-base font-bold text-[#F2F6D0]">FIRE Freedom Planner</h3>
          <p className="text-xs text-[#EFDCAB]/75 mt-1">
            Calculate your inflation-adjusted retirement corpus and SIP gap.
          </p>
        </div>

        <div 
          onClick={() => setActivePage('tax')}
          className="p-5 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/60 transition cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <Receipt className="h-6 w-6 text-[#D98324]" />
            <ArrowUpRight className="h-4 w-4 text-[#EFDCAB]/60 group-hover:text-[#D98324] transition" />
          </div>
          <h3 className="text-base font-bold text-[#F2F6D0]">Tax Arbitrage (New vs Old)</h3>
          <p className="text-xs text-[#EFDCAB]/75 mt-1">
            Find missed deductions under 80C, 80D, 80CCD and declare the optimal regime.
          </p>
        </div>
      </div>
    </div>
  );
}
