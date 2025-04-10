const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const recursosRoutes = require('./routes/recursos');
app.use('/api/v1/recursos', recursosRoutes);

app.get('/', (req, res) => {
  res.send('📚 Microservicio de Biblioteca de Recursos funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));