import React, { Component } from 'react';

class AddToPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songTitle: '',
            songArtist: '',
            error: null,
            successMessage: null,
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { songTitle, songArtist } = this.state;
        const { playlistId, onSongAdded } = this.props; // Receive playlistId as prop

        try {
            // API call to add song to the playlist
            const response = await fetch(`/api/playlists/${playlistId}/addSong`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: songTitle.trim(),
                    artist: songArtist.trim(),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                this.setState({
                    songTitle: '',
                    songArtist: '',
                    successMessage: 'Song added to playlist successfully!',
                    error: null,
                });
                onSongAdded(); // Callback to refetch playlist data
            } else {
                this.setState({ error: data.message, successMessage: null });
            }
        } catch (err) {
            this.setState({ error: 'Failed to add song to playlist. Please try again.', successMessage: null });
        }
    };

    render() {
        const { songTitle, songArtist, error, successMessage } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="add-to-playlist-form">
                <h3>Add a Song to this Playlist</h3>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div>
                    <label>Song Title: </label>
                    <input type="text" name="songTitle" value={songTitle} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Artist: </label>
                    <input type="text" name="songArtist" value={songArtist} onChange={this.handleChange} required />
                </div>
                
                <button type="submit">Add to Playlist</button>
            </form>
        );
    }
}

export default AddToPlaylist;
