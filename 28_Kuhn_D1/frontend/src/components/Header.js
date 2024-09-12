// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ id = 1 }) => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to={`/playlist/${id}`}>Playlists</Link>
    <Link to={`/profile/${id}`}>Profile</Link>
  </nav>
);

export default Header;
