// frontend/src/components/AddSong.js
import React, { Component } from 'react';

class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            artist: '',
            album: '',
            duration: '',
            link: '',  // Optional: Add a link field for song (e.g., Spotify link)
            error: null,  // State to handle errors
            successMessage: null  // State to handle success message
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        const { title, artist, album, duration, link } = this.state;

        try {
            const response = await fetch('/api/song/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    artist,
                    album,
                    duration,
                    link
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success: show a message, reset form, and trigger the onSongAdded callback
                this.setState({
                    title: '',
                    artist: '',
                    album: '',
                    duration: '',
                    link: '',
                    error: null,
                    successMessage: 'Song added successfully!',
                });

                // Call the onSongAdded callback if it exists
                if (this.props.onSongAdded) {
                    this.props.onSongAdded();
                }
            } else {
                // Error: set error state
                this.setState({ error: data.message, successMessage: null });
            }
        } catch (err) {
            // Handle network error
            this.setState({ error: 'Failed to add song. Please try again.', successMessage: null });
        }
    };

    render() {
        const { title, artist, album, duration, link, error, successMessage } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="bg-neonyellow-200 rounded mt-2">
                <h3 className='p-1'>Add a Song</h3>

                {/* Display error message */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Display success message */}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <div className="flex justify-between p-2">
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required className="bg-neonyellow-100"/>
                </div>
                <div className="flex justify-between p-2">
                    <label>Artist: </label>
                    <input type="text" name="artist" value={artist} onChange={this.handleChange} required className="bg-neonyellow-100"/>
                </div>
                <div className="flex justify-between p-2">
                    <label>Album: </label>
                    <input type="text" name="album" value={album} onChange={this.handleChange} required className="bg-neonyellow-100"/>
                </div>
                <div className="flex justify-between p-2">
                    <label>Duration: </label>
                    <input type="text" name="duration" value={duration} onChange={this.handleChange} required className="bg-neonyellow-100"/>
                </div>
                <div className="flex justify-between p-2 ">
                    <label>Link (optional): </label>
                    <input type="text" name="link" value={link} onChange={this.handleChange} className="bg-neonyellow-100"/>
                </div>
                <div className="flex justify-center pb-2" >
                    <button type="submit" className='bg-black text-white rounded p-2'>Add Song</button>
                </div>
            </form>
        );
    }
}

export default AddSong;
