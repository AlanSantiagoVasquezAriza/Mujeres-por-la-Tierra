const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar la configuración de la base de datos
const connectDB = require('./config/database');

// Conectar a la base de datos
connectDB();

// Importar rutas
const locationRoutes = require('./routes/location.routes');

// Crear la aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/', locationRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Puerto
const PORT = 3001;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor de ubicaciones ejecutándose en el puerto ${PORT}`);
});

module.exports = app;