// controllers/usersController.js
const usersService = require('../services/usersService');

class UsersController {
  async createUser(req, res) {
    try {
      const data = req.body;
      const newUser = await usersService.createUser(data);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async markMovieAsWatched(req, res) {
    const { userId } = req.params;
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ error: 'Missing movie ID' });
    }
    try {
      await usersService.markMovieAsWatched(userId, movieId);
      res.json({ message: 'Movie marked as watched' });
    } catch (error) {
      res.status(500).json({ error: 'Error marking movie as watched' });
    }
  }

  async listUsersWithWatchedMovies(req, res) {
    try {
      const users = await usersService.listUsersWithWatchedMovies();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error listing users with watched movies' });
    }
  }
}

module.exports = new UsersController();