// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ← Cargar variables de entorno

const articleRoutes = require('./routes/article.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/articles', articleRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));