import React, { useContext } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { token, logout, getTotalCartItems, user } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log("Navbar - user:", user);
  console.log("Navbar - user.isAdmin:", user?.isAdmin);

  

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <img src={assets.logo} alt="logo" style={{ width: '150px' }} />
      <ul className='hidden md:flex items-center gap-5'>
        <NavLink to="/" className='flex flex-col items-center gap-1'>
          <p>Home</p>
          <hr className='w-2/4 border-none h-[2.5px] bg-black rounded hidden' />
        </NavLink>
        <NavLink to="/Collections" className='flex flex-col items-center gap-1'>
          <p>Collections</p>
          <hr className='w-2/4 border-none h-[2.5px] bg-black rounded hidden' />
        </NavLink>
        <NavLink to="/About" className='flex flex-col items-center gap-1'>
          <p>About</p>
          <hr className='w-2/4 border-none h-[2.5px] bg-black rounded hidden' />
        </NavLink>
        <NavLink to="/Contact" className='flex flex-col items-center gap-1'>
          <p>Contact</p>
          <hr className='w-2/4 border-none h-[2.5px] bg-black rounded hidden' />
        </NavLink>
        {user && user.isAdmin && (
          <NavLink to="/admin/dashboard" className='flex flex-col items-center gap-1'>
            <p>Admin Dashboard</p>
            <hr className='w-2/4 border-none h-[2.5px] bg-black rounded hidden' />
          </NavLink>
        )}
      </ul>
      <div className='flex iteam-center gap-6'>
        <button aria-label="Search" className='w-5 cursor-pointer'>
          <img src={assets.search_icon} alt="Search" />
        </button>

        {!token ? (
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </Link>
        ) : (
          <div className='group relative'>
            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
            <ul className='absolute z-10 hidden group-hover:block bg-white shadow-md rounded-md mt-1 w-40'>
              <li className='p-2 hover:bg-gray-100 cursor-pointer'>My profile</li>
              <Link to="/orders"><li className='p-2 hover:bg-gray-100 cursor-pointer'>Order</li></Link>
              <li onClick={handleLogout} className='p-2 hover:bg-gray-100 cursor-pointer'>
                Logout
              </li>
            </ul>
          </div>
        )}

        <Link className=' relative' to="/cart">
          <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]'>
            {getTotalCartItems()}
          </p>
        </Link>
        <img src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
    </div>
  );
};

export default Navbar;
