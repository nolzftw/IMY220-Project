import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupName, setSignupName] = useState('');
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) {
      setLoginError('Please enter a valid email address.');
    } else if (loginPassword.length < 6) {
      setLoginError('Password must be at least 6 characters long.');
    } else {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoginError('');
          navigate('/home'); // Redirect to the home page after successful login
        } else {
          setLoginError(data.message);
        }
      } catch (err) {
        setLoginError('Failed to log in. Please try again.');
      }
    }
  };


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupName.trim() === '') {
      setSignupError('Please enter your name.');
    } else if (!signupEmail.includes('@')) {
      setSignupError('Please enter a valid email address.');
    } else if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
    } else if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match.');
    } else {
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: signupEmail,
            password: signupPassword,
            name: signupName,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setSignupError('');
          navigate('/'); // Redirect to the home page after successful signup
        } else {
          setSignupError(data.message);
        }
      } catch (err) {
        setSignupError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1 className="border-black">Welcome to Apogee</h1>
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
              <label>Full Name: </label>
              <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Enter your name" required />
            </div>
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
