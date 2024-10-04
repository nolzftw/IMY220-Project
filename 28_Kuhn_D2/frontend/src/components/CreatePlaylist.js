// frontend/src/components/CreatePlaylist.js
import React, { Component } from 'react';

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            description: '',
            songs: '',  // Comma-separated string for songs
            imgSrc: '',
            hashtags: '',  // Comma-separated string for hashtags
            error: null,
            successMessage: null
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { title, category, description, songs, imgSrc, hashtags } = this.state;

        try {
            const response = await fetch('/api/playlists/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    category,
                    description,
                    imgSrc,
                    hashtags: hashtags.split(',').map(tag => tag.trim()) // Convert to array of hashtags
                }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({
                    title: '',
                    category: '',
                    description: '',
                    songs: '',
                    imgSrc: '',
                    hashtags: '',
                    error: null,
                    successMessage: 'Playlist created successfully!',
                });

                // Trigger the onPlaylistCreated callback to refresh playlists
                if (this.props.onPlaylistCreated) {
                    this.props.onPlaylistCreated();
                }
            } else {
                this.setState({ error: data.message, successMessage: null });
            }
        } catch (err) {
            this.setState({ error: 'Failed to create playlist. Please try again.', successMessage: null });
        }
    };

    render() {
        const { title, category, description, songs, imgSrc, hashtags, error, successMessage } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="create-playlist-form">
                <h3>Create a Playlist</h3>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div>
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Category: </label>
                    <input type="text" name="category" value={category} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea name="description" value={description} onChange={this.handleChange} required />
                </div>
                {/* <div>
                    <label>Songs (comma-separated, e.g., "Song1 - Artist1, Song2 - Artist2"): </label>
                    <input type="text" name="songs" value={songs} onChange={this.handleChange} />
                </div> */}
                <div>
                    <label>Image URL: </label>
                    <input type="text" name="imgSrc" value={imgSrc} onChange={this.handleChange} />
                </div>
                <div>
                    <label>Hashtags (comma-separated): </label>
                    <input type="text" name="hashtags" value={hashtags} onChange={this.handleChange} />
                </div>
                <button type="submit">Create Playlist</button>
            </form>
        );
    }
}

export default CreatePlaylist;
