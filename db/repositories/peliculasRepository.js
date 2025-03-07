const pool = require('../../db');

class PeliculasRepository {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM Peliculas');
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Peliculas WHERE id = ?', [id]);
    return rows[0];
  }

  async findByTitulo(titulo) {
    const sql = `
      SELECT p.*, c.nombre as nombreCategoria
      FROM Peliculas p
      JOIN Categorias c ON p.categoriaId = c.id
      WHERE p.titulo = ?
    `;
    const [rows] = await pool.query(sql, [titulo]);
    return rows;
  }

  async findCategoriaIdByNombre(nombre) {
    const [rows] = await pool.query(
      'SELECT id FROM Categorias WHERE nombre = ?',
      [nombre]
    );
    return rows[0] ? rows[0].id : null;
  }

  async createPelicula({ titulo, descripcion, fechaEstreno, categoriaId }) {
    const [result] = await pool.query(
      'INSERT INTO Peliculas (titulo, descripcion, fechaEstreno, categoriaId) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, fechaEstreno, categoriaId]
    );
    return { id: result.insertId, titulo, descripcion, fechaEstreno, categoriaId };
  }

  async updateById(id, data) {
    const { titulo, descripcion, fechaEstreno, categoriaId } = data;
    const [result] = await pool.query(
      'UPDATE Peliculas SET titulo = ?, descripcion = ?, fechaEstreno = ?, categoriaId = ? WHERE id = ?',
      [titulo, descripcion, fechaEstreno, categoriaId, id]
    );
    return result;
  }

  async deletePelicula(id) {
    const [result] = await pool.query('DELETE FROM Peliculas WHERE id = ?', [id]);
    return result;
  }

  async findByCategory(categoria) {
    const sql = `
      SELECT p.*, c.nombre as nombreCategoria
      FROM Peliculas p
      JOIN Categorias c ON p.categoriaId = c.id
      WHERE c.nombre = ?
    `;
    const [rows] = await pool.query(sql, [categoria]);
    return rows;
  }
  
  async getNovedades() {
    const sql = `
      SELECT p.*, c.nombre as nombreCategoria
      FROM Peliculas p
      JOIN Categorias c ON p.categoriaId = c.id
      WHERE p.fechaEstreno >= DATE_SUB(CURDATE(), INTERVAL 3 WEEK)
      ORDER BY p.fechaEstreno DESC
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }
}

module.exports = PeliculasRepository;
