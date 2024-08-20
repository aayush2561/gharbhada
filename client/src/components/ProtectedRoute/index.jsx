import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { verifyToken } from '../../utils/auth'; 

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userProfile = await verifyToken(token);
        setIsAuthenticated(!!userProfile);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/loginfirst" state={{ from: location }} />;
};

export default ProtectedRoute;
