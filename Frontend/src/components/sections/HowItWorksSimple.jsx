import { FileUp, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function HowItWorksSimple() {
  const steps = [
    {
      step: '01',
      title: 'Upload or Chat',
      subtitle: 'Ingest Real Financial Records',
      description:
        'Upload your Form 16 or CAMS / KFintech mutual fund CAS PDF, or converse naturally with our onboarding agent. Sthira extracts your salary, deductions, folios, and panic thresholds into a structured Financial DNA.',
      icon: FileUp,
      badge: 'Annexure I/II & CAS Parsers',
      points: ['Extracts gross salary, 80C, 80D, HRA & TDS', 'Parses all mutual fund folios, NAVs & units', 'Detects past panic drop tolerance (-15%)'],
    },
    {
      step: '02',
      title: 'Deterministic Math',
      subtitle: 'Zero AI Hallucinations in Calculations',
      description:
        'Financial decisions require exact mathematical truth. Pure Python engines execute verified formulas for FIRE retirement timelines, progressive tax regime optimization, and Newton-Raphson XIRR with stock-level overlap.',
      icon: Cpu,
      badge: 'Strict Python Engines',
      points: ['Trinity 4% SWR & 6% inflation-adjusted draw', 'Old vs New Regime Section 115BAC evaluation', 'Holding-period STCG vs LTCG tax optimization'],
    },
    {
      step: '03',
      title: 'Autonomous Protection',
      subtitle: '10 Agents Protect, Explain & Intervene',
      description:
        'Ten specialized LangGraph agents translate raw math into plain Hinglish, screen advice against SEBI regulations via ChromaDB RAG, and trigger proactive WhatsApp crisis interventions during market crashes.',
      icon: ShieldCheck,
      badge: 'LangGraph + WhatsApp Alerts',
      points: ['AuditNarrator explains every step line-by-line', 'RegulatorGuard enforces SEBI compliance rules', 'Twilio WhatsApp crisis alert before panic-selling'],
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          Simple 3-Step Process
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          How Sthira <span className="text-emerald-400">Actually Works.</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Clear division of labor: Real documents provide data. Deterministic code does math. AI agents protect your behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {steps.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={item.step}
              className="relative rounded-2xl border border-white/[0.08] bg-[#111622] p-8 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <span className="text-2xl font-black text-slate-700 tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  {item.badge}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-4">{item.subtitle}</p>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-2">
                {item.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
