import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { API_ENDPOINTS } from '../../config/apiConfig';

const Editprofile = () => {
  const [formData, setFormData] = useState({
    profileImage: '',
    firstName: '',
    lastName: '',
    gender: '',
    location: '',
    phoneNumber: '',
    email: '',
    bio: ''
  });
  const [file, setFile] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(API_ENDPOINTS.GET_USER, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFormData(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('gender', formData.gender);
    form.append('location', formData.location);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('email', formData.email);
    form.append('bio', formData.bio);
    if (file) {
      form.append('profileImage', file);
    }

    try {
      await axios.put(API_ENDPOINTS.GET_USERS, form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      navigate('/profile'); 
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white shadow-lg rounded-lg border border-gray-200 p-6 mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex flex-col items-center">
            <img
              src={`${API_ENDPOINTS.UPLOAD_PROFILE}${formData.profileImage}`} 
              alt="Profile Preview"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />
           <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
            />
          </div>

        
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

         
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="font-medium text-gray-600 mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

         
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Bio</h2>
            <div className="flex flex-col mb-4">
              <label className="font-medium text-gray-600 mb-2">Biography:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="4"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Editprofile;
