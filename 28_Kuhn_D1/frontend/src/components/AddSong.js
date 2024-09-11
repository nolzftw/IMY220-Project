// frontend/src/components/AddSong.js
import React, { useState } from 'react';

const AddSong = () => {
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    album: '',
  });

  const handleChange = (e) => {
    setSongDetails({ ...songDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the song details
    console.log('Song added:', songDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Song Title"
        value={songDetails.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={songDetails.artist}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="album"
        placeholder="Album"
        value={songDetails.album}
        onChange={handleChange}
      />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSong;
