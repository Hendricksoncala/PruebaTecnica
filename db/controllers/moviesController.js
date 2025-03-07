// controllers/moviesController.js
const moviesService = require('../services/moviesService');

class MoviesController {
  async getAllMovies(req, res) {
    try {
      const { title, category, page, limit, order } = req.query;
      const movies = await moviesService.getAllMovies({ title, category, page, limit, order });
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
      res.status(500).json({ error: 'Error fetching the movie' });
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
      const data = req.body;
      const newMovie = await moviesService.createMovie(data);
      res.json(newMovie);
    } catch (error) {
      res.status(500).json({ error: 'Error creating the movie' });
    }
  }

  async updateMovie(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await moviesService.updateMovie(id, data);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the movie' });
    }
  }

  async deleteMovie(req, res) {
    try {
      const { id } = req.params;
      const result = await moviesService.deleteMovie(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting the movie' });
    }
  }

  async getNewReleases(req, res) {
    try {
      const newReleases = await moviesService.getNewReleases();
      res.json(newReleases);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching new releases' });
    }
  }
}

module.exports = new MoviesController();