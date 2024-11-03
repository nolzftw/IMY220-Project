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
    } else {
      try {
        const signupResponse = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: signupName,
            email: signupEmail,
            password: signupPassword,
          }),
        });

        const signupData = await signupResponse.json();

        if (signupResponse.ok) {
          setSignupError('');

          // Perform login after successful signup
          const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: signupEmail,
              password: signupPassword,
            }),
          });

          const loginData = await loginResponse.json();

          if (loginResponse.ok) {
            navigate('/home'); // Redirect to the home page after successful login
          } else {
            setSignupError(loginData.message);
          }
        } else {
          setSignupError(signupData.message);
        }
      } catch (err) {
        setSignupError('Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-4 h-screen w-screen bg-neonyellow-500">
      <div className="col-start-2 row-start-1 row-span-1 flex flex-col items-center justify-center  h-fit">
        <h1 className="mb-2 text-6xl ">Welcome to <b>Apogee</b></h1>
        <p>Discover new music and playlists!</p>
      </div>

      {/* Buttons to show login/signup forms */}
      <div className="col-start-2 row-start-2 grid grid-cols-2 gap-4 justify-center">
        <button onClick={handleShowLogin} className="bg-black text-white py-2 px-4 rounded h-10">Login</button>
        <button onClick={handleShowSignup} className="bg-black text-white py-2 px-4 rounded h-10">Sign Up</button>
      </div>

      {/* Conditionally display login form */}
      {showLogin && (
        <div className="col-start-2 row-start-2 bg-neonyellow-200 p-4 rounded max-w-md mx-auto mt-20 h-fit">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label>Email: </label>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Enter your email" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label>Password: </label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" required className="w-full p-2 border rounded" />
            </div>
            {loginError && <p className="text-red-500">{loginError}</p>}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Login</button>
          </form>
        </div>
      )}

      {/* Conditionally display signup form */}
      {showSignup && (
        <div className="col-start-2 row-start-2 bg-neonyellow-200 p-4 rounded max-w-md mx-auto mt-20 h-fit">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <label>Full Name: </label>
              <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Enter your name" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label>Email: </label>
              <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Enter your email" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label>Password: </label>
              <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Enter your password" required className="w-full p-2 border rounded" />
            </div>
            <div>
              <label>Confirm Password: </label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required className="w-full p-2 mb-4 border rounded" />
            </div>
            {signupError && <p className="text-red-500">{signupError}</p>}
            <button type="submit" className="bg-black text-white py-2 px-4 rounded w-full">Sign Up</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SplashPage;
