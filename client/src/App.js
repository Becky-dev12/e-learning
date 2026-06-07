import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MySchedule from './pages/MySchedule';
import AcademicPlan from './pages/AcademicPlan';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  React.useEffect(() => {
    document.title = 'YenetaEdu - Ethiopian Freshman Education Platform';
  }, []);

  return (
    <ThemeProvider>
      {/* Removed basename="/e-learning" so routes match perfectly on Vercel's root domains */}
      <Router> 
        <div className="App">
          {isAuthenticated && <Navigation onLogout={handleLogout} />}
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/courses" 
              element={isAuthenticated ? <Courses currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/schedule" 
              element={isAuthenticated ? <MySchedule currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/academic-plan" 
              element={isAuthenticated ? <AcademicPlan currentUser={currentUser} /> : <Navigate to="/login" />} 
            />
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;