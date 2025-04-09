import express from "express"; // node por defecto no reconoce modulos; en el package.json poner "type": "module"
import cors from "cors";

import webRoutes from './routes/web.routes.js'
import reportRoutes from "./routes/report.routes.js";


const app = express();

// Midlewares
app.use(express.json()); // Permite procesar los datos json del cliente
app.use(
  cors()
); // El backend permite la conexion solo al puerto 5173

// Uso de las rutas
app.use(webRoutes);
app.use(reportRoutes);

app.listen(4000);
console.log(`server is running on port 4000`); // Template string