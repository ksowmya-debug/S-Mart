import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Profile = () => {
  const { user } = useContext(StoreContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Name:</p>
          <p className="text-gray-900">{user.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Email:</p>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Role:</p>
          <p className="text-gray-900">{user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
