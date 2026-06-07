import React, { useState, useEffect } from 'react';
import { courseAPI, studentAPI } from '../services/api';
import './Pages.css';

function Courses({ currentUser }) {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
      setFilteredCourses(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setLoading(false);
    }
  };

  const handleSemesterFilter = (semester) => {
    setSelectedSemester(semester);
    if (semester) {
      setFilteredCourses(courses.filter(c => c.semester === semester));
    } else {
      setFilteredCourses(courses);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await studentAPI.enrollCourse(currentUser._id, courseId);
      setMessage('Successfully enrolled in course!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to enroll: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddToPlan = async (courseId) => {
    try {
      await studentAPI.addToAcademicPlan(currentUser._id, courseId);
      setMessage('Successfully added to academic plan!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add to plan: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="container">
      <h1>Available Courses</h1>
      {message && <div className={message.includes('Successfully') ? 'success-message' : 'error-message'}>{message}</div>}
      
      <div className="card">
        <h2>Filter by Semester</h2>
        <div className="button-group">
          <button onClick={() => handleSemesterFilter('')} className={selectedSemester === '' ? 'active' : ''}>
            All
          </button>
          <button onClick={() => handleSemesterFilter('Fall')} className={selectedSemester === 'Fall' ? 'active' : ''}>
            Fall
          </button>
          <button onClick={() => handleSemesterFilter('Spring')} className={selectedSemester === 'Spring' ? 'active' : ''}>
            Spring
          </button>
          <button onClick={() => handleSemesterFilter('Summer')} className={selectedSemester === 'Summer' ? 'active' : ''}>
            Summer
          </button>
        </div>
      </div>

      <div className="grid">
        {filteredCourses.map((course) => (
          <div key={course._id} className="card course-card">
            <h3>{course.courseName}</h3>
            <p><strong>Code:</strong> {course.courseCode}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            <p><strong>Semester:</strong> {course.semester}</p>
            <p><strong>Instructor:</strong> {course.instructor || 'N/A'}</p>
            {course.schedule && (
              <p><strong>Time:</strong> {course.schedule.startTime} - {course.schedule.endTime}</p>
            )}
            <p><strong>Room:</strong> {course.room || 'N/A'}</p>
            <p><strong>Seats Available:</strong> {course.capacity ? course.capacity - course.enrolled : 'N/A'}</p>
            {course.description && <p>{course.description}</p>}
            <div className="button-group">
              <button onClick={() => handleEnroll(course._id)}>Enroll</button>
              <button onClick={() => handleAddToPlan(course._id)}>Add to Plan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
