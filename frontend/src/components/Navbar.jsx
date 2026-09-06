import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Shield, User, LogOut, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'DSA Course', path: '/notes' },
    { name: 'Free Content', path: '/preview' },
    { name: 'Reviews', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6">
      {/* Floating Pill Container */}
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full py-2.5 px-4 sm:px-6 border border-slate-200/80 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.08)] flex items-center justify-between transition-all">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#06B6D4] via-[#2563EB] to-[#9333EA] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-white text-sm font-black tracking-tight">◈</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight leading-none">
              SOWMYA<span className="text-[#06B6D4]">.KCODE</span>
            </span>
            <span className="text-[9px] text-[#64748B] font-semibold tracking-wider uppercase mt-0.5">
              DSA Notes
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-50 text-[#06B6D4] font-bold border border-cyan-100'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-bold transition"
              >
                <User size={13} className="text-[#06B6D4]" />
                <span>My Notes</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-full bg-purple-50 text-[#9333EA] border border-purple-200 text-xs font-bold hover:bg-purple-100 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-slate-50 transition"
              >
                Login
              </Link>
              <Link
                to="/pay"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2563EB] hover:from-[#0891B2] hover:to-[#1D4ED8] text-white text-xs font-bold shadow-[0_4px_14px_rgba(6,182,212,0.35)] hover:shadow-lg transition active:scale-95"
              >
                <span>Get Notes — ₹39</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile / Tablet Hamburger & Quick Pay Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/pay"
            className="px-3 py-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white text-xs font-bold shadow-sm min-h-[40px] flex items-center justify-center"
          >
            ₹39 Notes
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#0F172A] hover:bg-slate-100 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-white rounded-2xl p-4 border border-slate-200 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-center ${
                    isActive
                      ? 'bg-cyan-50 text-[#06B6D4] border border-cyan-100'
                      : 'text-[#475569] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-[#0F172A] text-xs font-bold flex items-center justify-center gap-2"
                >
                  <User size={14} className="text-[#06B6D4]" />
                  <span>My Notes & Orders</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="w-full py-2.5 rounded-xl bg-purple-50 text-[#9333EA] border border-purple-200 text-xs font-bold flex items-center justify-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full py-2 rounded-xl text-red-500 text-xs font-bold hover:bg-red-50 flex items-center justify-center gap-1.5"
                >
                  <LogOut size={13} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-[#0F172A] text-xs font-bold text-center"
                >
                  Login
                </Link>
                <Link
                  to="/pay"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white text-xs font-bold text-center shadow-md"
                >
                  Get Notes — ₹39
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
