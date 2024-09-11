// src/components/Song.js
import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      artist: props.artist,
      album: props.album,
      duration: props.duration,  // Add duration if needed
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100' // Use placeholder if no image is provided
    };
  }

  render() {
    const { title, artist, album, duration, imgSrc } = this.state;

    return (
      <div className="song">
        {/* Display the album image, with a placeholder if no image is provided */}
        <img src={imgSrc} alt={`${title} album cover`} style={{ width: '100px', height: '100px' }} />
        
        {/* Display song details */}
        <h3>{title}</h3>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>
        <p>Duration: {duration}</p>
      </div>
    );
  }
}

export default Song;