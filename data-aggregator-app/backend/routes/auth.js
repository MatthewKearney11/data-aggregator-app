const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Database connection pool
require('dotenv').config();

const SALT_ROUNDS = 10; // Cost factor for bcrypt hashing

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter username and password' });
  }

  try {
    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert new user into database
    const newUser = await db.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
      [username, passwordHash]
    );

    res.status(201).json({
      msg: 'User registered successfully',
      user: newUser.rows[0]
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server error during registration');
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter username and password' });
  }

  try {
    // Check for user
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // User not found
    }

    const user = userResult.rows[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // Password doesn't match
    }

    // User matched, create JWT Payload
    const payload = {
      id: user.id,
      username: user.username
      // Add other relevant user info if needed, but keep payload small
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 * 24 }, // Token expires in 24 hours (adjust as needed)
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: `Bearer ${token}`, // Send token back to client
           user: { // Send back some user info
             id: user.id,
             username: user.username
           }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error during login');
  }
});

module.exports = router;
