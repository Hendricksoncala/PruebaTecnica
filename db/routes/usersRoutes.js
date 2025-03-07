// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Crear un usuario
router.post('/', (req, res) => usersController.createUser(req, res));

// Marcar una película como vista para un usuario
router.post('/:userId/watched', (req, res) => usersController.markMovieAsWatched(req, res));

// Listar usuarios con las películas que han visto
router.get('/watched', (req, res) => usersController.listUsersWithWatchedMovies(req, res));

module.exports = router;