const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET all courses
router.get('/', courseController.getAllCourses);

// GET course by ID
router.get('/:id', courseController.getCourseById);

// GET courses by semester
router.get('/semester/:semester', courseController.getCoursesBySemester);

// POST create course
router.post('/', courseController.createCourse);

// PUT update course
router.put('/:id', courseController.updateCourse);

// DELETE course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
