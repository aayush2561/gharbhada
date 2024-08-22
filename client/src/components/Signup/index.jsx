import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    gender: 'male',
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { email, username, password, firstName, lastName, phoneNumber, location, gender } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('email', email);
    formDataToSend.append('username', username);
    formDataToSend.append('password', password);
    formDataToSend.append('firstName', firstName);
    formDataToSend.append('lastName', lastName);
    formDataToSend.append('phoneNumber', phoneNumber);
    formDataToSend.append('location', location);
    formDataToSend.append('gender', gender);
    if (file) {
      formDataToSend.append('profileImage', file);
    }

    try {
      await axios.post(API_ENDPOINTS.USER_REGISTER, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => {
        navigate('/login');
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative flex flex-col md:flex-row items-center justify-center flex-grow bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block relative w-full md:w-1/2 h-full">
          <img
            src="/images/signup.jpg"
            alt="Signup"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8">
          <div className="mb-6 flex justify-center">
            <img
              src="/images/Logo.png"
              alt="Gharbhada Logo"
              className="w-24 h-auto"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2c444e] mb-6 relative">
            Sign Up
            <div className="absolute bottom-[-10px] left-0 w-[60px] md:w-[80px] h-[4px] bg-[#ffc801] rounded-md" />
          </h2>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl grid grid-cols-1 gap-4">
              {/* Input fields */}
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="abc@gmail.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  required
                  placeholder="username"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                  required
                  pattern="\d{10}"
                  placeholder="Phone number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={handleChange}
                  required
                  placeholder="Ethiopia, Addis Ababa"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
                />
              </div>
              <div className="relative mb-6 col-span-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                </button>
              </div>
            </div>
            <div className="mb-6 w-full">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#ffc801] text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-[#ffc801]">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
