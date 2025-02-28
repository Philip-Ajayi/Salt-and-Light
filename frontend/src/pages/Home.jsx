// App.jsx
import React from "react";
import { FaRegCalendarAlt, FaUsers, FaChalkboardTeacher, FaHandsHelping } from "react-icons/fa";

// Import Images
import influenceNightImage from '../assets/Influence.jpeg'; // Replace with actual image path
import schoolOfMinistryImage from '../assets/Ministry.jpeg'; // Replace with actual image path
import certifiedSkillsImage from '../assets/Certified.jpeg'; // Replace with actual image path
import shiftingsAndTurningsImage from '../assets/Shiftings.jpeg'; // Replace with actual image path

const Home = () => {
  return (
    <div className="bg-white font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4f0981] via-[#c63cd8] to-[#9733d7] py-20 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold">Salt And Light 2024</h1>
        <p className="mt-4 text-xl md:text-2xl">Empowering the Next Generation</p>
        <p className="mt-2 text-lg">Monday, October 14th - Friday, October 18th</p>
        <p className="mt-2 text-lg">Location: Behind Accord Building, Obadeyi Estate, Samonda, Ibadan</p>
        <a href="/register" className="mt-6 inline-block bg-white text-purple-700 font-semibold py-3 px-6 rounded shadow-lg hover:bg-gray-100 transition">
          Register Now
        </a>
      </div>

      {/* Body Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Word House Section */}
        <div className="bg-purple-100 rounded-lg shadow-md p-8 mt-10 text-center">
          <h2 className="text-4xl font-bold text-purple-800 mb-2">Organized by Word House</h2>
          <p className="mb-4 text-lg text-gray-700">
            We are a Young People’s church under the Men of Issachar Vision Inc.
          </p>
          <div className="flex flex-wrap items-center justify-center mb-4">
            <span className="text-2xl text-purple-600 mr-2">✊</span>
            <p className="text-xl md:text-2xl font-semibold text-purple-700">We are Strong,</p>
            <span className="text-2xl text-purple-600 mx-2">💪</span>
            <p className="text-xl md:text-2xl font-semibold text-purple-700">We are Vigorous,</p>
            <span className="text-2xl text-purple-600 mx-2">🎉</span>
            <p className="text-xl md:text-2xl font-semibold text-purple-700">We are Victorious!</p>
          </div>
        </div>


        {/* Program Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {/* Shiftings and Turnings */}
          <div className="bg-gradient-to-br from-[#4f0981] to-[#c63cd8] text-white rounded-lg shadow-lg flex flex-col">
            <img src={shiftingsAndTurningsImage} alt="Shiftings and Turnings" className="h-70 w-full object-contain rounded-t-lg" />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-2xl font-semibold mb-2">Shiftings and Turnings</h3>
              <p className="text-gray-200 mb-2">Prayer and Prophetic Session</p>
              <p className="flex items-center">
                <FaRegCalendarAlt className="mr-2" />
                Tuesday, October 15th - Friday, October 18th | 6:30 AM - 7:30 AM
              </p>
            </div>
          </div>

          {/* Certificated Skills and Courses */}
          <div className="bg-gradient-to-br from-[#c63cd8] to-[#9733d7] text-white rounded-lg shadow-lg flex flex-col">
            <img src={certifiedSkillsImage} alt="Certified Skills" className="h-69 w-full object-contain rounded-t-lg" />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-2xl font-semibold mb-2">Certificated Skills and Courses</h3>
              <p className="text-gray-200 mb-2">Collaborative training with esteemed institutions</p>
              <p className="flex items-center">
                <FaChalkboardTeacher className="mr-2" />
                Tuesday, October 15th - Friday, October 18th | 11:00 AM - 1:00 PM
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>HSE and Project Management</li>
              </ul>
            </div>
          </div>

          {/* School of Ministry Classes */}
          <div className="bg-gradient-to-br from-[#9733d7] to-[#4f0981] text-white rounded-lg shadow-lg flex flex-col">
            <img src={schoolOfMinistryImage} alt="School of Ministry" className="h-70 w-full object-contain rounded-t-lg" />
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-2xl font-semibold mb-2">School of Ministry Classes</h3>
              <p className="text-gray-200 mb-2">Equipping attendees in their callings</p>
              <p className="flex items-center">
                <FaUsers className="mr-2" />
                Tuesday, October 15th - Friday, October 18th | 1:30 PM - 2:45 PM
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>Pastor, Prophets, Evangelists, Teachers, and Church Administrators</li>
                <li>Youth School Campus</li>
                <li>Arts, Music, Drama, Media</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Opportunity Fair */}
        <div className="bg-gradient-to-br from-[#c63cd8] to-[#9733d7] text-white rounded-lg shadow-lg p-6 mt-10 flex flex-col">
          <h3 className="text-2xl font-semibold mb-2">Opportunity Fair Session</h3>
          <p className="text-gray-200 mb-2">An exhibition where people can pitch their goods and services.</p>
          <a href="#register" className="mt-4 inline-block bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 transition w-max">
            Join Us!
          </a>
        </div>

        {/* Influence Night */}
        <div className="bg-gradient-to-br from-[#4f0981] to-[#c63cd8] text-white rounded-lg shadow-lg flex flex-col mt-10">
          <img src={influenceNightImage} alt="Influence Night" className="h-100 w-full object-contain rounded-t-lg" />
          <div className="p-6 flex flex-col justify-between flex-grow">
            <h3 className="text-2xl font-semibold mb-2">Salt and Light Session (Influence Night)</h3>
            <p className="text-gray-200 mb-2">Monday, October 14th - Friday, October 18th | 5:30 PM - 8:30 PM</p>
            <ul className="list-disc pl-5 mb-4">
              <li className="font-semibold">Ezekiel's Call: Word and Miracle Service</li>
              <li className="font-semibold">Daniel's Call: Applying salt and light influence into the workplace</li>
            </ul>
            <p className="text-gray-200 mb-2">Experience transformation and receive impartation for greater works and influence.</p>
            <a href="/register" className="mt-4 inline-block bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 transition w-max">
              Be Part of It!
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-purple-300 text-center py-10">
        <h2 className="text-4xl font-bold text-white">Get Involved!</h2>
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center">
          <a href="/session" className="bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 mx-2 mb-2 md:mb-0">
            Check Sessions
          </a>
          <a href="/live" className="bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 mx-2 mb-2 md:mb-0">
            Watch Live
          </a>
          <a href="#sermons" className="bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 mx-2 mb-2 md:mb-0">
            Listen and Download Sermon Content
          </a>
          <a href="#gallery" className="bg-white text-purple-700 font-semibold py-2 px-4 rounded shadow-lg hover:bg-gray-100 mx-2 mb-2 md:mb-0">
            Check Our Image Gallery
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
