// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header.js';
import ProfilePreview from '../components/ProfilePreview.js';
import EditProfile from '../components/EditProfile.js';

const ProfilePage = () => {
  const { email: routeEmail } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [sessionEmail, setSessionEmail] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [mutualFriends, setMutualFriends] = useState(false);

  useEffect(() => {
    fetchSessionUser();
  }, []);

  useEffect(() => {
    if (sessionEmail) {
      if (!routeEmail) {
        navigate(`/profile/${sessionEmail}`);
      } else {
        fetchProfile(routeEmail);
        if (routeEmail === sessionEmail) {
          fetchFriends(routeEmail);
        } else {
          checkMutualFriendship(routeEmail);
        }
      }
    }
  }, [sessionEmail, routeEmail, navigate]);

  const fetchSessionUser = async () => {
    try {
      const response = await fetch('/api/login/session', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setSessionEmail(data._id);
      } else {
        setError(data.message || 'User is not logged in');
      }
    } catch (err) {
      setError('Failed to fetch session user.');
    }
  };

  const fetchProfile = async (email) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setIsFriend(data.friends && data.friends.includes(sessionEmail));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch profile data.');
    }
  };

  const checkMutualFriendship = async (email) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(sessionEmail)}/mutual/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setMutualFriends(data.mutualFriends);
        if (data.mutualFriends) {
          fetchFriends(email);
        }
      } else {
        setMutualFriends(false);
      }
    } catch (err) {
      setMutualFriends(false);
    }
  };

  const fetchFriends = async (email) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(email)}/friends`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const friendsEmails = await response.json();
      if (response.ok) {
        const friendsProfiles = await Promise.all(
          friendsEmails.map(async (friendEmail) => {
            const friendResponse = await fetch(`/api/users/${encodeURIComponent(friendEmail)}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });
            const friendData = await friendResponse.json();
            return friendData;
          })
        );
        setFriends(friendsProfiles);
      } else {
        setFriends([]);
      }
    } catch (err) {
      setFriends([]);
    }
  };

  const sendFriendRequest = async () => {
    try {
      const response = await fetch(`/api/users/${sessionEmail}/addFriend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friends: [routeEmail] }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Friend request sent');
        setIsFriend(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send friend request.');
    }
  };

  const unfriendUser = async () => {
    try {
      const response = await fetch(`/api/users/${sessionEmail}/removeFriend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friends: routeEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Unfriended successfully');
        setIsFriend(false);
        setMutualFriends(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to unfriend user.');
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setEditMode(false);
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        const emailToDelete = routeEmail || sessionEmail;
        const response = await fetch(`/api/users/${encodeURIComponent(emailToDelete)}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          alert('Profile deleted successfully.');
          navigate('/');
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to delete profile.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        alert('Logout successful');
        navigate('/'); // Redirect to the home or login page after logout
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to logout.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-3 auto-rows-max bg-charcoal overflow-auto min-h-screen">
      <div className="col-start-2 row-start-1 flex flex-col items-center justify-center h-20 ">
        <Link to="/home"><h1 className='text-neonyellow-500  text-6xl'>Apogee</h1></Link>
        <h2 className='mt-2 pb-2'>Profile</h2>
      </div>
      <nav className="col-start-1 col-end-4 row-start-2 h-20">
        <Header />
      </nav>

      <div className="col-start-3 row-start-3">
        <button onClick={handleLogout} className="bg-black text-white py-2 px-4 rounded w-30">Logout</button>
      </div>

      <div className="row-start-4 col-start-1">
        <aside className="">
          {!editMode ? (
            <ProfilePreview name={profile.name} bio={profile.bio} gender={profile.gender} link={profile.link} />
          ) : (
            <EditProfile
              name={profile.name}
              bio={profile.bio}
              gender={profile.gender}
              link={profile.link}
              email={routeEmail || sessionEmail}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
          {routeEmail && routeEmail !== sessionEmail && (
            <div>
              {isFriend ? (
                <button onClick={unfriendUser} className="bg-red-500 text-white py-2 px-4 rounded h-10">
                  Unfriend
                </button>
              ) : (
                <button onClick={sendFriendRequest} className="bg-black text-white py-2 px-4 rounded h-10">
                  Send Friend Request
                </button>
              )}
            </div>
          )}
          {routeEmail === sessionEmail && (
            <div>
              <button onClick={() => setEditMode(!editMode)} className="bg-black text-white py-2 px-4 rounded h-10">
                {editMode ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button onClick={handleDeleteProfile} className="bg-red-500 text-white py-2 px-4 rounded h-10">
                Delete Profile
              </button>
            </div>
          )}
        </aside>
        
      </div>
      <section className="col-start-3 row-start-4">
          <h2 className='text-2xl'>Friends</h2>
          {routeEmail === sessionEmail || mutualFriends ? (
            <ul>
              {friends.length > 0 ? (
                friends.map((friend, index) => (
                  <li key={index} className="hover:text-neonyellow-500">
                    <Link to={`/profile/${friend._id}`}>{friend.name}</Link>
                  </li>
                ))
              ) : (
                <p>No friends found.</p>
              )}
            </ul>
          ) : (
            <p>You must be mutual friends to see the friends list.</p>
          )}
        </section>
    </div>
  );
};

export default ProfilePage;