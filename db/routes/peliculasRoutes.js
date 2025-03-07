// routes/peliculasRoutes.js
const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

router.get('/', async (req, res) => {
    try {
      const { titulo, categoria, page, limit, orden } = req.query;

      const peliculas = await peliculasController.getAllPeliculas(req, res);
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener películas' });
    }
  });

// Obtener una película por ID
router.get('/:id', (req, res) => peliculasController.getPeliculaById(req, res));

// Crear una nueva película
router.post('/', (req, res) => peliculasController.createPelicula(req, res));

// Actualizar una película
router.put('/:id', (req, res) => peliculasController.updatePelicula(req, res));

// Eliminar una película
router.delete('/:id', (req, res) => peliculasController.deletePelicula(req, res));

// Obtener novedades (películas estrenadas hace menos de 3 semanas)
router.get('/novedades', (req, res) => peliculasController.getNovedades(req, res));

module.exports = router;