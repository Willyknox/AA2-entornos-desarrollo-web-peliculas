# Project Wiki

## Overview

This application is designed to manage a collection of movies, providing a RESTful API and a simple frontend interface.

## Backend

- **Framework:** Node.js with Express
- **Database:** SQLite (via Knex.js)
- **Key Files:**
  - `moviesService.js`: Handles all database operations (CRUD for movies).
  - `moviesController.js`: Contains controller logic for handling requests.
  - `moviesRoutes.js`: Defines API routes.
  - `app.js`/`server.js`: Entry point for the backend server.

### Database

- Uses a SQLite database (`movies.db`).
- Main table: `contentTitle` with fields for `id`, `titleType`, `primaryTitle`, `year`, `runtimeMinutes`, `genres`.

### Service Layer (`moviesService.js`)

- `displayMovies()`: Returns all movies.
- `registerMovies(...)`: Adds a new movie.
- `deleteMovies(id)`: Deletes a movie by ID.
- `modifyMovies(...)`: Updates a movie by ID.
- `displayMovieById(id)`: Gets a movie by ID.

## Frontend

- **Files:** `index.html`, `index.js`, `register.html`, `register.js`
- **Functionality:** Allows users to interact with the backend API to manage movies and register users.

## Running the Project

- See the README for setup instructions.
- Use Docker for easy deployment.

## Contributing

- Fork the repository
- Create a new branch for your feature or bugfix
- Submit a pull request

## License

Specify your license here (MIT, GPL, etc.)
