import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { API_ENDPOINTS } from '../../config/apiConfig';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_ALLBLOGS); 
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  const truncateText = (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...'; 
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800">Our Latest Blogs</h2>
      </div>

      <div className="flex-1 p-6 bg-white">
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="flex items-start bg-gray-50 p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="w-1/3">
                <img
                  src={`${API_ENDPOINTS.UPLOAD_BLOGS}${blog.blogImage}`} 
                  alt={blog.title}
                  className="w-full h-32 object-cover rounded-lg" 
                />
              </div>
              <div className="w-2/3 pl-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.heading}</h3>
                <p className="text-gray-700 mb-4">{truncateText(blog.description, 150)}</p>
                <Link
                  to={`/fullblog/${blog._id}`} 
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
