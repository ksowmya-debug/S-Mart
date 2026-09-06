import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, ShieldCheck } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xs">
                <span className="text-white text-base font-black">◈</span>
              </div>
              <span className="text-xl font-black text-[#0F172A] tracking-tight">SOWMYA.KCODE</span>
            </Link>
            <p className="text-xs text-[#475569] leading-relaxed">
              DSA Notes built for complete beginners. Handcrafted visual mental models, multi-language code in ☕ Java, ⚙️ C++, and 🐍 Python, and 14 master interview patterns by Sowmya Katkojwal.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/sowmya.kcode?igsi=dGsydm5nNjg1ZXE3"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:border-pink-300 hover:bg-pink-50 flex items-center justify-center text-slate-600 hover:text-pink-600 transition shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="mailto:sowmyaKatkojwal@gmail.com"
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 flex items-center justify-center text-slate-600 hover:text-cyan-600 transition shadow-xs"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>
                <Link to="/" className="hover:text-cyan-600 transition font-medium">Home</Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-cyan-600 transition font-medium">16 Modules</Link>
              </li>
              <li>
                <Link to="/preview" className="hover:text-cyan-600 transition font-medium">Interactive Preview</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-cyan-600 transition font-medium">Student Reviews</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-cyan-600 transition font-medium">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-600 transition font-medium">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Mandatory Razorpay Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Policies & Legal
            </h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>
                <Link to="/terms" className="hover:text-cyan-600 transition font-medium">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-600 transition font-medium">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-cyan-600 transition font-medium">Cancellation & Refund Policy</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-cyan-600 transition font-medium">Shipping & Delivery Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-600 transition font-medium">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Digital Edition & Secure Checkout */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Digital Edition
            </h4>
            <p className="text-sm font-bold text-[#0F172A]">
              DSA Demystified — ₹39
            </p>
            <p className="text-xs text-[#475569] leading-relaxed">
              Instant electronic PDF download access via secure Razorpay checkout (UPI, GPay, PhonePe, Cards, NetBanking).
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck size={14} className="text-emerald-500" /> 100% Secure Checkout
              </span>
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SOWMYA.KCODE. All rights reserved.</p>
          
          <div className="flex items-center gap-4 flex-wrap text-slate-400 text-[11px]">
            <Link to="/terms" className="hover:text-cyan-700 hover:underline">Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-cyan-700 hover:underline">Privacy</Link>
            <span>•</span>
            <Link to="/refund" className="hover:text-cyan-700 hover:underline">Refunds</Link>
            <span>•</span>
            <Link to="/shipping" className="hover:text-cyan-700 hover:underline">Shipping (Digital)</Link>
          </div>

          <p className="flex items-center gap-1">
            Made with <Heart size={13} className="text-rose-500 fill-rose-500" /> for engineering placement aspirants.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
