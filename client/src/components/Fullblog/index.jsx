import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Fullblog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_BLOGID(id));
        setBlog(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError('Failed to fetch blog details');
        console.error('Error fetching blog details:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(API_ENDPOINTS.GET_USER, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    };

    fetchBlog();
    fetchUserProfile();
  }, [id]);

  const formatBlogContent = (content) => {
    return content
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!userProfile) {
      setCommentError('User profile information is missing');
      return;
    }

    try {
      const response = await axios.put(
        API_ENDPOINTS.GET_COMMENT(id),
        {
          text: newComment,
          profileImageUrl: userProfile.profileImage,
          username: userProfile.username,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data.comment]);
      setNewComment('');
      setCommentError(null);
    } catch (err) {
      setCommentError('Failed to add comment');
      console.error('Error adding comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-6">Blog not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="bg-gray-200 p-4 mb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">{blog.heading}</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <img
          src={`${API_ENDPOINTS.UPLOAD_BLOGS}${blog.blogImage}`} 
          alt={blog.heading}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div
          className="text-gray-700 text-lg leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatBlogContent(blog.description) }}
        />

        <div className="border-t border-gray-300 pt-4 mt-6 flex items-center">
          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 mr-4">
            <img
              src= {`${API_ENDPOINTS.UPLOAD_PROFILE}${blog.profileImage}`} 
              alt={blog.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Posted By</h2>
            <p className="text-gray-700">{blog.username}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src= {`${API_ENDPOINTS.UPLOAD_PROFILE}${comment.profileImageUrl}`} 
                    alt={comment.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">{comment.username}</p>
                  <p className="text-gray-600 mt-1">{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            rows="4"
            placeholder="Add a comment..."
            className="p-2 border border-gray-300 rounded-md"
          />
          {commentError && <p className="text-red-500">{commentError}</p>}
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Fullblog;
