// src/components/EditProfile.js
import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      bio: props.bio,
      gender: props.gender,
      link: props.link,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, bio, gender, link } = this.state;
    const updatedProfile = { name, bio, gender, link };

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(this.props.email)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully');
        this.props.onProfileUpdate(updatedProfile); // Call the parent component's update handler
      } else {
        alert('Failed to update profile: ' + data.message);
      }
    } catch (err) {
      alert('Failed to update profile: ' + err.message);
    }
  };

  render() {
    const { name, bio, gender, link } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="bg-neonyellow-200 rounded mt-2">
        <h3 className='p-1'>Edit Profile</h3>
        <div className="flex justify-between p-2 " >
          <label>Profile Picture: </label>
          <input type="text" name="link" value={link} onChange={this.handleChange} required className="bg-neonyellow-100 w-52" />
        </div>
        <div className="flex justify-between p-2 ">
          <label>Name: </label>
          <input type="text" name="name" value={name} onChange={this.handleChange} required className="bg-neonyellow-100 w-52" />
        </div>
        <div className="flex justify-between p-2 ">
          <label>Bio: </label>
          <textarea name="bio" value={bio} onChange={this.handleChange} required className="bg-neonyellow-100 w-52" />
        </div>
        <div className="flex justify-between p-2 ">
          <label>Gender: </label>
          <input type="text" name="gender" value={gender} onChange={this.handleChange} required className="bg-neonyellow-100 w-52" />
        </div>
        <div className="flex justify-center pb-2" >
          <button type="submit" className="bg-black text-white p-2 rounded w-30">Save Changes</button>
        </div>
      </form >
    );
  }
}

export default EditProfile;