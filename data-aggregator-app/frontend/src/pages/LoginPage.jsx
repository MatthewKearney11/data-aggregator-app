import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Will use later for redirection
// import api from '../services/api'; // Will use later for API calls

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate(); // For redirection after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    console.log('Attempting login with:', { username, password });
    // TODO: Implement API call to backend /api/auth/login
    // try {
    //   const response = await api.post('/auth/login', { username, password });
    //   console.log('Login successful:', response.data);
    //   // TODO: Store token (e.g., in localStorage)
    //   // TODO: Update auth state (e.g., using Context or Zustand/Redux)
    //   // navigate('/dashboard'); // Redirect to dashboard
    // } catch (err) {
    //   console.error('Login failed:', err.response?.data?.msg || err.message);
    //   setError(err.response?.data?.msg || 'Login failed. Please try again.');
    // }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-username">Username:</label>
          <input
            type="text"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      {/* TODO: Add link to Register page */}
    </div>
  );
}

export default LoginPage;
