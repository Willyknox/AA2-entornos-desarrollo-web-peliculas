const express = require('express');
const router = express.Router();
const moviesController = require('../controller/moviesController');

// GET all movies
router.get('/movies', moviesController.getAllMovies);

// POST create a new movie
router.post('/movies', moviesController.createMovie);

// DELETE a movie by id
router.delete('/movies/:id', moviesController.deleteMovie);

// PUT update a movie by id
router.put('/movies/:id', moviesController.updateMovie);

module.exports = router;
