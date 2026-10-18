import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Flame,
  Scale,
  PieChart,
  LayoutDashboard,
  MessageSquareText,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  User,
  ChevronDown,
  LogOut,
  Zap,
  RefreshCw
} from 'lucide-react'
import { getActiveUserProfile, DEFAULT_PERSONAS, setActiveUserProfile, logoutUser, isAuthenticated } from '../../services/session'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portfolio', label: 'Portfolio X-Ray', icon: PieChart },
  { to: '/fire', label: 'FIRE Engine', icon: Flame },
  { to: '/tax', label: 'Tax Arbitrage', icon: Scale },
  { to: '/onboard', label: 'AI Lab', icon: MessageSquareText },
]

function formatINRShort(num) {
  if (num == null || isNaN(num)) return '₹0'
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

export default function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [profile, setProfile] = useState(() => getActiveUserProfile())
  const [authed, setAuthed] = useState(() => isAuthenticated())
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleProfileChange = () => {
      setProfile(getActiveUserProfile())
      setAuthed(isAuthenticated())
    }
    window.addEventListener('sthira_profile_updated', handleProfileChange)
    window.addEventListener('storage', handleProfileChange)
    return () => {
      window.removeEventListener('sthira_profile_updated', handleProfileChange)
      window.removeEventListener('storage', handleProfileChange)
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSwitchPersona = (key) => {
    const target = DEFAULT_PERSONAS[key]
    if (target) {
      setActiveUserProfile(target)
      setUserMenuOpen(false)
    }
  }

  const handleLogout = () => {
    logoutUser()
    setAuthed(false)
    setUserMenuOpen(false)
    navigate('/login')
  }

  const initials = (profile?.name || 'User')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('')

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#090D16]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-sm">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-extrabold tracking-tight text-white">
              Sthira<span className="text-emerald-400">.</span>
            </span>
            <span className="hidden xl:inline-flex items-center rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Behavioral Wealth OS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Area: Dynamic User Profile & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {authed ? (
          /* User Profile Pill */
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#111622] hover:border-emerald-500/40 px-3 py-1.5 transition-all text-left group cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold shrink-0">
                {initials || 'U'}
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 max-w-[110px] truncate leading-tight">
                  {profile?.name || 'Investor'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 leading-tight">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {formatINRShort(profile?.portfolio_value || 3850000)}
                </span>
              </div>

              <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-transform" />
            </button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-[#0E131F] shadow-2xl p-4 flex flex-col gap-3 z-50">
                <div className="flex flex-col gap-1 pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-bold text-white">{profile?.name}</span>
                  <span className="text-[11px] text-slate-400 truncate">{profile?.email || 'authenticated@sthira.ai'}</span>
                  <span className="text-[10px] font-semibold text-emerald-400 mt-0.5">
                    {profile?.tag || 'Active Financial DNA Profile'}
                  </span>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div className="flex flex-col p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400">Net Worth</span>
                    <span className="font-bold text-emerald-400">{formatINRShort(profile?.portfolio_value || 0)}</span>
                  </div>
                  <div className="flex flex-col p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[10px] text-slate-400">Monthly SIP</span>
                    <span className="font-bold text-slate-200">{formatINRShort(profile?.monthly_sip || 0)}</span>
                  </div>
                </div>

                {/* Persona Switchers */}
                <div className="flex flex-col gap-1 pt-1 border-t border-white/[0.08]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Fast Switch Persona</span>
                  <button
                    type="button"
                    onClick={() => handleSwitchPersona('user_rahul_sharma')}
                    className="flex items-center justify-between text-left text-xs p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-300 hover:text-white"
                  >
                    <span>Rahul Sharma (32, ₹28L CTC)</span>
                    <span className="text-[10px] text-emerald-400">₹38.5L</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchPersona('user_priya_verma')}
                    className="flex items-center justify-between text-left text-xs p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-300 hover:text-white"
                  >
                    <span>Priya Verma (29, Overlap Alert)</span>
                    <span className="text-[10px] text-amber-400">₹24.2L</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchPersona('user_santosh_pradhan')}
                    className="flex items-center justify-between text-left text-xs p-1.5 rounded-lg hover:bg-white/[0.04] text-slate-300 hover:text-white"
                  >
                    <span>Santosh Pradhan (64, Senior)</span>
                    <span className="text-[10px] text-blue-400">₹84.5L</span>
                  </button>
                </div>

                {/* Account Actions */}
                <div className="flex flex-col gap-1 pt-2 border-t border-white/[0.08]">
                  <Link
                    to="/auth"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/[0.04]"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Update Financial Profile (Intake)</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out / Reset</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all bg-white/[0.02]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D16] transition-all shadow-sm shadow-emerald-500/20"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          <Link
            to="/portfolio"
            className="group flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[13px] font-semibold text-[#090D16] shadow-sm transition-all hover:bg-emerald-400 hover:shadow-emerald-500/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Portfolio X-Ray</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/auth"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
          >
            {profile?.name ? profile.name.split(' ')[0] : 'Sign In'}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#0E131F] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1.5">
            {/* Active User Card on Mobile */}
            {authed ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                  {initials || 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{profile?.name}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{formatINRShort(profile?.portfolio_value || 0)}</span>
                </div>
              </div>
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-lg"
              >
                Change Profile
              </Link>
            </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg border border-white/10 text-xs font-semibold text-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 rounded-lg bg-emerald-500 text-xs font-bold text-[#090D16]"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}

            <div className="mt-3 pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <Link
                to="/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-[#090D16]"
              >
                <span>Open Portfolio X-Ray</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
