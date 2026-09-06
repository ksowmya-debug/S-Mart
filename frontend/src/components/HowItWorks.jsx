import React from 'react';
import { UserPlus, BookOpen, QrCode, DownloadCloud } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Account',
      desc: 'Sign up in just 10 seconds with your email.',
      icon: UserPlus,
      color: 'text-[#06B6D4]',
      bg: 'bg-cyan-50 border-cyan-200',
    },
    {
      num: '02',
      title: 'Preview Notes',
      desc: 'Explore interactive free sample code & chapters.',
      icon: BookOpen,
      color: 'text-[#2563EB]',
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      num: '03',
      title: 'Pay ₹39 Once',
      desc: 'Instant secure payment via UPI, GPay, PhonePe, Paytm.',
      icon: QrCode,
      color: 'text-[#9333EA]',
      bg: 'bg-purple-50 border-purple-200',
    },
    {
      num: '04',
      title: 'Instant Download',
      desc: 'Get immediate lifetime access to the phone-first PDF.',
      icon: DownloadCloud,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <section className="py-20 bg-[#EFF8FF]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-[#2563EB] text-xs font-bold mb-3">
            <span>⚡ SIMPLE 4-STEP PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            How It{' '}
            <span className="bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#9333EA] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Get instant access to complete DSA notes in 4 straightforward steps.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-1 relative group flex flex-col items-center text-center"
              >
                {/* Step Number Tag */}
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-[#0F172A] mb-4">
                  Step {step.num}
                </span>

                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl ${step.bg} border flex items-center justify-center ${step.color} mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon size={26} />
                </div>

                <h3 className="text-base font-extrabold text-[#0F172A] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
