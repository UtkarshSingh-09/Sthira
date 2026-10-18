import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, PieChart, Flame, Receipt, 
  Activity, User, LogOut, ChevronDown, Sparkles, UserPlus 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const { currentUser, isAuthenticated, logoutUser, activePage, setActivePage } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer ${
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

        {/* Right Side: Dynamic User Profile & Auth Pill */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324]/60 transition text-xs font-mono cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#D98324] to-[#EFDCAB] flex items-center justify-center text-[#271E16] font-bold text-xs uppercase font-sans">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[#F2F6D0] font-semibold text-xs leading-none truncate max-w-[120px]">
                    {currentUser.name || 'Active Investor'}
                  </div>
                  <div className="text-[9px] text-[#D98324] font-mono leading-none mt-1">
                    {currentUser.pan ? `${currentUser.pan.slice(0, 5)}••••${currentUser.pan.slice(9)}` : 'KYC ACTIVE'}
                  </div>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#EFDCAB]/60" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#1C1510] border border-[#443627] shadow-2xl p-3 z-50 animate-fadeIn space-y-2">
                  <div className="pb-2 border-b border-[#443627]">
                    <div className="text-xs font-bold text-[#F2F6D0] truncate">
                      {currentUser.name || 'Registered Investor'}
                    </div>
                    <div className="text-[10px] text-[#EFDCAB]/70 font-mono truncate">
                      {currentUser.email || 'investor@vault.sthira'}
                    </div>
                    {currentUser.pan && (
                      <div className="text-[10px] font-mono text-[#D98324] mt-1">
                        PAN: {currentUser.pan}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActivePage('dashboard');
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#443627]/40 transition flex items-center space-x-2 text-xs text-[#EFDCAB] hover:text-[#F2F6D0] cursor-pointer"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-[#D98324]" />
                      <span>Financial Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActivePage('auth');
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#443627]/40 transition flex items-center space-x-2 text-xs text-[#EFDCAB] hover:text-[#F2F6D0] cursor-pointer"
                    >
                      <UserPlus className="h-3.5 w-3.5 text-[#D98324]" />
                      <span>Register Another Account</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#443627]">
                    <button
                      onClick={() => {
                        logoutUser();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-red-950/40 text-red-400 hover:text-red-300 transition flex items-center space-x-2 text-xs cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out of Vault</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setActivePage('auth')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D98324] to-[#EFDCAB] hover:brightness-105 text-[#271E16] font-bold text-xs font-mono transition cursor-pointer shadow-md shadow-[#D98324]/20"
            >
              Sign In / Register →
            </button>
          )}

          {/* Quick Direct Link to Dashboard if on auth page */}
          {activePage === 'auth' && currentUser && (
            <button
              onClick={() => setActivePage('dashboard')}
              className="hidden sm:block px-3 py-1.5 rounded-xl bg-[#1C1510] border border-[#443627] hover:border-[#D98324] text-[#EFDCAB] text-xs font-mono font-medium transition cursor-pointer"
            >
              Dashboard →
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
