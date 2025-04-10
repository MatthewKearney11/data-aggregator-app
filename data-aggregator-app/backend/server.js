require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth'); // Authentication routes
// const dataRoutes = require('./routes/data'); // Will uncomment later
require('./config/passport')(passport); // Configure Passport strategy

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(passport.initialize()); // Initialize Passport

// Basic Route
app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// API Routes
app.use('/api/auth', authRoutes); // Use authentication routes
// app.use('/api/data', dataRoutes); // Will uncomment later

const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
