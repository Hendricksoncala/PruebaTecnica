const pool = require('../../db');

class CategoriasRepository {
    async findCategoriaIdByNombre(nombre) {
      const [rows] = await pool.query(
        'SELECT id FROM Categorias WHERE nombre = ?',
        [nombre]
      );
      return rows[0] ? rows[0].id : null;
    }
  
    async createCategoria(data) {
      const { nombre } = data;
      const [result] = await pool.query(
        'INSERT INTO Categorias (nombre) VALUES (?)',
        [nombre]
      );
      return { id: result.insertId, nombre };
    }
  }
  
  module.exports = CategoriasRepository;