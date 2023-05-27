import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    try {
      // Make API call for registration
      const response = await axios.post('/api/register', { username, password });
      console.log(response.data);
      // Handle successful registration
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      // Handle registration error
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-container">
      <div className="card">
        <h1>Register</h1>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleRegister}>Register</button>
        <p>Press Enter to register</p>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
