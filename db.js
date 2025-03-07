// db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,      // ej.: switchback.proxy.rlwy.net
  port: process.env.MYSQL_PORT,      // ej.: 59535
  user: process.env.MYSQL_USER,      // ej.: root
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, // ej.: railway o gestion_peliculas
  connectionLimit: 10,
});

module.exports = pool;
