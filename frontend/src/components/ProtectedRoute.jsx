import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { token, user } = useContext(StoreContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
