import React from 'react';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Explore from './components/pages/Explore';
import ScheduleGenerator from './components/pages/ScheduleGenerator';
import Hotels from './components/pages/Hotels';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/schedule-generator" element={< ScheduleGenerator />}/>
        <Route path="/explore&query=:id" element={<Hotels/>} />
        {/* &query=banglore */}
      </Routes>
    </Router>
  );
}

export default App;
