// routes/moviesRoutes.js
const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

// Obtener todas las películas (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const { title, category, page, limit, order } = req.query;

    const movies = await moviesController.getAllMovies(req, res);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

// Buscar películas por título
router.get('/search', (req, res) => moviesController.getMovieByTitle(req, res));

// Obtener una película por ID
router.get('/:id', (req, res) => moviesController.getMovieById(req, res));

// Crear una nueva película
router.post('/', (req, res) => moviesController.createMovie(req, res));

// Actualizar una película
router.put('/:id', (req, res) => moviesController.updateMovie(req, res));

// Eliminar una película
router.delete('/:id', (req, res) => moviesController.deleteMovie(req, res));

// Obtener novedades (películas estrenadas hace menos de 3 semanas)
router.get('/new-releases', (req, res) => moviesController.getNewReleases(req, res));

module.exports = router;