import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Download, HardDrive } from 'lucide-react';

const AdminDownloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/api/admin/downloads');
        setDownloads(data);
      } catch (err) {
        console.error('Error fetching admin downloads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-6 border-b border-blue-950">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Downloads Activity
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time audit log of authenticated students accessing the DSA Notes PDF.
          </p>
        </div>
      </div>

      {/* Downloads Table */}
      <div className="bg-[#0D1B2A] border border-blue-900/50 rounded-2xl overflow-x-auto shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
        ) : downloads.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No downloads recorded yet.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-blue-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-blue-950/30">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Download Time</th>
                <th className="px-6 py-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 text-slate-300">
              {downloads.map((d) => (
                <tr key={d._id} className="hover:bg-blue-950/20 transition">
                  <td className="px-6 py-4 font-semibold text-white">
                    {d.userId?.name || 'Customer'}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {d.userId?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {d.productId?.name || 'DSA Notes PDF'}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-blue-400">
                    {d.orderId}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(d.downloadedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">
                    {d.ipAddress || '127.0.0.1'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default AdminDownloads;
