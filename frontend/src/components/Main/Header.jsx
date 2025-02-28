import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/logo.png';

const Header = () => {
  const [showResources, setShowResources] = useState(false);
  const [showSermon, setShowSermon] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleResources = () => {
    setShowResources(!showResources);
  };

  const toggleSermon = () => {
    setShowSermon(!showSermon);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img src={Logo} alt="Logo" className="h-10" />
        <div className="hidden md:flex items-center space-x-4 relative">
          <Link to="/" className="flex items-center text-black hover:text-purple-600">
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link to="/session" className="text-black hover:text-purple-600">
            Sessions
          </Link>
          <Link to="/minister" className="text-black hover:text-purple-600">
            Ministers
          </Link>
          <Link to="/register" className="text-black hover:text-purple-600">
            Register
          </Link>
          <Link to="/radio" className="text-black hover:text-purple-600">
            Radio
          </Link>
          <div className="relative">
            <button 
              onClick={toggleResources} 
              className="text-black hover:text-purple-600 focus:outline-none"
            >
              Resources
            </button>
            {showResources && (
              <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
                <div 
                  className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white"
                  onMouseEnter={toggleSermon}
                  onMouseLeave={toggleSermon}
                >
                  Sermon
                  {showSermon && (
                    <div className="absolute left-64 top-0 mt-0 w-48 bg-white shadow-lg rounded-md z-20">
                      <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                        Video
                      </Link>
                      <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                        Audio
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                  Worship
                </Link>
                <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                  Images
                </Link>
              </div>
            )}
          </div>
          <Link to="/contact" className="text-black hover:text-purple-600">
            Contact
          </Link>
          <Link to="/live" className="text-black hover:text-purple-600">
            Live
          </Link>
          <Link
            to="/give"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-[#4f0981] via-[#c63cd8] to-[#9733d7]"
          >
            Give
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-2 px-4 py-2">
            <Link to="/" className="flex items-center text-black hover:text-purple-600">
              <FaHome className="mr-1" />
              Home
            </Link>
            <Link to="/session" className="text-black hover:text-purple-600">
              Sessions
            </Link>
            <Link to="/minister" className="text-black hover:text-purple-600">
              Ministers
            </Link>
            <Link to="/register" className="text-black hover:text-purple-600">
              Register
            </Link>
            <Link to="/radio" className="text-black hover:text-purple-600">
              Radio
            </Link>
            <div className="relative">
              <button 
                onClick={toggleResources} 
                className="text-black hover:text-purple-600 w-full text-left"
              >
                Resources
              </button>
              {showResources && (
                <div className="flex flex-col bg-white shadow-lg rounded-md z-10">
                  <div 
                    className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white"
                    onMouseEnter={toggleSermon}
                    onMouseLeave={toggleSermon}
                  >
                    Sermon
                    {showSermon && (
                      <div className="flex flex-col bg-white shadow-lg rounded-md z-20">
                        <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                          Video
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                          Audio
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                    Worship
                  </Link>
                  <Link to="#" className="block px-4 py-2 text-black hover:bg-purple-600 hover:text-white">
                    Images
                  </Link>
                </div>
              )}
            </div>
            <Link to="/contact" className="text-black hover:text-purple-600">
              Contact
            </Link>
            <Link to="/live" className="text-black hover:text-purple-600">
              Live
            </Link>
            <Link
              to="/give"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r from-[#4f0981] via-[#c63cd8] to-[#9733d7]"
            >
              Give
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
