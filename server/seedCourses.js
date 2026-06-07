const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');

const freshmanCourses = [
  {
    courseCode: 'MATH101',
    courseName: 'Introduction to Mathematics',
    description: 'Fundamental mathematics for freshman students covering algebra, geometry, and calculus basics.',
    credits: 4,
    semester: 'Fall',
    prerequisites: [],
    instructor: 'Dr. Abebe Tekle',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '09:00',
      endTime: '10:30'
    },
    capacity: 40,
    enrolled: 0,
    room: 'Building A - Room 201'
  },
  {
    courseCode: 'PHYS101',
    courseName: 'General Physics',
    description: 'Introduction to physics covering mechanics, motion, and energy for freshman students.',
    credits: 4,
    semester: 'Fall',
    prerequisites: [],
    instructor: 'Prof. Kebede Assefa',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '10:30',
      endTime: '12:00'
    },
    capacity: 35,
    enrolled: 0,
    room: 'Science Building - Lab 101'
  },
  {
    courseCode: 'LOGIC101',
    courseName: 'Introduction to Logic',
    description: 'Basics of logic, reasoning, and critical thinking skills for academic success.',
    credits: 3,
    semester: 'Fall',
    prerequisites: [],
    instructor: 'Dr. Hiwot Mulat',
    schedule: {
      days: ['Monday', 'Wednesday'],
      startTime: '13:00',
      endTime: '14:30'
    },
    capacity: 30,
    enrolled: 0,
    room: 'Building B - Room 105'
  },
  {
    courseCode: 'PSYCH101',
    courseName: 'General Psychology',
    description: 'Fundamentals of psychology including human behavior, development, and social psychology.',
    credits: 3,
    semester: 'Spring',
    prerequisites: [],
    instructor: 'Dr. Almaz Desta',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '14:30',
      endTime: '16:00'
    },
    capacity: 35,
    enrolled: 0,
    room: 'Building C - Room 302'
  },
  {
    courseCode: 'CIVIC101',
    courseName: 'Ethiopian Civics and Governance',
    description: 'Study of Ethiopian government, constitution, civic responsibilities, and democratic principles.',
    credits: 3,
    semester: 'Fall',
    prerequisites: [],
    instructor: 'Prof. Yohannes Tekle',
    schedule: {
      days: ['Monday', 'Friday'],
      startTime: '15:00',
      endTime: '16:30'
    },
    capacity: 40,
    enrolled: 0,
    room: 'Building D - Room 201'
  },
  {
    courseCode: 'ENG101',
    courseName: 'English Composition and Communication',
    description: 'Developing writing, reading, and communication skills essential for academic success.',
    credits: 4,
    semester: 'Fall',
    prerequisites: [],
    instructor: 'Dr. Seble Getnet',
    schedule: {
      days: ['Tuesday', 'Wednesday', 'Friday'],
      startTime: '11:00',
      endTime: '12:30'
    },
    capacity: 30,
    enrolled: 0,
    room: 'Building A - Room 305'
  },
  {
    courseCode: 'GEOG101',
    courseName: 'World Geography and Ethiopian Geography',
    description: 'Geography of Ethiopia and the world, including climate, culture, and economic systems.',
    credits: 3,
    semester: 'Spring',
    prerequisites: [],
    instructor: 'Dr. Belay Andualem',
    schedule: {
      days: ['Monday', 'Thursday'],
      startTime: '09:00',
      endTime: '10:30'
    },
    capacity: 35,
    enrolled: 0,
    room: 'Building E - Room 101'
  }
];

async function seedCourses() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/university-planner', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Existing courses cleared');

    // Insert new courses
    const inserted = await Course.insertMany(freshmanCourses);
    console.log(`${inserted.length} courses added successfully!`);

    // Display inserted courses
    console.log('\n📚 Freshman Courses:');
    inserted.forEach(course => {
      console.log(`✓ ${course.courseCode} - ${course.courseName} (${course.credits} credits)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
}

seedCourses();
