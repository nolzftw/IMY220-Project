// frontend/src/components/EditPlaylist.js
import React, { Component } from 'react';

class EditPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title || '',
            description: props.description || '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert('Playlist updated: ' + JSON.stringify(this.state));
    };

    render() {
        const { title, description } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="edit-playlist-form">
                <h3>Edit Playlist</h3>
                <div>
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea name="description" value={description} onChange={this.handleChange} required />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        );
    }
}

export default EditPlaylist;
