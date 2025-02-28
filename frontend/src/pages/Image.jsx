import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const accessToken = 'YOUR_ACCESS_TOKEN';
    const userId = 'YOUR_IG_USER_ID';

    const fetchInstagramMedia = async () => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v17.0/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`
        );
        setPosts(response.data.data);
      } catch (error) {
        setError('Error fetching Instagram media');
        console.error(error);
      }
    };

    fetchInstagramMedia();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
            <img src={post.media_url} alt={post.caption} className="w-full h-auto" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
