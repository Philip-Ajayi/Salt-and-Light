import React from 'react';
import { speakers } from '../../pages/data'; // Assuming speakers data is stored in a separate data file
import { useParams } from 'react-router-dom';

const Content = () => {
  const { id } = useParams();
  const speaker = speakers[id];

  return (
    <div className=" bg-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-purple-600 mt-10 mb-5 text-center">
        {speaker.name}'s Bio
      </h1>
      <p className="text-lg text-gray-700 mb-10 text-center px-4">
        Meet {speaker.name}, a dedicated speaker with a passion for spreading the gospel.
      </p>
      <img
        src={speaker.imgUrl}
        alt={speaker.name}
        className="w-48 h-48 object-cover rounded-full border-4 border-purple-600"
      />
      <div className="mt-6 text-center px-4">
        {speaker.bio.map((line, index) => (
          <p key={index} className="text-gray-700 mb-2">{line}</p>
        ))}
      </div>
    </div>
  );
};

export default Content;
