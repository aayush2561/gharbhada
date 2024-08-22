import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faHome, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const breadcrumbs = location.pathname.split('/').filter(Boolean);

  const MenuItems = () => (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
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
  );

  return (
    <header className="bg-gray-800 text-white shadow-md backdrop-blur-md bg-opacity-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center flex-grow">
          <Link to="/">
            <img src='/images/Logo.png' alt="Your Logo" className="h-8 mr-4" />
          </Link>
          <div className="relative flex-grow mx-4 hidden md:flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-full bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-3">
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
              </button>
            </div>
            <div className="ml-4">
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
          </div>
        </div>

        <button onClick={toggleMenu} className="md:hidden text-gray-500 ml-4">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      <nav className="hidden md:flex mt-4 space-x-4">
        <MenuItems />
      </nav>

      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <MenuItems />
          <div className="mt-4">
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
        </nav>
      )}

      <div className="md:hidden mt-4">
        <nav className=" p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-300">
            {breadcrumbs.length > 0 && breadcrumbs.map((crumb, index) => (
              <span key={index} className="text-gray-400">
                <Link to={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>{crumb}</Link>
                {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
