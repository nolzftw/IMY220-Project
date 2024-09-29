// frontend/src/components/PlaylistPreview.js
import React, { Component } from 'react';

class PlaylistPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      runTime: props.runTime,
      description: props.description || 'No description available',
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100',
    };
  }

  render() {
    const { title, runTime, description, imgSrc } = this.state;

    return (
      <div className="playlist-preview">
        {/* Display the playlist image */}
        <img src={imgSrc} alt={`${title} playlist cover`} style={{ width: '100px', height: '100px' }} />

        {/* Display playlist details */}
        <h3>{title}</h3>
        <p>{runTime} {runTime === 1 ? 'Song' : 'Songs'}</p>
        <p>{description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;


