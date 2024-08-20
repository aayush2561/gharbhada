import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Blogadd = () => {
  const [formData, setFormData] = useState({
    image: null,
    heading: '',
    fullBlog: '',
    profileImage: '',
    username: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(API_ENDPOINTS.GET_USER, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { profileImage, username } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          profileImage,
          username
        }));
      } catch (error) {
        setError('Failed to fetch user data');
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prevData) => ({
        ...prevData,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('blogImage', formData.image);
    data.append('heading', formData.heading);
    data.append('description', formData.fullBlog); 
    data.append('profileImage', formData.profileImage); 
    data.append('username', formData.username); 

    try {
      const response = await axios.post(API_ENDPOINTS.ADD_BLOG, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Blog added successfully:', response.data);
      setFormData({
        image: null,
        heading: '',
        fullBlog: '',
        profileImage: '',
        username: ''
      });
      setImagePreview('');
    } catch (error) {
      setError('Failed to add blog');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="bg-gray-200 p-4 border-b border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add a New Blog</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">
            Blog Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover border border-gray-300 rounded-lg"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="heading">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            placeholder="Enter heading"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="fullBlog">
            Full Blog
          </label>
          <textarea
            name="fullBlog"
            value={formData.fullBlog}
            onChange={handleInputChange}
            placeholder="Enter full blog content"
            className="w-full h-40 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
      
      <style jsx>{`
        textarea {
          margin-bottom: 1rem; 
        }
        textarea:last-of-type {
          margin-bottom: 0; 
        }
      `}</style>
    </div>
  );
};

export default Blogadd;
