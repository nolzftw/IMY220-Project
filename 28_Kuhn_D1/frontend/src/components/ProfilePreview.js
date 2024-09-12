// frontend/src/components/ProfilePreview.js
import React, { Component } from 'react';

class ProfilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name || 'Unknown User',
      bio: props.bio || 'No bio available',
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100',
    };
  }

  render() {
    const { name, bio, imgSrc } = this.state;

    return (
      <div className="profile-preview">
        {/* Display user image */}
        <img src={imgSrc} alt={`${name}'s profile picture`} style={{ width: '100px', height: '100px' }} />

        {/* Display user details */}
        <h3>{name}</h3>
        <p>{bio}</p>
      </div>
    );
  }
}

export default ProfilePreview;
