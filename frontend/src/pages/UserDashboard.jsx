import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Download,
  Bell,
  LogOut,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Shield,
  Smartphone,
} from 'lucide-react';

const UserDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Fetch dashboard summary, orders and downloads
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [profileRes, ordersRes, downloadsRes] = await Promise.all([
          API.get('/api/auth/profile'),
          API.get('/api/orders/my-orders'),
          API.get('/api/downloads/my-history'),
        ]);

        setProfileData(profileRes.data);
        setOrders(ordersRes.data);
        setDownloads(downloadsRes.data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Secure PDF Download Handler
  const handleDownloadPdf = async (orderId) => {
    try {
      setDownloading(true);
      setDownloadError('');

      const response = await API.get(`/api/downloads/${orderId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'SowmyaKCode_DSA_Demystified_Phone_First.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      const { data: updatedHistory } = await API.get('/api/downloads/my-history');
      setDownloads(updatedHistory);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadError('Could not download PDF. Verify your payment is confirmed or contact support.');
    } finally {
      setDownloading(false);
    }
  };

  const paidOrder = orders.find((o) => o.status === 'paid' || o.status === 'verified');
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Recent';

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#475569] flex flex-col md:flex-row">
      
      {/* Left Sidebar on Desktop, Sticky Top Bar on Mobile */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200/80 p-3 sm:p-4 md:p-6 shrink-0 flex flex-col justify-between shadow-xs">
        
        <div className="space-y-3 md:space-y-8">
          {/* Logo & Quick User Controls on Mobile */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 px-1 md:px-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-xs shrink-0">
                <span className="text-white text-xs md:text-base font-black">◈</span>
              </div>
              <span className="text-base md:text-xl font-black text-[#0F172A] tracking-tight">SOWMYA.KCODE</span>
            </Link>

            {/* Mobile Logout Quick Button */}
            <button
              onClick={logout}
              title="Logout"
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>

          {/* Navigation Links: Horizontal scroll on mobile, Vertical stack on desktop */}
          <nav className="flex md:flex-col items-center md:items-stretch gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[40px] ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[40px] ${
                activeTab === 'orders'
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <ShoppingBag size={16} />
              <span>Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              className={`shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[40px] ${
                activeTab === 'downloads'
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <Download size={16} />
              <span>Downloads</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer min-h-[40px] ${
                activeTab === 'profile'
                  ? 'bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-xs'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <User size={16} />
              <span>Profile</span>
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-3.5 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl text-xs sm:text-sm font-bold text-cyan-700 hover:bg-cyan-50 border border-cyan-200 min-h-[40px]"
              >
                <Shield size={16} />
                <span>Admin</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Bottom Logout (Desktop only) */}
        <div className="hidden md:block pt-6 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut size={17} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl min-w-0 max-w-full overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-200/80">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">
              Welcome back, {user?.name || 'Student'} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1">
              Track your course notes, orders, and downloads in one place.
            </p>
          </div>

          <Link
            to="/preview"
            className="self-start sm:self-auto px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-bold hover:bg-cyan-100 transition flex items-center gap-1.5"
          >
            <span>Preview Reader</span>
            <ExternalLink size={13} />
          </Link>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 my-6 sm:my-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {paidOrder ? 'Access Status' : 'My Orders'}
            </span>
            <p className="text-base sm:text-xl font-black text-[#0F172A] mt-1.5 flex items-center gap-1.5">
              {paidOrder ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-emerald-600 font-extrabold text-xs sm:text-base">Lifetime</span>
                </>
              ) : (
                <span>{orders.length}</span>
              )}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">My Downloads</span>
            <p className="text-xl sm:text-3xl font-black text-[#0F172A] mt-1">
              {downloads.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Spent</span>
            <p className="text-xl sm:text-3xl font-black text-[#0F172A] mt-1">
              ₹{orders.filter((o) => o.status === 'paid' || o.status === 'verified').reduce((sum, o) => sum + o.amount, 0)}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs">
            <span className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">Member Since</span>
            <p className="text-sm sm:text-lg font-black text-[#0F172A] mt-1 truncate">
              {memberSince}
            </p>
          </div>
        </div>

        {/* Download error banner */}
        {downloadError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
            <AlertCircle size={16} className="text-rose-500 shrink-0" />
            <span>{downloadError}</span>
          </div>
        )}

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Section: My Notes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-black text-[#0F172A]">My Course Notes</h2>
                {paidOrder && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    Ready to Download
                  </span>
                )}
              </div>
              
              <div className="bg-white border border-cyan-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(6,182,212,0.06)]">
                <div className="flex items-center gap-5 text-center sm:text-left">
                  {/* Mini Book Cover Thumbnail */}
                  <div className="w-14 h-18 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md text-white">
                    <BookOpen size={24} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 justify-center sm:justify-start flex-wrap">
                      <h3 className="text-lg font-black text-[#0F172A]">
                        DSA Demystified (Phone-First Edition)
                      </h3>
                      {paidOrder ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                          Paid • Lifetime Access
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold">
                          Pending Payment
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                      16 Core Modules • 14 Master Patterns • ☕ Java, ⚙️ C++, 🐍 Python Solutions • 30/60/90-Day Roadmaps
                    </p>
                  </div>
                </div>

                <div>
                  {paidOrder ? (
                    <button
                      onClick={() => handleDownloadPdf(paidOrder.orderId)}
                      disabled={downloading}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-md transition active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Download size={16} />
                      <span>{downloading ? 'Downloading...' : 'Download PDF File'}</span>
                    </button>
                  ) : (
                    <Link
                      to="/preview"
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-md transition flex items-center gap-2"
                    >
                      <span>Unlock Notes — ₹39</span>
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Section: Official Payment Receipt Card */}
            {paidOrder && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-[#0F172A]">Payment Receipt</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-cyan-600 hover:text-cyan-800 transition"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Order Reference</span>
                      <p className="text-base font-mono font-black text-cyan-700 mt-0.5">{paidOrder.orderId}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Purchase Date</span>
                      <p className="text-sm font-bold text-[#0F172A] mt-0.5">
                        {new Date(paidOrder.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount Paid</span>
                      <p className="text-base font-black text-[#0F172A] mt-0.5">₹{paidOrder.amount}</p>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verification</span>
                      <p className="mt-0.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Verified UPI
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Item: <strong>{paidOrder.productId?.name || 'DSA Demystified PDF Notes'}</strong></span>
                    <span className="text-slate-400">Digital Good • 100% Personal License</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-black text-[#0F172A] mb-4">My Orders & Receipts</h2>

            <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
              {orders.length === 0 ? (
                <div className="p-10 text-center text-slate-400 text-sm">
                  No orders found. Start your DSA preparation today!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Payment Method</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[#334155]">
                      {orders.map((ord) => (
                        <tr key={ord._id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-mono font-bold text-cyan-700">
                            {ord.orderId}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#0F172A]">
                            {ord.productId?.name || 'DSA Demystified PDF'}
                          </td>
                          <td className="px-6 py-4 font-black text-[#0F172A]">
                            ₹{ord.amount}
                          </td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                            UPI
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            {ord.status === 'paid' || ord.status === 'verified' ? (
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1">
                                <CheckCircle2 size={12} />
                                {ord.status === 'verified' ? 'Verified' : 'Paid'}
                              </span>
                            ) : (
                              <Link
                                to={`/pay/${ord.orderId}`}
                                className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-bold hover:bg-cyan-100"
                              >
                                Pay Now →
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MY DOWNLOADS */}
        {activeTab === 'downloads' && (
          <div>
            <h2 className="text-xl font-black text-[#0F172A] mb-4">My Download History</h2>

            <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
              {downloads.length === 0 ? (
                <div className="p-10 text-center text-slate-500 text-sm space-y-3">
                  <p>
                    {paidOrder
                      ? "You haven't downloaded your notes yet. Head to the Dashboard tab to download your PDF!"
                      : "You haven't unlocked your notes yet. Complete payment to download your PDF notes."}
                  </p>
                  {!paidOrder && (
                    <Link
                      to="/preview"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-sm hover:from-cyan-400 hover:to-blue-500 transition"
                    >
                      <span>Unlock Notes — ₹39</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50/70">
                      <tr>
                        <th className="px-6 py-4">Resource</th>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Downloaded At</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[#334155]">
                      {downloads.map((dl) => (
                        <tr key={dl._id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 font-semibold text-[#0F172A] flex items-center gap-2">
                            <BookOpen size={16} className="text-cyan-600 shrink-0" />
                            <span>{dl.productId?.name || 'DSA Demystified (Phone-First PDF)'}</span>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-slate-600">
                            {dl.orderId}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            {new Date(dl.downloadedAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MY PROFILE */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-black text-[#0F172A] mb-4">My Profile</h2>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs max-w-2xl space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F172A]">{user?.name || 'Student'}</h3>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-[11px] font-bold capitalize">
                    {user?.role || 'Student'} Account
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Account Email</span>
                  <span className="font-semibold text-[#0F172A] break-all">{user?.email}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Enrolled Date</span>
                  <span className="font-semibold text-[#0F172A]">{memberSince}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Course Access</span>
                  <span className="font-semibold text-emerald-600">
                    {paidOrder ? 'Lifetime Access Active' : 'No Active Course'}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <span className="text-xs text-slate-400 font-bold block">Security Status</span>
                  <span className="font-semibold text-[#0F172A]">JWT Protected</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default UserDashboard;
