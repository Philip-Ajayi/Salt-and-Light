import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Yomi from '../../assets/Flier.jpeg';
import axios from 'axios'; // Import axios for API calls

const Content = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, register user in MongoDB
      const response = await axios.post('/api/registerr', formData);

      if (response.data.success) {
        // Send email confirmation only if registration was successful
        const templateParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
        };

        await emailjs.send(
          'service_w4n6zo8',
          'template_4bpdaco',
          templateParams,
          'ss6CyS1Ddxn5MtcMx'
        );

        setStatusMessage('Registration successful! You will receive a confirmation email soon.');
        setStatusType('success');
        setFormData({ name: '', email: '', phone: '', location: '' });
      } else {
        // If the server returns an error, display the message from the response
        setStatusMessage(response.data.message || 'Registration failed. Please try again.');
        setStatusType('error');
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Display a specific error message from the server if available
      if (error.response && error.response.data && error.response.data.message) {
        setStatusMessage(error.response.data.message); // Message from the server
      } else {
        setStatusMessage('An error occurred during registration. Please try again.'); // Fallback error message
      }
      setStatusType('error');
    }
  };

  return (
    <div className="bg-gradient-to-r from-4f0981 via-c63cd8 to-9733d7 p-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Salt and Light Conference 2024
        </h1>

        {/* Introductory Text */}
        <p className="text-xl text-gray-700 text-center mb-10">
          Join us for the highly anticipated <strong>Salt and Light Conference 2024</strong>, a time of divine encounters, powerful teachings, and life-changing worship. From Monday, <strong>October 14, 2024</strong> to Friday, <strong>October 18, 2024</strong>, we will experience the glory of God together. Fill in the form below to register and reserve your spot at this impactful event.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-4">
            {/* Name Field */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FaUser className="text-purple-600 mr-4 text-xl" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>

            {/* Location Field */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FaMapMarkerAlt className="text-purple-600 mr-4 text-xl" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your Location"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FaPhone className="text-purple-600 mr-4 text-xl" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center bg-gray-100 p-4 rounded-md">
              <FaEnvelope className="text-purple-600 mr-4 text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-transparent outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all text-xl font-semibold"
            >
              Register Now
            </button>
          </div>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mt-6 text-center text-lg font-semibold ${
              statusType === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Flier Image */}
        <div className="mt-10 flex justify-center">
          <img
            src={Yomi}
            alt="Salt and Light Conference 2024"
            className="rounded-lg shadow-lg w-full max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
