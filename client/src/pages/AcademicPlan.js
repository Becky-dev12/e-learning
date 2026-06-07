import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import './Pages.css';

function AcademicPlan({ currentUser }) {
  const [student, setStudent] = useState(null);
  const [gpaData, setGpaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('A');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!currentUser?._id) {
      setLoading(false);
      return;
    }
    fetchStudentData();
    fetchGPA();
  }, [currentUser?._id]);

  const fetchStudentData = async () => {
    if (!currentUser?._id) return;
    try {
      const response = await studentAPI.getProfile(currentUser._id);
      setStudent(response.data);
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGPA = async () => {
    if (!currentUser?._id) return;
    try {
      const response = await studentAPI.getGPA(currentUser._id);
      setGpaData(response.data);
    } catch (err) {
      console.error('Error fetching GPA:', err);
    }
  };

  const handleAddGrade = async () => {
    if (!selectedCourse) {
      setMessage('Please select a course');
      return;
    }
    if (!currentUser?._id) {
      setMessage('Please log in first');
      return;
    }

    try {
      await studentAPI.addCompletedCourse(currentUser._id, selectedCourse, selectedGrade);
      setMessage(`Grade ${selectedGrade} added for course!`);
      setSelectedCourse(null);
      setSelectedGrade('A');
      fetchStudentData();
      fetchGPA();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to add grade: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!currentUser?._id) {
    return <div className="loading">Please log in to view your academic plan</div>;
  }

  if (loading) return <div className="loading">Loading academic plan...</div>;

  return (
    <div className="container">
      <h1>Academic Plan</h1>

      <div className="card">
        <h2>Student Information</h2>
        <p><strong>Name:</strong> {student?.firstName} {student?.lastName}</p>
        <p><strong>Email:</strong> {student?.email}</p>
        <p><strong>Major:</strong> {student?.major || 'Not set'}</p>
      </div>

      <div className="card gpa-card">
        <h2>📊 GPA & Academic Performance</h2>
        <div className="gpa-display">
          <div className="gpa-item">
            <p className="gpa-label">Current GPA</p>
            <p className="gpa-value">{gpaData?.gpa?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="gpa-item">
            <p className="gpa-label">Total Credits Completed</p>
            <p className="gpa-value">{gpaData?.totalCreditsCompleted || 0}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Add Grade for Course</h2>
        {message && <div className={message.includes('added') ? 'success-message' : 'error-message'}>{message}</div>}
        <div className="grade-form">
          <div className="form-group">
            <label>Select Course</label>
            <select value={selectedCourse || ''} onChange={(e) => setSelectedCourse(e.target.value)}>
              <option value="">-- Choose a course --</option>
              {student?.enrolledCourses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Grade</label>
            <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
              <option value="A">A (4.0)</option>
              <option value="B">B (3.0)</option>
              <option value="C">C (2.0)</option>
              <option value="D">D (1.0)</option>
              <option value="F">F (0.0)</option>
            </select>
          </div>
          <button onClick={handleAddGrade} className="btn-add-grade">Add Grade</button>
        </div>
      </div>

      <div className="card">
        <h2>Planned Courses</h2>
        {student?.academicPlan && student.academicPlan.length > 0 ? (
          <div className="plan-list">
            {student.academicPlan.map((course, index) => (
              <div key={course._id} className="plan-item">
                <span className="plan-number">{index + 1}</span>
                <div>
                  <p><strong>{course.courseName}</strong> ({course.courseCode})</p>
                  <p>Credits: {course.credits} | Semester: {course.semester || 'TBD'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No courses in your academic plan yet. Add courses from the courses page.</p>
        )}
      </div>

      <div className="card">
        <h2>Completed Courses with Grades</h2>
        {gpaData?.completedCourses && gpaData.completedCourses.length > 0 ? (
          <div className="completed-courses-table">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Grade</th>
                  <th>Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {gpaData.completedCourses.map((item) => (
                  <tr key={item._id}>
                    <td>{item.course?.courseCode || 'N/A'}</td>
                    <td>{item.course?.courseName || 'N/A'}</td>
                    <td>{item.course?.credits || 'N/A'}</td>
                    <td className={`grade-${item.grade}`}><strong>{item.grade}</strong></td>
                    <td>{item.gradePoints || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No completed courses yet. Add grades for your courses to track GPA.</p>
        )}
      </div>
    </div>
  );
}

export default AcademicPlan;
