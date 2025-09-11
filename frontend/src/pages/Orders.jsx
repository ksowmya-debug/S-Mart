import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets';

const Orders = () => {
  const { token } = useContext(StoreContext);

  // Mock data for orders - in a real app, this would come from an API
  const mockOrders = [
    {
      _id: '60d5f3b4c6a5b3a5c8f3b3a1',
      date: '2023-07-20T14:48:00.000Z',
      items: [
        { name: 'Women Round Neck Cotton Top', quantity: 1, price: 100 },
        { name: 'Men Round Neck Pure Cotton T-shirt', quantity: 2, price: 200 },
      ],
      amount: 500,
      status: 'Delivered',
    },
    {
      _id: '60d5f3b4c6a5b3a5c8f3b3a2',
      date: '2023-07-21T10:30:00.000Z',
      items: [
        { name: 'Girls Round Neck Cotton Top', quantity: 1, price: 220 },
      ],
      amount: 220,
      status: 'Shipped',
    },
    {
      _id: '60d5f3b4c6a5b3a5c8f3b3a3',
      date: '2023-07-22T09:00:00.000Z',
      items: [
        { name: 'Men Tapered Fit Flat-Front Trousers', quantity: 1, price: 190 },
      ],
      amount: 190,
      status: 'Processing',
    },
  ];

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">You are not logged in.</h2>
        <p className="mb-4">Please log in to see your orders.</p>
        <Link to="/login">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h2>
                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${order.amount}</p>
                <p className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Shipped' ? 'text-blue-500' : 'text-yellow-500'}`}>
                  {order.status}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Items:</h3>
              <ul className="list-disc list-inside mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center mt-4">
                <img src={assets.parcel_icon} alt="" className="w-6 h-6 mr-2" />
                <p className="text-sm text-gray-600">Your order is on its way!</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
