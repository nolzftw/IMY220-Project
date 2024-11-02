// frontend/src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Song from '../components/Song.js';
import Header from '../components/Header.js';
import PlaylistPreview from '../components/PlaylistPreview.js';
import AddSong from '../components/AddSong.js';
import CreatePlaylist from '../components/CreatePlaylist.js';

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      // Check if the user is logged in
      const sessionResponse = await fetch('/api/login/session');
      const sessionData = await sessionResponse.json();
      if (!sessionResponse.ok) {
        setError(sessionData.message);
        return;
      }

      const userId = sessionData._id;

      // Fetch songs belonging to the logged-in user
      const songsResponse = await fetch('/api/songs/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '', userId }),
      });
      const songsData = await songsResponse.json();
      if (songsResponse.ok) {
        setSongs(songsData);
      } else {
        setError(songsData.message);
      }

      // Fetch playlists belonging to the logged-in user
      const playlistsResponse = await fetch('/api/playlists/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '', userId }),
      });
      const playlistsData = await playlistsResponse.json();
      if (playlistsResponse.ok) {
        setPlaylists(playlistsData);
      } else {
        setError(playlistsData.message);
      }
    } catch (err) {
      setError('Error fetching data.');
    }
  };

  // Call fetchUserData on component mount to get the initial data
  useEffect(() => {
    fetchUserData();
  }, []);

  // Callback to re-fetch songs after adding a new song
  const handleSongAdded = () => {
    fetchUserData();
  };

  // Callback to re-fetch playlists after creating a new playlist
  const handlePlaylistCreated = () => {
    fetchUserData();
  };

  return (
    <div className="grid grid-cols-1 auto-rows-max bg-slate-700">
      <div className="row-start-1 flex flex-col items-center justify-center h-10 bg-slate-600">
        <Link to="/home"><h1>Apogee</h1></Link>
        <h2>Home</h2>
      </div>
      <nav className="row-start-2">
        <Header />
      </nav>

      <div className="row-start-3 bg-slate-500">
        <h2 >Songs</h2>
        {error && <p>{error}</p>}
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <Song key={index} title={song.title} artist={song.artist} album={song.album} link={song.link} />
          ))
        ) : (
          <p>No songs found.</p>
        )}
      </div>

      <div className="bg-slate-400">
        {/* AddSong component with the onSongAdded callback to refresh the song list */}
        <AddSong onSongAdded={handleSongAdded} />
      </div>

      <div className="bg-slate-300">
        <h2>Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((playlist, index) => (
            <PlaylistPreview
              key={index}
              title={playlist.title}
              description={playlist.description}
              link={`/playlist/${playlist._id}`}
            />
          ))
        ) : (
          <p>No playlists found.</p>
        )}
      </div>

      <div className="bg-slate-200">
        {/* CreatePlaylist component with the onPlaylistCreated callback to refresh the playlist list */}
        <CreatePlaylist onPlaylistCreated={handlePlaylistCreated} />
      </div>
    </div>
  );
};

export default HomePage;
