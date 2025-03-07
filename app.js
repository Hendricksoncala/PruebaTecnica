
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

//importar las rutas
const productoRoutes = require("./pro")