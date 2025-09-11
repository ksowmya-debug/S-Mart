import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../assets/frontend_assets/assets';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // Set UPI as default and only payment method

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Navigate to dummy UPI checkout page
    toast.info("Proceeding to Dummy UPI Payment.");
    clearCart();
    navigate('/dummy-upi-checkout');
  };

  if (!token) {
    navigate('/login');
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex">
        {/* Shipping Details */}
        <div className="w-1/2 pr-8">
          <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required className="w-1/2 p-2 border rounded" />
              <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required className="w-1/2 p-2 border rounded" />
            </div>
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required className="w-full p-2 border rounded" />
            <input type="text" name="street" placeholder="Street Address" onChange={handleChange} value={formData.street} required className="w-full p-2 border rounded" />
            <div className="flex space-x-4">
              <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} required className="w-1/2 p-2 border rounded" />
              <input type="text" name="state" placeholder="State" onChange={handleChange} value={formData.state} required className="w-1/2 p-2 border rounded" />
            </div>
            <div className="flex space-x-4">
                <input type="text" name="zip" placeholder="Zip Code" onChange={handleChange} value={formData.zip} required className="w-1/2 p-2 border rounded" />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} required className="w-1/2 p-2 border rounded" />
            </div>

            {/* Payment Method Selection */}
            <h3 className="text-xl font-bold mt-6 mb-4">Select Payment Method</h3>
            <div className="flex items-center mb-4">
              <input 
                type="radio" 
                id="upi" 
                name="paymentMethod" 
                value="upi" 
                checked={paymentMethod === 'upi'} 
                onChange={() => setPaymentMethod('upi')}
                className="mr-2"
              />
              <label htmlFor="upi">Dummy UPI (Scanner Payment)</label>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">Proceed to Payment</button>
          </form>
        </div>

        {/* Cart Totals */}
        <div className="w-1/2 pl-8 border-l">
          <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>${getTotalCartAmount() > 0 ? 10 : 0}</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + 10 : 0}</p>
            </div>
            <div className="flex justify-center mt-6">
              {paymentMethod === 'upi' && <p className="text-lg font-semibold">UPI Payment Selected</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
