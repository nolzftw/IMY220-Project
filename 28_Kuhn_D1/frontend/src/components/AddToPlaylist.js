// frontend/src/components/AddToPlaylist.js
import React, { useState } from 'react';

const AddToPlaylist = ({ songTitle }) => {
  const [playlist, setPlaylist] = useState('Playlist 1');

  const handleAddToPlaylist = () => {
    alert(`Added ${songTitle} to ${playlist}`);
  };

  return (
    <div>
      <h4>Add {songTitle} to Playlist</h4>
      <select
        value={playlist}
        onChange={(e) => setPlaylist(e.target.value)}
      >
        <option value="Playlist 1">Playlist 1</option>
        <option value="Playlist 2">Playlist 2</option>
      </select>
      <button onClick={handleAddToPlaylist}>Add to Playlist</button>
    </div>
  );
};

export default AddToPlaylist;
