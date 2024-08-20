import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Post = () => {
  const [activeTab, setActiveTab] = useState('postRoom');
  const [formData, setFormData] = useState({
    postRoom: {
      image: '',
      heading: '',
      description: '',
      address: '',
      price: '',
      size: '',
      furnishings: '',
      storageSpace: '',
      lighting: '',
      privacy: '',
      utilities: '',
      heatingCooling: '',
      bathroom: '',
      kitchenAccess: '',
      location: ''
    },
    needRoom: {
      image: '',
      heading: '',
      description: '',
      address: '',
      price: '',
      size: '',
      furnishings: '',
      storageSpace: '',
      lighting: '',
      privacy: '',
      utilities: '',
      heatingCooling: '',
      bathroom: '',
      kitchenAccess: '',
      location: ''
    },
    needRoommate: {
      image: '',
      heading: '',
      description: '',
      address: '',
      price: '',
      size: '',
      furnishings: '',
      storageSpace: '',
      lighting: '',
      privacy: '',
      utilities: '',
      heatingCooling: '',
      bathroom: '',
      kitchenAccess: '',
      location: ''
    },
  });
  const [imagePreview, setImagePreview] = useState('');
  const [username, setUsername] = useState('');
  const[userid, setUserId]=useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(API_ENDPOINTS.GET_USER, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsername(response.data.username);
        setUserId(response.data._id)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUserError('Failed to fetch user data');
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [activeTab]: { ...prevData[activeTab], [name]: value },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFormData((prevData) => ({
        ...prevData,
        [activeTab]: { ...prevData[activeTab], image: file },
      }));
    }
  };

  const handleSubmit = async () => {
    if (loadingUser) {
      return;
    }
    const data = new FormData();
    const currentFormData = formData[activeTab];
    
    data.append('postImage', currentFormData.image);
    data.append('heading', currentFormData.heading);
    data.append('description', currentFormData.description);
    data.append('address', currentFormData.address);
    data.append('price', currentFormData.price);
    data.append('tag', getTagForTab(activeTab));
    data.append('postBy', username);
    data.append('posterId',userid);
    data.append('size', currentFormData.size);
    data.append('furnishings', currentFormData.furnishings);
    data.append('storageSpace', currentFormData.storageSpace);
    data.append('lighting', currentFormData.lighting);
    data.append('privacy', currentFormData.privacy);
    data.append('utilities', currentFormData.utilities);
    data.append('heatingCooling', currentFormData.heatingCooling);
    data.append('bathroom', currentFormData.bathroom);
    data.append('kitchenAccess', currentFormData.kitchenAccess);
    data.append('location', currentFormData.location);
    
    try {
      const response = await axios.post(API_ENDPOINTS.GET_ALLPOSTS, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response.data);
      navigate('/browse');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getTagForTab = (tab) => {
    if (tab === 'postRoom' || tab === 'needRoom') {
      return 'Room';
    } else {
      return 'Roommate';
    }
  };

  if (loadingUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading user data...</p>
      </div>
    );
  }

  if (userError) {
    return <div>Error: {userError}</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-gray-200 p-4 border-b border-gray-300 flex">
        <button
          onClick={() => handleTabChange('postRoom')}
          className={`flex-1 py-2 px-4 text-center rounded-t-lg transition-colors duration-300 ${activeTab === 'postRoom' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
        >
          Post a Room
        </button>
        <button
          onClick={() => handleTabChange('needRoom')}
          className={`flex-1 py-2 px-4 text-center rounded-t-lg transition-colors duration-300 ${activeTab === 'needRoom' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
        >
          Need a Room
        </button>
        <button
          onClick={() => handleTabChange('needRoommate')}
          className={`flex-1 py-2 px-4 text-center rounded-t-lg transition-colors duration-300 ${activeTab === 'needRoommate' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
        >
          Need a Roommate
        </button>
      </div>

      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {activeTab === 'postRoom' && 'Post a Room'}
          {activeTab === 'needRoom' && 'Need a Room'}
          {activeTab === 'needRoommate' && 'Need a Roommate'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover border border-gray-300 rounded-lg"
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
            value={formData[activeTab].heading}
            onChange={handleInputChange}
            placeholder="Enter heading"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            value={formData[activeTab].description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="w-full h-40 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData[activeTab].address}
            onChange={handleInputChange}
            placeholder="Enter address"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData[activeTab].price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="size">
            Size
          </label>
          <input
            type="text"
            name="size"
            value={formData[activeTab].size}
            onChange={handleInputChange}
            placeholder="Enter size"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="furnishings">
            Furnishings
          </label>
          <input
            type="text"
            name="furnishings"
            value={formData[activeTab].furnishings}
            onChange={handleInputChange}
            placeholder="Enter furnishings"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="storageSpace">
            Storage Space
          </label>
          <input
            type="text"
            name="storageSpace"
            value={formData[activeTab].storageSpace}
            onChange={handleInputChange}
            placeholder="Enter storage space"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="lighting">
            Lighting
          </label>
          <input
            type="text"
            name="lighting"
            value={formData[activeTab].lighting}
            onChange={handleInputChange}
            placeholder="Enter lighting"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="privacy">
            Privacy
          </label>
          <input
            type="text"
            name="privacy"
            value={formData[activeTab].privacy}
            onChange={handleInputChange}
            placeholder="Enter privacy"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="utilities">
            Utilities
          </label>
          <input
            type="text"
            name="utilities"
            value={formData[activeTab].utilities}
            onChange={handleInputChange}
            placeholder="Enter utilities"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="heatingCooling">
            Heating/Cooling
          </label>
          <input
            type="text"
            name="heatingCooling"
            value={formData[activeTab].heatingCooling}
            onChange={handleInputChange}
            placeholder="Enter heating/cooling"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="bathroom">
            Bathroom
          </label>
          <input
            type="text"
            name="bathroom"
            value={formData[activeTab].bathroom}
            onChange={handleInputChange}
            placeholder="Enter bathroom details"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="kitchenAccess">
            Kitchen Access
          </label>
          <input
            type="text"
            name="kitchenAccess"
            value={formData[activeTab].kitchenAccess}
            onChange={handleInputChange}
            placeholder="Enter kitchen access details"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData[activeTab].location}
            onChange={handleInputChange}
            placeholder="Enter location details"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        >
          <i className="fas fa-paper-plane fa-lg"></i> Submit
        </button>
      </div>
    </div>
  );
};

export default Post;
