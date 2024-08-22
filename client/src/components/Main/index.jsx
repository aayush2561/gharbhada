import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const reviews = [
  {
    name: "Sushant Khadka",
    review: "Great experience! Found the perfect roommate quickly.",
    image: "/images/profile1.jpeg",
  },
  {
    name: "Aayush Dhakal",
    review: "The search feature is incredibly user-friendly and efficient.",
    image: "/images/profile2.jpeg",
  },
  {
    name: "Ankit Dhakal",
    review: "Highly recommend for anyone looking for a room or a roommate.",
    image: "/images/profile3.jpeg",
  },
];

const Main = () => {
  const images = [
    '/images/image1.jpg', 
    '/images/image2.png',
    '/images/image3.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className="relative w-full h-96 overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Slideshow"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-2">Rent Room, Hassle-Free</h1>
          <h2 className="text-xl font-medium">Over 1000 Rooms and 1000+ Roommates</h2>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-3xl" />
            ))}
            <FontAwesomeIcon icon={faStar} className="text-gray-300 text-3xl" />
          </div>
          <p className="text-gray-800 text-lg font-semibold ml-2">4 out of 5</p>
          <p className="text-gray-600 text-sm ml-2">Rated on Google</p>
        </div>
        <div className="w-full max-w-xl border-t border-gray-300 mt-4"></div>
      </div>

      <div className="bg-gray-100 p-8">
        <div className="text-center my-8">
          <h1 className="text-4xl font-bold mb-6">Looking for a room or roommate?</h1>
          <div className="flex justify-center gap-8 mb-8">
            <p>Search: <a href="/search" className="text-blue-500 font-semibold hover:underline">Search</a></p>
            <p>Post a room: <a href="/post" className="text-blue-500 font-semibold hover:underline">Post</a></p>
          </div>
          <div className="w-full max-w-xl border-t border-gray-300 mx-auto mb-8"></div>
        </div>

        <div className="text-center my-8">
  <h2 className="text-4xl font-bold mb-6">Why use Gharbhada?</h2>
  <div className="flex flex-col md:flex-row md:justify-center gap-8">
    {['/images/24.png', '/images/people.png', '/images/key.png'].map((src, idx) => (
      <div key={idx} className="flex flex-col items-center gap-4 w-full md:w-1/3 p-4">
        <img 
          src={src} 
          alt={`Benefit ${idx + 1}`} 
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-200 bg-white p-2" 
        />
        <p className="text-gray-700 text-center">
          {idx === 0 && 'At Gharbhada, we offer 24/7 support to assist you anytime, whether you have questions or need help with our platform. Our dedicated team is always available to address your concerns and provide prompt solutions.'}
          {idx === 1 && 'At Gharbhada, we are committed to putting people first by delivering exceptional support and ensuring a seamless user experience. Our advanced encryption and regular security audits protect your personal data and maintain system integrity.'}
          {idx === 2 && 'At Gharbhada, we prioritize your security with advanced encryption to protect your personal data and regular security audits to ensure system integrity. Our dedicated team monitors the platform 24/7 to address any vulnerabilities promptly.'}
        </p>
      </div>
    ))}
  </div>
  <div className="w-full max-w-xl border-t border-gray-300 mx-auto my-8"></div>
</div>


        <div className="text-center my-8">
          <h2 className="text-4xl font-bold mb-6">What They Say About Us</h2>
          <Slider {...sliderSettings} className="max-w-xl mx-auto">
            {reviews.map((review, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <div className="flex justify-center items-center mb-4">
                  <img src={review.image} alt={review.name} className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 bg-white" />
                </div>
                <p className="text-gray-700 mb-2 text-center">{review.review}</p>
                <p className="font-semibold text-gray-900">{review.name}</p>
              </div>
            ))}
          </Slider>
        </div>

        <div className="text-center my-8">
          <h2 className="text-4xl font-bold mb-6">Nepal's No 1 Room Rental Site As per</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['/images/logo1.png', '/images/logo2.png', '/images/logo3.png'].map((src, idx) => (
              <img key={idx} src={src} alt={`Logo ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg border border-gray-300 bg-white p-2" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
