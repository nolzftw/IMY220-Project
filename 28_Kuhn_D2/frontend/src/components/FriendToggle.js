import React, { useState, useEffect } from 'react';

const FriendToggle = ({ userEmail, isFriend, onUpdate }) => {
  const [error, setError] = useState(null);

  const handleAddFriend = async () => {
    try {
      const response = await fetch(`/api/users/${userEmail}/addFriend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friends: [userEmail] }),
      });
      const data = await response.json();
      if (response.ok) {
        onUpdate();  // Call parent function to update friends state
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to add friend.');
    }
  };

  const handleRemoveFriend = async () => {
    try {
      const response = await fetch(`/api/users/${userEmail}/removeFriend`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friends: [userEmail] }),
      });
      const data = await response.json();
      if (response.ok) {
        onUpdate();  // Call parent function to update friends state
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to remove friend.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {isFriend ? (
        <button onClick={handleRemoveFriend}>Unfriend</button>
      ) : (
        <button onClick={handleAddFriend}>Add Friend</button>
      )}
    </div>
  );
};

export default FriendToggle;
