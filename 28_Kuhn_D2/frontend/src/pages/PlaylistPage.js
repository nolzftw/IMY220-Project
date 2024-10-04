import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import Header from '../components/Header.js';
import AddToPlaylist from '../components/AddToPlaylist.js';

const PlaylistPage = () => {
  const { id } = useParams(); // Get the playlist ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [playlist, setPlaylist] = useState(null); // State to store playlist data
  const [error, setError] = useState(null); // State to store any errors
  const [editMode, setEditMode] = useState(false); // State to handle edit mode
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imgSrc: '',
    songs: ''
  });

  // Fetch the playlist data when the component mounts
  const fetchPlaylist = async () => {
    try {
      const response = await fetch(`/api/playlists/${id}`); // Fetch playlist from the backend
      const data = await response.json();
      if (response.ok) {
        setPlaylist(data); // Store the playlist data in state
        setFormData({
          title: data.title,
          category: data.category || '',
          description: data.description || '',
          imgSrc: data.imgSrc || '',
          songs: data.songs ? data.songs.join(', ') : '' // Join songs for editing
        });
      } else {
        setError(data.message); // Handle error if any
      }
    } catch (err) {
      setError('Failed to fetch playlist');
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]); // Run this effect when the `id` changes

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/playlists/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          hashtags: formData.hashtags,
          imgSrc: formData.imgSrc,
        })
      });

      const data = await response.json();
      if (response.ok) {
        setEditMode(false); // Exit edit mode after successful update
        fetchPlaylist(); // Refresh playlist data
      } else {
        setError(data.message); // Display error message
      }
    } catch (err) {
      setError('Failed to update playlist');
    }
  };

  const handleDeletePlaylist = async () => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      try {
        const response = await fetch(`/api/playlists/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
          alert('Playlist deleted successfully.');
          navigate('/'); // Redirect to the homepage or any other route after deletion
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to delete playlist.');
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!playlist) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  return (
    <div className="playlist-page">
      {/* Navigation */}
      <header className="playlist-header">
        <h1>{playlist.title}</h1>  {/* Display the playlist title */}
        <nav>
          <Header id={id} />
        </nav>
      </header>

      <div className="playlist-layout">
        {/* Left Section: Playlist Info */}
        <aside className="playlist-info">
          <img src={playlist.imgSrc} alt="Playlist Cover" style={{ width: '150px', height: '150px' }} />
          <h2>{playlist.title}</h2>
          <h4>Category: {playlist.category}</h4>
          <h4>Description: {playlist.description}</h4>
          <h4>Hashtags: {playlist.hashtags}</h4>
        </aside>

        {/* Center Section: Song List */}
        <main className="playlist-songs">
          {playlist.songs.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                {playlist.songs.map((song, index) => {
                  const trackId = song.link ? song.link.split('/track/')[1]?.split('?')[0] : null;
                  const embedUrl = trackId ? `https://open.spotify.com/embed/track/${trackId}` : null;

                  return (
                    <tr key={index}>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>{song.album}</td>
                      <td>
                        {embedUrl ? (
                          <iframe
                            src={embedUrl}
                            width="300"
                            height="80"
                            allowtransparency="true"
                            allow="encrypted-media"
                          ></iframe>
                        ) : (
                          <p>No valid Spotify link</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No songs found in this playlist.</p>
          )}

          {/* AddToPlaylist component */}
          <AddToPlaylist playlistId={id} onSongAdded={fetchPlaylist} />

          {/* Toggle Edit Mode */}
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel Edit' : 'Edit Playlist'}
          </button>

          {/* Edit Form - Show if in Edit Mode */}
          {editMode && (
            <form onSubmit={handleEditSubmit}>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imgSrc"
                  value={formData.imgSrc}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          )}

          {/* Delete Playlist Button */}
          <button onClick={handleDeletePlaylist} style={{ color: 'red' }}>
            Delete Playlist
          </button>
        </main>
      </div>
    </div>
  );
};

export default PlaylistPage;
