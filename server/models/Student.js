const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
  },
  major: String,
  gpa: {
    type: Number,
    default: 0,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  completedCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    grade: {
      type: String,
      enum: ['A', 'B', 'C', 'D', 'F'],
    },
    gradePoints: Number,
  }],
  academicPlan: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  totalCreditsCompleted: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to calculate GPA
studentSchema.methods.calculateGPA = async function() {
  if (this.completedCourses.length === 0) {
    this.gpa = 0;
    return 0;
  }

  let totalGradePoints = 0;
  let totalCredits = 0;

  for (let courseItem of this.completedCourses) {
    if (courseItem.gradePoints && courseItem.course) {
      const course = await mongoose.model('Course').findById(courseItem.course);
      if (course) {
        totalGradePoints += courseItem.gradePoints * course.credits;
        totalCredits += course.credits;
      }
    }
  }

  const calculatedGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  this.gpa = parseFloat(calculatedGPA);
  this.totalCreditsCompleted = totalCredits;
  
  return this.gpa;
};

module.exports = mongoose.model('Student', studentSchema);
