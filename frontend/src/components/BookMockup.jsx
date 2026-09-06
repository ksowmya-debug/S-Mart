import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Code2, BookOpen, Smartphone, ArrowRight } from 'lucide-react';

const BookMockup = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient Soft Glow Background */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-400/20 via-blue-500/15 to-purple-500/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-8 w-72 h-72 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Digital Course Card */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-200/80 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.12),0_0_30px_rgba(6,182,212,0.1)] transition-transform duration-300 hover:-translate-y-1">
        
        {/* Top Tag & Price Row */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#06B6D4] text-[11px] sm:text-xs font-bold">
              <Sparkles size={11} /> 2026 Edition
            </span>
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#9333EA] text-[11px] sm:text-xs font-bold">
              Phone-First
            </span>
          </div>
          <Link
            to="/pay"
            className="text-right hover:opacity-85 transition group shrink-0"
            title="Get Notes — ₹39"
          >
            <span className="text-xl sm:text-2xl font-black text-[#0F172A] group-hover:text-cyan-600 transition">₹39</span>
            <span className="text-[10px] text-cyan-600 block font-bold">Buy Now →</span>
          </Link>
        </div>

        {/* Card Title & Headline */}
        <div className="my-4 sm:my-5">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#06B6D4] to-[#2563EB] flex items-center justify-center text-white text-[10px] font-black">
              ◈
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              SOWMYA.KCODE
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-[#0F172A] tracking-tight leading-snug">
            DSA Demystified
          </h3>
          <p className="text-xs text-[#64748B] font-medium mt-1">
            The Beginner’s Step-by-Step Blueprint to Data Structures & Algorithms
          </p>
        </div>

        {/* Modules Preview List */}
        <div className="bg-[#F8FBFF] rounded-2xl p-3.5 sm:p-4 border border-blue-100/60 space-y-2 mb-4 sm:mb-5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#0F172A] border-b border-slate-200/60 pb-1.5">
            <span>Core Modules</span>
            <span className="text-[#06B6D4]">16 Total</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-[#475569]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] shrink-0" />
              <span className="truncate">01 Arrays & Lockers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
              <span className="truncate">02 Strings (26-Buckets)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA] shrink-0" />
              <span className="truncate">03 Binary Search</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">05 Linked Lists</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="truncate">08 HashMaps (O(1))</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span className="truncate">13 Dynamic Prog.</span>
            </div>
          </div>
        </div>

        {/* Supported Languages Pill Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-100 text-[#0F172A] text-[11px] sm:text-xs font-bold">
              ☕ Java
            </span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-100 text-[#0F172A] text-[11px] sm:text-xs font-bold">
              ⚙️ C++
            </span>
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-100 text-[#0F172A] text-[11px] sm:text-xs font-bold">
              🐍 Python
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#16A34A] flex items-center gap-1 shrink-0">
            <CheckCircle2 size={13} /> Instant PDF
          </span>
        </div>

        {/* Quick Buy Action */}
        <Link
          to="/pay"
          className="mt-4 w-full py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
        >
          <span>Get Instant Access — ₹39</span>
          <ArrowRight size={14} />
        </Link>

      </div>
    </div>
  );
};

export default BookMockup;
