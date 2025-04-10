import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Will use later for redirection
// import api from '../services/api'; // Will use later for API calls

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const navigate = useNavigate(); // For redirection after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Attempting registration with:', { username, password });
    // TODO: Implement API call to backend /api/auth/register
    // try {
    //   const response = await api.post('/auth/register', { username, password });
    //   console.log('Registration successful:', response.data);
    //   setSuccess('Registration successful! You can now log in.');
    //   // Optionally redirect to login page after a delay
    //   // setTimeout(() => navigate('/login'), 2000);
    // } catch (err) {
    //   console.error('Registration failed:', err.response?.data?.msg || err.message);
    //   setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    // }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-username">Username:</label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Register</button>
      </form>
      {/* TODO: Add link to Login page */}
    </div>
  );
}

export default RegisterPage;
