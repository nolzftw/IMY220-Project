// src/components/Song.js
import React, { Component } from 'react';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      artist: props.artist,
      album: props.album,
      link: props.link,
      imgSrc: props.imgSrc || 'https://via.placeholder.com/100',
      embedUrl: '',
    };
  }

  componentDidMount() {
    const { link } = this.state;

    // Check if the link contains a valid Spotify track link and extract the track ID
    if (link && link.includes('/track/')) {
      const trackId = link.split('/track/')[1]?.split(/[&?]/)[0]; // Extract track ID safely before the first '&' or '?'
      const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

      // Set the embed URL in the state
      this.setState({ embedUrl });
    }
  }

  render() {
    const { title, artist, album, link, imgSrc, embedUrl } = this.state;

    return (
      <div className="song">
        {/* Display the album image, with a placeholder if no image is provided */}
        <img src={imgSrc} alt={`${title} album cover`} style={{ width: '100px', height: '100px' }} />

        {/* Display song details */}
        <h3>{title}</h3>
        <p>Artist: {artist}</p>
        <p>Album: {album}</p>

        {/* Conditionally render the Spotify embed iframe if a valid embed URL exists */}
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            allowtransparency="true"
            allow="encrypted-media"
            className="mb-4"
          ></iframe>
        ) : (
          <p>No valid Spotify link provided.</p>
        )}

        {/* Display the raw link as fallback */}
        <p>Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
      </div>
    );
  }
}

export default Song;
