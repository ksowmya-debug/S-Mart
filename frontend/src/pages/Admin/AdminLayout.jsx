import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { assets } from '../../assets/admin_assets/assets';
import { useState } from 'react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:relative sm:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 text-3xl font-extrabold text-center border-b border-purple-600 flex items-center justify-center">
          <img src={assets.logo} alt="Admin Logo" className="h-10 mr-2" />
          Admin
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${isActive ? 'bg-purple-600 text-white rounded-r-full' : 'hover:bg-purple-700 hover:text-gray-100'}`
                }
              >
                <img src={assets.order_icon} alt="Dashboard Icon" className="h-6 w-6 mr-3" />
                Dashboard
              </NavLink>
            </li>
            
            
            
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-8 bg-gray-100 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
