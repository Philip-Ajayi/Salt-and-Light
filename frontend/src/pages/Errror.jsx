// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-purple-600">404</h1>
        <h2 className="mt-4 text-4xl font-semibold text-gray-800">Oops! Page not found</h2>
        <p className="mt-2 text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
