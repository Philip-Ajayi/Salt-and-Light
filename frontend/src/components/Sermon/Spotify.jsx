// Spotify.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '8b7a6e4def79422da4983efefe48c22c';
const CLIENT_SECRET = '66f1690e44af4dd4a41612254e66b706';
const PLAYLISTS = [
  { id: '37i9dQZF1E4B8NCEqVThZP', title: 'CNN' },
  { id: '5QKZepLjFxPs4rtOAFxWJJ', title: 'BBC' },
];

const Spotify = () => {
  const [playlists, setPlaylists] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const response = await axios.post('https://accounts.spotify.com/api/token', 
        new URLSearchParams({
          grant_type: 'client_credentials'
        }),
        {
          headers: {
            'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      setToken(response.data.access_token);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (token) {
        const promises = PLAYLISTS.map(playlist => 
          axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        );

        const results = await Promise.all(promises);
        setPlaylists(results.map((result, index) => ({
          title: PLAYLISTS[index].title,
          tracks: result.data.items.map(item => ({
            id: item.track.id,
            title: item.track.name,
            albumArt: item.track.album.images[0]?.url,
          })),
        })));
      }
    };

    fetchPlaylists();
  }, [token]);

  const handleClick = (trackId) => {
    navigate(`/spotify/${trackId}`);
  };

  return (
    <div className="bg-white p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-purple-700">Spotify Playlists</h1>
        <p className="text-gray-600 mt-2">
          Listen to our latest sermons and teachings.
        </p>
      </div>
      {playlists.map((playlist, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">
            {playlist.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlist.tracks.map(track => (
              <div key={track.id} className="cursor-pointer" onClick={() => handleClick(track.id)}>
                <img 
                  src={track.albumArt} 
                  alt={track.title} 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="mt-2 text-gray-800">{track.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spotify;
