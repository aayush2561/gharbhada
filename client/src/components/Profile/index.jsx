import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Profile = () => {
  const { id } = useParams(); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          id ? API_ENDPOINTS.GET_USERID(id) : API_ENDPOINTS.GET_USER,
           {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData(response.data);
        setIsOwnProfile(!id); 
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="text-center mt-6">No user data available</div>;
  }

  return (
    <section className="w-full min-h-screen bg-gray-100">
      <div className="w-full bg-white shadow-lg rounded-lg border border-gray-200 p-6 mx-auto">
        {isOwnProfile && (
          <div className="flex justify-end mb-6 space-x-4">
            <Link
              to={`/editprofile`}
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Edit Profile
            </Link>
            <Link
              to="/blogadd"
              className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Add Blog
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center">
          <img
            src= {`${API_ENDPOINTS.UPLOAD_PROFILE}${userData.profileImage}`} 
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h1 className="text-2xl font-semibold mt-4 text-gray-800">{userData.username}</h1>
          <p className="text-gray-600 text-center mt-2 px-4">
            {userData.bio || ""}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">First Name:</span>
                  <span className="text-gray-800">{userData.firstName}</span>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">Last Name:</span>
                  <span className="text-gray-800">{userData.lastName}</span>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">Gender:</span>
                  <span className="text-gray-800">{userData.gender}</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="text-gray-800">{userData.location}</span>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">Phone Number:</span>
                  <span className="text-gray-800">{userData.phoneNumber}</span>
                </div>
                <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-gray-800">{userData.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
