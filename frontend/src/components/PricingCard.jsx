import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Sparkles, ArrowRight, Smartphone, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const PricingCard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    'Phone-First Digital Book (Read comfortably on mobile)',
    '16 Structured Modules (From Part 0 Foundations to Advanced)',
    'Multi-Language Code: ☕ Java, ⚙️ C++, and 🐍 Python',
    '14 Master Interview Patterns Demystified with Templates',
    '30, 60 & 90-Day Step-by-Step Study Roadmaps',
    'Visual ASCII Diagrams & Memory Dry Runs for Beginners',
    'Instant PDF Download Access directly to your device',
    'Lifetime Access & Free Revisions Included',
  ];

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      navigate('/register?redirect=pay');
      return;
    }

    try {
      const { data } = await API.post('/api/orders', {});
      navigate(`/pay/${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      console.error('Error creating order:', err);
      if (err.response?.data?.alreadyOwned) {
        navigate('/dashboard');
      } else {
        navigate('/pay');
      }
    }
  };

  return (
    <section className="py-24 relative bg-[#F8FBFF]" id="pricing">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-cyan-100/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-sm">
            <Zap size={14} className="text-cyan-500" /> Direct Investment in Your Career
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            One Simple Price, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Lifetime Access</span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            No subscriptions or hidden fees. Pay once, learn at your own pace, and crack your placement coding rounds.
          </p>
        </div>

        {/* The Big White Premium Card */}
        <div className="relative bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(6,182,212,0.12)] transition-all duration-300">
          
          {/* Top Corner Pill Badge */}
          <div className="absolute -top-3.5 sm:-top-4 right-4 sm:right-8 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md">
            Best Seller • 80% OFF
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Product Info & Checklist */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-cyan-600 font-bold text-xs uppercase tracking-wider bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100 inline-block mb-2">
                  Complete Digital Notes Package
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A]">
                  DSA Demystified: The Beginner's Blueprint
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  By Sowmya Katkojwal (@sowmya.kcode)
                </p>
              </div>

              {/* Price Tag */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-4xl sm:text-6xl font-black text-[#0F172A] tracking-tight">
                  ₹39
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#475569]">
                  One-time payment
                </span>
                <span className="line-through text-xs sm:text-sm text-slate-400">
                  ₹199
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Save ₹160
                </span>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-[#334155]">
                    <div className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handlePurchase}
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base shadow-[0_10px_25px_rgba(6,182,212,0.3)] hover:shadow-[0_15px_30px_rgba(6,182,212,0.4)] transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Get Instant Access — ₹39</span>
                  <ArrowRight size={20} />
                </button>
                <p className="text-xs text-slate-500 mt-2.5 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Instant UPI Checkout (GPay, PhonePe, Paytm) • Immediate PDF Download
                </p>
              </div>

            </div>

            {/* Right Column: Visual Book Card Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-sm bg-gradient-to-br from-[#EFF8FF] to-[#F8FBFF] rounded-3xl border border-cyan-200/80 p-6 flex flex-col justify-between shadow-lg">
                
                {/* Book Header Preview */}
                <div className="flex items-center justify-between border-b border-cyan-200/60 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#0F172A]">DSA DEMYSTIFIED</h4>
                      <p className="text-[10px] text-cyan-700 font-semibold">Phone-First Edition</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">
                    PDF 43 KB
                  </span>
                </div>

                {/* Module Highlight Badges */}
                <div className="space-y-2 mb-6">
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
                    <span className="text-xs font-bold text-[#0F172A]">16 Core Modules</span>
                    <span className="text-[11px] font-mono text-cyan-600 font-semibold">Complete</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
                    <span className="text-xs font-bold text-[#0F172A]">Languages Supported</span>
                    <span className="text-[11px] font-mono text-blue-600 font-semibold">☕ Java • ⚙️ C++ • 🐍 Python</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center justify-between shadow-xs">
                    <span className="text-xs font-bold text-[#0F172A]">Master Patterns</span>
                    <span className="text-[11px] font-mono text-purple-600 font-semibold">14 Templates</span>
                  </div>
                </div>

                {/* Central Verified Graphic */}
                <div className="bg-white rounded-2xl border border-cyan-100 p-4 text-center shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mx-auto mb-2 shadow-xs">
                    <ShieldCheck size={26} />
                  </div>
                  <h5 className="text-xs font-black text-[#0F172A]">100% Genuine Notes</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Written by Sowmya Katkojwal for easy, practical placement preparation.
                  </p>
                </div>

                {/* Bottom verified badge */}
                <div className="text-center text-[11px] font-mono text-cyan-700 bg-cyan-100/60 py-2 px-3 rounded-xl border border-cyan-200 mt-4 font-bold">
                  VERIFIED BY SOWMYA.KCODE
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PricingCard;
