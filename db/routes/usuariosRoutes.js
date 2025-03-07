// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Crear un usuario
router.post('/', (req, res) => usuariosController.createUsuario(req, res));

// Marcar una película como vista para un usuario
router.post('/:usuarioId/vistas', (req, res) => usuariosController.marcarPeliculaVista(req, res));

// Listar usuarios con las películas que han visto
router.get('/vistas', (req, res) => usuariosController.listarUsuariosConVistas(req, res));

module.exports = router;
