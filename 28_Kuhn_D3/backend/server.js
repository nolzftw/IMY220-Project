// Nolan Kuhn u214337883
const express = require('express');
const session = require('express-session');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = "mongodb+srv://u21437883:Junetkuhn!1324@imy220.gpxcf.mongodb.net/?retryWrites=true&w=majority&tls=true";

const client = new MongoClient(url);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Set up sessions
app.use(session({
  secret: 'IMY220ProjectFinal', // Change this to a strong secret in production
  resave: false,             // Don't save session if unmodified
  saveUninitialized: true,   // Save uninitialized sessions
  cookie: { secure: false }  // Set to true if you're using HTTPS
}));

// Function to establish the MongoDB connection
async function main() {
  try {
    // Create Connection
    await client.connect();
    console.info("Connected to MongoDB");

    const db = client.db("Apogee");
    const usersCollection = db.collection("users");
    const playlistsCollection = db.collection("playlists");
    const songsCollection = db.collection("songs");

    // ========== Authentication API Request (Login, Signup, Logout) ==========
    // User Signup
    app.post('/api/signup', async (req, res) => {
      const { name, email, password } = req.body;

      try {
        // Check if a user with the given email (_id) already exists
        const existingUser = await usersCollection.findOne({ _id: email });

        if (existingUser) {
          // If the user exists, send an error response
          return res.status(400).json({ message: 'Email is already taken' });
        }

        // If user doesn't exist, create a new user with email as _id
        const newUser = {
          _id: email,
          name,
          gender: '',
          bio: '',
          email,
          password,
          friends: []
        };

        // Insert the new user into the users collection
        await usersCollection.insertOne(newUser);

        // Respond with success
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (err) {
        // Handle any errors
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Server error, please try again later' });
      }
    });

    // User Login
    app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await usersCollection.findOne({ _id: email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Store user information in the session
        req.session.user = {
          _id: user._id,
          name: user.name
        };

        res.status(200).json({ message: 'Login successful', user: req.session.user });
      } catch (err) {
        res.status(500).json({ message: 'Server error, please try again later' });
      }
    });

    // User Logout
    app.post('/api/logout', (req, res) => {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
      });
    });

    // ========== Profile API Request (View, Edit, View someone elses, Delete your profile) ==========

    // Get User Profile (view your own profile or someone else's)
    app.get('/api/users/:email', async (req, res) => {
      const email = req.params.email;

      try {
        const user = await usersCollection.findOne({ _id: email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // If the session user is viewing their own profile
        if (req.session.user && req.session.user._id === email) {
          // Return the user's profile, but mask the password
          const userProfile = {
            _id: user._id,
            name: user.name,
            gender: user.gender,
            bio: user.bio,
            email: user.email,
            password: user.password
          };
          return res.status(200).json(userProfile);
        } else {
          // If the session user is viewing someone else's profile, hide email and password
          const publicProfile = {
            _id: user._id,
            name: user.name,
            gender: user.gender,
            bio: user.bio,
            // Do not include email and password in the response
          };
          return res.status(200).json(publicProfile);
        }
      } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
      }
    });

    // Get Actual Password for session owner
    app.get('/api/users/:email/password', async (req, res) => {
      const email = req.params.email;

      // Only allow the session user to access their own password
      if (!req.session.user || req.session.user._id !== email) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      try {
        const user = await usersCollection.findOne({ _id: email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Return the actual password to the session owner
        res.status(200).json({ password: user.password });
      } catch (err) {
        res.status(500).json({ message: 'Error fetching password' });
      }
    });


    // Update User Profile(edit)
    app.patch('/api/users/:email', async (req, res) => {
      const email = req.params.email;
      const { name, gender, bio, password } = req.body;

      try {
        const updateFields = {};
        if (name) updateFields.name = name;
        if (gender) updateFields.gender = gender;
        if (bio) updateFields.bio = bio;
        if (password) updateFields.password = password;

        const result = await usersCollection.updateOne(
          { _id: email },
          { $set: updateFields }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error updating profile' });
      }
    });

    // Delete User Profile
    app.delete('/api/users/:email', async (req, res) => {
      const { email } = req.params;

      // Check if the session user is trying to delete their own profile
      if (!req.session.user || req.session.user._id !== email) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      try {
        // Delete the user from the users collection
        const result = await usersCollection.deleteOne({ _id: email });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Optional: You can also delete or reassign the user's playlists
        await playlistsCollection.deleteMany({ ownerId: email }); // Delete all playlists owned by this user

        // Destroy the session after deletion
        req.session.destroy((err) => {
          if (err) {
            return res.status(500).json({ message: 'Error logging out after deletion' });
          }

          // Send a response to inform the client that the user should be redirected to the splash page
          res.status(200).json({ message: 'User profile deleted successfully. Redirecting to splash page.' });
        });
      } catch (err) {
        console.error('Error deleting profile:', err);
        res.status(500).json({ message: 'Server error, please try again later' });
      }
    });

    // ========== Friend / Unfriend API Request ==========
    // Add Friend
    app.patch('/api/users/:email/addFriend', async (req, res) => {
      const { email } = req.params; // Email of the user who wants to add a friend
      const friendEmail = req.body.friends[0]; // The friend to be added

      // Ensure the current session user is the one making the request
      if (!req.session.user || req.session.user._id !== email) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      try {
        // Check if the friend user exists
        const friend = await usersCollection.findOne({ _id: friendEmail });
        if (!friend) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        // Update the user's friend list (add friendEmail to the friends array)
        const result = await usersCollection.updateOne(
          { _id: email },
          { $addToSet: { friends: friendEmail } } // $addToSet ensures no duplicates
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `${friendEmail} added to friends list` });
      } catch (err) {
        res.status(500).json({ message: 'Error adding friend' });
      }
    });

    // Remove Friend
    app.patch('/api/users/:email/removeFriend', async (req, res) => {
      const { email } = req.params; // Email of the user who wants to remove a friend
      const friendEmail = req.body.friends; // The friend to be removed is in "friends" field

      // Ensure the current session user is the one making the request
      if (!req.session.user || req.session.user._id !== email) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      try {
        // Check if the friend user exists
        const friend = await usersCollection.findOne({ _id: friendEmail });
        if (!friend) {
          return res.status(404).json({ message: 'Friend not found' });
        }

        // Update the user's friend list (remove friendEmail from the friends array)
        const result = await usersCollection.updateOne(
          { _id: email },
          { $pull: { friends: friendEmail } } // $pull removes the friend from the array
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `${friendEmail} removed from friends list` });
      } catch (err) {
        res.status(500).json({ message: 'Error removing friend' });
      }
    });

    // // Get User Friends
    // app.get('/api/users/:email/friends', async (req, res) => {
    //   const { email } = req.params; // Email of the user whose friends we want to fetch

    //   try {
    //     // Find the user by email
    //     const user = await usersCollection.findOne({ _id: email });

    //     // if (!user || !user.friends || user.friends.length === 0) {
    //     //   return res.status(404).json({ message: 'No friends found' });
    //     // }

    //     // Fetch the details of each friend (email -> name)
    //     const friends = await usersCollection
    //       .find({ _id: { $in: user.friends } })
    //       .project({ name: 1 }) // Only return the 'name' field
    //       .toArray();

    //     // Return an array of friend names
    //     res.status(200).json(friends.map(friend => friend.name));
    //   } catch (err) {
    //     res.status(500).json({ message: 'Error fetching friends' });
    //   }
    // });

    // ========== Your Playlist API Requests (Create playlist, Add songs to playlist, View Playlist, Edit Playlist Details, Delete Playlist) ==========
    // Create Playlist
    app.post('/api/playlists/create', async (req, res) => {
      const { title, category, description, songs, imgSrc, hashtags } = req.body;

      // Generate playlist ID based on the title (lowercase and no spaces)
      const playlistId = title.toLowerCase().replace(/\s+/g, '');

      // // Format the songs array to contain objects with title, artist, and isDeleted fields
      // const formattedSongs = songs.map(song => {
      //   const [songTitle, artist] = song.split('-').map(part => part.trim());
      //   return {
      //     title: songTitle,
      //     artist: artist,
      //     isDeleted: false  // Default to not deleted
      //   };
      // });

      // Create new playlist object
      const newPlaylist = {
        _id: playlistId,
        title: title,
        category: category || "",
        description: description || "",
        hashtags: hashtags || [],
        imgSrc: imgSrc || "https://via.placeholder.com/100",
        ownerId: req.session.user._id,  // Use the logged-in user's ID from session
        songs: []
      };

      try {
        const result = await playlistsCollection.insertOne(newPlaylist);
        res.status(201).json({ message: 'Playlist created', playlistId: result.insertedId });
      } catch (err) {
        console.error('Error creating playlist:', err);
        res.status(500).json({ message: 'Error creating playlist' });
      }
    });

    // Add Song to Playlist (with unique song handling)
    app.post('/api/playlists/:id/addSong', async (req, res) => {
      const playlistId = req.params.id;
      const { title, artist } = req.body;

      // Generate the song ID
      const songId = `${title.toLowerCase().replace(/\s+/g, '')}-${artist.toLowerCase().replace(/\s+/g, '')}`;

      try {
        // Check if the song exists or create it if it doesn't
        let song = await songsCollection.findOne({ _id: songId });
        if (!song) {
          const newSong = {
            _id: songId,
            title,
            artist,
            album: "",  // You can enhance this part later by allowing album input
            duration: "00:00", // Default duration
            link: "", // Add song link if available
            isDeleted: false,
            ownerIds: [req.session.user._id],  // Add the song owner
          };
          await songsCollection.insertOne(newSong);
          song = newSong;
        }

        // Check if the song is deleted
        if (song.isDeleted) {
          return res.status(403).json({ message: 'Cannot add a deleted song to the playlist' });
        }

        // Find the playlist
        const playlist = await playlistsCollection.findOne({ _id: playlistId });
        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        // Add the song ID to the playlist if not already present
        if (!playlist.songs.includes(songId)) {
          await playlistsCollection.updateOne(
            { _id: playlistId },
            { $push: { songs: songId } }
          );
          res.status(200).json({ message: 'Song added to playlist' });
        } else {
          res.status(200).json({ message: 'Song is already in the playlist' });
        }
      } catch (err) {
        console.error('Error adding song to playlist:', err);
        res.status(500).json({ message: 'Error adding song to playlist' });
      }
    });

    // View Playlist with full song details
    app.get('/api/playlists/:id', async (req, res) => {
      const playlistId = req.params.id;

      try {
        const playlist = await playlistsCollection.findOne({ _id: playlistId });

        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        // Fetch full song details for each song in the playlist
        const songsDetails = await Promise.all(
          playlist.songs.map(async (songId) => {
            const song = await songsCollection.findOne({ _id: songId });
            if (song) {
              return {
                title: song.title,
                artist: song.artist,
                album: song.album,
                link: song.link,
                imgSrc: song.imgSrc,
                duration: song.duration
              };
            }
            return null; // Handle case where song might be missing
          })
        );

        // Filter out any null values in case some songs are missing
        const validSongs = songsDetails.filter(song => song !== null);

        res.status(200).json({
          ...playlist,
          songs: validSongs, // Replace song IDs with full song details
        });
      } catch (err) {
        console.error('Error fetching playlist:', err);
        res.status(500).json({ message: 'Error fetching playlist' });
      }
    });

    // Edit Playlist
    app.patch('/api/playlists/:id', async (req, res) => {
      const playlistId = req.params.id; // The current playlist ID
      const { title, category, description, songs, hashtags, imgSrc } = req.body;

      try {
        // Find the playlist by ID
        const playlist = await playlistsCollection.findOne({ _id: playlistId });

        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check if the current user is the owner of the playlist
        if (playlist.ownerId !== req.session.user._id) {
          return res.status(403).json({ message: 'Unauthorized action. You are not the owner of this playlist.' });
        }

        // Prepare the update object
        const updateFields = {};

        // Update other fields if provided
        if (category !== undefined) updateFields.category = category;
        if (description !== undefined) updateFields.description = description;
        if (hashtags !== undefined) updateFields.hashtags = hashtags;
        if (imgSrc !== undefined) updateFields.imgSrc = imgSrc;

        // Reformat and update songs if provided (parsing based on the song-artist format)
        if (songs) {
          updateFields.songs = songs.map(song => {
            // Split the song string at the hyphen to separate title and artist
            const [songName, artist] = song.split('-').map(part => part.trim().toLowerCase().replace(/\s+/g, ''));
            return `${songName}-${artist}`; // Rebuild the song in the required format
          });
        }

        // Perform the update operation
        const result = await playlistsCollection.updateOne(
          { _id: playlistId },
          { $set: updateFields }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Playlist not found or no changes made.' });
        }

        res.status(200).json({ message: 'Playlist updated successfully' });
      } catch (err) {
        console.error('Error updating playlist:', err);
        res.status(500).json({ message: 'Error updating playlist' });
      }
    });

    // Delete Playlist
    app.delete('/api/playlists/:id', async (req, res) => {
      const playlistId = req.params.id;

      try {
        // Find the playlist by ID
        const playlist = await playlistsCollection.findOne({ _id: playlistId });

        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check if the current user is the owner of the playlist
        if (playlist.ownerId !== req.session.user._id) {
          return res.status(403).json({ message: 'Unauthorized action. You are not the owner of this playlist.' });
        }

        // Proceed with the deletion
        const result = await playlistsCollection.deleteOne({ _id: playlistId });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully' });
      } catch (err) {
        console.error('Error deleting playlist:', err);
        res.status(500).json({ message: 'Error deleting playlist' });
      }
    });

    // ========== Songs API Requests (Create song, Delete song) ==========
    // Create or update a song (with multiple owners support)
    app.post('/api/song/create', async (req, res) => {
      const { title, artist, album, duration, link, imgSrc } = req.body;

      if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
      }

      // Generate song ID based on the song title and artist (lowercase, no spaces)
      const songId = `${title.toLowerCase().replace(/\s+/g, '')}-${artist.toLowerCase().replace(/\s+/g, '')}`;

      try {
        // Check if the song already exists in the database
        let song = await songsCollection.findOne({ _id: songId });

        if (song) {
          // If the song exists, check if the user is already an owner
          if (!song.ownerId.includes(req.session.user._id)) {
            // If the user is not already an owner, update the ownerId field by adding the new owner
            await songsCollection.updateOne(
              { _id: songId },
              { $addToSet: { ownerId: req.session.user._id } }  // Add user ID to `ownerId` without duplicates
            );
            return res.status(200).json({ message: 'Song ownership updated.' });
          } else {
            // If the user is already an owner, return a message
            return res.status(200).json({ message: 'You are already an owner of this song.' });
          }
        }

        // If the song does not exist, create a new one with the current user as the owner
        const newSong = {
          _id: songId,  // Unique ID based on song title and artist
          title: title,
          artist: artist,
          album: album || "",
          duration: duration || "00:00",
          link: link || "",
          imgSrc: imgSrc || "https://via.placeholder.com/100",
          isDeleted: false,
          ownerId: [req.session.user._id],  // Store the ID of the user who added the song
        };

        // Insert the new song into the songs collection
        const result = await songsCollection.insertOne(newSong);
        res.status(201).json({ message: 'Song created successfully', songId: result.insertedId });

      } catch (err) {
        console.error('Error creating or updating song:', err);
        res.status(500).json({ message: 'Error creating or updating song' });
      }
    });

    // Delete a song
    app.patch('/api/songs/:id/delete', async (req, res) => {
      const songId = req.params.id;

      if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
      }

      try {
        // Find the song by its ID
        const song = await songsCollection.findOne({ _id: songId });

        if (!song) {
          return res.status(404).json({ message: 'Song not found' });
        }

        // Check if the current user is the owner of the song
        if (song.ownerId !== req.session.user._id) {
          return res.status(403).json({ message: 'Unauthorized action. You can only delete songs you created.' });
        }

        // Mark the song as deleted instead of deleting it
        const result = await songsCollection.updateOne(
          { _id: songId },
          { $set: { isDeleted: true } }  // Set isDeleted to true
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song marked as deleted' });
      } catch (err) {
        console.error('Error marking song as deleted:', err);
        res.status(500).json({ message: 'Error marking song as deleted' });
      }
    });

    // ========== Searching API Requests (Playlist, Songs, Users) ==========
    // Search for Playlists belonging to the logged-in user
    app.post('/api/playlists/search', async (req, res) => {
      const { query, userId } = req.body;  // `query` is the search term, `userId` is the session user's ID

      try {
        const regex = new RegExp(query, 'i');  // Create a case-insensitive regex based on the query

        // Only search playlists that belong to the current logged-in user
        const playlists = await playlistsCollection.find({
          $and: [
            { ownerId: userId },  // Filter by the session user's ID
            {
              $or: [
                { title: regex },
                { category: regex },
                { hashtags: { $in: [regex] } }
              ]
            }
          ]
        }).toArray();

        if (playlists.length === 0) {
          return res.status(404).json({ message: 'No playlists found' });
        }

        res.status(200).json(playlists);
      } catch (err) {
        console.error('Error searching for playlists:', err);
        res.status(500).json({ message: 'Error searching for playlists' });
      }
    });

    // Search for Songs belonging to the logged-in user
    app.post('/api/songs/search', async (req, res) => {
      const { query, userId } = req.body;  // `query` is the search term, `userId` is the session user's ID

      try {
        const regex = new RegExp(query, 'i');  // Create a case-insensitive regex for matching

        // Only search songs that belong to the current logged-in user
        const songs = await songsCollection.find({
          $and: [
            { ownerId: userId },  // Filter by the session user's ID
            {
              $or: [
                { title: regex },
                { artist: regex },
                { album: regex }
              ]
            },
            { isDeleted: false }  // Only return songs that are not marked as deleted
          ]
        }).toArray();

        if (songs.length === 0) {
          return res.status(404).json({ message: 'No songs found' });
        }

        res.status(200).json(songs);
      } catch (err) {
        console.error('Error searching for songs:', err);
        res.status(500).json({ message: 'Error searching for songs' });
      }
    });

    // Get User Profile (view your own profile or someone else's)
    app.post('/api/users/profile/:email', async (req, res) => {
      const { email } = req.params;

      try {
        const user = await usersCollection.findOne({ _id: email });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // If the session user is viewing their own profile
        if (req.session.user && req.session.user._id === email) {
          // Return the user's profile, but mask the password
          const userProfile = {
            _id: user._id,
            name: user.name,
            gender: user.gender,
            bio: user.bio,
            email: user.email,
            password: user.password
          };
          return res.status(200).json(userProfile);
        } else {
          // If the session user is viewing someone else's profile, hide email and password
          const publicProfile = {
            _id: user._id,
            name: user.name,
            gender: user.gender,
            bio: user.bio,
          };
          return res.status(200).json(publicProfile);
        }
      } catch (err) {
        res.status(500).json({ message: 'Error fetching user' });
      }
    });

    // Get User Friends
    app.post('/api/users/friends', async (req, res) => {
      const { email } = req.body;

      try {
        const user = await usersCollection.findOne({ _id: email });

        // if (!user || !user.friends || user.friends.length === 0) {
        //   return res.status(404).json({ message: 'No friends found' });
        // }

        // Fetch the details of each friend (email -> name)
        const friends = await usersCollection
          .find({ _id: { $in: user.friends } })
          .project({ name: 1 }) // Only return the 'name' field
          .toArray();

        res.status(200).json(friends.map(friend => friend.name));
      } catch (err) {
        res.status(500).json({ message: 'Error fetching friends' });
      }
    });


    // Search for Users
    app.post('/api/users/search', async (req, res) => {
      const { query } = req.body;  // `query` is the search term passed in the request body

      try {
        const regex = new RegExp(query, 'i');  // Case-insensitive regex

        const users = await usersCollection.find({
          $or: [
            { name: regex },
            { email: regex }  // Allow searching by email as well
          ]
        }).toArray();

        if (users.length === 0) {
          return res.status(404).json({ message: 'No users found' });
        }

        // Filter out sensitive data (like password)
        const filteredUsers = users.map(user => ({
          _id: user._id,
          name: user.name,
          gender: user.gender,
          bio: user.bio,
          email: user.email,
          link: `/profile/${user._id}`  // Add a link to the user's profile page
        }));

        res.status(200).json(filteredUsers);
      } catch (err) {
        console.error('Error searching for users:', err);
        res.status(500).json({ message: 'Error searching for users' });
      }
    });

    // Check current session and return logged-in user
    app.get('/api/login/session', (req, res) => {
      if (req.session.user) {
        res.status(200).json(req.session.user);
      } else {
        res.status(401).json({ message: 'User not logged in' });
      }
    });

  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  }

  // Serve static files
  app.use(express.static('./frontend/public'));

  // Root route to serve the frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("./frontend/public", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
}

// Call the main MongoDB function to establish the connection
main().catch(console.error);