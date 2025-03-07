// services/usuariosService.js
const pool = require('../../db');

const UsuariosService = {
  createUsuario: async (data) => {
    const { nombre, email, password } = data;
    const [result] = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );
    return { id: result.insertId, nombre, email };
  },

  marcarPeliculaVista: async (usuarioId, peliculaId) => {
    await pool.query(
      'INSERT INTO PeliculasVistas (usuarioId, peliculaId) VALUES (?, ?)',
      [usuarioId, peliculaId]
    );
  },

  listarUsuariosConVistas: async () => {
    const [rows] = await pool.query(`
      SELECT u.id as usuarioId, u.nombre, GROUP_CONCAT(p.titulo SEPARATOR ', ') AS peliculasVistas
      FROM Usuarios u
      LEFT JOIN PeliculasVistas pv ON u.id = pv.usuarioId
      LEFT JOIN Peliculas p ON pv.peliculaId = p.id
      GROUP BY u.id, u.nombre
    `);
    return rows;
  },
};

module.exports = UsuariosService;
