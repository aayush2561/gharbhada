import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { API_ENDPOINTS } from '../../config/apiConfig';

const Roomview = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [roomDetails, setRoomDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

    const fetchRoomDetails = async (id) => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_POSTID(id));
        setRoomDetails(response.data);
        setReviews(response.data.reviews || []); 
      } catch (err) {
        setError('Failed to fetch room details');
        console.error('Error fetching room details:', err);
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

    fetchRoomDetails(id);
    fetchUserProfile();

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0 || !userProfile) {
      setError('Please fill in all fields');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(API_ENDPOINTS.GET_REVIEW(id),
        {
          text: reviewText,
          rating,
          username: userProfile.username,
          profileImage: userProfile.profileImage,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setReviews([...reviews, response.data.review]);
      setReviewText('');
      setRating(0);
      setError(null);
    } catch (err) {
      setError('Failed to submit review');
      console.error('Error submitting review:', err);
    }
  };

  const handleOwnerprofile = () => {
    if (roomDetails ){
      navigate(`/profile/${roomDetails.posterId}`);
    }
  };

  const calculateAverageRating = () => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length ? (total / reviews.length).toFixed(1) : '0.0';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-blue-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!roomDetails) {
    return <div className="text-center mt-6">Room not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="bg-gray-200 p-4 mb-6 border-b border-gray-300 flex flex-col md:flex-row">
        <div className="md:w-1/3 flex flex-col">
          <img
            src={`${API_ENDPOINTS.UPLOAD_POSTS}${roomDetails.postimage}`}
            alt="Room"
            className="w-full h-48 object-cover border border-gray-300 rounded-lg mb-4"
          />
          <div className="bg-gray-100 p-4 rounded-lg mb-4 border border-gray-300 flex flex-col">
            <div className="flex items-center mb-4">
              <span className="inline-block px-3 py-1 bg-green-500 text-white text-sm rounded-full mr-4">{roomDetails.tag}</span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Overall Rating</h2>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < calculateAverageRating() ? 'text-yellow-500' : 'text-gray-300'}`}
                    ></i>
                  ))}
                  <p className="ml-2 text-gray-700">{calculateAverageRating()} / 5</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <button
                className="mt-2  mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                onClick={handleOwnerprofile} 
              >
               Owner profile
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <div className="p-4">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">{roomDetails.heading}</h1>
            <p className="text-gray-700 mb-2"><i className="fas fa-map-marker-alt"></i> {roomDetails.address}</p>
            <p className="text-gray-700 mb-2"><i className="fas fa-dollar-sign"></i> {roomDetails.price}</p>
            <p className="text-gray-700 mb-4">{roomDetails.description}</p>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Size: {roomDetails.size}</li>
                <li>Furnishings: {roomDetails.furnishings}</li>
                <li>Storage Space: {roomDetails.storageSpace}</li>
                <li>Lighting: {roomDetails.lighting}</li>
                <li>Privacy: {roomDetails.privacy}</li>
                <li>Utilities: {roomDetails.utilities}</li>
                <li>Heating/Cooling: {roomDetails.heatingCooling}</li>
                <li>Bathroom: {roomDetails.bathroom}</li>
                <li>Kitchen Access: {roomDetails.kitchenAccess}</li>
                <li>Location: {roomDetails.location}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>
        <div className="space-y-4 mb-6">
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-md">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={`${API_ENDPOINTS.UPLOAD_PROFILE}${review.profileImage}`} 
                    alt={review.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                  <p className="text-gray-800 font-semibold mb-1">{review.username}</p>
                  <p className="text-gray-700 mb-1">{review.text}</p>
                  <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleReviewSubmit} className="bg-gray-100 p-6 rounded-lg border border-gray-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Leave a Review</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <textarea
              value={reviewText}
              onChange={handleReviewChange}
              rows="4"
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></textarea>
          </div>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleRatingChange(i + 1)}
              ></i>
            ))}
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Roomview;
