// src/components/SearchInput.js
import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('playlists'); // Default to playlists

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);  // Pass the search term and type to parent
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
        <option value="playlists">Playlists</option>
        <option value="songs">Songs</option>
        <option value="users">Users</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;
