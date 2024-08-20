import React, { useState } from 'react';
import axios from 'axios'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '',
    subject: '',
    description: '',
  });

  const [statusMessage, setStatusMessage] = useState(''); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.CONTACT_API, formData);

      if (response.status === 200) {
        setStatusMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          description: '',
        });
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex justify-center items-center w-full px-4 py-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">We’d love to hear from you!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {statusMessage && (
              <div className={`p-3 rounded-lg ${statusMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMessage}
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter your message"
                className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center justify-center"
            >
              <i className="fas fa-paper-plane mr-2"></i> Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
