// frontend/src/components/CreatePlaylist.js
import React, { Component } from 'react';

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert('Playlist created: ' + JSON.stringify(this.state));
    };

    render() {
        const { title, description } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="create-playlist-form">
                <h3>Create a Playlist</h3>
                <div>
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea name="description" value={description} onChange={this.handleChange} required />
                </div>
                <button type="submit">Create Playlist</button>
            </form>
        );
    }
}

export default CreatePlaylist;
