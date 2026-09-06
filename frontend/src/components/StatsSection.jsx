import React from 'react';
import { Layers, Code2, BookOpen, Smartphone } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      value: '16',
      label: 'Core Modules',
      sublabel: 'Part 0 to Part 15',
      icon: Layers,
      color: 'text-[#06B6D4]',
      bg: 'bg-cyan-50 border-cyan-100',
    },
    {
      value: '3',
      label: 'Languages',
      sublabel: '☕ Java • ⚙️ C++ • 🐍 Python',
      icon: Code2,
      color: 'text-[#2563EB]',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      value: '14',
      label: 'Coding Patterns',
      sublabel: 'Two Pointers, Sliding Window...',
      icon: BookOpen,
      color: 'text-[#9333EA]',
      bg: 'bg-purple-50 border-purple-100',
    },
    {
      value: 'Phone-First',
      label: 'Mobile Reading',
      sublabel: 'No horizontal scrolling',
      icon: Smartphone,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <section className="py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-2xl ${item.bg} border flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon size={22} />
                </div>

                {/* Stat Text */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                    {item.value}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#475569] leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-[#64748B] mt-0.5 hidden sm:block">
                    {item.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
