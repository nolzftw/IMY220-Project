// frontend/src/components/PlaylistPreview.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description || 'No description available',
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100',
    };
  }

  render() {
    const { title, description, imgSrc } = this.state;
    const { link } = this.props; // Get the link prop

    return (
      <div className="playlist-preview">
        {/* Display the playlist image */}
        <Link to={link}>
          <img src={imgSrc} alt={`${title} playlist cover`} style={{ width: '100px', height: '100px' }} />
        </Link>

        {/* Display playlist details */}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;