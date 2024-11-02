// src/pages/SearchPage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm, searchType) => {
    try {
      const response = await fetch(`/api/${searchType}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm })
      });
      const data = await response.json();
      if (response.ok) {
        setResults(data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error fetching search results.');
    }
  };

  return (
    <div>
      <Header />
      <h1>Search</h1>
      <SearchInput onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.title && <a href={`/playlist/${result._id}`}>{result.title}</a>}
            {result.name && <a href={`/profile/${result._id}`}>{result.name}</a>}
            {result.title && result.artist && <p>{result.title} by {result.artist}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
