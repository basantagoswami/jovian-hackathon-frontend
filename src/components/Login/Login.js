import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make API call for login
      const host = 'https://jovian-hackathon-backend.vercel.app';

      const response = await axios.post(`${host}/auth/login`, { username, password });
      const access_token = response.data.access_token;

      // Store the access_token in cookie or local storage
      // Example: using local storage
      localStorage.setItem('access_token', access_token);

      // Redirect to the home page after successful login
      navigate('/explore');
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
