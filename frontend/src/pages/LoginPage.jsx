import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryRedirect = new URLSearchParams(location.search).get('redirect');
  const stateRedirect = location.state?.from?.pathname;
  let redirectUrl = queryRedirect
    ? (queryRedirect.startsWith('/') ? queryRedirect : `/${queryRedirect}`)
    : (stateRedirect || '/pay');
  if (redirectUrl === '/pricing') redirectUrl = '/pay';

  const isPaymentIntent =
    queryRedirect === 'pay' ||
    queryRedirect === 'checkout' ||
    stateRedirect?.includes('/pay') ||
    stateRedirect?.includes('/payment');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      
      if (data.user.role === 'admin' && redirectUrl === '/dashboard') {
        navigate('/admin');
      } else {
        navigate(redirectUrl);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center px-4 relative bg-[#F8FBFF]">
      {/* Subtle ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative z-10">
        
        {/* Tab Switcher: Register & Sign In */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/70 mb-6">
          <button
            type="button"
            onClick={() => navigate(`/register${location.search}`)}
            className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#475569] hover:text-[#0F172A] transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Create Account</span>
          </button>
          <button
            type="button"
            className="flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition bg-white text-[#0F172A] shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Sign In</span>
          </button>
        </div>

        {/* Payment Intent Banner */}
        {isPaymentIntent && (
          <div className="mb-6 p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold text-center flex items-center justify-center gap-2">
            <Sparkles size={15} className="text-cyan-600 shrink-0" />
            <span>Sign in to proceed to ₹39 checkout & access your notes</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Sign in to access your purchased DSA Notes
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-xs sm:text-sm">
            <AlertCircle size={18} className="shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={17} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={17} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#0F172A]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-md hover:shadow-cyan-200/50 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Dashboard'}</span>
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-[#475569]">
            Don't have an account yet?{' '}
            <Link
              to={`/register${location.search}`}
              className="text-cyan-600 font-bold hover:underline"
            >
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
