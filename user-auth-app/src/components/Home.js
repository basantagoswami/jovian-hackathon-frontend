import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="content">
        <h1>Welcome to our Travel Website!</h1>
        <p>Experience the joy of traveling to exotic destinations.</p>
        <div className="button-container">
          <Link to="/register" className="button">Register</Link>
          <Link to="/login" className="button">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
