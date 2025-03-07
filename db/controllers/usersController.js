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
    try {
      const { userId } = req.params;
      const { movieId } = req.body;
      if (!movieId) {
        return res.status(400).json({ error: 'Movie ID is required' });
      }
      await usersService.markMovieAsWatched(userId, movieId);
      res.json({ message: 'Movie marked as watched successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error marking movie as watched' });
    }
  }

  async markMovieAsWatchedByUsernameAndTitle(req, res) {
    try {
      const { username, movieTitle } = req.params;
      if (!username || !movieTitle) {
        return res.status(400).json({ error: 'Username and movie title are required' });
      }
      await usersService.markMovieAsWatchedByUsernameAndTitle(username, movieTitle);
      res.json({ message: 'Movie marked as watched successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error marking movie as watched', detail: error.message });
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
