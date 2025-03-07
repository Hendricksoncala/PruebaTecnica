// routes/moviesRoutes.js
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Get all movies (with optional filters)
router.get('/', (req, res) => moviesController.getAllMovies(req, res));

// Get a movie by ID
router.get('/:id', (req, res) => moviesController.getMovieById(req, res));

// Search movies by title
router.get('/search', (req, res) => moviesController.getMovieByTitle(req, res));

// Create a new movie
router.post('/', (req, res) => moviesController.createMovie(req, res));

// Update a movie by title (using a dynamic parameter 'title')
router.put('/title/:title', (req, res) => moviesController.updateMovieByTitle(req, res));

// Delete a movie by title
router.delete('/title/:title', (req, res) => moviesController.deleteMovieByTitle(req, res));

// Get recent releases
router.get('/recent', (req, res) => moviesController.getRecentReleases(req, res));

module.exports = router;