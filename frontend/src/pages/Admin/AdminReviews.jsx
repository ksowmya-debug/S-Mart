import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Trash2, CheckCircle2, XCircle, Star } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/admin/reviews');
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await API.put(`/api/admin/reviews/${id}`, { isApproved: !currentStatus });
      fetchReviews();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await API.delete(`/api/admin/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage user reviews, approvals, and moderation.
          </p>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl overflow-x-auto shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No reviews found.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-blue-950/30">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 text-slate-300">
              {reviews.map((r) => (
                <tr key={r._id} className="hover:bg-blue-950/20 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center font-bold text-white text-xs shrink-0">
                        {r.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white">{r.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-300 max-w-xs truncate" title={r.comment}>
                    {r.comment}
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        r.isApproved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                      }`}
                    >
                      {r.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleStatus(r._id, r.isApproved)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                          r.isApproved
                            ? 'bg-amber-950/60 hover:bg-amber-900 border-amber-800/40 text-amber-300'
                            : 'bg-emerald-950/60 hover:bg-emerald-900 border-emerald-800/40 text-emerald-300'
                        }`}
                      >
                        {r.isApproved ? 'Unapprove' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="text-xs p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300 transition flex items-center justify-center"
                        title="Delete Review"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
