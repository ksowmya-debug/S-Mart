import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/admin/payments');
      setPayments(data);
    } catch (err) {
      console.error('Error fetching admin payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleManualVerify = async (paymentId) => {
    try {
      setVerifyingId(paymentId);
      await API.put(`/api/admin/payments/${paymentId}/verify`);
      fetchPayments();
    } catch (err) {
      console.error('Manual verification failed:', err);
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Payments Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit UPI payment intents, transaction references, and settlement verifications.
          </p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl overflow-x-auto shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No payment records recorded yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-blue-950/30">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Transaction Ref (UTR)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Time</th>
                <th className="px-6 py-4">Verified Time</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 text-slate-300">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-blue-950/20 transition">
                  <td className="px-6 py-4 font-mono font-bold text-blue-400">
                    {p.orderId}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {p.userId?.name || 'Customer'}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    ₹{p.amount}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-300">
                    {p.paymentMethod || 'UPI'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {p.transactionReference || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === 'verified'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(p.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {p.verifiedAt ? new Date(p.verifiedAt).toLocaleString() : 'Pending'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.status !== 'verified' && (
                      <button
                        onClick={() => handleManualVerify(p._id)}
                        disabled={verifyingId === p._id}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-50"
                      >
                        {verifyingId === p._id ? 'Verifying...' : 'Approve'}
                      </button>
                    )}
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

export default AdminPayments;
