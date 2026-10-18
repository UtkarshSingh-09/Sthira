import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, PieChart, Flame, Receipt, 
  Activity, User, LogOut, ChevronDown, Check, Lock, Sparkles 
} from 'lucide-react';
import { useUser, PRESET_PERSONAS } from '../../context/UserContext';

export default function Navbar() {
  const { currentUser, switchPersona, logoutUser, activePage, setActivePage, isAuthenticated } = useUser();
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
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080B11]/85 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold tracking-tight text-white font-sans">
                STHIRA
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                OS
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wider hidden sm:block">
              AUTONOMOUS WEALTH OS
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-1 p-1 rounded-xl bg-slate-900/90 border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
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
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/40 transition text-xs font-mono"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium truncate max-w-[110px] sm:max-w-none">
                {currentUser?.name || 'Investor'}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0E131F] border border-white/10 shadow-2xl p-2 z-50 animate-fadeIn">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Active Persona (Demo Test)
                </div>
                {Object.entries(PRESET_PERSONAS).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => {
                      switchPersona(key);
                      setShowPersonaMenu(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{p.name}</div>
                      <div className="text-[10px] text-slate-400">
                        Age {p.age} • ₹{(p.annual_salary / 100000).toFixed(0)}L CTC
                      </div>
                    </div>
                    {currentUser?.user_id === p.user_id && (
                      <Check className="h-4 w-4 text-emerald-400" />
                    )}
                  </button>
                ))}

                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between px-1">
                  <button
                    onClick={() => {
                      setShowPersonaMenu(false);
                      setActivePage('auth');
                    }}
                    className="text-xs text-emerald-400 hover:underline font-mono"
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
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/50 text-slate-300 text-xs font-mono font-medium transition"
            >
              Auth / Sign Up
            </button>
          ) : (
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs font-mono transition hover:bg-emerald-400"
            >
              Go to Dashboard →
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
