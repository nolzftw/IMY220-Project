// src/components/Song.js
const Song = ({ title, artist, duration }) => (
    <div className="song">
      <h3>{title}</h3>
      <p>{artist}</p>
      <span>{duration}</span>
    </div>
  );
  export default Song;
  