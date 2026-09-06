import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, CheckCircle2, Sparkles, BookOpen, Smartphone, ShieldCheck } from 'lucide-react';
import BookMockup from './BookMockup';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-[#F8FBFF] via-[#EFF8FF] to-[#F8FBFF]">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-200/30 via-blue-300/20 to-purple-300/30 blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-100/40 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100/30 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
              <span className="text-xs font-bold text-[#0F172A] tracking-wide">
                BEGINNER FRIENDLY • 2026 EDITION
              </span>
              <span className="text-xs text-[#9333EA] font-extrabold">• ₹39 ONLY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.12]">
              Master DSA Without{' '}
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#9333EA] bg-clip-text text-transparent">
                the Confusion.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-[#475569] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Beginner-friendly DSA notes, patterns, examples and interview practice — explained step by step with zero gatekeeping.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/pay"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#9333EA] hover:opacity-95 text-white font-extrabold text-base shadow-[0_10px_25px_rgba(6,182,212,0.35)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all active:scale-95"
              >
                <span>Get DSA Notes — ₹39</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200/90 font-bold text-base shadow-sm hover:shadow transition-all hover:border-slate-300"
              >
                <Eye size={18} className="text-[#06B6D4]" />
                <span>Explore Free Content</span>
              </Link>
            </div>

            {/* Trust Checklist Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs sm:text-sm text-[#475569] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#06B6D4]" />
                <span>Java, C++ & Python</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2563EB]" />
                <span>14 Master Patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#9333EA]" />
                <span>Phone-First PDF</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <BookMockup />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
