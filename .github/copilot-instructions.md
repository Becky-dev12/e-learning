# Copilot Instructions - Smart University Course Planner

This document provides setup and development guidelines for the Smart University Course Planner MERN application.

## Project Overview

A fullstack MERN application for university students to manage courses, schedules, and academic planning.

**Tech Stack**: MongoDB, Express.js, React, Node.js

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## Project Structure

- `server/` - Express backend with MongoDB
  - `models/` - Mongoose schemas
  - `controllers/` - Business logic
  - `routes/` - API endpoints
  - `server.js` - Entry point

- `client/` - React frontend
  - `src/components/` - Reusable components
  - `src/pages/` - Page components
  - `src/services/` - API communication
  - `src/App.js` - Main app component

## Key Features

1. **Authentication**: JWT-based student login/registration
2. **Course Management**: Browse, filter, and enroll in courses
3. **Schedule Planning**: Create and manage schedules
4. **Academic Planning**: Track planned and completed courses

## Development Workflow

1. Backend changes: Make changes in `server/` directory, server auto-reloads with nodemon
2. Frontend changes: Save files in `client/` directory, React dev server auto-reloads
3. API updates: Update routes in `server/routes/`, ensure frontend uses updated endpoints

## Common Tasks

### Adding a New API Endpoint
1. Create controller method in `server/controllers/`
2. Add route in `server/routes/`
3. Add API call in `client/src/services/api.js`
4. Use in React component

### Adding a New Page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.js`
3. Add navigation link in `client/src/components/Navigation.js`

### Database Models
- Modify schemas in `server/models/`
- Update corresponding controllers

## Troubleshooting

**MongoDB Connection Error**: Ensure MongoDB is running and connection string is correct
**Port Already in Use**: Change PORT in `.env` file
**CORS Issues**: Ensure backend is running on correct port and proxy is set in `client/package.json`

## Notes

- Passwords are hashed with bcryptjs before storage
- JWT tokens expire after 7 days
- All API responses follow consistent JSON format
