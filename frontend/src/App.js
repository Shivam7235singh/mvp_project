import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import "./index.css";
import ProjectDetails from './pages/ProjectDetails';
import Navbar from './components/Navbar';
import ProgressDashboard from './pages/ProgressDashboard';
import ProjectExplore from './pages/ProjectExplore';
import ProjectForm from './pages/ProjectForm';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
  
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        <Route path="/projects" element={<ProjectDetails />} />
        <Route path="/projectexplore" element={<ProjectExplore/>} />
        <Route path="/dashboard" element={<ProgressDashboard />} />
        <Route path="/projectform" element={<ProjectForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
