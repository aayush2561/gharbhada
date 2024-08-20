import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Terms = () => {
  const terms = [
    {
      heading: 'General Terms',
      description: `Terms and Conditions are subject to change without prior notice. We reserve the right to update or modify these terms at any time, and it is your responsibility to review these terms periodically. Your continued use of our services following the posting of changes constitutes your acceptance of such changes.`,
    },
    {
      heading: 'User Conduct',
      description: `Users must comply with all applicable laws and regulations while using our services. This includes, but is not limited to, respecting copyright laws, avoiding harassment of other users, and refraining from any illegal activities. Violations may result in suspension or termination of your account.`,
    },
    {
      heading: 'Account Suspension and Termination',
      description: `We reserve the right to suspend or terminate accounts that violate our policies or terms. If we determine that a user has engaged in behavior that is harmful or disruptive, we may take actions including but not limited to account suspension, permanent ban, or legal action as necessary.`,
    },
    {
      heading: 'Content Disclaimer',
      description: `All content provided on our platform is for informational purposes only and is not a substitute for professional advice. We do not warrant the accuracy, completeness, or usefulness of any information provided. It is advised to consult with a qualified professional before making decisions based on content from our platform.`,
    },
    {
      heading: 'Privacy and Data Handling',
      description: `By using our services, you agree to our privacy policy and data handling practices. We collect, use, and share your personal information as described in our privacy policy. We are committed to protecting your data and ensuring that it is handled with the utmost care and in accordance with applicable laws.`,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold text-gray-800">Terms and Conditions</h2>
      </div>

      <div className="flex-1 p-6 bg-white">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Terms</h3>
        <div className="space-y-6">
          {terms.map((term, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{term.heading}</h4>
              <p className="text-gray-700">{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terms;
