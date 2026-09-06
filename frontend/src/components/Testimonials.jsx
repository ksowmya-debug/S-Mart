import React, { useState, useEffect } from 'react';
import { Star, Quote, Sparkles, Send } from 'lucide-react';
import API from '../services/api';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get('/api/reviews');
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    try {
      const { data } = await API.post('/api/reviews', formData);
      setReviews([data, ...reviews]);
      setFormData({ name: '', rating: 5, comment: '' });
      setSuccessMsg('Thank you for your review!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Failed to submit review', error);
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Form and Reviews Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Leave a Review Form (Responsive Side or Top) */}
          <div className="w-full lg:w-1/3 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 h-fit">
            <h3 className="text-xl font-bold text-[#0F172A] mb-4">Leave a Review</h3>
            {successMsg && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100">
                {successMsg}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        fill={formData.rating >= star ? '#FBBF24' : 'none'}
                        color={formData.rating >= star ? '#FBBF24' : '#CBD5E1'}
                        className="transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Comment</label>
                <textarea
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none"
                  placeholder="What did you think of the notes?"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold rounded-xl flex justify-center items-center gap-2 transition-colors disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : (
                  <>
                    Submit Review <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Testimonials Grid */}
          <div className="w-full lg:w-2/3">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-500">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.08)]"
                  >
                    <div>
                      {/* Rating Stars & Quote */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <Quote size={20} className="text-cyan-100" />
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-[#334155] leading-relaxed italic break-words">
                        "{item.comment}"
                      </p>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-50">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-sm">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0F172A]">{item.name}</h4>
                        <p className="text-xs text-slate-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
