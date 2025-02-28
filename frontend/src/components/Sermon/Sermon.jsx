// Sermon.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'AIzaSyBbh5Z3C7Ga1k-mTwpt-T2tQY_XwmO54iM';
const PLAYLIST_IDS = [
  'PL6QREj8te1P7d4j3k8Snfa187o-IjXuJx',
  'PL6QREj8te1P7faGPL2hfiM8F9zdOvZpbF'
];

const Sermon = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const promises = PLAYLIST_IDS.map(playlistId => {
        return axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
          params: {
            part: 'snippet',
            maxResults: 10,
            playlistId,
            key: API_KEY,
          }
        });
      });

      const results = await Promise.all(promises);
      setPlaylists(results.map((result, index) => ({
        playlistId: PLAYLIST_IDS[index],
        title: result.data.items[0]?.snippet?.channelTitle || 'Sermon Playlist',
        videos: result.data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })),
      })));
    };

    fetchPlaylists();
  }, []);

  const handleClick = (playlistId, videoId) => {
    navigate(`/sermon/${videoId}`, { state: { playlistId } });
  };

  return (
    <div className="bg-white p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-purple-700">Sermons</h1>
        <p className="text-gray-600 mt-2">
          Watch our latest sermons and stay connected with the message of hope.
        </p>
      </div>
      {playlists.map(playlist => (
        <div key={playlist.playlistId} className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">
            {playlist.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlist.videos.map(video => (
              <div 
                key={video.id} 
                className="cursor-pointer" 
                onClick={() => handleClick(playlist.playlistId, video.id)}
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <p className="mt-2 text-gray-800">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sermon;
