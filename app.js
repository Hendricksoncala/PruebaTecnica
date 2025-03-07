// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const moviesRoutes = require('./db/routes/moviesRoutes');
const usersRoutes = require('./db/routes/usersRoutes');

// Usar rutas
app.use('/movies', moviesRoutes);
app.use('/users', usersRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Movie Management API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});