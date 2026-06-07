# Setup Guide - Smart University Course Planner

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

This installs:
- express - Web framework
- mongoose - MongoDB ODM
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- express-validator - Input validation
- nodemon - Auto-reload on changes

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

This installs:
- react & react-dom - UI library
- react-router-dom - Routing
- axios - HTTP client

### 3. Configure Environment Variables

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-planner
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
```

**Important**: 
- Use a strong JWT_SECRET in production
- If using MongoDB Atlas, update MONGODB_URI with your connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/university-planner`

### 4. Start MongoDB

**Local MongoDB**:
```bash
mongod
```

**Or use MongoDB Atlas** (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string
- Update MONGODB_URI in `.env`

### 5. Run the Application

**Terminal 1 - Backend**:
```bash
cd server
npm run dev
```

Expected output:
```
Server is running on port 5000
MongoDB connected
```

**Terminal 2 - Frontend**:
```bash
cd client
npm start
```

This opens the app at `http://localhost:3000`

## Verify Installation

### Backend Health Check
Visit `http://localhost:5000/api/health`
Expected response: `{ "status": "Server is running" }`

### Frontend
- Login page should load at `http://localhost:3000`
- Try registering a new student account
- Navigate to courses, schedule, and academic plan

## Default Database Setup

To populate sample courses:
1. Start the backend server
2. Make a POST request to `/api/courses` with sample course data, or
3. Use MongoDB Compass to manually insert courses

Sample course object:
```json
{
  "courseCode": "CS101",
  "courseName": "Introduction to Computer Science",
  "description": "Fundamentals of programming and CS concepts",
  "credits": 3,
  "semester": "Fall",
  "prerequisites": [],
  "instructor": "Dr. Smith",
  "schedule": {
    "days": ["Monday", "Wednesday"],
    "startTime": "09:00",
    "endTime": "10:30"
  },
  "capacity": 30,
  "enrolled": 0,
  "room": "A201"
}
```

## Development Commands

**Backend**:
- `npm run dev` - Start with auto-reload
- `npm start` - Start production mode

**Frontend**:
- `npm start` - Start dev server
- `npm run build` - Build for production
- `npm test` - Run tests

## Project Structure

```
logistics/
├── server/                      # Express backend
│   ├── models/                  # Database schemas
│   │   ├── Course.js
│   │   ├── Student.js
│   │   └── Schedule.js
│   ├── controllers/             # Business logic
│   │   ├── courseController.js
│   │   ├── studentController.js
│   │   └── scheduleController.js
│   ├── routes/                  # API routes
│   │   ├── courses.js
│   │   ├── students.js
│   │   └── schedules.js
│   ├── server.js                # Main entry point
│   ├── package.json
│   ├── .env                     # Environment variables (create from .env.example)
│   └── .env.example             # Example env file
│
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navigation.js
│   │   │   └── Navigation.css
│   │   ├── pages/               # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Courses.js
│   │   │   ├── MySchedule.js
│   │   │   ├── AcademicPlan.js
│   │   │   └── Pages.css
│   │   ├── services/            # API calls
│   │   │   └── api.js
│   │   ├── App.js               # Main component
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
│
├── README.md                    # Main documentation
└── .github/
    └── copilot-instructions.md  # Development instructions
```

## API Endpoints Reference

### Authentication
- `POST /api/students/register` - Register student
- `POST /api/students/login` - Login student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get specific course
- `GET /api/courses/semester/:semester` - Filter by semester
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Student Profile
- `GET /api/students/:id` - Get student profile
- `POST /api/students/:id/enroll` - Enroll in course
- `POST /api/students/:id/plan` - Add to academic plan

### Schedules
- `GET /api/schedules/:studentId` - Get schedule
- `POST /api/schedules/:studentId` - Create/update schedule
- `POST /api/schedules/:studentId/add` - Add course
- `DELETE /api/schedules/:studentId/:courseId` - Remove course

## Troubleshooting

### Port 5000 Already in Use
Change PORT in `server/.env` to an available port (e.g., 5001)

### MongoDB Connection Failed
- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string in `.env`
- For Atlas: whitelist your IP in Network Access settings

### CORS Error
- Ensure backend is running on the correct port
- Verify proxy in `client/package.json` matches backend port

### npm Dependencies Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Add more features:
   - Admin dashboard for course management
   - Email notifications
   - Prerequisite checking
   - GPA calculation

2. Enhance security:
   - Add role-based access control (RBAC)
   - Implement refresh tokens
   - Add request validation middleware

3. Improve UX:
   - Add loading states
   - Better error handling
   - Course search and advanced filters
   - Conflict detection in schedules

4. Deploy:
   - Backend: Heroku, Railway, or AWS
   - Frontend: Vercel, Netlify, or AWS
   - Database: MongoDB Atlas

## Support & Resources

- Express.js: https://expressjs.com
- React: https://react.dev
- Mongoose: https://mongoosejs.com
- MongoDB: https://www.mongodb.com
- React Router: https://reactrouter.com
