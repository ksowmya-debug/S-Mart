import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, CheckCircle2, ChevronRight, FileText, ArrowRight, Sparkles } from 'lucide-react';

const NotesPreviewSection = () => {
  const samplePages = [
    {
      page: '00',
      title: 'Big-O Intuition',
      subtitle: 'Zero Math • Operations Growth Curves',
      content: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-cyan-700 text-xs sm:text-sm"># Big-O Without Complex Math</h4>
            <p className="text-[11px] text-slate-500">Measuring operations growth as input size (n) scales</p>
          </div>
          <div className="bg-[#0F172A] text-slate-200 p-3.5 rounded-xl space-y-1.5 shadow-inner">
            <p className="text-emerald-400 font-semibold">O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²)</p>
            <p className="text-slate-400 text-[11px]">• O(1) Instant: Direct jump to locker by index</p>
            <p className="text-slate-400 text-[11px]">• O(log n) Fast: Halving search area (Binary Search)</p>
            <p className="text-slate-400 text-[11px]">• O(n) Linear: Scanning array with single loop</p>
          </div>
          <p className="text-slate-500 text-[11px]">💡 Golden rule: Constants drop. O(2n) simplifies directly to O(n).</p>
        </div>
      ),
      locked: false,
    },
    {
      page: '01',
      title: 'Arrays & Two Pointers',
      subtitle: 'Hallway Lockers & Two Sum II',
      content: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-cyan-700 text-xs sm:text-sm"># Two Pointers Converging Pattern</h4>
            <p className="text-[11px] text-slate-500">Sorted array pair search in optimal O(n) time</p>
          </div>
          <div className="bg-[#0F172A] text-cyan-300 p-3 rounded-xl overflow-x-auto shadow-inner text-[11px] leading-relaxed">
            <code>
              {`int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return new int[]{left + 1, right + 1};
    else if (sum > target) right--;
    else left++;
}`}
            </code>
          </div>
          <p className="text-slate-500 text-[11px]">💡 Drops O(n²) nested loops by stepping inward from sorted boundaries.</p>
        </div>
      ),
      locked: false,
    },
    {
      page: '02',
      title: 'Strings & 26-Buckets',
      subtitle: 'Valid Anagram in O(1) Space',
      content: (
        <div className="space-y-4 text-xs font-mono">
          <div className="border-b border-slate-100 pb-2">
            <h4 className="font-bold text-cyan-700 text-xs sm:text-sm"># 26-Bucket Alphabet Array</h4>
            <p className="text-[11px] text-slate-500">Character frequency mapping via 'c' - 'a' math</p>
          </div>
          <div className="bg-[#0F172A] text-cyan-300 p-3 rounded-xl overflow-x-auto shadow-inner text-[11px] leading-relaxed">
            <code>
              {`int[] count = new int[26];
for (int i = 0; i < s.length(); i++) {
    count[s.charAt(i) - 'a']++;
    count[t.charAt(i) - 'a']--;
}
for (int c : count) if (c != 0) return false;
return true;`}
            </code>
          </div>
          <p className="text-slate-500 text-[11px]">⚠️ Java Note: Never compare strings with ==. Always use .equals()!</p>
        </div>
      ),
      locked: false,
    },
    {
      page: '14',
      title: '14 Master Patterns',
      subtitle: 'Complete 16-Module Curriculum',
      content: (
        <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-xs">
            <Lock size={24} />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#0F172A]">Complete Digital Book</h4>
            <p className="text-xs text-[#475569] mt-1 max-w-[210px] leading-relaxed">
              Unlock all 16 modules with multi-language code (☕ Java, ⚙️ C++, 🐍 Python) and 30/60/90-day roadmaps.
            </p>
          </div>
          <Link
            to="/pay"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-sm transition"
          >
            Unlock Full Book — ₹39
          </Link>
        </div>
      ),
      locked: true,
    },
  ];

  return (
    <section className="py-24 relative bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-xs">
            <Eye size={14} className="text-cyan-500" /> Transparent Sneak Peek
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Notes <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Preview</span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            See the exact visual explanations and clean code formatting you'll get inside the book.
          </p>
        </div>

        {/* 4 Sample Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {samplePages.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 min-h-[400px] bg-white ${
                item.locked
                  ? 'border-cyan-200/80 shadow-[0_10px_30px_rgba(6,182,212,0.06)]'
                  : 'border-slate-200/80 hover:border-cyan-300 hover:shadow-[0_15px_35px_rgba(6,182,212,0.08)]'
              }`}
            >
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                    Mod {item.page}
                  </span>
                  <span className="text-xs font-bold text-[#0F172A] truncate max-w-[130px]">
                    {item.title}
                  </span>
                </div>
                {item.locked ? (
                  <Lock size={15} className="text-cyan-600" />
                ) : (
                  <FileText size={15} className="text-slate-400" />
                )}
              </div>

              {/* Card Content Body */}
              <div className="flex-1 relative">
                {item.content}
              </div>

              {/* Footer status */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>SOWMYA.KCODE</span>
                <span className={item.locked ? 'text-cyan-600 font-bold' : 'text-emerald-600 font-bold'}>
                  {item.locked ? 'PREMIUM' : 'FREE SAMPLE'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 border border-cyan-200/80 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(6,182,212,0.08)]">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
              Want the complete phone-first notes?
            </h3>
            <p className="text-sm text-[#475569] mt-1.5 max-w-xl">
              Instant lifetime access to all 16 modules, 14 master interview patterns, Java/C++/Python code, and study roadmaps.
            </p>
          </div>
          <Link
            to="/preview"
            className="shrink-0 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-base shadow-md hover:shadow-cyan-200/60 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Open Interactive Preview</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NotesPreviewSection;
