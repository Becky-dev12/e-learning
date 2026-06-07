# YenetaEdu - Ethiopian Freshman Education Platform

A modern, beautifully designed fullstack MERN application built specifically for Ethiopian freshman students to manage their courses, schedules, and academic planning.

## 🌟 Features

- **🎓 Student Registration & Login** - Secure JWT-based authentication
- **📚 Course Management** - 7 core freshman courses with detailed information
- **📅 Schedule Planning** - Organize and manage your course schedule
- **📊 GPA Calculation** - Automatic GPA calculation with grade tracking
- **🎯 Academic Planning** - Plan your academic future
- **💚 Ethiopian Theme Design** - Beautiful green and gold colors inspired by Ethiopian flag
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 📚 Available Freshman Courses

1. **MATH101** - Introduction to Mathematics (4 credits)
2. **PHYS101** - General Physics (4 credits)
3. **LOGIC101** - Introduction to Logic (3 credits)
4. **PSYCH101** - General Psychology (3 credits)
5. **CIVIC101** - Ethiopian Civics and Governance (3 credits)
6. **ENG101** - English Composition and Communication (4 credits)
7. **GEOG101** - World Geography and Ethiopian Geography (3 credits)

## Tech Stack

### Backend
- **Node.js & Express**: REST API server
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password encryption

### Frontend
- **React 18**: UI framework
- **React Router v6**: Navigation
- **Axios**: HTTP client
- **CSS3**: Styling

## Project Structure

```
logistics/
├── server/
│   ├── models/
│   │   ├── Course.js
│   │   ├── Student.js
│   │   └── Schedule.js
│   ├── routes/
│   │   ├── courses.js
│   │   ├── students.js
│   │   └── schedules.js
│   ├── controllers/
│   │   ├── courseController.js
│   │   ├── studentController.js
│   │   └── scheduleController.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   └── Navigation.css
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Courses.js
│   │   │   ├── MySchedule.js
│   │   │   ├── AcademicPlan.js
│   │   │   └── Pages.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-planner
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Seed the database with freshman courses:
```bash
npm run seed
```

This populates 7 core freshman courses into the database.

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/semester/:semester` - Get courses by semester
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Students
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login student
- `GET /api/students/:id` - Get student profile
- `POST /api/students/:id/enroll` - Enroll in course
- `POST /api/students/:id/plan` - Add course to academic plan
- `POST /api/students/:id/completed` - Add completed course with grade
- `GET /api/students/:id/gpa` - Get GPA and completed courses
- `PUT /api/students/:id/gpa/recalculate` - Recalculate GPA

### Schedules
- `GET /api/schedules/:studentId` - Get student schedule
- `POST /api/schedules/:studentId` - Create/update schedule
- `POST /api/schedules/:studentId/add` - Add course to schedule
- `DELETE /api/schedules/:studentId/:courseId` - Remove course from schedule

## Usage

1. **Register**: Create a new account with your information
2. **Login**: Log in with your email and password
3. **Browse Courses**: View all available courses, filtered by semester
4. **Enroll**: Click "Enroll" to enroll in a course
5. **Plan**: Click "Add to Plan" to add courses to your academic plan
6. **View Schedule**: Check your schedule on the My Schedule page
7. **Academic Plan**: Review your planned and completed courses

## Features Implemented

- ✅ Student Registration & Authentication (JWT)
- ✅ Login with secure password hashing
- ✅ Browse 7 Ethiopian Freshman Courses
- ✅ Course enrollment and scheduling
- ✅ Academic plan creation and management
- ✅ **GPA Calculation System** - Automatic GPA calculation with grade tracking (A-F)
- ✅ Complete course tracking with grades
- ✅ Beautiful responsive design
- ✅ Ethiopian theme with green and gold colors

## Future Enhancements

- [ ] Prerequisite checking before enrollment
- [ ] Course conflict detection
- [ ] Email notifications
- [ ] Admin dashboard for course management
- [ ] Course reviews and ratings
- [ ] Academic advisor messaging
- [ ] Degree progress tracking
- [ ] Export schedule to calendar

## Environment Configuration

Create a `.env` file in the server directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-planner
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running in Development

Open two terminal windows:

**Terminal 1 - Backend**:
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd client
npm start
```

## Database Models

### Student
- firstName, lastName, email, password (hashed with bcryptjs)
- enrolledCourses (array of course references)
- completedCourses (array with course ID, grade, gradePoints)
- academicPlan (array of planned courses)
- gpa (automatically calculated)
- totalCreditsCompleted (tracked for GPA calculation)

### Course
- courseCode, courseName, description
- credits, semester
- prerequisites, instructor
- schedule (days, startTime, endTime)
- capacity, enrolled, room

### Schedule
- student (reference)
- courses (array of course references)
- semester, year
- totalCredits, notes

## Contributing

This is a project for educational purposes. Feel free to extend it with additional features and improvements.

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.
