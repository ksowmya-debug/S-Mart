import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Search, Filter, CheckCircle2, XCircle, MoreVertical, Shield } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/admin/users', {
        params: {
          search,
          role: roleFilter,
          status: statusFilter,
          page,
          limit: 10,
        },
      });

      setUsers(data.users);
      setTotalPages(data.pages || 1);
      setTotalCount(data.total || data.users.length);
    } catch (err) {
      console.error('Error fetching admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, statusFilter, page]);

  const handleToggleStatus = async (userId) => {
    try {
      await API.put(`/api/admin/users/${userId}/status`);
      fetchUsers();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Users
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage customer accounts, roles, and status.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search input */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 bg-[#0D1B2A] border border-blue-900/60 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition w-44 sm:w-56"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-[#0D1B2A] border border-blue-900/60 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="user">Students</option>
            <option value="admin">Admins</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-[#0D1B2A] border border-blue-900/60 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table matching Reference UI */}
      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl overflow-x-auto shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No users found matching your filters.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-blue-950/30">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Joined On</th>
                <th className="px-6 py-4">Last Login</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">Course Access</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 text-slate-300">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-blue-950/20 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center font-bold text-white text-xs shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{u.name}</span>
                        {u.role === 'admin' && (
                          <Shield size={12} className="text-blue-400 shrink-0" title="Admin" />
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs font-mono text-slate-300">
                    {u.email}
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-xs text-slate-400">
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : 'Never'}
                  </td>

                  <td className="px-6 py-4 font-semibold text-white">
                    {u.orderCount || 0}
                  </td>

                  <td className="px-6 py-4 font-semibold text-white">
                    ₹{u.totalSpent || 0}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.courseAccess === 'unlocked'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : u.courseAccess === 'pending'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/50'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {u.courseAccess === 'unlocked'
                        ? 'UNLOCKED (PAID)'
                        : u.courseAccess === 'pending'
                        ? 'PENDING ORDER'
                        : 'NO ORDER'}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.status === 'active'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-red-950 text-red-400 border border-red-800/50'
                      }`}
                    >
                      {u.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(u._id)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-900 border border-blue-800/40 text-blue-300 transition"
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer matching mockup */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
        <p>
          Showing {users.length > 0 ? 1 : 0} to {users.length} of {totalCount} users
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg bg-[#0D1B2A] border border-blue-900/50 flex items-center justify-center text-slate-300 disabled:opacity-40 hover:border-blue-500"
          >
            ‹
          </button>
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shadow-glow-sm">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="w-8 h-8 rounded-lg bg-[#0D1B2A] border border-blue-900/50 flex items-center justify-center text-slate-300 disabled:opacity-40 hover:border-blue-500"
          >
            ›
          </button>
        </div>
      </div>

    </div>
  );
};

export default AdminUsers;
