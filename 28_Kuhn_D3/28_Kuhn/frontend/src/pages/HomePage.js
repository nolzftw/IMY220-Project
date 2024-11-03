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
  const [showAddSong, setShowAddSong] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [view, setView] = useState('songs');

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
    setShowAddSong(false); // Hide the AddSong component after a song is added
    fetchUserData();
  };

  // Callback to re-fetch playlists after creating a new playlist
  const handlePlaylistCreated = () => {
    setShowCreatePlaylist(false); // Hide the CreatePlaylist component after a playlist is created
    fetchUserData();
  };


  return (
    <div className="grid grid-cols-1 auto-rows-max bg-charcoal overflow-auto min-h-screen">
      <div className="row-start-1 flex flex-col items-center justify-center h-20">
        <Link to="/home"><h1 className='text-neonyellow-500  text-6xl'>Apogee</h1></Link>
        <h2 className='mt-2 pb-2 '>Home</h2>
      </div>
      <nav className="row-start-2 h-40">
        <Header />
      </nav>

      <div className="row-start-3 ">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setView('songs')}
            className={`py-2 px-4 rounded ${view === 'songs' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
          >
            View Songs
          </button>
          <button
            onClick={() => setView('playlists')}
            className={`py-2 px-4 rounded ${view === 'playlists' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
          >
            View Playlists
          </button>
        </div>

        <div className='grid grid-cols-2 auto-rows-max mx-64'>
          <div className="flex flex-col items-center">
            {view === 'songs' && (
              <>
                <h2 className='text-3xl '>Songs</h2>
                {error && <p>{error}</p>}
                {songs.length > 0 ? (
                  songs.map((song, index) => (
                    <Song key={index} title={song.title} artist={song.artist} album={song.album} link={song.link} />
                  ))
                ) : (
                  <p>No songs found.</p>
                )}

              </>
            )}
          </div>

          <div className="col-start-2 flex flex-col items-center">
            {showAddSong ? (
              <button
                onClick={() => setShowAddSong(false)}
                className="bg-red-500 text-white py-2 px-4 rounded m-50"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setShowAddSong(true)}
                className="bg-black text-white py-2 px-4 rounded m-50"
              >
                Add Song
              </button>
            )}
            {showAddSong && <AddSong onSongAdded={handleSongAdded} />}
          </div>

          <div className="flex flex-col items-center">
            {view === 'playlists' && (
              <>
                <h2 className='text-3xl '>Playlists</h2>
                {error && <p>{error}</p>}
                {playlists.length > 0 ? (
                  playlists.map((playlist, index) => (
                    <PlaylistPreview
                      key={index}
                      title={playlist.title}
                      description={playlist.description}
                      imgSrc={playlist.imgSrc}
                      link={`/playlist/${playlist._id}`}
                    />
                  ))
                ) : (
                  <p>No playlists found.</p>
                )}
              </>
            )}
          </div>

          <div className="col-start-2 flex flex-col items-center">
            {showCreatePlaylist ? (
              <button
                onClick={() => setShowCreatePlaylist(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setShowCreatePlaylist(true)}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Create Playlist
              </button>
            )}
            {showCreatePlaylist && <CreatePlaylist onPlaylistCreated={handlePlaylistCreated} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
