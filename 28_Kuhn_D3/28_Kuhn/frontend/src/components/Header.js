// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchInput from './SearchInput';

const Header = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessionUser();
  }, []);

  const fetchSessionUser = async () => {
    try {
      const response = await fetch('/api/login/session', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setUserId(data._id);
      } else {
        setError(data.message || 'User is not logged in');
      }
    } catch (err) {
      setError('Failed to fetch session user.');
    }
  };

  const handleSearch = (searchTerm, searchType) => {
    // Redirect to SearchPage with both query and category
    navigate(`/search?q=${searchTerm}&type=${searchType}`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <nav className="grid grid-cols-3 grid-rows-2 ">
      <div className="col-start-2 row-start-1 flex justify-center gap-4">
        <Link to="/home" className="hover:text-neonyellow-500 hover:underline text-xl">Home</Link>
        {userId && <Link to={`/profile/${userId}`} className="hover:text-neonyellow-500 hover:underline text-xl">Profile</Link>}
        {/* {console.log("ID in Header: " + userId)} */}
      </div>
      <div className="col-start-3 row-start-2">
        <SearchInput onSearch={handleSearch} />
      </div>
    </nav>
  );
};

export default Header;