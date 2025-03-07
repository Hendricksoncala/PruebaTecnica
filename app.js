// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const peliculasRoutes = require('./db/routes/peliculasRoutes');
const usuariosRoutes = require('./db/routes/usuariosRoutes');

// Usar rutas
app.use('/peliculas', peliculasRoutes);
app.use('/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Gestión de Películas');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
