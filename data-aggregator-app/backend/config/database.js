const { Pool } = require('pg');
require('dotenv').config(); // Ensure environment variables are loaded

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Optional: Add SSL configuration if required for your database connection
  // ssl: {
  //   rejectUnauthorized: false // Adjust based on your SSL certificate setup
  // }
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Exit the process if the pool encounters a critical error
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool // Export the pool itself if needed for transactions etc.
};
