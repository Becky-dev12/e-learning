# Quick Start Guide

## Get Started in 5 Minutes

### 1. Setup MongoDB
```bash
# Option A: Local MongoDB
mongod

# Option B: MongoDB Atlas (Cloud)
# https://www.mongodb.com/cloud/atlas
# Copy your connection string
```

### 2. Configure Backend
```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/university-planner
JWT_SECRET=dev-secret-key
NODE_ENV=development
```

### 3. Start Backend
```bash
npm run dev
```
✓ Server running on http://localhost:5000

### 4. Setup Frontend
```bash
cd client
npm install
npm start
```
✓ App opens at http://localhost:3000

### 5. Test the App
1. **Register**: Create a new student account
2. **Login**: Use your credentials
3. **Browse Courses**: See available courses
4. **Enroll**: Click "Enroll" on any course
5. **Check Schedule**: View your enrollments

## Key Features

✓ **Authentication** - Secure student login
✓ **Course Management** - Browse and enroll in courses
✓ **Schedule Planning** - Manage your course schedule
✓ **Academic Plan** - Track your academic progress
✓ **Filter by Semester** - View courses by semester

## Default Login (for testing)

After registering an account, use those credentials.

## API Base URL
`http://localhost:5000/api`

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 5000 in use | Change `PORT` in `.env` |
| MongoDB connection error | Ensure MongoDB is running |
| Cannot reach backend from frontend | Check proxy in `client/package.json` |

## File Structure
```
logistics/
├── server/ (Express + MongoDB)
├── client/ (React)
├── README.md (Full documentation)
└── SETUP.md (Detailed setup)
```

## Next Steps

- Add sample courses to database
- Implement admin dashboard
- Add prerequisite checking
- Deploy to production

## Documentation
- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **.github/copilot-instructions.md** - Development guidelines
