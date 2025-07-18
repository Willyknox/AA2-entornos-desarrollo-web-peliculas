# Movie Management Web Application

This project is a full-stack web application for managing a movie database. It allows users to view, add, edit, and delete movies. The backend is built with Node.js, Express, and SQLite (using Knex.js), while the frontend uses Parcel as a bundler for modern development and build workflows.

## Features

- View all movies in the database
- Add new movies
- Edit existing movies
- Delete movies
- Register new users (frontend)

## Project Structure

```
backend/
  src/
    app.js
    moviesService.js
    controller/
      moviesController.js
    route/
      moviesRoutes.js
    test/
      integration/
      unit/
  movies.db
  package.json
  Dockerfile

frontend/
  index.html
  index.js
  register.html
  register.js
  src/
    util.js
  package.json
  dockerfile
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm
- Docker (optional, for containerization)

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node src/app.js
   ```
   The backend will run on `http://localhost:3000` by default.

### Frontend Setup (with Parcel)

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies (including Parcel):
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
   This will open the app in your browser using Parcel's dev server.

4. To build for production:
   ```
   npm run build
   ```
   The output will be in the `dist/` folder.

### Running with Docker

You can use the provided Dockerfiles to containerize both backend and frontend.

## API Endpoints

- `GET /movies` - List all movies
- `GET /movies/:id` - Get a movie by ID
- `POST /movies` - Add a new movie
- `PUT /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie

## Testing

Tests are located in `backend/src/test/`. Use your preferred test runner to execute them.
