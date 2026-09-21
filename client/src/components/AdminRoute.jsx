import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not logged in at all
    return <Navigate to="/login" replace />;
  }

  try {
    // Safely decode the middle part (payload) of the JWT
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));

    if (decoded.role === 'admin') {
      // User is an admin, allow them to view the nested routes
      return <Outlet />;
    } else {
      // User is logged in but is NOT an admin
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // If token is invalid, expired, or malformed
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
