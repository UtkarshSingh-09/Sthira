import React from 'react';
import { ShieldCheck, Database, KeyRound, Scale } from 'lucide-react';

export default function SecurityBadgeStrip() {
  const badges = [
    {
      icon: Database,
      title: 'RBI Localization',
      subtitle: 'Circular RBI/2017-18',
      desc: 'Tier-4 Indian Datacenters.'
    },
    {
      icon: Scale,
      title: 'SEBI Fiduciary',
      subtitle: 'Advisers Reg. 2013',
      desc: 'Zero commission kickbacks.'
    },
    {
      icon: KeyRound,
      title: 'AES-256 Vault',
      subtitle: 'Hardware Security',
      desc: 'Zero plaintext password storage.'
    },
    {
      icon: ShieldCheck,
      title: 'PMLA e-KYC',
      subtitle: 'UIDAI Verification',
      desc: '2FA verified identity binding.'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div 
            key={idx}
            className="p-3 rounded-xl bg-[#1C1510]/80 border border-[#443627] hover:border-[#D98324]/60 transition duration-300"
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className="p-1 rounded-lg bg-[#D98324]/15 text-[#D98324]">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-[#F2F6D0]">{b.title}</div>
                <div className="text-[10px] font-mono text-[#EFDCAB]/80">{b.subtitle}</div>
              </div>
            </div>
            <p className="text-[11px] text-[#EFDCAB]/75 leading-tight">
              {b.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
