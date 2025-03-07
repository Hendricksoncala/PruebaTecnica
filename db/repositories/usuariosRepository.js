
const pool = require('../../db');

class UsuariosRepository {
  async createUsuario(data) {
    const { nombre, email, password } = data;
    const [result] = await pool.query(
      'INSERT INTO Usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, password]
    );
    return { id: result.insertId, nombre, email };
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  async marcarPeliculaVista(usuarioId, peliculaId) {
    const [result] = await pool.query(
      'INSERT INTO PeliculasVistas (usuarioId, peliculaId) VALUES (?, ?)',
      [usuarioId, peliculaId]
    );
    return result;
  }

  async listarUsuariosConVistas() {
    const sql = `
      SELECT u.id as usuarioId, u.nombre, GROUP_CONCAT(p.titulo SEPARATOR ', ') AS peliculasVistas
      FROM Usuarios u
      LEFT JOIN PeliculasVistas pv ON u.id = pv.usuarioId
      LEFT JOIN Peliculas p ON pv.peliculaId = p.id
      GROUP BY u.id, u.nombre
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }
}

module.exports = UsuariosRepository;
