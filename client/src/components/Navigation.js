import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import './Navigation.css';

function Navigation({ onLogout }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">YenetaEdu</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              <span className="nav-icon">📖</span>
              <span className="nav-text">Courses</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule" className="nav-link">
              <span className="nav-icon">📅</span>
              <span className="nav-text">Schedule</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/academic-plan" className="nav-link">
              <span className="nav-icon">🎯</span>
              <span className="nav-text">Academic</span>
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={onLogout} className="nav-logout">
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Logout</span>
            </button>
          </li>
        </ul>
        <button onClick={toggleTheme} className="nav-theme-icon" title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
