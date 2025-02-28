import React, { useState } from 'react';
import Bible from './Bible';
import Note from './Note';


const BibleNote = () => {
  const [activeMenu, setActiveMenu] = useState('Bible'); // Default active menu

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Menu Bar */}
      <div className="w-full h-16 bg-purple-800 flex items-center p-4">
        <button
          onClick={() => handleMenuClick('Notes')}
          className={`text-white font-semibold mx-2 ${activeMenu === 'Notes' ? 'border-b-2 border-white' : ''}`}
        >
          Notes
        </button>
        <button
          onClick={() => handleMenuClick('Bible')}
          className={`text-white font-semibold mx-2 ${activeMenu === 'Bible' ? 'border-b-2 border-white' : ''}`}
        >
          Bible
        </button>
      </div>

      {/* Display Active Component */}
      <div className="w-full p-4">
        {activeMenu === 'Notes' ? <Note /> : <Bible />}
      </div>
    </div>
  );
};

export default BibleNote;
