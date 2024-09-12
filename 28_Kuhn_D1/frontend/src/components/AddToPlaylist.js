// frontend/src/components/AddToPlaylist.js
import React, { Component } from 'react';

class AddToPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songTitle: '',
            selectedPlaylist: '',
            playlists: ['My Playlist 1', 'Chill Mix', 'Party Hits'], // Example playlist options
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert(`Added "${this.state.songTitle}" to ${this.state.selectedPlaylist}`);
    };

    render() {
        const { songTitle, selectedPlaylist, playlists } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="add-to-playlist-form">
                <h3>Add a Song to a Playlist</h3>
                <div>
                    <label>Song Title: </label>
                    <input type="text" name="songTitle" value={songTitle} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Select Playlist: </label>
                    <select name="selectedPlaylist" value={selectedPlaylist} onChange={this.handleChange} required>
                        <option value="">Select a Playlist</option>
                        {playlists.map((playlist, index) => (
                            <option key={index} value={playlist}>{playlist}</option>
                        ))}
                    </select>
                </div>
            </form>

        );
    }
}

export default AddToPlaylist;