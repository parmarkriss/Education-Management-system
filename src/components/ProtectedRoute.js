import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useContext(UserContext);

  // Check if user is logged in and their role is allowed
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />; // Redirect to login if not allowed
  }

  return children; // Render children if allowed
};

export default ProtectedRoute;
