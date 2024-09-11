// frontend/src/components/PlaylistPreview.js
import React, { Component } from 'react';

class PlaylistPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,            // Playlist title
      songCount: props.songCount,    // Number of songs in the playlist
      description: props.description || 'No description available', // Playlist description or a default message
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100',  // Placeholder image for the playlist
    };
  }

  render() {
    const { title, songCount, description, imgSrc } = this.state;

    return (
      <div className="playlist-preview">
        {/* Display the playlist image */}
        <img src={imgSrc} alt={`${title} playlist cover`} style={{ width: '100px', height: '100px' }} />
        
        {/* Display playlist details */}
        <h3>{title}</h3>
        <p>{songCount} {songCount === 1 ? 'Song' : 'Songs'}</p>
        <p>{description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;