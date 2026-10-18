import React from 'react';
import { ShieldCheck, Database, KeyRound, Scale } from 'lucide-react';

export default function SecurityBadgeStrip() {
  const badges = [
    {
      icon: Database,
      title: 'RBI Data Localization',
      subtitle: 'Circular RBI/2017-18/153',
      desc: 'All financial DNA & telemetry stored strictly within Indian Tier-4 datacenters.'
    },
    {
      icon: Scale,
      title: 'SEBI IA Compliance',
      subtitle: 'Advisers Reg. 2013',
      desc: 'Zero brokerage commission kickbacks. Pure fiduciary deterministic computation.'
    },
    {
      icon: KeyRound,
      title: 'AES-256 Hardware Vault',
      subtitle: 'TLS 1.3 End-to-End',
      desc: 'Zero plaintext passwords or PAN storage. Real-time tokenized authentication.'
    },
    {
      icon: ShieldCheck,
      title: 'Aadhaar / PMLA KYC',
      subtitle: 'Prevention of Money Laundering',
      desc: '2FA OTP-secured verified identity binding with instant document validation.'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div 
            key={idx}
            className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition duration-300"
          >
            <div className="flex items-center space-x-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">{b.title}</div>
                <div className="text-[10px] font-mono text-emerald-400/80">{b.subtitle}</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {b.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
