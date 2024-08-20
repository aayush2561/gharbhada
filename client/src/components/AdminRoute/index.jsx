import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setIsAdmin(decodedToken.isAdmin === true);
        } catch (error) {
          console.error('Error decoding token', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin256" state={{ from: location }} />;
};

export default AdminRoute;
