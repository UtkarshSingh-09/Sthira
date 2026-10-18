import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, PieChart, Flame, Receipt, 
  Activity, User, LogOut, ChevronDown, Check, Lock, Sparkles 
} from 'lucide-react';
import { useUser, PRESET_PERSONAS } from '../../context/UserContext';

export default function Navbar() {
  const { currentUser, switchPersona, logoutUser, activePage, setActivePage } = useUser();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio X-Ray', icon: PieChart },
    { id: 'fire', label: 'FIRE Freedom', icon: Flame },
    { id: 'tax', label: 'Tax Arbitrage', icon: Receipt },
    { id: 'shield', label: 'Behavioral Shield', icon: Activity },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#443627] bg-[#120E0A]/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#D98324] to-[#EFDCAB] p-0.5 flex items-center justify-center shadow-lg shadow-[#D98324]/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#120E0A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-[#D98324]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-[#F2F6D0] font-sans">
                STHIRA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D98324]/15 text-[#EFDCAB] border border-[#D98324]/30 font-semibold">
                OS
              </span>
            </div>
            <div className="text-[10px] text-[#EFDCAB]/70 font-mono tracking-wider hidden sm:block">
              AUTONOMOUS WEALTH OS
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-1 p-1 rounded-xl bg-[#1C1510] border border-[#443627]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[#D98324]/20 text-[#D98324] border border-[#D98324]/50 font-bold shadow-sm'
                    : 'text-[#EFDCAB]/75 hover:text-[#F2F6D0] hover:bg-white/5'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Persona Switcher & Auth Pill */}
        <div className="flex items-center space-x-3">
          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/60 transition text-xs font-mono"
            >
              <div className="w-2 h-2 rounded-full bg-[#D98324] animate-pulse" />
              <span className="text-[#EFDCAB] font-medium truncate max-w-[110px] sm:max-w-none">
                {currentUser?.name || 'Investor'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[#EFDCAB]/60" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#1C1510] border border-[#443627] shadow-2xl p-2 z-50 animate-fadeIn">
                <div className="text-[10px] font-mono text-[#EFDCAB]/70 uppercase tracking-wider px-2 py-1">
                  Switch Active Persona (Demo Test)
                </div>
                {Object.entries(PRESET_PERSONAS).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => {
                      switchPersona(key);
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#443627]/40 transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#F2F6D0]">{p.name}</div>
                      <div className="text-[10px] text-[#EFDCAB]/70">
                        Age {p.age} • ₹{(p.annual_salary / 100000).toFixed(0)}L CTC
                      </div>
                    </div>
                    {currentUser?.user_id === p.user_id && (
                      <Check className="h-4 w-4 text-[#D98324]" />
                    )}
                  </button>
                ))}

                <div className="mt-2 pt-2 border-t border-[#443627] flex items-center justify-between px-1">
                  <button
                    onClick={() => {
                      setShowPersonaMenu(false);
                      setActivePage('auth');
                    }}
                    className="text-xs text-[#D98324] hover:underline font-mono"
                  >
                    + New Signup
                  </button>
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowPersonaMenu(false);
                    }}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center space-x-1"
                  >
                    <LogOut className="h-3 w-3" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct Auth Quick Switch */}
          {activePage !== 'auth' ? (
            <button
              onClick={() => setActivePage('auth')}
              className="px-3 py-1.5 rounded-xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-[#EFDCAB] text-xs font-mono font-medium transition"
            >
              Auth / Sign Up
            </button>
          ) : (
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D98324] to-[#EFDCAB] text-[#271E16] font-bold text-xs font-mono transition hover:brightness-105"
            >
              Go to Dashboard →
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
