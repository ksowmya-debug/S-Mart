import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, products, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{Object.keys(cartItems).length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {products.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src={`http://localhost:8000/images/${item.image?.[0]}`} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className="text-red-500 text-xs">{item.category}</span>
                      <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => { console.log("Remove button clicked for item:", item._id); removeFromCart(item._id); }}>Remove</a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <span className="text-center w-1/5 font-semibold text-sm">{cartItems[item._id]}</span>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">${item.price}</span>
                  <span className="text-center w-1/5 font-semibold text-sm">${item.price * cartItems[item._id]}</span>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Subtotal</span>
            <span className="font-semibold text-sm">${getTotalCartAmount()}</span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${getTotalCartAmount() + (getTotalCartAmount() > 0 ? 10 : 0)}</span>
            </div>
            <button onClick={() => navigate('/order')} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
