// controllers/peliculasController.js
const peliculasService = require('../services/peliculasService');

class PeliculasController {
  async getAllPeliculas(req, res) {
    try {
      const { titulo, categoria, page, limit, orden } = req.query;
      const peliculas = await peliculasService.getAllPeliculas({ titulo, categoria, page, limit, orden });
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las películas' });
    }
  }

  async getPeliculaById(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await peliculasService.getPeliculaById(id);
      if (!pelicula) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      res.json(pelicula);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la película' });
    }
  }

  async createPelicula(req, res) {
    try {
      const data = req.body;
      const nuevaPelicula = await peliculasService.createPelicula(data);
      res.json(nuevaPelicula);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la película' });
    }
  }

  async updatePelicula(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const resultado = await peliculasService.updatePelicula(id, data);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la película' });
    }
  }

  async deletePelicula(req, res) {
    try {
      const { id } = req.params;
      const resultado = await peliculasService.deletePelicula(id);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la película' });
    }
  }

  async getNovedades(req, res) {
    try {
      const novedades = await peliculasService.getNovedades();
      res.json(novedades);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener novedades' });
    }
  }
}

module.exports = new PeliculasController();
