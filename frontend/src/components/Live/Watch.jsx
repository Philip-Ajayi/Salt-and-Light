import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaVideo } from 'react-icons/fa'; // Import video icon
import Logo from '../../assets/logo.png'; // Import the logo

const Watch = () => {
  const [liveVideo, setLiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const targetDate = new Date('2024-10-14T17:30:00+01:00'); // Target date
    const endDate = new Date('2024-10-18T00:00:00+01:00'); // End date

    const calculateTimeLeft = () => {
      const now = new Date();
      
      if (now > endDate) {
        setStatusMessage('The camp meeting is over.');
        return null;
      }
      
      if (now < targetDate) {
        const difference = targetDate - now;
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        return { days, hours, minutes, seconds };
      }
      
      return null;
    };

    const updateCountdown = () => {
      setCountdown(calculateTimeLeft());
    };

    updateCountdown();
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLiveVideo = async () => {
      try {
        const channelId = 'UCqNsV9zMutO3zkGR5PaaGQw';
        const apiKey = 'AIzaSyBbh5Z3C7Ga1k-mTwpt-T2tQY_XwmO54iM';

        if (countdown === null) {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search`,
            {
              params: {
                part: 'snippet',
                channelId,
                eventType: 'live',
                type: 'video',
                order: 'date',
                key: apiKey
              }
            }
          );

          if (response.data.items.length > 0) {
            const liveVideoId = response.data.items[0].id.videoId;
            setLiveVideo(liveVideoId);
          } else {
            setError('We will be live soon.');
          }
        }
      } catch (error) {
        setError('Error fetching live video.');
      } finally {
        setLoading(false);
      }
    };

    if (countdown === null) {
      fetchLiveVideo();
    }
  }, [countdown]);

  const { days, hours, minutes, seconds } = countdown || {};

  return (
    <div className="relative flex flex-col items-center justify-center p-0 min-h-[600px] md:min-h-[800px] z-0"> {/* Adjusted z-index */}
      {/* Background Image */}
      {!liveVideo && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Logo})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}

      <div className="relative z-10 text-center text-gray-200 flex-grow flex flex-col justify-center w-full h-full">
        {statusMessage ? (
          <div className="text-xl text-red-300 font-bold mb-2">{statusMessage}</div>
        ) : countdown ? (
          <div>
            <h3 className="text-xl mb-2">Salt and Light is starting in:</h3>
            <div className="flex justify-center space-x-4">
              <div className="text-[64px] font-bold shadow-lg">
                {days} <span className="text-sm">days</span>
              </div>
              <div className="text-[64px] font-bold shadow-lg">
                {hours} <span className="text-sm">hours</span>
              </div>
              <div className="text-[64px] font-bold shadow-lg">
                {minutes} <span className="text-sm">minutes</span>
              </div>
              <div className="text-[64px] font-bold shadow-lg">
                {seconds} <span className="text-sm">seconds</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center w-full h-full">
            {loading ? (
              <div className="text-xl">Loading...</div>
            ) : error ? (
              <div className="text-xl text-red-300">{error}</div>
            ) : (
              liveVideo && (
                <iframe
                  src={`https://www.youtube.com/embed/${liveVideo}?autoplay=1`}
                  title="YouTube live video"
                  className="w-full h-full" // Keep iframe size the same
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}
          </div>
        )}
      </div>
      {statusMessage && (
        <div className="mt-4 text-center text-gray-200">
          <span className="text-sm">Check our sermon page for resources </span>
          <FaVideo className="inline ml-1" />
        </div>
      )}
    </div>
  );
};

export default Watch;
