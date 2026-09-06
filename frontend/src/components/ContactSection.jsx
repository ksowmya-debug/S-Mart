import React from 'react';
import { Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

const ContactSection = () => {
  return (
    <section className="py-24 relative bg-[#EFF8FF]/50" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-xs">
            <Sparkles size={14} className="text-cyan-500" /> Direct Access
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Connect with <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Sowmya</span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Have questions about the notes, need study guidance, or have feedback? Reach out directly.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/sowmya.kcode?igsi=dGsydm5nNjg1ZXE3"
            target="_blank"
            rel="noopener noreferrer"
            className="relative bg-white border border-slate-200/80 hover:border-pink-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.1)] group flex flex-col justify-between"
          >
            {/* Corner Badge */}
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200 text-xs font-bold">
              Primary Channel
            </div>

            <div>
              {/* Instagram Gradient Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mb-6 shadow-md shadow-pink-500/20">
                <InstagramIcon size={28} />
              </div>

              <h3 className="text-2xl font-black text-[#0F172A] group-hover:text-pink-600 transition-colors flex items-center gap-2">
                <span>@sowmya.kcode</span>
                <ArrowUpRight size={20} className="text-pink-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>

              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                Connect on Instagram for daily DSA coding reels, interview breakdowns, tech career motivation, and DM support.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
              <span>Follow on Instagram</span>
              <span>DMs Open →</span>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:sowmyaKatkojwal@gmail.com"
            className="relative bg-white border border-slate-200/80 hover:border-cyan-300 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] group flex flex-col justify-between"
          >
            <div>
              {/* Cyan Mail Icon */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-6 shadow-xs">
                <Mail size={28} />
              </div>

              <h3 className="text-2xl font-black text-[#0F172A] group-hover:text-cyan-600 transition-colors flex items-center gap-2">
                <span>Email Support</span>
                <ArrowUpRight size={20} className="text-cyan-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>

              <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                For order assistance, college placement workshops, bulk student access, or general queries.
              </p>

              <div className="mt-4 p-3 bg-cyan-50/60 rounded-xl border border-cyan-100">
                <span className="text-xs font-mono text-cyan-800 font-bold break-all">
                  sowmyaKatkojwal@gmail.com
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
              <span>Send an Email</span>
              <span>Quick Response →</span>
            </div>
          </a>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
