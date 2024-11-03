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
        const { title, category, description, imgSrc, hashtags, error, successMessage } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="bg-neonyellow-200 rounded mt-2 p-4">
                <h3 className='p-1'>Create a Playlist</h3>

                {/* Display error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Display success message */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div className="flex justify-between p-2">
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required className="bg-neonyellow-100" />
                </div>
                <div className="flex justify-between p-2">
                    <label>Category: </label>
                    <input type="text" name="category" value={category} onChange={this.handleChange} className="bg-neonyellow-100" />
                </div>
                <div className="flex justify-between p-2">
                    <label>Description: </label>
                    <textarea name="description" value={description} onChange={this.handleChange} required className="bg-neonyellow-100" />
                </div>
                <div className="flex justify-between p-2">
                    <label>Image URL: </label>
                    <input type="text" name="imgSrc" value={imgSrc} onChange={this.handleChange} className="bg-neonyellow-100" />
                </div>
                <div className="flex justify-between p-2">
                    <label>Hashtags (comma-separated): </label>
                    <input type="text" name="hashtags" value={hashtags} onChange={this.handleChange} className="bg-neonyellow-100" />
                </div>
                <div className="flex justify-center pb-2">
                    <button type="submit" className='bg-black text-white rounded p-2'>Create Playlist</button>
                </div>
            </form>
        );
    }
}

export default CreatePlaylist;
