import React from 'react';
import BibleNote from '../Live/BibleNote';
import Content from './Content';

const Main = () => {
  return (
    <div className="flex flex-col space-y-4 mx-auto max-w-screen-xl px-4 py-24"> {/* Increased top padding to py-24 */}
      <div className="w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <Content />
      </div>
      <div className="w-full bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <BibleNote />
      </div>
    </div>
  );
};

export default Main;
