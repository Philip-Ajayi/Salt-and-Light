import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import emailjs from 'emailjs-com';

const Content = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    emailjs
      .send('service_w4n6zo8', 'template_ykexrci', templateParams, 'ss6CyS1Ddxn5MtcMx')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setIsSubmitted(true);
          setSuccessMessage('Thank you for reaching out to us! We will get back to you soon.');
          setErrorMessage(''); // Clear error message on success
        },
        (error) => {
          console.log('FAILED...', error);
          setErrorMessage('Oops! Something went wrong. Please try again.');
          setSuccessMessage(''); // Clear success message on error
        }
      );
  };

  return (
    <div className="bg-gradient-to-r from-4f0981 via-c63cd8 to-9733d7 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-700 text-center mb-10">
          We would love to hear from you! Please feel free to reach out to us using the form or contact details below.
        </p>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <FaPhoneAlt className="text-purple-600 text-4xl mb-4 animate-pulse" />
            <p className="text-lg font-semibold">Phone</p>
            <p className="text-gray-700">0706 606 0640</p>
          </div>
          {/* Email */}
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-purple-600 text-4xl mb-4 animate-pulse" />
            <p className="text-lg font-semibold">Email</p>
            <p className="text-gray-700">
              <a href="mailto:mivwordhouse@gmail.com" className="hover:underline">
                mivwordhouse@gmail.com
              </a>
            </p>
          </div>
          {/* Address */}
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-purple-600 text-4xl mb-4 animate-pulse" />
            <p className="text-lg font-semibold">Address</p>
            <p className="text-gray-700">
              Behind Acord Building, <br /> Obadeyi Estate, Samonda, Ibadan
            </p>
          </div>
        </div>

        {/* Success/Error Message */}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 text-center">
            {errorMessage}
          </div>
        )}

        {/* Contact Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-gray-600 mb-2" htmlFor="phone">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="message">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-purple-700 transition duration-300 space-x-2"
            >
              <MdSend className="text-2xl" />
              <span>Send Message</span>
            </button>
          </form>
        ) : (
          <div className="text-center text-purple-600">
            <p className="text-2xl font-bold">Thank you for reaching out to us!</p>
            <p className="text-lg">We will get back to you as soon as possible.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
