import React from 'react';
import { 
  ShieldCheck, ArrowRight, Activity, Flame, Receipt, 
  PieChart, Lock, CheckCircle2, Sparkles, Scale, Database 
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function HomePage() {
  const { setActivePage } = useUser();

  const corePillars = [
    {
      title: 'Autonomous Behavioral Guard',
      desc: 'Monitors Nifty and portfolio pullbacks 24/7. Intercepts panic-selling before financial suicide occurs via live WhatsApp consequence bindings.',
      icon: Activity,
      badge: 'Zero Emotion',
      route: 'shield'
    },
    {
      title: 'Deterministic FIRE Math',
      desc: 'Exact inflation-adjusted corpus modeling, dynamic equity glidepath, and consequence timeline. Never hallucinated by LLMs.',
      icon: Flame,
      badge: 'Mathematical Fiduciary',
      route: 'fire'
    },
    {
      title: 'Portfolio Overlap & X-Ray',
      desc: 'Cosine similarity matrix across AMCs. Detects hidden duplicate holdings, direct vs regular plan drag, and STCG/LTCG tax harvesting.',
      icon: PieChart,
      badge: 'CAS Parsing',
      route: 'portfolio'
    },
    {
      title: 'Tax Arbitrage Engine',
      desc: 'Automated Form 16 extraction. Side-by-side New vs Old regime analysis with missed deduction finder (80C, 80D, 80CCD, HRA).',
      icon: Receipt,
      badge: 'Section 115BAC',
      route: 'tax'
    }
  ];

  return (
    <div className="min-h-screen bg-[#120E0A] text-[#F2F6D0] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative px-6 py-16 sm:py-24 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#D98324]/15 border border-[#D98324]/40 text-xs font-mono text-[#EFDCAB] mb-6">
          <Sparkles className="h-3.5 w-3.5 text-[#D98324]" />
          <span>STHIRA WEALTH OS • POWERED BY DETERMINISTIC ENGINES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F6D0] max-w-4xl mx-auto leading-tight">
          The Autonomous Behavioral <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB]">
            Wealth Operating System
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#EFDCAB]/80 max-w-2xl mx-auto mt-6 leading-relaxed">
          Traditional fintech apps show you graphs; Sthira guards your wealth. Combines 10 autonomous LangGraph agents with deterministic SEBI & RBI mathematical engines.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setActivePage('auth')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D98324] via-[#e5943b] to-[#EFDCAB] hover:brightness-105 text-[#271E16] font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-[#D98324]/20 transition cursor-pointer"
          >
            <span>Open Compliant Vault (Sign Up)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1C1510] hover:bg-[#271E16] border border-[#443627] text-[#EFDCAB] font-semibold text-sm transition"
          >
            Launch Executive Dashboard →
          </button>
        </div>

        {/* Live System Trust Strip */}
        <div className="mt-14 pt-8 border-t border-[#443627] grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-[#1C1510] border border-[#443627]">
            <div className="text-[10px] font-mono text-[#EFDCAB]/70">REGULATORY STANDARD</div>
            <div className="text-xs font-semibold text-[#D98324] mt-1">SEBI IA Compliant</div>
          </div>
          <div className="p-3 rounded-xl bg-[#1C1510] border border-[#443627]">
            <div className="text-[10px] font-mono text-[#EFDCAB]/70">DATA LOCALIZATION</div>
            <div className="text-xs font-semibold text-[#D98324] mt-1">RBI Circular 2018</div>
          </div>
          <div className="p-3 rounded-xl bg-[#1C1510] border border-[#443627]">
            <div className="text-[10px] font-mono text-[#EFDCAB]/70">MATH INTEGRITY</div>
            <div className="text-xs font-semibold text-[#D98324] mt-1">Deterministic Engine</div>
          </div>
          <div className="p-3 rounded-xl bg-[#1C1510] border border-[#443627]">
            <div className="text-[10px] font-mono text-[#EFDCAB]/70">AUTONOMOUS INTERCEPT</div>
            <div className="text-xs font-semibold text-[#D98324] mt-1">Twilio WhatsApp Sandbox</div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="px-6 py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                onClick={() => setActivePage(p.route)}
                className="p-6 rounded-2xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/60 transition-all duration-300 cursor-pointer group shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#D98324]/15 text-[#D98324] group-hover:bg-[#D98324]/25 transition">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#271E16] text-[#EFDCAB] border border-[#443627]">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#F2F6D0] group-hover:text-[#D98324] transition">
                  {p.title}
                </h3>
                <p className="text-sm text-[#EFDCAB]/75 mt-2 leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center text-xs font-mono text-[#D98324] font-semibold space-x-1 group-hover:translate-x-1 transition">
                  <span>Explore Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
