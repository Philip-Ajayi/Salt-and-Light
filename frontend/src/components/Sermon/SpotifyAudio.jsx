// SpotifyAudio.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';

const CLIENT_ID = '8b7a6e4def79422da4983efefe48c22c';
const CLIENT_SECRET = '66f1690e44af4dd4a41612254e66b706';

const SpotifyAudio = () => {
  const { trackId } = useParams();
  const [audioData, setAudioData] = useState({
    speakerName: '',
    speakerImgUrl: '',
    summary: '',
    content: '',
  });
  const [audioTrack, setAudioTrack] = useState(null);
  const [token, setToken] = useState(null);

  // Fetch Spotify access token
  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      setToken(response.data.access_token);
    };

    fetchToken();
  }, []);

  // Fetch audio details from Spotify
  useEffect(() => {
    const fetchAudioDetails = async () => {
      if (token) {
        try {
          const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAudioTrack(response.data);
        } catch (error) {
          console.error('Error fetching audio details:', error);
        }
      }
    };

    fetchAudioDetails();
  }, [trackId, token]);

  // Fetch sermon details from your server
  useEffect(() => {
    const fetchSermonDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/sermon/spotify/${trackId}`);
        setAudioData({
          speakerName: data.SpeakerName,
          speakerImgUrl: data.SpeakerImgUrl,
          summary: data.Summary,
          content: data.Content,
        });
      } catch (error) {
        console.error('Error fetching sermon details:', error);
      }
    };

    fetchSermonDetails();
  }, [trackId]);

  return (
    <div className="bg-white p-4">
      {audioTrack && (
        <>
          <div className="w-full flex justify-center">
            <iframe 
              className="w-full h-64 sm:h-96"
              src={`https://open.spotify.com/embed/track/${trackId}`}
              title="Spotify Audio"
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
            />
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <img src={audioData.speakerImgUrl} alt={audioData.speakerName} className="w-16 h-16 rounded-full mr-4" />
              <h2 className="text-2xl font-semibold">{audioData.speakerName}</h2>
            </div>
            <p className="text-gray-600 mb-4">{audioData.summary}</p>
            <div className="text-gray-800">
              <ReactQuill value={audioData.content} readOnly={true} theme="bubble" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SpotifyAudio;
