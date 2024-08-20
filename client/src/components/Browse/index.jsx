import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('');
  const [locationText, setLocationText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (searchBy) params.append('searchBy', searchBy);
        if (locationText) params.append('location', locationText); 
  
      const url = `${API_ENDPOINTS.GET_ALLPOSTS}?${params.toString()}`;
        console.log('Request URL:', url); 
  
        const response = await axios.get(url);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
  
    const params = new URLSearchParams(location.search);
    const term = params.get('searchTerm') || '';
    const by = params.get('searchBy') || '';
    const loc = params.get('location') || ''; 
    setSearchTerm(term);
    setSearchBy(by);
    setLocationText(loc);
  
    fetchPosts();
  }, [location.search, searchTerm, searchBy, locationText]);
  
  const handlePostClick = (id) => {
    navigate(`/roomview/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 bg-gray-100">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Browse Listings</h2>
      {(searchTerm || searchBy || locationText) && (
        <div className="p-4 mb-6 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-lg font-medium text-yellow-800">
            {searchTerm && (
              <span>You have searched for "<span className="font-bold">{searchTerm}</span>"</span>
            )}
            {searchBy && !searchTerm && (
              <span>Searching by tag "<span className="font-bold">{searchBy}</span>"</span>
            )}
            {locationText && !searchTerm && !searchBy && (
              <span>Location: "<span className="font-bold">{locationText}</span>"</span>
            )}
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <div
              key={post._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handlePostClick(post._id)}
            >
              <img
                src={`http://localhost:3000/uploads/post/${post.postimage}`}
                alt={post.heading}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    post.tag.toLowerCase() === 'roommate' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'
                  }`}>
                    {post.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.heading}</h3>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-blue-600">{post.price}</span>
                  <span className="text-gray-500">{post.address}</span>
                </div>
                <div className="mt-4 text-gray-600">
                  <span className="font-semibold">Posted By:</span> {post.postBy}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-700">No posts found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
