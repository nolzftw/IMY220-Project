// Nolan Kuhn u214337883
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = "mongodb+srv://u21437883:Junetkuhn!1324@imy220.gpxcf.mongodb.net/?retryWrites=true&w=majority&tls=true";

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
    // User Signup
    app.post('/api/signup', async (req, res) => {
      const { name, email, password  } = req.body; // Extract data from the request body
      
      try {
        // Check if a user with the given email (_id) already exists
        const existingUser = await usersCollection.findOne({ _id: email });
      
        if (existingUser) {
          // If the user exists, send an error response
          return res.status(400).json({ message: 'Email is already taken' });
        }
      
        // If user doesn't exist, create a new user with email as _id
        const newUser = {
          _id: email,           // Set the _id to the user's email
          name,
          gender: '',           // Default to an empty string
          bio: '',              // Default to an empty string
          email,                // Set email again for clarity (optional)
          password              // Store the password (preferably hashed)
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
