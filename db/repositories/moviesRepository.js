const pool = require('../../db');

class MoviesRepository {
  async getAll({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit; // Calcula el offset
    const [rows] = await pool.query(
      'SELECT * FROM Movies LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Movies WHERE id = ?', [id]);
    return rows[0];
  }

  async findByTitle(title) {
    const sql = `
      SELECT m.*, c.name as categoryName
      FROM Movies m
      JOIN Categories c ON m.categoryId = c.id
      WHERE LOWER(m.title) LIKE LOWER(?)
    `;

    const [rows] = await pool.query(sql, [`%${title}%`]);
    return rows;
  }

  async findCategoryIdByName(name) {
    const [rows] = await pool.query(
      'SELECT id FROM Categories WHERE name = ?',
      [name]
    );
    return rows[0] ? rows[0].id : null;
  }

  async createMovie({ title, description, releaseDate, categoryId }) {
    const [result] = await pool.query(
      'INSERT INTO Movies (title, description, releaseDate, categoryId) VALUES (?, ?, ?, ?)',
      [title, description, releaseDate, categoryId]
    );
    return { id: result.insertId, title, description, releaseDate, categoryId };
  }

    // Método para actualizar una película por su título
    async updateByTitle(oldTitle, data) {
      const { title, description, releaseDate, categoryId } = data;
      const [result] = await pool.query(
        'UPDATE Movies SET title = ?, description = ?, releaseDate = ?, categoryId = ? WHERE title = ?',
        [title, description, releaseDate, categoryId, oldTitle]
      );
      return result;
    }
  
    // Método para eliminar una película por su título
    async deleteMovieByTitle(title) {
      const [result] = await pool.query('DELETE FROM Movies WHERE title = ?', [title]);
      return result;
    }

  async updateById(id, data) {
    const { title, description, releaseDate, categoryId } = data;
    const [result] = await pool.query(
      'UPDATE Movies SET title = ?, description = ?, releaseDate = ?, categoryId = ? WHERE id = ?',
      [title, description, releaseDate, categoryId, id]
    );
    return result;
  }

  async deleteMovie(id) {
    const [result] = await pool.query('DELETE FROM Movies WHERE id = ?', [id]);
    return result;
  }

  async findByCategory(category) {
    const sql = `
      SELECT m.*, c.name as categoryName
      FROM Movies m
      JOIN Categories c ON m.categoryId = c.id
      WHERE c.name = ?
    `;
    const [rows] = await pool.query(sql, [category]);
    return rows;
  }

  async getNewReleases() {
    const sql = `
      SELECT m.*, c.name as categoryName
      FROM Movies m
      JOIN Categories c ON m.categoryId = c.id
      WHERE m.releaseDate >= DATE_SUB(CURDATE(), INTERVAL 3 WEEK)
      ORDER BY m.releaseDate DESC
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }
}

module.exports = MoviesRepository;