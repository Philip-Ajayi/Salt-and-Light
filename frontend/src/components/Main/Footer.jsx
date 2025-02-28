import React, { useState } from "react"; 
import {
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
  FaYoutube,
  FaSpotify,
  FaPodcast,
  FaPhone,
  FaHome,
} from "react-icons/fa";
import Logo from '../../assets/logo.png';
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from 'react-router-dom'; // Import Link from React Router

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post("/api/subscribe", { email });
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setMessage("Error subscribing to the newsletter.");
    }
  };

  return (
    <footer className="bg-gray-900 pt-12 pb-8 text-white"> {/* Added background color */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Newsletter section */}
          <div className="mb-8 sm:mb-0">
            <h2 className="text-2xl font-bold">Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubscribe} className="flex flex-col mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-md border border-gray-300 bg-gray-800 text-white placeholder:text-gray-400" // Updated styles
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md"
              >
                Subscribe
              </button>
              {message && <p className="mt-2 text-red-400">{message}</p>}
            </form>
          </div>

          {/* Company details section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <img src={Logo} alt="Logo" className="max-w-[100px] invert" /> {/* Updated logo */}
            <div>
              <p className="flex items-center gap-2">
                <FaPhone />
                0706 606 0640
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaHome />
                Behind Acccord Building, Samonda, Ibadan, Nigeria
              </p>
            </div>
          </motion.div>

          {/* Footer Links section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >            
              <h1 className="text-3xl font-bold">Quick Links</h1>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <ul className="space-y-2">
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/session">Session</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/minister">Ministers</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/live">Watch Live</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/register">Registeration</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/radio">Radio</Link>
                    </li>
                    <li className="hover:text-blue-400 cursor-pointer">
                      <Link to="/give">Give</Link>
                    </li>
                  </ul>
                </div>
              </div>

          </motion.div>

          {/* Social Links section */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold">Follow us</h1>
            <div className="flex items-center gap-3">
              <a href="https://m.facebook.com/mivwordhouse" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl hover:scale-105 duration-300 text-white" />
              </a>
              <a href="https://www.instagram.com/mivwordhouse" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-3xl hover:scale-105 duration-300 text-white" />
              </a>
              
              <a href="https://www.youtube.com/channel/UCqNsV9zMutO3zkGR5PaaGQw" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-3xl hover:scale-105 duration-300 text-white" />
              </a>
              <a href="https://open.spotify.com/show/1gC7m8RniOjRX1IiXGbBKu" target="_blank" rel="noopener noreferrer">
                <FaSpotify className="text-3xl hover:scale-105 duration-300 text-white" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright section */}
        <p className="text-center mt-8 border-t-2 border-white/40 pt-8">
          Copyright &copy; 2024. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
