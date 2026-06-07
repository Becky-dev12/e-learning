const Schedule = require('../models/Schedule');

// Get student schedule
exports.getStudentSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ student: req.params.studentId })
      .populate({
        path: 'courses.course',
        model: 'Course',
      })
      .populate('student');
    
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update schedule
exports.createOrUpdateSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.findOne({ student: req.params.studentId });
    
    if (!schedule) {
      schedule = new Schedule({
        student: req.params.studentId,
        ...req.body,
      });
    } else {
      Object.assign(schedule, req.body);
    }
    
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add course to schedule
exports.addCourseToSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ student: req.params.studentId });
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    
    schedule.courses.push(req.body);
    schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove course from schedule
exports.removeCourseFromSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findOne({ student: req.params.studentId });
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    
    schedule.courses = schedule.courses.filter(
      c => c._id.toString() !== req.params.courseId
    );
    await schedule.save();
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
