import { ShieldCheck, ExternalLink, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090D16] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Sthira<span className="text-emerald-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              Sthira (स्थिर) is an autonomous behavioral financial intelligence platform combining deterministic Python math engines, 10 specialized LangGraph agents, real Form 16 / CAS statement ingestion, and proactive WhatsApp crisis intervention.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/UtkarshSingh-09/AstraGuard"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>

          {/* Col 2: Core Engines */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Financial Engines</h4>
            <ul className="flex flex-col gap-2">
              <li><Link to="/fire" className="hover:text-emerald-400 transition-colors">FIRE Retirement Planner</Link></li>
              <li><Link to="/tax" className="hover:text-emerald-400 transition-colors">Old vs New Tax Optimizer</Link></li>
              <li><Link to="/portfolio" className="hover:text-emerald-400 transition-colors">Mutual Fund Portfolio X-Ray</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">6-Dimension Arth Score</Link></li>
              <li><Link to="/onboard" className="hover:text-emerald-400 transition-colors">Form 16 & CAS Ingestion</Link></li>
            </ul>
          </div>

          {/* Col 3: Team CodeHashiras */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Team CodeHashiras</h4>
            <ul className="flex flex-col gap-1.5 text-slate-300">
              <li><strong className="text-white">Utkarsh Singh</strong> — Agentic AI & ML</li>
              <li><strong className="text-white">Ankit Choubey</strong> — Lead & GenAI</li>
              <li><strong className="text-white">Devraj Sahani</strong> — Frontend Engineer</li>
              <li><strong className="text-white">Sanklap Tiwari</strong> — Backend Engineer</li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="pt-8 border-t border-white/[0.06] text-[11px] leading-relaxed text-slate-500 flex flex-col gap-2">
          <p>
            <strong>⚠️ Statutory SEBI Regulatory Notice:</strong> Sthira is an educational financial intelligence platform developed for research and algorithmic modeling demonstrations. It does not constitute certified investment advice under SEBI (Investment Advisers) Regulations, 2013. Past mutual fund performance or market CAGR does not guarantee future results. Users must consult a SEBI-registered financial adviser before executing investment, tax, or retirement portfolio decisions.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-4 text-slate-600">
            <span>© 2026 Sthira. All rights reserved. Built with Python 3.13, FastAPI, LangGraph & React.</span>
            <span>Deterministic Finance • Behavioral Intelligence • Compliant AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
