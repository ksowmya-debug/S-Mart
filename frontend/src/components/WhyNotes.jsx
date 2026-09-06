import React from 'react';
import {
  Brain,
  Code2,
  Target,
  Smartphone,
  CheckCircle2,
  Zap,
} from 'lucide-react';

const WhyNotes = () => {
  const cards = [
    {
      title: 'Beginner Friendly',
      description: 'Zero assumed DSA knowledge. Every concept starts with physical real-life analogies before code.',
      icon: Brain,
      iconColor: 'text-[#06B6D4]',
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      title: '3 Languages Included',
      description: 'Clean, production-ready code in ☕ Java (Primary), ⚙️ C++, and 🐍 Python without tripling pages.',
      icon: Code2,
      iconColor: 'text-[#2563EB]',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: '14 Interview Patterns',
      description: 'Master pattern recognition (Two Pointers, Sliding Window, Fast & Slow) to solve unseen problems.',
      icon: Target,
      iconColor: 'text-[#9333EA]',
      bg: 'bg-purple-50 border-purple-100',
    },
    {
      title: 'Phone-First Design',
      description: 'Designed specifically for reading on mobile screens without horizontal scrolling or tiny text.',
      icon: Smartphone,
      iconColor: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Tiered Practice Problems',
      description: 'Progression from 🟢 Beginner Warmups to 🟡 Pattern Building to 🔴 FAANG Interview Classics.',
      icon: CheckCircle2,
      iconColor: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      title: '⚡ 1-Page Quick Revision',
      description: 'Compact revision summary cards at the end of every topic for rapid revision before interviews.',
      icon: Zap,
      iconColor: 'text-[#06B6D4]',
      bg: 'bg-cyan-50 border-cyan-100',
    },
  ];

  return (
    <section className="py-20 bg-[#F8FBFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#06B6D4] text-xs font-bold mb-3">
            <span>✨ BUILT FOR REAL UNDERSTANDING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            Why Students Love{' '}
            <span className="bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#9333EA] bg-clip-text text-transparent">
              These Notes
            </span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Engineered specifically to transform confusion into clarity for campus placements and coding interviews.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Icon in Rounded Container */}
                <div className={`w-12 h-12 rounded-2xl ${card.bg} border flex items-center justify-center ${card.iconColor} mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyNotes;
