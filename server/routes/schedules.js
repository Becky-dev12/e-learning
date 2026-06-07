const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// GET schedule
router.get('/:studentId', scheduleController.getStudentSchedule);

// POST create/update schedule
router.post('/:studentId', scheduleController.createOrUpdateSchedule);

// POST add course to schedule
router.post('/:studentId/add', scheduleController.addCourseToSchedule);

// DELETE remove course from schedule
router.delete('/:studentId/:courseId', scheduleController.removeCourseFromSchedule);

module.exports = router;
