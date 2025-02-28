import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const Content = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gradient-to-r from-4f0981 via-c63cd8 to-9733d7 p-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-6">
          Salt and Light 2024: Live Radio Stream
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-700 text-center mb-10">
          Welcome to the live broadcast of the <strong>Salt and Light 2024</strong> program. Join us as we journey together in this time of worship, teaching, and divine encounters. You can listen to the program live using the player below. Click the button to start or pause the live stream.
        </p>

        {/* Radio Player */}
        <div className="flex justify-center items-center">
          <button
            onClick={togglePlayPause}
            className={`px-8 py-4 text-white rounded-full shadow-lg text-2xl font-semibold focus:outline-none transition-all ${
              isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
            } flex items-center space-x-3`}
          >
            {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
            <span>{isPlaying ? 'Pause' : 'Play'} Live Stream</span>
          </button>
        </div>

        {/* Audio Element with Working URL */}
        <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

        {/* Further Information */}
        <div className="text-center mt-10">
          <p className="text-lg text-gray-600">
            Don't miss out on any part of this powerful program. Stay tuned and be blessed by every moment.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            If you are experiencing any technical issues, please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
