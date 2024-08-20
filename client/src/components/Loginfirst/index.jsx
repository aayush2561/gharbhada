import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Loginfirst = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black overflow-hidden">
      <div className="relative w-64 h-64 mb-8 animate-spin-slow">
        <img
          src="/images/Login.png" 
          alt="Login First"
          className="w-full h-full object-contain"
        />
      </div>
      
     
      <h1 className="text-5xl font-bold mb-4 ">Login First</h1>
      <p className="text-xl mb-6 animate-fadeIn">Please log in to access the content.</p>
      
     
      <Link
        to="/login"
        className="py-3 px-6 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500  hover:scale-105 "
      >
        Go to Login
      </Link>
    </div>
  );
};

export default Loginfirst;
