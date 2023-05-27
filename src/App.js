import React from 'react';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Travel from './components/pages/Travel';

function App() {
  return (
    <Router>
            <Routes>

        <Route  path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/travel" element={<Travel/>} />
        </Routes>

    </Router>
  );
}

export default App;
