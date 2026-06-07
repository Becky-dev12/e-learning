const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST register
router.post('/register', studentController.registerStudent);

// POST login
router.post('/login', studentController.loginStudent);

// GET student profile
router.get('/:id', studentController.getStudentProfile);

// POST enroll in course
router.post('/:id/enroll', studentController.enrollCourse);

// POST add to academic plan
router.post('/:id/plan', studentController.addToAcademicPlan);

// POST add completed course with grade
router.post('/:id/completed', studentController.addCompletedCourse);

// GET student GPA
router.get('/:id/gpa', studentController.getGPA);

// PUT recalculate GPA
router.put('/:id/gpa/recalculate', studentController.recalculateGPA);

module.exports = router;
