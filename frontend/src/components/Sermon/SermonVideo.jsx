// SermonVideo.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';

const SermonVideo = () => {
  const { videoId } = useParams();
  const [sermonData, setSermonData] = useState({
    speakerName: '',
    speakerImgUrl: '',
    summary: '',
    content: ''
  });

  useEffect(() => {
    const fetchSermonDetails = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/sermon/${videoId}`);
      setSermonData({
        speakerName: data.SpeakerName,
        speakerImgUrl: data.SpeakerImgUrl,
        summary: data.Summary,
        content: data.Content,
      });
    };

    fetchSermonDetails();
  }, [videoId]);

  return (
    <div className="bg-white p-4">
      <div className="w-full flex justify-center">
        <iframe 
          className="w-full h-64 sm:h-96"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Sermon Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="mt-6">
        <div className="flex items-center mb-4">
          <img src={sermonData.speakerImgUrl} alt={sermonData.speakerName} className="w-16 h-16 rounded-full mr-4" />
          <h2 className="text-2xl font-semibold">{sermonData.speakerName}</h2>
        </div>
        <p className="text-gray-600 mb-4">{sermonData.summary}</p>
        <div className="text-gray-800">
          <ReactQuill value={sermonData.content} readOnly={true} theme="bubble" />
        </div>
      </div>
    </div>
  );
};

export default SermonVideo;
