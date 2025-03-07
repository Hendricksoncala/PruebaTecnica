const pool = require('../../db');

class CategoriesRepository {
  async findCategoryIdByName(name) {
    const [rows] = await pool.query(
      'SELECT id FROM Categories WHERE name = ?',
      [name]
    );
    return rows[0] ? rows[0].id : null;
  }

  async createCategory(data) {
    const { name } = data;
    const [result] = await pool.query(
      'INSERT INTO Categories (name) VALUES (?)',
      [name]
    );
    return { id: result.insertId, name };
  }
}

module.exports = CategoriesRepository;