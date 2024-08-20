import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEnvelope, faPlus, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
    <header className="bg-gray-800 text-white shadow-md backdrop-blur-md bg-opacity-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <Link to="/">  
              <img src='/images/Logo.png' alt="Your Logo" className="h-8 mr-4" />
            </Link>
            <div className="relative flex-grow mx-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </button>
            </div>
          </div>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </Link>
          )}
        </div>

        <nav className="mt-4">
          <div className="flex space-x-4">
            <Link to="/search" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors duration-300">
              <FontAwesomeIcon icon={faSearch} />
              <span>Search</span>
            </Link>
            <Link to="/post" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors duration-300">
              <FontAwesomeIcon icon={faPlus} />
              <span>Post</span>
            </Link>
            <Link to="/browse" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors duration-300">
              <FontAwesomeIcon icon={faHome} />
              <span>Browse</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors duration-300">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
