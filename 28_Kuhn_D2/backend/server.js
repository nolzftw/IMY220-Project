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


    // ========== PLAYLIST ROUTES ==========

    // Create Playlist
    app.post('/api/playlists', async (req, res) => {
      const { title, ownerId, songs, imgSrc, hashtags } = req.body;

      const newPlaylist = {
        _id: email,
        title,
        ownerId,
        songs: songs || [],
        duration: "00:00:00",
        imgSrc: imgSrc || "https://via.placeholder.com/100",
        hashtags: hashtags || []
      };

      try {
        const result = await playlistsCollection.insertOne(newPlaylist);
        res.status(201).json({ message: 'Playlist created', playlistId: result.insertedId });
      } catch (err) {
        res.status(500).json({ message: 'Error creating playlist' });
      }
    });

    // Update Playlist
    app.patch('/api/playlists/:id', async (req, res) => {
      const playlistId = req.params.id;
      const { title, songs, description } = req.body;

      try {
        const updateFields = {};
        if (title) updateFields.title = title;
        if (songs) updateFields.songs = songs;
        if (description) updateFields.description = description;

        const result = await playlistsCollection.updateOne(
          { _id: playlistId },
          { $set: updateFields }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist updated successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error updating playlist' });
      }
    });

    // Delete Playlist
    app.delete('/api/playlists/:id', async (req, res) => {
      const playlistId = req.params.id;

      try {
        const result = await playlistsCollection.deleteOne({ _id: playlistId });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Error deleting playlist' });
      }
    });


    // Get Playlist by ID
    app.get('/api/playlists/:id', async (req, res) => {
      const { id } = req.params;

      try {
        const playlist = await playlistsCollection.findOne({ _id: id });
        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(playlist);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching playlist' });
      }
    });

    // Add a Song to Playlist
    app.post('/api/playlists/:playlistId/addSong', async (req, res) => {
      const { playlistId } = req.params;
      const { song } = req.body; // Assume song object is passed in the request body

      try {
        // Check if the song is already in the playlist and is marked as deleted
        const existingSong = await playlistsCollection.findOne(
          { _id: playlistId, "songs.title": song.title, "songs.isDeleted": true }
        );

        if (existingSong) {
          return res.status(400).json({ message: 'Cannot re-add a deleted song' });
        }

        // Proceed with adding the song if it wasn't marked as deleted
        const result = await playlistsCollection.updateOne(
          { _id: playlistId },
          { $push: { songs: song } }
        );

        res.status(201).json({ message: 'Song added to playlist' });
      } catch (err) {
        res.status(500).json({ message: 'Error adding song' });
      }
    });

    // Delete Song from Playlist
    app.patch('/api/songs/:playlistId/:songTitle', async (req, res) => {
      const { playlistId, songTitle } = req.params;

      try {
        // Find the song in the playlist and mark it as deleted (instead of removing it)
        const result = await playlistsCollection.updateOne(
          { _id: playlistId, "songs.title": songTitle },
          {
            $set: {
              "songs.$.isDeleted": true,        // Add a flag to mark the song as deleted
              "songs.$.embedCode": "",          // Remove embed code for the deleted song
            }
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'Song or Playlist not found' });
        }

        res.status(200).json({ message: 'Song marked as deleted' });
      } catch (err) {
        console.error('Error marking song as deleted:', err);
        res.status(500).json({ message: 'Error marking song as deleted' });
      }
    });

    // Get Songs in a Playlist
    app.get('/api/playlists/:id/songs', async (req, res) => {
      const playlistId = req.params.id;

      try {
        const playlist = await playlistsCollection.findOne({ _id: playlistId }, { projection: { songs: 1 } });

        if (!playlist) {
          return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist.songs);
      } catch (err) {
        res.status(500).json({ message: 'Error fetching songs' });
      }
    });

    // ========== SONG ROUTES ==========

    // Add Song to Playlist
    app.post('/api/songs', async (req, res) => {
      const { playlistId, title, artist, duration } = req.body;

      const newSong = { title, artist, duration };

      try {
        const result = await playlistsCollection.updateOne(
          { _id: playlistId },
          { $push: { songs: newSong } }
        );
        res.status(201).json({ message: 'Song added to playlist' });
      } catch (err) {
        res.status(500).json({ message: 'Error adding song' });
      }
    });

    // ========== Genres Admin ==========
    app.post('/api/genres', async (req, res) => {
      const { genre } = req.body;

      try {
        const existingGenre = await genresCollection.findOne({ name: genre });
        if (existingGenre) {
          return res.status(400).json({ message: 'Genre already exists' });
        }

        const newGenre = { name: genre };
        await genresCollection.insertOne(newGenre);
        res.status(201).json({ message: 'Genre created' });
      } catch (err) {
        res.status(500).json({ message: 'Error creating genre' });
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