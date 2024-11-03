// src/components/SearchInput.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('playlists'); // Default to playlists
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchType === 'users') {
      try {
        const response = await fetch('/api/users/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchTerm }),
        });
        const data = await response.json();
        if (response.ok && data.length > 0) {
          navigate(`/profile/${data[0].email}`);
        } else {
          alert('User not found');
        }
      } catch (err) {
        console.error('Failed to search for user:', err);
      }
    } else {
      onSearch(searchTerm, searchType);  // Pass the search term and type to parent
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='rounded mx-2'
      />
      <select onChange={(e) => setSearchType(e.target.value)} value={searchType} className='rounded'>
        <option value="playlists">Playlists</option>
        <option value="songs">Songs</option>
        <option value="users">Users</option>
      </select>
      <button type="submit" className="bg-black text-white mx-2 py-0 px-4 rounded w-30 h-6">Search</button>
    </form>
  );
};

export default SearchInput;