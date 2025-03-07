// routes/peliculasRoutes.js
const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

// Obtener todas las películas (con filtros, paginación y orden)
router.get('/', (req, res) => peliculasController.getAllPeliculas(req, res));

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