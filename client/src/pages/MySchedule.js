import React, { useState, useEffect } from 'react';
import { scheduleAPI } from '../services/api';
import './Pages.css';

function MySchedule({ currentUser }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSchedule();
  }, [currentUser._id]);

  const fetchSchedule = async () => {
    try {
      const response = await scheduleAPI.getSchedule(currentUser._id);
      setSchedule(response.data);
    } catch (err) {
      console.error('Error fetching schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      await scheduleAPI.removeCourseFromSchedule(currentUser._id, courseId);
      setMessage('Course removed from schedule');
      fetchSchedule();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to remove course');
    }
  };

  if (loading) return <div className="loading">Loading schedule...</div>;

  return (
    <div className="container">
      <h1>My Schedule</h1>
      {message && <div className={message.includes('removed') ? 'success-message' : 'error-message'}>{message}</div>}
      
      {schedule && schedule.courses && schedule.courses.length > 0 ? (
        <div className="card">
          <h2>Semester: {schedule.semester} {schedule.year}</h2>
          <p><strong>Total Credits:</strong> {schedule.totalCredits}</p>
          
          <div className="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Semester</th>
                  <th>Credits</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {schedule.courses.map((item) => (
                  <tr key={item._id}>
                    <td>{item.course?.courseCode || 'N/A'}</td>
                    <td>{item.course?.courseName || 'N/A'}</td>
                    <td>{item.semester || 'N/A'}</td>
                    <td>{item.course?.credits || 'N/A'}</td>
                    <td>
                      <button onClick={() => handleRemoveCourse(item._id)} className="btn-remove">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card">
          <p>No schedule created yet. Enroll in courses to build your schedule.</p>
        </div>
      )}
    </div>
  );
}

export default MySchedule;
