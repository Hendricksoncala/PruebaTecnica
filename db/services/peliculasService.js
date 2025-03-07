// services/peliculasService.js
const pool = require('../../db');

const PeliculasService = {
  getAllPeliculas: async ({ titulo, categoria, page = 1, limit = 5, orden = 'ASC' }) => {
    const offset = (page - 1) * limit;
    let sql = `
      SELECT p.*, c.nombre as nombreCategoria 
      FROM Peliculas p
      JOIN Categorias c ON p.categoriaId = c.id
      WHERE 1=1
    `;
    const params = [];

    if (titulo) {
      sql += ' AND p.titulo LIKE ?';
      params.push(`%${titulo}%`);
    }
    if (categoria) {
      sql += ' AND c.nombre = ?';
      params.push(categoria);
    }
    sql += ` ORDER BY p.fechaEstreno ${orden} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.query(sql, params);
    return rows;
  },

  getPeliculaById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Peliculas WHERE id = ?', [id]);
    return rows[0];
  },

  createPelicula: async (data) => {
    const { titulo, descripcion, fechaEstreno, categoriaId } = data;
    const [result] = await pool.query(
      'INSERT INTO Peliculas (titulo, descripcion, fechaEstreno, categoriaId) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, fechaEstreno, categoriaId]
    );
    return { id: result.insertId, ...data };
  },

  updatePelicula: async (id, data) => {
    const { titulo, descripcion, fechaEstreno, categoriaId } = data;
    const [result] = await pool.query(
      'UPDATE Peliculas SET titulo = ?, descripcion = ?, fechaEstreno = ?, categoriaId = ? WHERE id = ?',
      [titulo, descripcion, fechaEstreno, categoriaId, id]
    );
    return result;
  },

  deletePelicula: async (id) => {
    const [result] = await pool.query('DELETE FROM Peliculas WHERE id = ?', [id]);
    return result;
  },

  getNovedades: async () => {
    const [rows] = await pool.query(`
      SELECT p.*, c.nombre as nombreCategoria
      FROM Peliculas p
      JOIN Categorias c ON p.categoriaId = c.id
      WHERE p.fechaEstreno >= DATE_SUB(CURDATE(), INTERVAL 3 WEEK)
      ORDER BY p.fechaEstreno DESC
    `);
    return rows;
  },
};

module.exports = PeliculasService;
