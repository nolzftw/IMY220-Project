// frontend/src/components/ProfilePreview.js
import React from 'react';

const ProfilePreview = ({ name, bio }) => (
  <div className="profile-preview">
    <h3>{name}</h3>
    <p>{bio}</p>
  </div>
);

export default ProfilePreview;
