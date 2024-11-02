// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';  // Add useParams for URL parameters
import Header from '../components/Header.js';
import ProfilePreview from '../components/ProfilePreview.js';
import EditProfile from '../components/EditProfile.js';

const ProfilePage = () => {
  const { email: routeEmail } = useParams();  // Get the email from the URL parameters if present
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);  // State to store profile data
  const [friends, setFriends] = useState([]);  // State to store friends list
  const [editMode, setEditMode] = useState(false);  // State to toggle edit mode
  const [error, setError] = useState(null);  // State to store any errors
  const [sessionEmail, setSessionEmail] = useState(null);  // State to store the email of the session user

  // Fetch the logged-in user's email if it's not in the URL (viewing own profile)
  const fetchSessionUser = async () => {
    try {
      const response = await fetch('/api/login/session');
      const data = await response.json();
      if (response.ok) {
        setSessionEmail(data._id);  // Set the session email to the logged-in user's email
      } else {
        setError(data.message || 'User is not logged in');
      }
    } catch (err) {
      setError('Failed to fetch session user.');
    }
  };

  // Redirect to own profile if no email in URL and session email is available
  useEffect(() => {
    if (!routeEmail && sessionEmail) {
      navigate(`/profile/${sessionEmail}`);  // Redirect to the user's own profile
    }
  }, [sessionEmail, routeEmail, navigate]);

  // Fetch the user profile data (either from route email or session email)
  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`/api/users/${email}`);
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch profile data.');
    }
  };

  // // Fetch the user's friends list (either from route email or session email)
  // const fetchFriends = async (email) => {
  //   try {
  //     const response = await fetch(`/api/users/${email}/friends`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setFriends(data);
  //     } else {
  //       setError(data.message);
  //     }
  //   } catch (err) {
  //     setError('Failed to fetch friends list.');
  //   }
  // };

  // Initially fetch session user if no route email exists
  useEffect(() => {
    if (!routeEmail) {
      fetchSessionUser();
    } else {
      fetchProfile(routeEmail);  // Fetch profile using the route email (for other profiles)
      // fetchFriends(routeEmail);
    }
  }, [routeEmail]);

  // When sessionEmail is fetched, load the session user's profile
  useEffect(() => {
    if (sessionEmail && !routeEmail) {
      fetchProfile(sessionEmail);  // Fetch your own profile using the session email
      // fetchFriends(sessionEmail);
    }
  }, [sessionEmail]);

  // Handle profile update
  const handleProfileUpdate = async (updatedProfile) => {
    try {
      const emailToUpdate = routeEmail || sessionEmail;  // Use the correct email (session or route)
      const response = await fetch(`/api/users/${emailToUpdate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile), // Update profile fields
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(updatedProfile);  // Update the profile in state
        setEditMode(false);  // Exit edit mode
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const emailToDelete = routeEmail || sessionEmail;  // Use the correct email (session or route)
        const response = await fetch(`/api/users/${emailToDelete}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          alert('Profile deleted successfully.');
          navigate('/');  // Redirect to the homepage
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to delete profile.');
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;  // Show loading message while fetching data
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>{profile.name}'s Profile</h1>
        <nav>
          <Header />
          <Link to="/"><button style={{ marginLeft: 'auto' }}>Logout</button></Link>
        </nav>
      </header>

      <div className="profile-layout">
        <aside className="user-info">
          {!editMode ? (
            <ProfilePreview name={profile.name} bio={profile.bio} gender={profile.gender} />
          ) : (
            <EditProfile 
              name={profile.name} 
              bio={profile.bio} 
              gender={profile.gender} 
              onProfileUpdate={handleProfileUpdate} 
            />
          )}
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <button onClick={handleDeleteProfile} style={{ color: 'red' }}>
            Delete Profile
          </button>
        </aside>

        <main className="profile-details">
          <section className="friends-list">
            <h2>Friends</h2>
            <ul>
              {friends.length > 0 ? (
                friends.map((friend, index) => (
                  <li key={index}>{friend}</li>
                ))
              ) : (
                <p>No friends found.</p>
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
