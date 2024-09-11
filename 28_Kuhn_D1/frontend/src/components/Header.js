// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to="/playlist">Playlists</Link>
    <Link to="/profile">Profile</Link>
  </nav>
);

export default Header;