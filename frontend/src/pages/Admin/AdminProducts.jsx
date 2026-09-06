import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Package, CheckCircle2, AlertCircle, Save } from 'lucide-react';

const AdminProducts = () => {
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(39);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/api/products');
        if (data.length > 0) {
          const p = data[0];
          setProduct(p);
          setName(p.name);
          setPrice(p.price);
          setDescription(p.description);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!product) return;
    try {
      setSaving(true);
      setMessage('');
      await API.put(`/api/products/${product._id}`, {
        name,
        price: Number(price),
        description,
      });
      setMessage('Product updated successfully!');
    } catch (err) {
      console.error('Error saving product:', err);
      setMessage('Failed to update product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-6 border-b border-blue-950">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Product Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure digital product pricing and descriptions.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-700/50 text-blue-300 text-xs sm:text-sm">
          {message}
        </div>
      )}

      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#07111F] border border-blue-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Price (INR ₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1"
              className="w-full px-4 py-3 bg-[#07111F] border border-blue-900/60 rounded-xl text-white text-sm font-bold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#07111F] border border-blue-900/60 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Secure Delivery Path (Backend Server Protected)
            </label>
            <p className="font-mono text-xs text-blue-400 bg-blue-950/40 p-3 rounded-xl border border-blue-900/40">
              backend/src/storage/secure_notes/dsa_notes.pdf
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-glow-sm transition active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;
