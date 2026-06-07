const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    enum: ['Fall', 'Spring', 'Summer'],
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  instructor: {
    type: String,
  },
  schedule: {
    days: [String],
    startTime: String,
    endTime: String,
  },
  capacity: {
    type: Number,
  },
  enrolled: {
    type: Number,
    default: 0,
  },
  room: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);
