// frontend/src/pages/ProfilePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import PlaylistPreview from '../components/PlaylistPreview.js';
import Header from '../components/Header.js';
import Song from '../components/Song.js'; // Assuming a Song component is available to display liked songs

const playlistsArr = [
  { name: "My Top Tracks", songCount: 12 },
  { name: "Chill Mix", songCount: 9 },
  { name: "Party Hits", songCount: 8 },
];

const likedSongsArr = [
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
];

const friendsArr = [
  "Name 1", "Name 2", "Name 3", "Name 4", "Name 5", 
  "Name 6", "Name 7", "Name 8", "Name 9", "Name 10", "Name 11", "Name 12"
];

const ProfilePage = () => {
  return (
    <div className="profile-page">
      {/* Navigation */}
      <header className="profile-header">
        <h1>Profile</h1>
        <nav>
          <Header />
          <Link to="/">
            <button style={{ marginLeft: 'auto' }}>Logout</button>
          </Link>
        </nav>
      </header>

      <div className="profile-layout">
        {/* Left Section: User Info */}
        <aside className="user-info">
          <img src="https://via.placeholder.com/150" alt="User Profile" />
          <h2>Name</h2>
          <p>Gender</p>
          <p>Bio: </p>
        </aside>

        {/* Center Section: Liked Songs and Playlists */}
        <main className="profile-details">
          <section className="liked-songs">
            <h2>Liked Songs</h2>
            {likedSongsArr.map((song, index) => (
              <Song key={index} title={song.title} artist={song.artist} album={song.album} />
            ))}
          </section>

          <section className="your-playlists">
            <h2>Your Playlists</h2>
            {playlistsArr.map((playlist, index) => (
              <PlaylistPreview key={index} name={playlist.name} songCount={playlist.songCount} />
            ))}
          </section>
        </main>

        {/* Right Section: Friends List */}
        <aside className="friends-list">
          <h2>Friends</h2>
          <ul>
            {friendsArr.map((friend, index) => (
              <li key={index}>
                <img src="https://via.placeholder.com/50" alt={`Profile of ${friend}`} />
                <p>{friend}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default ProfilePage;
