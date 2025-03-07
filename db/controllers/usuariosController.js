// controllers/usuariosController.js
const usuariosService = require('../services/usuariosService');

class UsuariosController {
  async createUsuario(req, res) {
    try {
      const data = req.body;
      const nuevoUsuario = await usuariosService.createUsuario(data);
      res.json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ error: 'Error creando usuario' });
    }
  }

  async marcarPeliculaVista(req, res) {
    const { usuarioId } = req.params;
    const { peliculaId } = req.body;
    if (!peliculaId) {
      return res.status(400).json({ error: 'Falta el ID de la película' });
    }
    try {
      await usuariosService.marcarPeliculaVista(usuarioId, peliculaId);
      res.json({ message: 'Película marcada como vista' });
    } catch (error) {
      res.status(500).json({ error: 'Error marcando película como vista' });
    }
  }

  async listarUsuariosConVistas(req, res) {
    try {
      const usuarios = await usuariosService.listarUsuariosConVistas();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Error listando usuarios con vistas' });
    }
  }
}

module.exports = new UsuariosController();
