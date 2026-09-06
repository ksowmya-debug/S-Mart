import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Loader2,
  Download,
  CreditCard,
  Zap,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

const PaymentPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshProfile, isAuthenticated } = useAuth();

  // ── Data state ──
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  // ── Flow & Verification state ──
  // 'idle' | 'initiating' | 'verifying' | 'verified' | 'failed' | 'cancelled'
  const [flowState, setFlowState] = useState('idle');
  const [downloading, setDownloading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // ── Verify Razorpay payment on backend ──
  const verifyPaymentOnBackend = useCallback(
    async (payload) => {
      try {
        setFlowState('verifying');
        setStatusMsg('Confirming your payment…');
        setPageError('');

        const { data } = await API.post('/api/payment/verify', payload);

        if (data.verified || data.isPaid) {
          setOrder(data.order);
          setFlowState('verified');
          setStatusMsg('');
          await refreshProfile();
          return true;
        } else {
          setFlowState('failed');
          setPageError(data.message || 'Payment verification could not be confirmed.');
          return false;
        }
      } catch (err) {
        console.error('Razorpay verification error:', err);
        setFlowState('failed');
        setPageError(
          err.response?.data?.message ||
            'Payment verification failed. If your account was debited, please contact support.'
        );
        return false;
      }
    },
    [refreshProfile]
  );

  // ── Initial Fetch: Check existing order or active status ──
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        navigate('/register?redirect=pay');
        return;
      }

      try {
        setLoading(true);
        setPageError('');

        let targetId = orderId;

        // If no orderId in URL, initialize or fetch active order
        if (!targetId || targetId === 'undefined') {
          try {
            const { data: newOrder } = await API.post('/api/orders', {});
            targetId = newOrder.orderId;
            setOrder(newOrder);
          } catch (createErr) {
            // Check if user already owns the course
            if (createErr.response?.data?.alreadyOwned) {
              const existing = createErr.response.data.order;
              if (existing) {
                setOrder(existing);
                setFlowState('verified');
                return;
              }
            }
            throw createErr;
          }
        }

        if (targetId) {
          const encodedId = encodeURIComponent(targetId.replace(/^#/, ''));
          const [orderRes, statusRes] = await Promise.all([
            API.get(`/api/orders/${encodedId}`),
            API.get(`/api/payment/status/${encodedId}`).catch(() => ({ data: {} })),
          ]);

          const currentOrder = orderRes.data;
          setOrder(currentOrder);

          if (
            currentOrder.status === 'verified' ||
            currentOrder.status === 'paid' ||
            statusRes.data?.isPaid
          ) {
            setFlowState('verified');
          }

          if (!orderId || orderId !== targetId) {
            window.history.replaceState(null, '', `/pay/${encodeURIComponent(targetId)}`);
          }
        }
      } catch (err) {
        console.error('Failed to load order info:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/register?redirect=pay');
          return;
        }
        if (err.response?.data?.alreadyOwned && err.response.data.order) {
          setOrder(err.response.data.order);
          setFlowState('verified');
          return;
        }
        setPageError(err.response?.data?.message || 'Could not load order information.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, navigate, isAuthenticated]);

  // ── Main Razorpay Checkout Trigger ──
  const handleRazorpayCheckout = async () => {
    try {
      setFlowState('initiating');
      setPageError('');
      setStatusMsg('Opening secure checkout…');

      const targetOrderId = order?.orderId || orderId;

      // 1. Request Razorpay order from backend (enforces ₹39 price)
      const { data } = await API.post('/api/payment/create-order', {
        orderId: targetOrderId,
      });

      if (data.isPaid) {
        setFlowState('verified');
        await refreshProfile();
        return;
      }

      // 2. Real Razorpay Checkout using window.Razorpay SDK
      if (window.Razorpay && data.razorpayOrderId && !data.isDevMock) {
        const options = {
          key: data.keyId,
          amount: data.amount, // 3900 paise
          currency: data.currency || 'INR',
          name: 'SOWMYA.KCODE',
          description: 'Sowmya KCode DSA Notes (Lifetime Access)',
          image: '/vite.svg',
          order_id: data.razorpayOrderId,
          handler: async function (response) {
            // Cryptographic payment response from Razorpay
            await verifyPaymentOnBackend({
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          },
          prefill: {
            name: user?.name || '',
            email: user?.email || '',
            contact: user?.phone || '',
          },
          notes: {
            orderId: data.orderId,
            product: 'Sowmya KCode DSA Notes',
          },
          theme: {
            color: '#0284C7',
          },
          modal: {
            ondismiss: function () {
              setFlowState('cancelled');
              setStatusMsg('Payment cancelled. Click below to try again whenever you are ready.');
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error('Razorpay payment failed:', response.error);
          setFlowState('failed');
          setPageError(
            response.error?.description || 'Payment was not completed. Please try again.'
          );
        });

        rzp.open();
        return;
      }

      // 3. Local Development Simulation (only when keys are omitted in development)
      if (data.isDevMock) {
        setStatusMsg('Simulating test payment for local development…');
        setTimeout(async () => {
          await verifyPaymentOnBackend({
            orderId: data.orderId,
            razorpay_order_id: data.razorpayOrderId,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            razorpay_signature: `dev_test_sig_${Date.now()}`,
          });
        }, 1200);
        return;
      }

      throw new Error(
        'Razorpay Checkout SDK is not loaded. Please check your internet connection and retry.'
      );
    } catch (err) {
      console.error('Checkout error:', err);
      setFlowState('failed');
      setPageError(
        err.response?.data?.message ||
          err.message ||
          'Failed to initialize Razorpay checkout. Please try again.'
      );
    }
  };

  // ── Bulletproof PDF Download Handler ──
  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      const targetOrderId = order?.orderId || orderId;

      if (!targetOrderId) {
        alert('Order ID not found. Please refresh your page.');
        return;
      }

      // Method A: Authenticated Blob Download
      const cleanId = encodeURIComponent(targetOrderId.replace(/^#/, ''));
      const response = await API.get(`/api/downloads/${cleanId}`, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'CodeID_SowmyaKCode_DSA_Notes.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 5000);
    } catch (err) {
      console.error('Blob download error:', err);
      // Method B: Direct tokenized browser download fallback
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const targetOrderId = order?.orderId || orderId;
        const cleanId = encodeURIComponent(targetOrderId.replace(/^#/, ''));
        window.open(`http://localhost:8000/api/downloads/${cleanId}?token=${token}`, '_blank');
      } catch {
        alert('Download failed. Please access your PDF from the Dashboard.');
      }
    } finally {
      setDownloading(false);
    }
  };

  // ── Loading screen ──
  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#F8FBFF] gap-3">
        <div className="w-10 h-10 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Preparing checkout…</p>
      </div>
    );
  }

  // Derived order details
  const displayOrderId = order?.orderId || orderId || 'ORD390001';
  const cleanDisplayOrderId = displayOrderId.startsWith('#') ? displayOrderId : `#${displayOrderId}`;
  const amount = order?.amount || 39;
  const isVerified = flowState === 'verified' || order?.status === 'verified' || order?.status === 'paid';

  return (
    <div className="min-h-screen pt-24 pb-20 relative bg-[#F8FBFF]">
      {/* Background glow */}
      <div className="absolute top-36 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-lg mx-auto px-4 sm:px-6 relative z-10">

        {/* ════════════════════════════════════════════════════════════
            SUCCESS STATE: UNLOCKED & DOWNLOAD SCREEN
            ════════════════════════════════════════════════════════════ */}
        {isVerified ? (
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
              <CheckCircle2 size={36} className="text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                Payment Successful! 🎉
              </h2>
              <p className="text-base sm:text-lg font-bold text-emerald-700">
                Your DSA Notes are now unlocked.
              </p>
              <p className="text-xs text-slate-500 font-mono">
                Order {cleanDisplayOrderId} • Amount: ₹{amount} • Status: VERIFIED
              </p>
              {order?.razorpayPaymentId && (
                <p className="text-[11px] text-slate-400 font-mono">
                  Payment ID: {order.razorpayPaymentId}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleDownloadPdf}
                disabled={downloading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Preparing Download…</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>Download DSA Notes PDF</span>
                  </>
                )}
              </button>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <BookOpen size={14} className="text-cyan-600" />
                <span>Access: <strong className="text-emerald-700">Lifetime Active</strong></span>
              </span>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-cyan-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Dashboard</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ) : (
          /* ════════════════════════════════════════════════════════════
             ACTIVE CHECKOUT: RAZORPAY PAYMENT CARD
             ════════════════════════════════════════════════════════════ */
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-[11px] font-bold mb-3">
                <ShieldCheck size={13} className="text-emerald-500" />
                Secure Razorpay Checkout
              </div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Buy DSA Notes –{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  ₹{amount}
                </span>
              </h1>
              <p className="text-xs text-[#475569] mt-1.5">
                Sowmya KCode DSA Notes • 31-Page Master Edition • Instant PDF Unlock
              </p>
            </div>

            {/* Main Checkout Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] space-y-6">

              {/* Amount Banner */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl px-6 py-4 text-center">
                <span className="text-[11px] font-bold text-cyan-800 uppercase tracking-wider block">
                  Total Payable
                </span>
                <span className="text-5xl font-black text-[#0F172A] mt-0.5 block">
                  ₹{amount}
                </span>
                <span className="text-[11px] text-[#475569] mt-0.5 block">
                  Sowmya KCode DSA Notes • Lifetime Access • Order {cleanDisplayOrderId}
                </span>
              </div>

              {/* Status Message (e.g., Confirming payment...) */}
              {statusMsg && (
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs text-center font-medium flex items-center justify-center gap-2">
                  {flowState === 'verifying' && <Loader2 size={15} className="animate-spin text-blue-600 shrink-0" />}
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Failure / Cancel Alert with Try Again */}
              {pageError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 font-bold text-rose-700">
                    <AlertCircle size={15} />
                    <span>Payment was not completed</span>
                  </div>
                  <p className="text-rose-600 text-[11px]">{pageError}</p>
                </div>
              )}

              {/* Main CTA: Buy DSA Notes – ₹39 */}
              <div className="space-y-3">
                <button
                  onClick={handleRazorpayCheckout}
                  disabled={flowState === 'initiating' || flowState === 'verifying'}
                  className="w-full min-h-[52px] py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-black text-base sm:text-lg shadow-xl shadow-sky-500/25 transition active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                >
                  {flowState === 'initiating' ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      <span>Opening Razorpay…</span>
                    </>
                  ) : flowState === 'verifying' ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      <span>Confirming your payment…</span>
                    </>
                  ) : flowState === 'failed' || flowState === 'cancelled' ? (
                    <>
                      <RotateCcw size={20} />
                      <span>Try Again – ₹{amount}</span>
                    </>
                  ) : (
                    <>
                      <Zap size={22} className="fill-current text-amber-300" />
                      <span>Buy DSA Notes – ₹{amount}</span>
                    </>
                  )}
                </button>

                {/* Supported Payment Badges */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center pt-1">
                  {[
                    { label: 'UPI (GPay / PhonePe / Paytm)', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                    { label: 'QR Code', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                    { label: 'Debit & Credit Cards', color: 'bg-slate-50 border-slate-200 text-slate-700' },
                    { label: 'NetBanking', color: 'bg-purple-50 border-purple-200 text-purple-700' },
                  ].map(({ label, color }) => (
                    <span key={label} className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${color}`}>
                      {label}
                    </span>
                  ))}
                </div>

                <p className="text-center text-[11px] text-slate-400 pt-1">
                  ⚡ 100% Automatic Approval • Instant PDF Unlock • No Manual Steps
                </p>
              </div>

            </div>

            {/* Trust Footer */}
            <div className="text-center text-[11px] text-[#94A3B8] space-y-1">
              <p>🔒 256-Bit SSL Encrypted & Powered by Razorpay</p>
              <p className="text-[10px]">No banking PINs or credentials are ever stored on our servers.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentPage;
