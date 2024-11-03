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
      <div className="bg-neonyellow-200 p-4 rounded mb-4 w-full">
        {/* Display the playlist image */}
        <Link to={link}>
          <img src={imgSrc} alt={`${title} playlist cover`} className="w-20 h-20 mb-2" />
        </Link>

        {/* Display playlist details */}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    );
  }
}

export default PlaylistPreview;