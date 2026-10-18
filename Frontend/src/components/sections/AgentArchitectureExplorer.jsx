import { useState } from 'react'
import {
  Network,
  Dna,
  Flame,
  Scale,
  PieChart,
  ShieldAlert,
  ShieldCheck,
  BookOpen,
  Shuffle,
  FileText,
  ChevronDown,
  Sparkles,
  Bot,
  Cpu,
  CheckCircle2,
} from 'lucide-react'

const allAgents = [
  {
    id: 'orchestrator',
    name: 'OrchestratorAgent',
    role: 'Central StateGraph Router',
    category: 'router',
    model: 'Llama 3.1 8B Instant',
    latency: '< 400ms',
    summary: 'The brain of the system. Manages the LangGraph StateGraph, evaluates user intent, coordinates execution order, and ensures every output passes through compliance and literacy.',
    safeguard: 'State-bound routing preventing cyclic recursion and deadlocks.',
    sampleOutput: 'Detected intent: "fire". Routing context to FIREEngine -> RegulatorGuard -> AuditNarrator -> LiteracyAgent.',
    icon: Network,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'dna',
    name: 'DNAAgent',
    role: 'Financial & Behavioral DNA Extractor',
    category: 'router',
    model: 'Llama 3.1 8B Instant',
    latency: '< 800ms',
    summary: 'Extracts user age, salary, goals, mutual fund corpus, emergency fund, and panic drop tolerance from natural conversation into a verified Pydantic schema.',
    safeguard: 'Strict completion scoring; refuses to guess unmentioned numbers.',
    sampleOutput: 'Extracted: Age 29, Salary ₹20L, Monthly Expenses ₹60K, Goal: Retirement at 48. Behavioral Panic Threshold: -15%. Profile Completion: 73%.',
    icon: Dna,
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 'fire',
    name: 'FIREAgent',
    role: 'Retirement Trajectory Narrator',
    category: 'narrator',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.8s',
    summary: 'Narrates deterministic retirement calculations into accessible Hinglish. Translates target corpus, SIP gaps, and dynamic asset glidepaths without doing math.',
    safeguard: '_validate_narration_numbers cross-checks LLM text against math output; auto-reverts to verified template on hallucination.',
    sampleOutput: 'Tujhe 48 saal mein retire hone ke liye ₹3.82 Cr corpus chahiye. Abhi ₹35K SIP chal rahi hai — ₹11K/mo aur badha dega toh freedom date lock ho jayegi.',
    icon: Flame,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'tax',
    name: 'TaxAgent',
    role: 'Old vs New Regime Explainer',
    category: 'narrator',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.6s',
    summary: 'Explains deterministic Old vs New regime evaluation. Identifies missed 80D, 80CCD(1B), and HRA deductions, showing exact crossover tax points.',
    safeguard: 'Zero tax math performed in LLM; strictly explains verified Python engine comparisons.',
    sampleOutput: 'Tere case mein OLD Regime se ₹44,200 bachega. Lekin 80D mein parents ka ₹25,000 cover miss ho raha hai — claim karega toh ₹5,200 aur bachega.',
    icon: Scale,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'portfolio',
    name: 'PortfolioAgent',
    role: 'STCG-Aware Rebalancing Analyst',
    category: 'narrator',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.9s',
    summary: 'Analyzes mutual fund overlap matrices and regular plan expense drags. Recommends fund-level actions with exact days to wait for LTCG tax immunity.',
    safeguard: 'Rejects vague advice (e.g. "reduce equities"); enforces exact fund name, rupee amount, and holding day countdown.',
    sampleOutput: 'Axis Bluechip & Mirae Large Cap mein 65% overlap hai. Axis Bluechip sirf 274 din pehle liya tha — abhi becha toh 20% STCG lagega. 91 din ruko, tab tak naya SIP Parag Parikh mein redirect karo.',
    icon: PieChart,
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'behavioral',
    name: 'BehavioralGuardAgent',
    role: 'Crisis Interceptor & WhatsApp Dispatcher',
    category: 'guard',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.4s',
    summary: 'Monitors market volatility against user panic thresholds. Automatically triggers personalized, consequence-bound WhatsApp interventions before user cancels SIP.',
    safeguard: 'SEBI disclaimer injected; hard-blocks all stock tips and guaranteed recovery claims.',
    sampleOutput: '📉 Market aaj 8.5% gira. COVID March 2020 yaad hai? Tab panic mein SIP rokne se retirement 2.4 saal delay hui thi. Yeh dip discount hai — continue karo! 💪',
    icon: ShieldAlert,
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  {
    id: 'regulator',
    name: 'RegulatorGuardAgent',
    role: 'SEBI & Tax Compliance Watchdog',
    category: 'guard',
    model: 'Llama 3.1 8B + ChromaDB RAG',
    latency: '< 600ms',
    summary: 'Screens all AI narrations before delivery. Uses regex and ChromaDB semantic search over SEBI Investment Advisers Regulations and Income Tax rules to intercept prohibited claims.',
    safeguard: 'Hard-blocks keywords ("guaranteed", "risk-free", "sure shot") and enforces equity return ceiling <= 13%.',
    sampleOutput: 'COMPLIANT: Output passed 5 SEBI regulation rules and statutory disclaimers injected successfully.',
    icon: ShieldCheck,
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
  {
    id: 'literacy',
    name: 'FinancialLiteracyAgent',
    role: 'Adaptive Micro-Educator',
    category: 'education',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.8s',
    summary: 'Generates dynamic 30-second "Did you know?" micro-lessons and adaptive 3-question quizzes tied directly to the user\'s real financial calculation numbers.',
    safeguard: 'Quiz difficulty calibrates dynamically (Easy/Medium/Hard) based on user\'s current Arth Score dimension.',
    sampleOutput: 'Micro-Lesson: "Teri ₹35K SIP mein se ₹18K compounding growth se aa raha hai — 78% Indian investors ko compounding curve ka real tipping point nahi pata."',
    icon: BookOpen,
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  {
    id: 'simulator',
    name: 'LifeSimulatorAgent',
    role: 'Multi-Domain What-If Engine',
    category: 'education',
    model: 'Llama 3.3 70B + Llama 3.1 8B',
    latency: '~2.1s',
    summary: 'Handles compound life events (bonuses, marriage, baby, job loss, buying a house). Mutates Financial DNA and triggers cross-domain recalculations across FIRE, Tax, and Portfolio.',
    safeguard: 'Ensures cross-domain reconciliation: adjusting salary automatically recalculates emergency fund runway and tax slabs.',
    sampleOutput: 'Simulation for ₹6L Bonus: Allocated ₹2L to complete 6-month Emergency Fund, ₹3.5L to boost FIRE target (saving 1.2 working years), and ₹50K to 80CCD(1B) NPS for ₹15.6K tax saving.',
    icon: Shuffle,
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  {
    id: 'audit',
    name: 'AuditNarratorAgent',
    role: 'Human-Readable Trace Narrator',
    category: 'education',
    model: 'Llama 3.3 70B Versatile',
    latency: '~1.7s',
    summary: 'Translates raw mathematical formulas and intermediate variables from the Python engines into an auditable, step-by-step walkthrough for total transparency.',
    safeguard: 'Zero numeric deviation permitted; formatted with Indian numbering notation (₹1,50,000).',
    sampleOutput: 'Step 1: Inflation-Adjusted Monthly Need. ₹60,000 × (1.06)^19 = ₹1,81,500/mo. Step 2: Corpus Needed. (₹1,81,500 × 12) / 0.04 = ₹5,44,50,000.',
    icon: FileText,
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
]

export default function AgentArchitectureExplorer() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedAgent, setExpandedAgent] = useState('orchestrator')

  const filtered = allAgents.filter((agent) => {
    if (activeCategory === 'all') return true
    return agent.category === activeCategory
  })

  return (
    <section id="agents-architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Bot className="w-3.5 h-3.5" />
          Autonomous Multi-Agent System
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          10 Specialized Agents. <span className="text-emerald-400">Strict Separation of Duties.</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          No monolithic prompt doing everything. Each agent has explicit boundaries, a tailored model tier, and strict guardrails preventing hallucinations.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'All 10 Agents' },
          { id: 'router', label: 'Router & Profiler (2)' },
          { id: 'narrator', label: 'Math Narrators (3)' },
          { id: 'guard', label: 'Guardians & Compliance (2)' },
          { id: 'education', label: 'Intelligence & Traceability (3)' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === filter.id
                ? 'bg-emerald-500 text-[#090D16] shadow-sm'
                : 'bg-[#111622] text-slate-300 hover:text-white border border-white/[0.08]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {filtered.map((agent) => {
          const Icon = agent.icon
          const isExpanded = expandedAgent === agent.id

          return (
            <div
              key={agent.id}
              onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
              className={`rounded-2xl border transition-all cursor-pointer p-6 ${
                isExpanded
                  ? 'border-emerald-500/40 bg-[#111622] shadow-lg shadow-emerald-500/5'
                  : 'border-white/[0.08] bg-[#0E131F] hover:border-white/[0.16] hover:bg-[#111622]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>{agent.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400">{agent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${agent.badgeColor}`}>
                    {agent.model}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-emerald-400' : ''}`}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">{agent.summary}</p>

              {/* Expanded Inspection Pane */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Latency Target</span>
                      <span className="text-emerald-400 font-bold">{agent.latency}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/30 border border-white/[0.05]">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Model Architecture</span>
                      <span className="text-white font-bold">{agent.model}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 text-xs">
                    <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Built-in Safeguard</span>
                    </span>
                    <p className="text-slate-300">{agent.safeguard}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] text-xs">
                    <span className="font-bold text-slate-400 block mb-1 uppercase tracking-wider text-[10px]">
                      Live Agent Output Sample
                    </span>
                    <p className="text-slate-200 font-mono text-[11px] leading-relaxed">"{agent.sampleOutput}"</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
