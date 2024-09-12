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
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert('Song added: ' + JSON.stringify(this.state));
    };

    render() {
        const { title, artist, album, duration } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="add-song-form">
                <h3>Add a Song</h3>
                <div>
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Artist: </label>
                    <input type="text" name="artist" value={artist} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Album: </label>
                    <input type="text" name="album" value={album} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Duration: </label>
                    <input type="text" name="duration" value={duration} onChange={this.handleChange} required />
                </div>
                <button type="submit">Add Song</button>
            </form>
        );
    }
}

export default AddSong;
