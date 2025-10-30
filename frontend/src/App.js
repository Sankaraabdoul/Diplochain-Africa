import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';  // NOUVEAU
import IssueDiploma from './pages/IssueDiploma';
import VerifyDiploma from './pages/VerifyDiploma';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  {/* NOUVEAU */}
        <Route path="/issue" element={<IssueDiploma />} />
        <Route path="/verify" element={<VerifyDiploma />} />
        <Route path="/verify/:serialNumber" element={<VerifyDiploma />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;