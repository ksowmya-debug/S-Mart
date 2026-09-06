import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Rohit Sharma',
    role: 'SDE Intern @ TechCorp',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review:
      'These DSA notes cut down my interview preparation time by half. The diagrams for Binary Trees and Sliding Window templates are pure gold!',
  },
  {
    name: 'Ananya Verma',
    role: 'Final Year CS Student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review:
      'I was always overwhelmed by 500+ LeetCode problems. Sowmya’s notes group problems into core patterns with Java, C++, and Python code. Best ₹39 I ever spent.',
  },
  {
    name: 'Karthik Raja',
    role: 'Placed at Product MNC',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    review:
      'Direct, zero fluff, and extremely easy to revise right before tech rounds. The phone-first format lets me review concepts on the bus.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative bg-[#EFF8FF]/60" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold mb-3 shadow-xs">
            <Sparkles size={14} className="text-cyan-500" /> Real Student Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Loved by <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Ambitious Coders</span>
          </h2>
          <p className="mt-3 text-[#475569] text-sm sm:text-base">
            Join hundreds of engineering students preparing for technical interviews with clarity and confidence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)]"
            >
              <div>
                {/* Rating Stars & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={24} className="text-cyan-100" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#334155] leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-100 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{item.name}</h4>
                  <p className="text-xs text-cyan-600 font-semibold">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
