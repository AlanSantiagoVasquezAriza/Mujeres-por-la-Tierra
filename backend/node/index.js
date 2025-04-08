import express from "express"; // node por defecto no reconoce modulos; en el package.json poner "type": "module"
import cors from "cors";
import morgan from 'morgan'; // Importar morgan para registrar solicitudes HTTP
import dotenv from 'dotenv'; // Importar dotenv para manejar variables de entorno
import connectDB from './config/database.js'; // Importar función para conectar a la base de datos
import webRoutes from './routes/web.routes.js'; // Importar rutas web
import eventRoutes from './routes/event.routes.js'; // Importar rutas de eventos



const app = express();

// Midlewares
app.use(express.json()); // Permite procesar los datos json del cliente
app.use(cors()); // El backend permite la conexion solo al puerto 5173
app.use(morgan('dev')); // Registrar solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: false })); // Permite procesar datos url-encoded (formulario HTML)

// Rutas
app.use("/api/web", webRoutes); // Rutas para la aplicación web
app.use('/api/events', eventRoutes); // Rutas para eventos

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ha ocurrido un error en el servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});