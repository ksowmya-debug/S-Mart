import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

import DummyUpiCheckout from './pages/DummyUpiCheckout';
import Register from './pages/Register';


const App = () => {
  const location = useLocation();

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {location.pathname !== '/login' && <Navbar />}
      <ToastContainer
        transition={Bounce}
        autoClose={2000}
      />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Collections' element={<Collections />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/order' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        
        <Route path='/dummy-upi-checkout' element={<DummyUpiCheckout />} />
        <Route path='/register' element={<Register />} />

        
      </Routes>
    </div>
  );
};

export default App;
