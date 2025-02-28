import React from 'react';
import { speakers } from '../../pages/data'; // Assuming speakers data is stored in a separate data file

const Content = () => {
  return (
    <div className="bg-white flex flex-col items-center">
      <p className="text-lg text-gray-700 mb-10 text-center px-4">
        Meet our inspiring speakers who are committed to sharing the word of God and guiding us on our spiritual journey.
      </p>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 w-full">
        {speakers.map((speaker, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
            
            {/* Image Section */}
            <div className="h-64 w-full flex-shrink-0">
              <img
                src={speaker.imgUrl}
                alt={speaker.name}
                className="object-contain h-full w-full"
              />
            </div>
            
            {/* Text Section */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-purple-600">{speaker.name}</h2>
              {speaker.title && <p className="hidden text-sm text-gray-500">{speaker.title}</p>}
              <a
                href={`/minister/${index}`} // Assuming bio route uses speaker index
                className="hidden text-purple-500 hover:text-purple-700 mt-2 inline-block"
              >
                View Bio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
