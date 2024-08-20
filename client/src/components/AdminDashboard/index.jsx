import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/apiConfig';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await axios.get(endpoint);
        setter(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    switch (activeTab) {
      case 'users':
        fetchData(API_ENDPOINTS.GET_ALLUSERS, setUsers);
        break;
      case 'blogs':
        fetchData(API_ENDPOINTS.GET_ALLBLOGS, setBlogs);
        break;
      case 'posts':
        fetchData(API_ENDPOINTS.GET_ALLPOSTS, setPosts);
        break;
      default:
        setLoading(false);
        break;
    }
  }, [activeTab]);

  const handleDelete = async (type, id, setter) => {
    const confirmMessage = `Are you sure you want to delete this ${type}?`;
    const endpoint = type === 'user' ? API_ENDPOINTS.DELETE_USER(id) :
                     type === 'blog' ? API_ENDPOINTS.DELETE_BLOG(id) :
                     API_ENDPOINTS.DELETE_POST(id);

    if (window.confirm(confirmMessage)) {
      try {
        await axios.delete(endpoint);
        setter(prev => prev.filter(item => item._id !== id));
      } catch (err) {
        console.error(err);
        setError(`Failed to delete ${type}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin256');
  };

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    switch (activeTab) {
      case 'users':
        return (
          <div className="flex flex-col space-y-4 p-6">
            {users.map(user => (
              <div key={user._id} className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-4 w-full">
                <img
                  src={`${API_ENDPOINTS.UPLOAD_PROFILE}${user.profileImage}`}
                  alt={`${user.username}'s profile`}
                  className="w-16 h-16 rounded-full border-2 border-indigo-600"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-gray-600">{user.firstName} {user.lastName}</p>
                </div>
                <button
                  onClick={() => handleDelete('user', user._id, setUsers)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        );
      case 'blogs':
        return (
          <div className="flex flex-col space-y-4 p-6">
            {blogs.map(blog => (
              <div key={blog._id} className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center space-y-4 w-full">
                <img
                  src={`${API_ENDPOINTS.UPLOAD_BLOGS}${blog.blogImage}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{blog.title}</h2>
                  <p className="text-gray-600 mt-2">{blog.description}</p>
                </div>
                <button
                  onClick={() => handleDelete('blog', blog._id, setBlogs)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete Blog
                </button>
              </div>
            ))}
          </div>
        );
      case 'posts':
        return (
          <div className="flex flex-col space-y-4 p-6">
            {posts.map(post => (
              <div key={post._id} className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center space-y-4 w-full">
                <img
                  src={`${API_ENDPOINTS.UPLOAD_POSTS}${post.postimage}`}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
                <button
                  onClick={() => handleDelete('post', post._id, setPosts)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete Post
                </button>
              </div>
            ))}
          </div>
        );
      default:
        return <div>Welcome to the Admin Panel</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-indigo-700 text-white flex items-center justify-between p-4 shadow-md">
        <img
          src="/images/logoa.png"
          alt="Logo"
          className="h-8 w-auto"
        />
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-white font-semibold hover:bg-indigo-800 px-4 py-2 rounded-md focus:outline-none"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="bg-white shadow-md p-6 w-64">
          <div className="text-lg font-semibold mb-6">Menu</div>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center text-gray-700 hover:bg-indigo-50 px-4 py-2 rounded-md transition-colors ${activeTab === 'users' ? 'bg-indigo-100' : ''}`}
              >
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h2m4 0h12m-8 4h4m-4 4h2m-6-8h2m-2 8h2m6-4h2m-4 4h2m6-8h2m-6 8h2" />
                </svg>
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`flex items-center text-gray-700 hover:bg-indigo-50 px-4 py-2 rounded-md transition-colors ${activeTab === 'blogs' ? 'bg-indigo-100' : ''}`}
              >
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zM2 4v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2z" />
                </svg>
                Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center text-gray-700 hover:bg-indigo-50 px-4 py-2 rounded-md transition-colors ${activeTab === 'posts' ? 'bg-indigo-100' : ''}`}
              >
                <svg className="w-6 h-6 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h3a1 1 0 001-1zm14-1h-3a1 1 0 01-1-1V3a1 1 0 011-1h3a1 1 0 011 1v7a1 1 0 01-1 1zm-4 7H7a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1z" />
                </svg>
                Posts
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 p-6 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
