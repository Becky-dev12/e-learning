import axios from 'axios';

// Swapped localhost for your live Render backend server URL
const API_BASE_URL = 'https://e-learning-fby2.onrender.com/api';

// Course API calls
export const courseAPI = {
  getAllCourses: () => axios.get(`${API_BASE_URL}/courses`),
  getCourseById: (id) => axios.get(`${API_BASE_URL}/courses/${id}`),
  getCoursesBySemester: (semester) => axios.get(`${API_BASE_URL}/courses/semester/${semester}`),
  createCourse: (courseData) => axios.post(`${API_BASE_URL}/courses`, courseData),
  updateCourse: (id, courseData) => axios.put(`${API_BASE_URL}/courses/${id}`, courseData),
  deleteCourse: (id) => axios.delete(`${API_BASE_URL}/courses/${id}`),
};

// Student API calls
export const studentAPI = {
  register: (studentData) => axios.post(`${API_BASE_URL}/students/register`, studentData),
  login: (credentials) => axios.post(`${API_BASE_URL}/students/login`, credentials),
  getProfile: (id) => axios.get(`${API_BASE_URL}/students/${id}`),
  enrollCourse: (studentId, courseId) => 
    axios.post(`${API_BASE_URL}/students/${studentId}/enroll`, { courseId }),
  addToAcademicPlan: (studentId, courseId) => 
    axios.post(`${API_BASE_URL}/students/${studentId}/plan`, { courseId }),
  addCompletedCourse: (studentId, courseId, grade) =>
    axios.post(`${API_BASE_URL}/students/${studentId}/completed`, { courseId, grade }),
  getGPA: (id) => axios.get(`${API_BASE_URL}/students/${id}/gpa`),
  recalculateGPA: (id) => axios.put(`${API_BASE_URL}/students/${id}/gpa/recalculate`),
};

// Schedule API calls
export const scheduleAPI = {
  getSchedule: (studentId) => axios.get(`${API_BASE_URL}/schedules/${studentId}`),
  createOrUpdateSchedule: (studentId, scheduleData) => 
    axios.post(`${API_BASE_URL}/schedules/${studentId}`, scheduleData),
  addCourseToSchedule: (studentId, courseData) => 
    axios.post(`${API_BASE_URL}/schedules/${studentId}/add`, courseData),
  removeCourseFromSchedule: (studentId, courseId) => 
    axios.delete(`${API_BASE_URL}/schedules/${studentId}/${courseId}`),
};