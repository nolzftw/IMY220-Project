// Nolan Kuhn u214337883
const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb'); // ObjectId for MongoDB ID handling

// MongoDB connection URL
const url = "mongodb+srv://u21437883:Junetkuhn!1324@imy220.gpxcf.mongodb.net/";
const client = new MongoClient(url);

const app = express();
const port = 3000; // COMMENT OUT FOR DOCKER

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static("frontend/public"));

// // Root route to serve the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("frontend/public", "index.html"));
// });

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

    // ========================================
    // User Routes

    // Create User
    app.post('/api/users', async (req, res) => {
      const newUser = req.body;
      try {
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json(result.ops[0]); // Return the created user
      } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
      }
    });

    // Get User by email
    app.get('/api/users/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const user = await usersCollection.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    });

    // Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await usersCollection.find({}).toArray(); // Retrieve all users
    res.json(users); // Return users as a JSON response
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


    // ========================================
    // Playlist Routes

    // Create Playlist
    app.post('/api/playlists', async (req, res) => {
      const newPlaylist = req.body;
      try {
        const result = await playlistsCollection.insertOne(newPlaylist);
        res.status(201).json(result.ops[0]); // Return the created playlist
      } catch (err) {
        res.status(500).json({ error: 'Failed to create playlist' });
      }
    });

    // Get Playlist by email
    app.get('/api/playlists/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const playlist = await playlistsCollection.findOne({ email: email });
        if (!playlist) {
          return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json(playlist);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch playlist' });
      }
    });

    // ========================================
    // Song Routes

    // Add a Song
    app.post('/api/songs', async (req, res) => {
      const newSong = req.body;
      try {
        const result = await songsCollection.insertOne(newSong);
        res.status(201).json(result.ops[0]); // Return the created song
      } catch (err) {
        res.status(500).json({ error: 'Failed to add song' });
      }
    });

  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
  } finally {
    // Optionally close the connection if you don't want it open indefinitely
    // await client.close();
  }
}

// Call the main MongoDB function to establish the connection
main().catch(console.error);

// LOCAL
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// DOCKER
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on http://localhost:${process.env.PORT}`);
