import { useNavigate } from 'react-router-dom'
import { UserCheck, ArrowRight, Sparkles, Building, Briefcase, GraduationCap } from 'lucide-react'
import { setActiveUserId } from '../../services/session'

const personas = [
  {
    id: 'rahul_tech',
    name: 'Rahul Sharma',
    age: 29,
    role: 'Senior Software Engineer',
    salary: '₹22,00,000 / yr',
    portfolio: '₹14,50,000 (Equity MF Heavy)',
    goal: 'FIRE at Age 48 (₹3.8 Cr target)',
    taxOptimal: 'Old Regime (Saves ₹38,400)',
    panicThreshold: '-15% (Moderate)',
    icon: Briefcase,
    badge: 'FIRE Candidate',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'priya_lead',
    name: 'Priya Verma',
    age: 34,
    role: 'Product Lead & Homeowner',
    salary: '₹35,00,000 / yr',
    portfolio: '₹32,00,000 (45% Large-Cap Overlap)',
    goal: 'Child IIT Fund & Decumulation at 52',
    taxOptimal: 'Old Regime (24b Home Loan saves ₹44K)',
    panicThreshold: '-12% (Panic Prone)',
    icon: Building,
    badge: 'Overlap & STCG Alert',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'santosh_senior',
    name: 'Santosh Pradhan',
    age: 61,
    role: 'Senior Citizen Retiree',
    salary: '₹14,00,000 (Pension & FD Interest)',
    portfolio: '₹75,00,000 (Debt & Hybrid MF)',
    goal: 'Legacy & Safe 4% SWR Decumulation',
    taxOptimal: 'New Regime (Simplified Zero Paperwork)',
    panicThreshold: '-8% (Conservative)',
    icon: GraduationCap,
    badge: 'Decumulation Mode',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
]

export default function QuickDemoPersonas() {
  const navigate = useNavigate()

  const handleSelectPersona = (personaId) => {
    setActiveUserId(personaId)
    navigate('/dashboard')
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Instant Evaluator Personas
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Test With Real Financial Profiles. <span className="text-emerald-400">1-Click Launch.</span>
        </h2>
        <p className="text-slate-400 text-base">
          Don’t have your Form 16 or CAS PDF right now? Click any verified profile below to explore Sthira’s full dashboard, audit traces, and behavioral interventions immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((p) => {
          const Icon = p.icon
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-white/[0.08] bg-[#111622] p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{p.age} years old • {p.role}</p>

                <div className="flex flex-col gap-2.5 text-xs border-t border-white/[0.06] pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annual Income:</span>
                    <span className="font-semibold text-slate-200">{p.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Portfolio:</span>
                    <span className="font-semibold text-slate-200">{p.portfolio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Goal:</span>
                    <span className="font-semibold text-slate-200">{p.goal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tax Strategy:</span>
                    <span className="font-semibold text-emerald-400">{p.taxOptimal}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPersona(p.id)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-[#090D16] hover:border-emerald-400 transition-all cursor-pointer shadow-sm"
              >
                <span>Launch Persona Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
