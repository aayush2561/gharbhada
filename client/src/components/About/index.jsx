import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const About = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleFAQToggle = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const faqs = [
    { question: 'What is Gharbhada?', answer: 'Gharbhada is a platform dedicated to providing quality accommodation solutions, ensuring a comfortable and convenient living experience.' },
    { question: 'How can I post a room on Gharbhada?', answer: 'To post a room, simply navigate to the "Post a Room" section and fill out the required details including images, heading, description, address, and price.' },
    { question: 'What is the process for finding a roommate?', answer: 'To find a roommate, you can use the "Need a Roommate" section to specify your requirements and connect with potential roommates through our platform.' },
    { question: 'How can I contact Gharbhada for support?', answer: 'You can contact us through the "Contact Us" section on our website. We are here to assist you with any questions or concerns you may have.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-400 to-blue-500 text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/HeroBackground.jpg"
            alt="Hero Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center md:items-stretch p-8 bg-white shadow-lg rounded-lg mt-8 mx-4">
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <img
            src="/images/About1.jpg"
            alt="About Gharbhada"
            className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center p-4">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center md:text-left">About Gharbhada</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
            Gharbhada is dedicated to providing the best accommodation solutions. Our mission is to ensure that every individual finds the perfect place to call home, with a focus on comfort, convenience, and community.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-stretch p-8 bg-white shadow-lg rounded-lg mt-8 mx-4">
        <div className="md:w-1/2 flex items-center justify-center p-4">
          <img
            src="/images/About2.jpg"
            alt="Our Promise"
            className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center p-4">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center md:text-left">Our Promise</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
            We promise to deliver exceptional service, ensuring that each of our clients' needs are met with the utmost care and attention. Our commitment is to transparency, reliability, and satisfaction in all that we do.
          </p>
        </div>
      </div>

      <div className="flex-1 p-8 bg-white shadow-lg rounded-lg mt-8 mx-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">FAQs</h2>
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <button
                onClick={() => handleFAQToggle(index)}
                className="w-full flex justify-between items-center py-3 text-gray-800 hover:text-teal-500 focus:outline-none transition-colors duration-300"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <i className={`fas fa-plus transition-transform duration-300 ${expandedFAQ === index ? 'hidden' : 'block'}`}></i>
                <i className={`fas fa-minus transition-transform duration-300 ${expandedFAQ === index ? 'block' : 'hidden'}`}></i>
              </button>
              {expandedFAQ === index && (
                <div className="mt-3 text-gray-700 text-base">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
