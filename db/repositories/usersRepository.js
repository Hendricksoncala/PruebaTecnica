const pool = require('../../db');

class UsersRepository {
  async createUser(data) {
    const { name, email, password } = data;
    const [result] = await pool.query(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  }

  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
    return rows[0];
  }

  async markMovieAsWatched(userId, movieId) {
    const [result] = await pool.query(
      'INSERT INTO WatchedMovies (userId, movieId) VALUES (?, ?)',
      [userId, movieId]
    );
    return result;
  }

  async listUsersWithWatchedMovies() {
    const sql = `
      SELECT u.id as userId, u.name, GROUP_CONCAT(m.title SEPARATOR ', ') AS watchedMovies
      FROM Users u
      LEFT JOIN WatchedMovies wm ON u.id = wm.userId
      LEFT JOIN Movies m ON wm.movieId = m.id
      GROUP BY u.id, u.name
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }
}

module.exports = UsersRepository;