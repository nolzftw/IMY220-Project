// frontend/src/pages/PlaylistPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.js';
import Song from '../components/Song.js';

const playlistSongsArr = [
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20" },
  { title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35" },
  { title: "In Your Eyes", artist: "The Weeknd", album: "After Hours", duration: "3:58" },
];

const PlaylistPage = () => {
  const { id } = useParams();

  return (
    <div className="playlist-page">
      {/* Navigation */}
      <header className="playlist-header">
        <h1>Playlist {id}</h1>  {/* Display the playlist ID */}
        <nav>
          <Header id={id} />
        </nav>
      </header>

      <div className="playlist-layout">
        {/* Left Section: Playlist Info */}
        <aside className="playlist-info">
          <img src="https://via.placeholder.com/150" alt="Playlist Cover" />
          <h2>Playlist Title (Playlist {id})</h2>  {/* Use dynamic ID for playlist title */}
          <p>Total duration: 60:00</p>
        </aside>

        {/* Center Section: Song List */}
        <main className="playlist-songs">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
              {playlistSongsArr.map((song, index) => (
                <tr key={index}>
                  <td>
                    <Song title={song.title} artist={song.artist} album={song.album} duration={song.duration} />
                  </td>
                  <td>{song.album}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Right Section: Artist Info */}
        <aside className="artist-info">
          <img src="https://via.placeholder.com/100" alt="Artist" />
          <h2>Artist</h2>
          <p>Age: 30</p>
          <p>Location: Los Angeles</p>
          <p>Bio: Artist {id}'s bio (dynamic)</p>

          <h3>Similar Artists</h3>
          <ul>
            <li>Artist 1</li>
            <li>Artist 2</li>
            <li>Artist 3</li>
            <li>Artist 4</li>
            <li>Artist 5</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default PlaylistPage;
