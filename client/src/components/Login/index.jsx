import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.setItem('token', token);
      setSuccess('Login successful!');
      setTimeout(() => {
        navigate('/'); 
      }, 1500);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(API_ENDPOINTS.USER_LOGIN, formData);
      localStorage.setItem('token', response.data.token);
      setSuccess('Login successful!');
      setTimeout(() => {
        navigate('/'); 
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Something went wrong');
      } else {
        setError('Server error');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/images/login.jpg)' }}>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        
        <div className="mb-6">
          <img
            src="/images/Logo.png" 
            alt="Logo"
            className="w-24 h-auto"
          />
        </div>
        
        <h1 className="text-4xl font-semibold text-[#2c444e] mb-6 relative">
          Log In
          <div className="absolute bottom-[-10px] left-0 w-[80px] h-[4px] bg-[#ffc801] rounded-md" />
        </h1>
        
        <h2 className="text-xl font-normal text-[#2c444e] mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full h-12 px-4 border border-[#2c444e] rounded-md mb-4 text-sm outline-none"
          />
          
          <div className="relative w-full mb-4">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full h-12 px-4 border border-[#2c444e] rounded-md pr-12 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-4 flex items-center justify-center"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} text-gray-500`} />
            </button>
          </div>
          
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}
          
          <button
            type="submit"
            className="w-full py-3 px-6 bg-[#ffc801] text-white font-medium rounded-md mb-4"
          >
            Log In
          </button>
          
          <p className="text-[#2c444e] text-sm">
            New Here?{' '}
            <Link to="/signup" className="text-[#ffc801] font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
