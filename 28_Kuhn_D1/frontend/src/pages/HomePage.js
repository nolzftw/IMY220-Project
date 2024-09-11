// frontend/src/pages/HomePage.js
import React from 'react';
import Song from '../components/Song.js';
import Header from '../components/Header.js';
import PlaylistPreview from '../components/PlaylistPreview.js';

const songsArr = [
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours" },
  { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia" },
  { title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line" },
];

const playlistsArr = [
  { title: "Top 2024 Hits", songCount: 20 },
  { title: "Chill Vibes", songCount: 15 },
  { title: "Workout Mix", songCount: 10 },
];

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Header />
      </nav>

      <h2>Songs</h2>
      {songsArr.map((song, index) => (
        <Song key={index} title={song.title} artist={song.artist} album={song.album} />
      ))}

      <h2>Playlists</h2>
      {playlistsArr.map((playlist, index) => (
        <PlaylistPreview key={index} title={playlist.title} songCount={playlist.songCount} />
      ))}
    </div>
  );
};

export default HomePage;
