// controllers/moviesController.js
const moviesService = require('../services/moviesService');

class MoviesController {
  async getAllMovies(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query; // Valores por defecto
      const movies = await moviesService.getAllMovies({ page, limit });
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching movies' });
    }
  }

  async getMovieById(req, res) {
    try {
      const { id } = req.params;
      const movie = await moviesService.getMovieById(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving the movie' });
    }
  }

  async getMovieByTitle(req, res) {
    try {
      const { title } = req.query;
      const movies = await moviesService.getMovieByTitle(title);
      if (!movies || movies.length === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error searching for the movie' });
    }
  }

  async createMovie(req, res) {
    try {
      const data = req.body; // Expected: { title, description, releaseDate, categoryName }
      const newMovie = await moviesService.createMovie(data);
      res.json(newMovie);
    } catch (error) {
      res.status(500).json({ error: 'Error creating the movie' });
    }
  }

  async updateMovieByTitle(req, res) {
    try {
      const { title: oldTitle } = req.params;  // lo que viene en la ruta
      const data = req.body; // { title, description, releaseDate, categoryName }
      const result = await moviesService.updateMovieByTitle(oldTitle, data);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json({ message: 'Movie updated successfully', result });
    } catch (error) {
      res.status(500).json({ error: 'Error updating the movie by title' });
    }
  }

  async deleteMovieByTitle(req, res) {
    try {
      const { title } = req.params;
      const result = await moviesService.deleteMovieByTitle(title);
      res.json({ message: 'Movie successfully deleted', result });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the movie' });
    }
  }

  async getRecentReleases(req, res) {
    try {
      const recentMovies = await moviesService.getRecentReleases();
      res.json(recentMovies);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving recent releases' });
    }
  }
}

module.exports = new MoviesController();
