import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-black overflow-hidden">
      <div className="relative w-64 h-64 mb-8 animate-spin-slow">
        <img
          src="/images/404.png" 
          alt="Not Found"
          className="w-full h-full object-contain"
        />
      </div>
      

      <h1 className="text-5xl font-bold mb-4 animate-bounce">Oops!</h1>
      <p className="text-xl mb-6 animate-fadeIn">The page you're looking for doesn't exist.</p>
      
      <Link
        to="/"
        className="py-3 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Notfound;
