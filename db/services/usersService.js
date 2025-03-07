// services/usersService.js
const pool = require('../../db');

const UsersService = {
  createUser: async (data) => {
    const { name, email, password } = data;
    const [result] = await pool.query(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  },

  markMovieAsWatched: async (userId, movieId) => {
    await pool.query(
      'INSERT INTO WatchedMovies (userId, movieId) VALUES (?, ?)',
      [userId, movieId]
    );
  },

  listUsersWithWatchedMovies: async () => {
    const [rows] = await pool.query(`
      SELECT u.id as userId, u.name, GROUP_CONCAT(m.title SEPARATOR ', ') AS watchedMovies
      FROM Users u
      LEFT JOIN WatchedMovies wm ON u.id = wm.userId
      LEFT JOIN Movies m ON wm.movieId = m.id
      GROUP BY u.id, u.name
    `);
    return rows;
  },
};

module.exports = UsersService;