import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; // Optional App-specific styling

// Import page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
// import Navbar from './components/Navbar'; // Will uncomment later
// import ProtectedRoute from './components/ProtectedRoute'; // Will uncomment later

function App() {
  return (
    <>
      {/* <Navbar /> */} {/* Will uncomment later */}
      <div className="container"> {/* Optional container for layout */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              // We will wrap this with ProtectedRoute later
              <DashboardPage />
            }
          />

           {/* Default Route (e.g., redirect to login or dashboard) */}
           {/* For now, let's make the root path go to the login page */}
           <Route path="/" element={<LoginPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
