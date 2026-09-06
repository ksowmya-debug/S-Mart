import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Search, Filter, ShoppingBag } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/admin/orders', {
        params: { status: statusFilter, search },
      });
      setOrders(data);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOrder = async (targetId) => {
    try {
      setVerifyingId(targetId);
      await API.put(`/api/admin/orders/${targetId}/verify`);
      await fetchOrders();
    } catch (err) {
      console.error('Error verifying order:', err);
      alert(err.response?.data?.message || 'Failed to verify order');
    } finally {
      setVerifyingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, search]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor customer orders, payment transitions, and PDF downloads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#0D1B2A] border border-blue-900/60 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition w-44 sm:w-56"
            />
          </div>

          {/* Status Filters */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#0D1B2A] border border-blue-900/60 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl overflow-x-auto shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No orders found matching this criteria.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-blue-950/30">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Razorpay Payment ID</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Verified Date</th>
                <th className="px-6 py-4 text-center">Downloads</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 text-slate-300">
              {orders.map((ord) => {
                const isPaid = ord.status === 'verified' || ord.status === 'paid';
                const rzpId = ord.razorpayPaymentId || ord.payment?.razorpayPaymentId || ord.transactionReference || ord.payment?.transactionReference;
                const verifiedTime = ord.paymentVerifiedAt || ord.verifiedAt || ord.paidAt;

                return (
                  <tr key={ord._id} className="hover:bg-blue-950/20 transition">
                    <td className="px-6 py-4 font-mono font-bold text-blue-400">
                      {ord.orderId}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {ord.userId?.name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">
                      {ord.userId?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      ₹{ord.amount}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-cyan-300">
                      {rzpId || <span className="text-slate-500 italic">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isPaid
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                            : ord.status === 'pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800/50'
                            : 'bg-red-950 text-red-400 border border-red-800/50'
                        }`}
                      >
                        {isPaid ? 'VERIFIED' : ord.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {verifiedTime ? new Date(verifiedTime).toLocaleString() : <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-bold text-blue-300">
                      {ord.downloadCount || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPaid ? (
                        <span className="text-xs text-emerald-400 font-semibold inline-flex items-center gap-1">
                          ✓ Unlocked
                        </span>
                      ) : ord.status === 'pending' ? (
                        <button
                          onClick={() => handleVerifyOrder(ord._id)}
                          disabled={verifyingId === ord._id}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                        >
                          {verifyingId === ord._id ? 'Verifying…' : 'Approve & Unlock'}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminOrders;
