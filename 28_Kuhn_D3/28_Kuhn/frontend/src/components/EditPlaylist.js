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
            <form onSubmit={this.handleSubmit} className="bg-neonyellow-200 rounded mt-2">
                <h3 className='p-1'>Edit Playlist</h3>
                <div className="flex justify-between p-2">
                    <label>Title: </label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} required />
                </div>
                <div className="flex justify-between p-2">
                    <label>Description: </label>
                    <textarea name="description" value={description} onChange={this.handleChange} required />
                </div>
                <div className="flex justify-between p-2">
                    <button type="submit">Save Changes</button>
                </div>
            </form>
        );
    }
}

export default EditPlaylist;
