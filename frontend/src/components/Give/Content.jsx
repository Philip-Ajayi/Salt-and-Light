import React from 'react';
import { FaRegCreditCard } from 'react-icons/fa';

const Content = () => {
  return (
    <div className="bg-gradient-to-r from-4f0981 via-c63cd8 to-9733d7 p-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Support Salt and Light Conference 2024
        </h1>
        <p className="text-xl text-gray-700 text-center mb-10">
          Your generous support towards the <strong>Salt and Light Conference 2024</strong> enables us to carry the mission of transformation and impact in our community. We appreciate your offerings and donations that make it all possible. Every contribution makes a difference, and we thank you for partnering with us.
        </p>

        {/* Bank Transfer for Project Support */}
        <div className="flex justify-center mb-10 text-center">
          <div className="flex flex-col items-center">
            <FaRegCreditCard className="text-purple-600 text-5xl mb-4 animate-pulse" />
            <p className="text-xl font-bold">Project Support</p>
            <p className="text-gray-700">
              <strong>Account Number:</strong> 0095182084 <br />
              <strong>Account Name:</strong> MIV (Word House) - Project <br />
              <strong>Bank:</strong> Sterling Bank
              <br />
              <strong>Remarks:</strong> SLT 2024
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <p className="text-2xl font-semibold text-gray-700">
            You can also give your offerings during the course of the service through the provided account details.
          </p>
          <p className="text-xl text-gray-700">
            Together, we are building a lasting legacy and making a difference in lives. Every seed sown brings us closer to fulfilling our mission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
