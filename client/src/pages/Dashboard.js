import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import './Pages.css';

function Dashboard({ currentUser }) {
  const [gpaData, setGpaData] = useState(null);

  useEffect(() => {
    fetchGPA();
  }, [currentUser?._id]);

  const fetchGPA = async () => {
    try {
      const response = await studentAPI.getGPA(currentUser._id);
      setGpaData(response.data);
    } catch (err) {
      console.error('Error fetching GPA:', err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="container">
      <div className="card welcome-card">
        <div className="welcome-header">
          <h1>{getGreeting()}, {currentUser?.firstName}! 👋</h1>
          <p className="welcome-subtitle">Welcome to YenetaEdu - Your Freshman Journey Starts Here</p>
        </div>
        <div className="dashboard-grid">
          <div className="dashboard-item enrolled">
            <div className="icon">📚</div>
            <div className="stat-content">
              <p className="stat-label">Enrolled Courses</p>
              <p className="stat-value">{currentUser?.enrolledCourses?.length || 0}</p>
            </div>
          </div>
          <div className="dashboard-item completed">
            <div className="icon">✅</div>
            <div className="stat-content">
              <p className="stat-label">Completed Courses</p>
              <p className="stat-value">{gpaData?.completedCourses?.length || 0}</p>
            </div>
          </div>
          <div className="dashboard-item planned">
            <div className="icon">📋</div>
            <div className="stat-content">
              <p className="stat-label">Academic Plan</p>
              <p className="stat-value">{currentUser?.academicPlan?.length || 0}</p>
            </div>
          </div>
          <div className="dashboard-item gpa">
            <div className="icon">⭐</div>
            <div className="stat-content">
              <p className="stat-label">Current GPA</p>
              <p className="stat-value">{gpaData?.gpa?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>📊 Academic Statistics</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>Total Credits Completed</h3>
            <p className="big-number">{gpaData?.totalCreditsCompleted || 0}</p>
          </div>
          <div className="stat-box">
            <h3>Academic Status</h3>
            <p className="status-text">Active Student</p>
          </div>
          {gpaData?.gpa && gpaData.gpa >= 3.5 && (
            <div className="stat-box excellent">
              <h3>Standing</h3>
              <p className="status-badge">🌟 Excellent</p>
            </div>
          )}
          {gpaData?.gpa && gpaData.gpa >= 3.0 && gpaData.gpa < 3.5 && (
            <div className="stat-box good">
              <h3>Standing</h3>
              <p className="status-badge">✓ Good</p>
            </div>
          )}
          {gpaData?.gpa && gpaData.gpa < 3.0 && gpaData.gpa > 0 && (
            <div className="stat-box fair">
              <h3>Standing</h3>
              <p className="status-badge">→ Improving</p>
            </div>
          )}
        </div>
      </div>

      <div className="card features-card">
        <h2>🎓 Start Your Freshman Journey</h2>
        <div className="features-grid">
          <div className="feature-box">
            <span className="feature-icon">📖</span>
            <h3>Browse Courses</h3>
            <p>Explore all available freshman courses including Mathematics, Physics, Logic, Psychology, Civics, English, and Geography.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">📅</span>
            <h3>Create Schedule</h3>
            <p>Organize your courses and manage your academic schedule efficiently.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">📝</span>
            <h3>Track Progress</h3>
            <p>Monitor your grades, GPA, and academic performance throughout the semester.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">🎯</span>
            <h3>Plan Future</h3>
            <p>Create your academic plan for upcoming semesters and manage your degree progress.</p>
          </div>
        </div>
      </div>

      <div className="card info-card">
        <h2>📍 Quick Tips for Freshman Success</h2>
        <ul className="tips-list">
          <li>Start with core courses: Mathematics, English, and Logic</li>
          <li>Balance your course load - don't overload your first semester</li>
          <li>Attend all classes and maintain good attendance</li>
          <li>Study regularly and form study groups with classmates</li>
          <li>Use the Academic Plan feature to organize your future courses</li>
          <li>Track your GPA and grades closely</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
