// frontend/src/components/EditProfile.js
import React, { Component } from 'react';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name || '',
            bio: props.bio || '',
            gender: props.gender || '',
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        alert('Profile updated: ' + JSON.stringify(this.state));
    };

    render() {
        const { name, bio, gender } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="edit-profile-form">
                <h3>Edit Profile</h3>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" value={name} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Bio: </label>
                    <textarea name="bio" value={bio} onChange={this.handleChange} required />
                </div>
                <div>
                    <label>Gender: </label>
                    <input type="text" name="gender" value={gender} onChange={this.handleChange} required />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        );
    }
}

export default EditProfile;
