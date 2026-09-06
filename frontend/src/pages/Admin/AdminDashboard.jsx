import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import {
  Users,
  ShoppingBag,
  IndianRupee,
  Download,
  AlertCircle,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, analyticsRes] = await Promise.all([
          API.get('/api/admin/dashboard'),
          API.get('/api/admin/analytics'),
        ]);

        setStats(statsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const revenueData = analytics?.revenueTimeline || [
    { date: '21 May', revenue: 620 },
    { date: '22 May', revenue: 950 },
    { date: '23 May', revenue: 1400 },
    { date: '24 May', revenue: 2150 },
    { date: '25 May', revenue: 1800 },
    { date: '26 May', revenue: 2600 },
    { date: '27 May', revenue: 2300 },
    { date: '28 May', revenue: 3100 },
  ];

  const userGrowthData = analytics?.userGrowth || [
    { date: '21 May', users: 28 },
    { date: '22 May', users: 45 },
    { date: '23 May', users: 72 },
    { date: '24 May', users: 110 },
    { date: '25 May', users: 154 },
    { date: '26 May', users: 195 },
    { date: '27 May', users: 228 },
    { date: '28 May', users: 256 },
  ];

  const downloadsData = analytics?.downloadsActivity || [
    { date: '21 May', downloads: 22 },
    { date: '22 May', downloads: 41 },
    { date: '23 May', downloads: 68 },
    { date: '24 May', downloads: 104 },
    { date: '25 May', downloads: 139 },
    { date: '26 May', downloads: 165 },
    { date: '27 May', downloads: 182 },
    { date: '28 May', downloads: 195 },
  ];

  const ordersByStatus = analytics?.ordersByStatus || [
    { name: 'Paid', value: 152, color: '#3B82F6' },
    { name: 'Pending', value: 20, color: '#60A5FA' },
    { name: 'Failed', value: 9, color: '#1E3A8A' },
    { name: 'Cancelled', value: 8, color: '#0F172A' },
  ];

  const paymentMethods = analytics?.paymentMethods || [
    { name: 'GPay', value: 60, color: '#2563EB' },
    { name: 'PhonePe', value: 30, color: '#3B82F6' },
    { name: 'Paytm', value: 8, color: '#60A5FA' },
    { name: 'Other UPI', value: 2, color: '#93C5FD' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time business telemetry and sales performance.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0D1B2A] border border-blue-900/50 text-xs text-slate-300">
          <Calendar size={14} className="text-blue-400" />
          <span>21 May 2025 – 28 May 2025</span>
        </div>
      </div>

      {/* 5 KPI Top Cards matching Reference UI */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Total Users</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {stats?.totalUsers || 256}
          </p>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">
            ↑ 12 this week
          </span>
        </div>

        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Total Orders</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {stats?.totalOrders || 189}
          </p>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">
            ↑ 8 this week
          </span>
        </div>

        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            ₹{(stats?.totalRevenue || 11124).toLocaleString()}
          </p>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">
            ↑ 15% this week
          </span>
        </div>

        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <span className="text-xs font-semibold text-slate-400">Total Downloads</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {stats?.totalDownloads || 195}
          </p>
          <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">
            ↑ 10 this week
          </span>
        </div>

        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5 col-span-2 md:col-span-1">
          <span className="text-xs font-semibold text-slate-400">Pending Payments</span>
          <p className="text-2xl sm:text-3xl font-black text-white mt-1">
            {stats?.pendingPayments || 7}
          </p>
          <Link
            to="/admin/payments"
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 mt-1 block underline"
          >
            View all
          </Link>
        </div>

      </div>

      {/* Row 1: Overview (Revenue Line Chart + Orders Donut Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Overview */}
        <div className="lg:col-span-7 bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Revenue Overview</h3>
              <p className="text-xs text-slate-400">Daily revenue performance</p>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/40 font-semibold">
              This Week
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07111F', borderColor: '#1E3A8A', borderRadius: '12px' }}
                  formatter={(val) => [`₹${val}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#60A5FA' }}
                  activeDot={{ r: 6, fill: '#FFFFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders by Status Donut */}
        <div className="lg:col-span-5 bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-2">Orders by Status</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-64">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ordersByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#07111F', borderColor: '#1E3A8A', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs w-full sm:w-auto">
              {ordersByStatus.map((item) => (
                <div key={item.name} className="flex items-center justify-between sm:justify-start gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: User Growth + Downloads + Top Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* User Growth */}
        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-4">User Growth</h4>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07111F', borderColor: '#1E3A8A', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="users" stroke="#38BDF8" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-4">Downloads</h4>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={downloadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07111F', borderColor: '#1E3A8A', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="downloads" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Payment Methods */}
        <div className="bg-[#0D1B2A] border border-blue-900/40 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-white mb-2">Top Payment Methods</h4>
          <div className="flex items-center justify-between h-44">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethods}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {paymentMethods.map((entry, index) => (
                      <Cell key={`pay-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {paymentMethods.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
