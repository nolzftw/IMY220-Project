// frontend/src/components/ProfilePreview.js
import React, { Component } from 'react';

class ProfilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      bio: props.bio,
      gender: props.gender,
      imgSrc: props.link  
    };
    this.id = props.id;
  }

  render() {
    const { name, bio, imgSrc, gender } = this.state;

    return (
      <div className="profile-preview">
        {/* Display user image */}
        <img src={imgSrc} alt={`${name}'s profile picture`} style={{ width: '300px', height: '300px' }} />

        {/* Display user details */}
        <h3>{name}</h3>
        <p>{gender}</p>
        <p>{bio}</p>
      </div>
    );
  }
}

export default ProfilePreview;
