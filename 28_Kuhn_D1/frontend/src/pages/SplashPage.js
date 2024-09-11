// frontend/src/pages/SplashPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SplashPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false); // Hide signup if it's visible
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false); // Hide login if it's visible
  };

  return (
    <div>
      <h1>Welcome to Apogee</h1>
      <p>Discover new music and playlists!</p>

      {/* Buttons to show login/signup forms */}
      <div>
        <button onClick={handleShowLogin}>Login</button>
        <button onClick={handleShowSignup} style={{ marginLeft: '10px' }}>Sign Up</button>
      </div>

      {/* Always show the content, and conditionally display the forms */}
      <div style={{ marginTop: '20px' }}>
        {showLogin && (
          <div>
            <h2>Login</h2>
            <form>
              <div>
                <label>Email: </label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              {/* <Link to="/home"> */}
                <button type="submit">Login</button>
              {/* </Link> */}
            </form>
          </div>
        )}

        {showSignup && (
          <div>
            <h2>Sign Up</h2>
            <form>
              <div>
                <label>Email: </label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div>
                <label>Password: </label>
                <input type="password" placeholder="Enter your password" required />
              </div>
              <div>
                <label>Confirm Password: </label>
                <input type="password" placeholder="Confirm your password" required />
              </div>
              {/* <Link to="/home"> */}
                <button type="submit">Sign Up</button>
              {/* </Link> */}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashPage;
