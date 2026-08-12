import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { assets } from '../../assets/admin_assets/assets';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

const Dashboard = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/admin/summary', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSummary(data);
        } catch (error) {
            toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    const salesChartData = {
        labels: summary?.salesData.map(data => data._id),
        datasets: [
            {
                label: 'Sales',
                data: summary?.salesData.map(data => data.totalSales),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
                tension: 0.1,
            },
        ],
    };

    const topProductsChartData = {
        labels: summary?.topSellingProductsByRevenue.map(data => data._id),
        datasets: [
            {
                label: 'Revenue',
                data: summary?.topSellingProductsByRevenue.map(data => data.totalRevenue),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const popularProductsChartData = {
        labels: summary?.popularProducts.map(data => data._id),
        datasets: [
            {
                label: 'Quantity Sold',
                data: summary?.popularProducts.map(data => data.count),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8">Admin Dashboard</h1>

            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-1 sm:mb-2">Total Profit</h2>
                            <p className="text-2xl sm:text-3xl font-bold">${summary.totalProfit.toFixed(2)}</p>
                        </div>
                        <img src={assets.logo} alt="Profit Icon" className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-1 sm:mb-2">Total Users</h2>
                            <p className="text-2xl sm:text-3xl font-bold">{summary.userCount}</p>
                        </div>
                        <img src={assets.add_icon} alt="Users Icon" className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-1 sm:mb-2">Total Products</h2>
                            <p className="text-2xl sm:text-3xl font-bold">{summary.productCount}</p>
                        </div>
                        <img src={assets.parcel_icon} alt="Products Icon" className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold mb-1 sm:mb-2">Total Orders</h2>
                            <p className="text-2xl sm:text-3xl font-bold">{summary.orderCount}</p>
                        </div>
                        <img src={assets.order_icon} alt="Orders Icon" className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Sales Over Time</h2>
                    {summary?.salesData && <Line data={salesChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Daily Sales' } } }} />}
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Top Selling Products by Revenue</h2>
                    {summary?.topSellingProductsByRevenue && <Bar data={topProductsChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Top Products by Revenue' } } }} />}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Popular Products by Quantity</h2>
                    {summary?.popularProducts && <Bar data={popularProductsChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Popular Products' } } }} />}
                </div>
                {/* You can add another chart here if needed */}
            </div>

            {/* Removed User Management, Product Management, and Add Product Form sections */}
        </div>
    );
};

export default Dashboard;
