# YenetaEdu - Ethiopian Freshman Education Platform

## Overview
YenetaEdu is a modern, user-friendly platform designed specifically for Ethiopian freshman students. It helps students manage their courses, schedules, and academic planning with an intuitive interface and beautiful design.

## Features

### 🎓 Core Features
- **Student Registration & Authentication**: Secure JWT-based authentication
- **Course Management**: Browse and enroll in freshman courses
- **GPA Calculation**: Automatic GPA calculation based on completed courses and grades
- **Academic Planning**: Plan your academic future with prerequisite tracking
- **Schedule Management**: Organize and manage your course schedule
- **Progress Tracking**: Monitor your academic performance

### 📚 Available Freshman Courses
1. **MATH101** - Introduction to Mathematics (4 credits)
2. **PHYS101** - General Physics (4 credits)
3. **LOGIC101** - Introduction to Logic (3 credits)
4. **PSYCH101** - General Psychology (3 credits)
5. **CIVIC101** - Ethiopian Civics and Governance (3 credits)
6. **ENG101** - English Composition and Communication (4 credits)
7. **GEOG101** - World Geography and Ethiopian Geography (3 credits)

## Setup Instructions

### Prerequisites
- Node.js v14 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-planner
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/university-planner?retryWrites=true&w=majority
```

### Step 3: Seed the Database with Freshman Courses
```bash
npm run seed
```

This will populate the database with all 7 freshman courses.

**Expected Output:**
```
MongoDB connected
Existing courses cleared
7 courses added successfully!

📚 Freshman Courses:
✓ MATH101 - Introduction to Mathematics (4 credits)
✓ PHYS101 - General Physics (4 credits)
✓ LOGIC101 - Introduction to Logic (3 credits)
✓ PSYCH101 - General Psychology (3 credits)
✓ CIVIC101 - Ethiopian Civics and Governance (3 credits)
✓ ENG101 - English Composition and Communication (4 credits)
✓ GEOG101 - World Geography and Ethiopian Geography (3 credits)
```

### Step 4: Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Step 5: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 6: Start Frontend Application
```bash
npm start
```

Application will open at `http://localhost:3000`

## Usage Guide

### 1. Registration
1. Go to http://localhost:3000
2. Click "Register here" on the login page
3. Fill in your details:
   - First Name
   - Last Name
   - Email
   - Password (create a strong one)
4. Click "Register" button

### 2. Login
1. Use your registered email and password
2. You'll be taken to the Dashboard

### 3. Browse Courses
1. Click "📖 Courses" in the navigation
2. View all available freshman courses
3. Filter by semester (Fall/Spring/Summer)
4. Click "Enroll" to enroll in a course

### 4. Manage Schedule
1. Click "📅 My Schedule" in the navigation
2. View your enrolled courses
3. Add or remove courses from your schedule

### 5. Track Academic Plan
1. Click "🎯 Academic Plan" in the navigation
2. View your planned courses
3. Add grades to completed courses
4. Monitor your GPA calculation

## API Endpoints Reference

### Authentication
- `POST /api/students/register` - Register new student
- `POST /api/students/login` - Login student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `GET /api/courses/semester/:semester` - Get courses by semester
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Student Profile
- `GET /api/students/:id` - Get student profile
- `POST /api/students/:id/enroll` - Enroll in course
- `POST /api/students/:id/plan` - Add to academic plan
- `POST /api/students/:id/completed` - Add completed course with grade

### GPA & Academic Performance
- `GET /api/students/:id/gpa` - Get student GPA and stats
- `PUT /api/students/:id/gpa/recalculate` - Recalculate GPA

### Schedule Management
- `GET /api/schedules/:studentId` - Get schedule
- `POST /api/schedules/:studentId` - Create/update schedule
- `POST /api/schedules/:studentId/add` - Add course to schedule
- `DELETE /api/schedules/:studentId/:courseId` - Remove course from schedule

## Grade Point Mapping
- A = 4.0
- B = 3.0
- C = 2.0
- D = 1.0
- F = 0.0

**GPA Calculation:** (Sum of gradePoints × credits) ÷ Total Credits

## Design & Branding

### Colors (Ethiopian Theme)
- Primary Green: #1a472a, #2d6a4f, #40916c
- Accent Yellow: #ffd60a
- Success Green: #27ae60
- Complementary: #52b788, #74c69d

### Key Features
- Modern gradient navbar with smooth animations
- Responsive design for mobile and desktop
- Smooth transitions and hover effects
- Ethiopian culturally relevant content
- Intuitive user interface

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in .env |
| MongoDB connection failed | Check connection string and ensure MongoDB is running |
| Courses not showing | Run `npm run seed` to populate courses |
| Cannot login | Verify you registered first |
| CORS errors | Ensure backend is running on correct port |

## Future Enhancements
- [ ] Admin dashboard for course management
- [ ] Email notifications for registrations
- [ ] Prerequisite enforcement
- [ ] Conflict detection in schedules
- [ ] Study materials and resources
- [ ] Peer interaction and study groups
- [ ] Academic advisor messaging
- [ ] Mobile app version

## Development Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Project Structure
```
yenetaedu/
├── server/
│   ├── models/ (Course, Student, Schedule)
│   ├── controllers/ (Business logic)
│   ├── routes/ (API endpoints)
│   ├── server.js
│   ├── seedCourses.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/ (Navigation)
│   │   ├── pages/ (Login, Dashboard, Courses, etc.)
│   │   ├── services/ (API calls)
│   │   └── App.js
│   └── package.json
└── README.md
```

## Support & Resources
- Express.js Docs: https://expressjs.com
- React Docs: https://react.dev
- MongoDB Docs: https://docs.mongodb.com
- Mongoose Docs: https://mongoosejs.com

## License
MIT License

---

**YenetaEdu** - Empowering Ethiopian Freshman Students 🇪🇹📚
