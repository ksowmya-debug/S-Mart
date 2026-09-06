import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  CreditCard,
  Download,
  BarChart3,
  Package,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Downloads', path: '/admin/downloads', icon: Download },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#07111F] text-slate-100 flex flex-col md:flex-row pt-16">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#0A1424] border-r border-blue-950/80 p-5 shrink-0 flex flex-col justify-between">
        
        <div className="space-y-6">
          {/* Admin Brand Logo */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-glow-sm">
                <span className="text-white text-base font-black">◈</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">CodeID</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/40">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-glow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-blue-950/40'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-blue-950 space-y-2">
          <NavLink
            to="/"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-blue-400 hover:bg-blue-950/30 transition"
          >
            <ExternalLink size={16} />
            <span>View Public Site</span>
          </NavLink>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
