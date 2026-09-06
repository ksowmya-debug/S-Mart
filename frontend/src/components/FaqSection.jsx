import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const faqList = [
  {
    q: 'What is included in the DSA Notes?',
    a: 'The DSA Notes PDF contains 16 comprehensive modules covering everything from Big-O Intuition and Arrays to Dynamic Programming, Graphs, and Bit Manipulation. Every concept includes visual ASCII diagrams, mental models, 14 master interview pattern templates, and code in ☕ Java, ⚙️ C++, and 🐍 Python, plus 30/60/90-day roadmaps.',
  },
  {
    q: 'Are these notes suitable for absolute beginners?',
    a: 'Yes, 100%! The notes were specifically created for students with zero prior DSA knowledge. We eliminate dry academic math formulas and explain concepts using everyday analogies (like hallway lockers, train compartments, and phone contact books) before showing concise code.',
  },
  {
    q: 'Why is it designed in a phone-first format?',
    a: 'Most students review code and concepts on their smartphones while commuting, in hostel rooms, or before interview rounds. Standard landscape PDFs force you to pinch-to-zoom constantly. Our vertical layout has large text and 40-character code lines that fit smartphone screens natively without zooming!',
  },
  {
    q: 'How will I receive the PDF?',
    a: 'Immediately after completing your ₹39 UPI payment, the backend instantly unlocks the PDF in your personalized SOWMYA.KCODE dashboard. You can download the PDF file directly to your phone, tablet, or laptop.',
  },
  {
    q: 'How much does it cost?',
    a: 'The full notes package costs a one-time fee of only ₹39. There are no monthly subscriptions, renew charges, or hidden fees.',
  },
  {
    q: 'Is the UPI payment safe and verified?',
    a: 'Yes, completely safe! You pay using your standard UPI apps (Google Pay, PhonePe, Paytm, or BHIM) by scanning our verified UPI QR code. No card details or banking passwords are ever requested.',
  },
  {
    q: 'Can I download the notes multiple times?',
    a: 'Yes! Once purchased, your account has permanent lifetime access. You can log into your SOWMYA.KCODE account from any device at any time and re-download your notes.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative bg-[#F8FBFF]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-xs">
            <HelpCircle size={14} className="text-cyan-500" /> Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Everything you need to know about the DSA Notes, phone-first format, and instant access.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-cyan-200 shadow-[0_10px_30px_rgba(6,182,212,0.08)] ring-1 ring-cyan-100'
                    : 'border-slate-200/70 hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-[#0F172A] pr-4">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-cyan-500 text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 text-[#475569]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
