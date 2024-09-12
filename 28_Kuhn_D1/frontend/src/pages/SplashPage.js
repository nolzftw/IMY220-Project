import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
    setLoginError(''); 
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
    setSignupError(''); 
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address.');
    } else if (loginPassword.length < 6) {
      setLoginError('Password must be at least 6 characters long.');
    } else {
      setLoginError('');
      navigate('/home');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupEmail.includes('@')) {
      setSignupError('Please enter a valid email address.');
    } else if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
    } else if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match.');
    } else {
      setSignupError('');
      navigate('/home');
    }
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

      {/* Conditionally display login form */}
      {showLogin && (
        <div style={{ marginTop: '20px' }}>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div>
              <label>Email: </label>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" required />
            </div>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      )}

      {/* Conditionally display signup form */}
      {showSignup && (
        <div style={{ marginTop: '20px' }}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div>
              <label>Email: </label>
              <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Enter your password" required />
            </div>
            <div>
              <label>Confirm Password: </label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
            </div>
            {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SplashPage;
