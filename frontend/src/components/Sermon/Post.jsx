// Post.jsx
import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';

const Post = () => {
  const [formData, setFormData] = useState({
    YoutubeID: '',
    SpotifyID: '',
    SpeakerName: '',
    SpeakerImgUrl: '',
    Summary: '',
    Content: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleContentChange = (value) => {
    setFormData(prevData => ({ ...prevData, Content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/sermon', formData);
    alert('Sermon posted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">YouTube ID</label>
        <input
          type="text"
          name="YoutubeID"
          value={formData.YoutubeID}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Spotify ID</label>
        <input
          type="text"
          name="SpotifyID"
          value={formData.SpotifyID}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Speaker Name</label>
        <input
          type="text"
          name="SpeakerName"
          value={formData.SpeakerName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Speaker Image URL</label>
        <input
          type="text"
          name="SpeakerImgUrl"
          value={formData.SpeakerImgUrl}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Summary</label>
        <textarea
          name="Summary"
          value={formData.Summary}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Content</label>
        <ReactQuill value={formData.Content} onChange={handleContentChange} />
      </div>
      <button type="submit" className="bg-purple-700 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default Post;
