import React from 'react';
import { useLocation } from 'react-router-dom';
import pdfFile from '../assets/Salt&Light.pdf'; // Import the PDF file

export default function Success() {
  const location = useLocation();
  const { session, time, date, name } = location.state || {}; // Destructure name from location state

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#4f0981] via-[#c63cd8] to-[#9733d7] p-4">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Success!</h1>
        <p className="mb-2">Welcome, {name || 'User'}!</p> {/* Display user's name */}
        <p className="mb-2">You have successfully logged in or registered.</p>
        <p className="mb-2">Session: {session || 'N/A'}</p>
        <p className="mb-2">Time: {time || 'N/A'}</p>
        <p className="mb-2">Date: {date || 'N/A'}</p>

        {/* PDF Download Button */}
        <a
          href={pdfFile}
          download="book.pdf"
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 inline-block"
        >
          Download PDF
        </a>

        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
