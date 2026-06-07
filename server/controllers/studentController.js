const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Register student
exports.registerStudent = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    let student = await Student.findOne({ email });
    if (student) return res.status(400).json({ message: 'Student already exists' });
    
    student = new Student({ email, password, firstName, lastName });
    await student.save();
    
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });
    
    res.status(201).json({ token, student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login student
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await student.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '7d',
    });
    
    res.json({ token, student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get student profile
exports.getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('enrolledCourses')
      .populate('completedCourses')
      .populate('academicPlan');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Enroll in course
exports.enrollCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    if (!student.enrolledCourses.includes(req.body.courseId)) {
      student.enrolledCourses.push(req.body.courseId);
    }
    
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add to academic plan
exports.addToAcademicPlan = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    if (!student.academicPlan.includes(req.body.courseId)) {
      student.academicPlan.push(req.body.courseId);
    }
    
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add completed course with grade
exports.addCompletedCourse = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    const { courseId, grade } = req.body;
    
    if (!courseId || !grade) {
      return res.status(400).json({ message: 'Course ID and grade are required' });
    }

    // Grade point mapping
    const gradePointMap = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
    
    if (!gradePointMap[grade]) {
      return res.status(400).json({ message: 'Invalid grade. Must be A, B, C, D, or F' });
    }

    // Check if course already exists in completed courses
    const existingIndex = student.completedCourses.findIndex(
      c => c.course.toString() === courseId
    );

    if (existingIndex >= 0) {
      // Update existing grade
      student.completedCourses[existingIndex].grade = grade;
      student.completedCourses[existingIndex].gradePoints = gradePointMap[grade];
    } else {
      // Add new completed course
      student.completedCourses.push({
        course: courseId,
        grade: grade,
        gradePoints: gradePointMap[grade],
      });
    }

    // Recalculate GPA
    await student.calculateGPA();
    await student.save();

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get GPA
exports.getGPA = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('completedCourses.course', 'courseName courseCode credits');
    
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    // Recalculate GPA
    const gpa = await student.calculateGPA();
    
    res.json({
      gpa: gpa,
      totalCreditsCompleted: student.totalCreditsCompleted,
      completedCourses: student.completedCourses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Recalculate GPA
exports.recalculateGPA = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    const gpa = await student.calculateGPA();
    await student.save();
    
    res.json({
      message: 'GPA recalculated',
      gpa: gpa,
      totalCreditsCompleted: student.totalCreditsCompleted,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
