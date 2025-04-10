import express from "express"; // node por defecto no reconoce modulos; en el package.json poner "type": "module"
import cors from "cors";
import morgan from 'morgan'; // Importar morgan para registrar solicitudes HTTP
import dotenv from 'dotenv'; // Importar dotenv para manejar variables de entorno
import webRoutes from './routes/web.routes.js'; // Importar rutas web
import reportRoutes from './routes/report.routes.js'; // Importar rutas de reportes

import locationRoutes from './routes/APIlocations.routes.js'; // Importar rutas de notificaciones (API)
import calendarRoutes from './routes/APIcalendario.routes.js'; // Importar rutas de calendario (API)
//-------------------------------------------------------------------------------------------------------------------------------------------

const app = express();

// Midlewares
app.use(express.json()); // Permite procesar los datos json del cliente
app.use(cors()); // El backend permite la conexion solo al puerto 5173
app.use(morgan('dev')); // Registrar solicitudes HTTP en la consola
app.use(express.urlencoded({ extended: false })); // Permite procesar datos url-encoded (formulario HTML)

// Rutas 
app.use("/api/location", locationRoutes); // Nuevas rutas para el microservicio de notificaciones
app.use("/api/calendar", calendarRoutes); // Nuevas rutas para el microservicio de calendario
app.use("/api/reports", reportRoutes);
app.use("/api/web", webRoutes); // Rutas para la aplicación web

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const PORT = 3000;

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