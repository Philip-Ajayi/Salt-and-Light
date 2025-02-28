// App.jsx
import React from 'react';

const Hero = () => {
  return (
    <div className="h-48 md:h-56 lg:h-64 flex items-center justify-center bg-gradient-to-br from-[#4f0981] via-[#c63cd8] to-[#9733d7]">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Radio
        </h1>
      </div>
    </div>
  );
};

export default Hero;
