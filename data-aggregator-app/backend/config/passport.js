const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./database'); // Import database query function
require('dotenv').config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from 'Bearer TOKEN' header
  secretOrKey: process.env.JWT_SECRET // Use the secret from .env file
};

module.exports = function(passport) {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        // jwt_payload contains the decoded JWT payload (e.g., user id, username)
        // Find the user specified in token
        const userResult = await db.query('SELECT id, username FROM users WHERE id = $1', [jwt_payload.id]);

        if (userResult.rows.length > 0) {
          // User found, pass user object to the next middleware
          return done(null, userResult.rows[0]);
        } else {
          // User not found
          return done(null, false);
        }
      } catch (err) {
        console.error('Error during JWT strategy execution:', err);
        return done(err, false);
      }
    })
  );
};
