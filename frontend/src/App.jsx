import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import PreviewPage from './pages/PreviewPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import PoliciesPage from './pages/PoliciesPage';

// User Dashboard
import UserDashboard from './pages/UserDashboard';

// Admin Panel
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminPayments from './pages/Admin/AdminPayments';
import AdminDownloads from './pages/Admin/AdminDownloads';
import AdminProducts from './pages/Admin/AdminProducts';

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#475569] flex flex-col selection:bg-cyan-500 selection:text-white font-sans">
      {/* Navbar only shown outside Admin & User Dashboard dedicated views */}
      {!isAdminRoute && !isDashboardRoute && <Navbar />}

      <div className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<PoliciesPage />} />
          <Route path="/privacy" element={<PoliciesPage />} />
          <Route path="/refund" element={<PoliciesPage />} />
          <Route path="/shipping" element={<PoliciesPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* UPI Payment Routes (Protected) */}
          <Route
            path="/pay"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pay/:orderId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Panel (Protected + Admin Role Only) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="downloads" element={<AdminDownloads />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="settings" element={<AdminProducts />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Footer shown on public pages */}
      {!isAdminRoute && !isDashboardRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
