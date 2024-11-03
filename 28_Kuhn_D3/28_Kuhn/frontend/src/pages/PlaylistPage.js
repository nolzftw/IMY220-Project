// src/pages/PlaylistPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirection
import Header from '../components/Header.js';
import AddToPlaylist from '../components/AddToPlaylist.js';

const PlaylistPage = () => {
  const { id } = useParams(); // Get the playlist ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [playlist, setPlaylist] = useState(null); // State to store playlist data
  const [error, setError] = useState(null); // State to store any errors
  const [editMode, setEditMode] = useState(false); // State to handle edit mode
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    imgSrc: '',
    songs: ''
  });

  const [sessionEmail, setSessionEmail] = useState(null); // State to store session email

  useEffect(() => {
    fetchSessionUser();
    fetchPlaylist();
  }, []);

  // Fetch the session user data
  const fetchSessionUser = async () => {
    try {
      const response = await fetch('/api/login/session', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSessionEmail(data._id);
      } else {
        setError(data.message || 'User is not logged in');
      }
    } catch (err) {
      setError('Failed to fetch session user.');
    }
  };

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
    <div className="grid grid-cols-1 auto-rows-max bg-charcoal overflow-auto min-h-screen">
      <div className="row-start-1 flex flex-col items-center justify-center h-20 ">
        <Link to="/home"><h1 className='text-neonyellow-500  text-6xl'>Apogee</h1></Link>
        <h2 className='mt-2 pb-2'>Playlist</h2>  {/* Display the playlist title */}
      </div>
      <nav className="row-start-2 h-40">
        <Header id={sessionEmail} />
      </nav>

      <div className="row-start-3 grid grid-cols-3">
        {/* Left Section: Playlist Info */}
        <aside className="col-start-1">
          <img src={playlist.imgSrc} alt="Playlist Cover" style={{ width: '150px', height: '150px' }} />
          <h2>{playlist.title}</h2>
          <h4>Category: {playlist.category}</h4>
          <h4>Description: {playlist.description}</h4>
          <h4>Hashtags: {playlist.hashtags}</h4>
        </aside>

        {/* Center Section: Song List */}
        <main className="col-start-3">
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
        </main>

        <div className='col-start-2 row-start-1 flex flex-col items-center justify-center'>
          {/* Middle Section: AddToPlaylist Component */}
          <div className="">
            {showAddToPlaylist ? (
              <button
                onClick={() => setShowAddToPlaylist(false)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setShowAddToPlaylist(true)}
                className="bg-black text-white py-2 px-4 rounded"
              >
                Add to Playlist
              </button>
            )}
            {showAddToPlaylist && <AddToPlaylist playlistId={id} onSongAdded={fetchPlaylist} />}
          </div>


          <div>
            {/* Toggle Edit Mode */}
            <button onClick={() => setEditMode(!editMode)} className="bg-black text-white py-2 px-4 rounded h-10">
              {editMode ? 'Cancel Edit' : 'Edit Playlist'}
            </button>

            {/* Edit Form - Show if in Edit Mode */}
            {editMode && (
              <form onSubmit={handleEditSubmit} className="bg-neonyellow-200 rounded mt-2">
                <div className="flex justify-between p-2">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between p-2">
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between p-2">
                  <label>Hashtags:</label>
                  <input
                    type="text"
                    name="hashtags"
                    value={formData.hashtags}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between p-2">
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="imgSrc"
                    value={formData.imgSrc}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between p-2">
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            )}
          </div>

          <div>
            {/* Delete Playlist Button */}
            <button onClick={handleDeletePlaylist} className="bg-red-500 text-white py-2 px-4 rounded h-10">
              Delete Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
