const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Endpoint para marcar una película como vista usando username y movieTitle
router.post('/:username/:movieTitle', (req, res) => 
  usersController.markMovieAsWatchedByUsernameAndTitle(req, res)
);


router.post('/', (req, res) => usersController.createUser(req, res));
router.post('/:userId/watched', (req, res) => usersController.markMovieAsWatched(req, res));
router.get('/watched', (req, res) => usersController.listUsersWithWatchedMovies(req, res));
router.post('/:username/:movieTitle', (req, res) =>
    usersController.markMovieAsWatchedByUsernameAndTitle(req, res)
  );

module.exports = router;
