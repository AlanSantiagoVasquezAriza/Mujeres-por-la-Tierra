const express = require("express");
const router = express.Router();
const controller = require("../controllers/recursosController");

// Middleware
const { authenticate, requireAdmin } = require("../middlewares/authMiddleware");
const validationResultHandler = require("../middlewares/validationResultHandler");
const {
  validarRecursoPOST,
  validarRecursoPUT,
} = require("../validators/recursoValidator");

// 📚 Rutas públicas

// GET colección de recursos con filtros, orden y paginación
router.get("/", controller.obtenerRecursos);

// GET recurso individual por ID
router.get("/:id", controller.obtenerRecursoPorId);

// 🔐 Rutas protegidas para administradoras

// POST crear nuevo recurso
router.post(
  "/",
  authenticate,
  requireAdmin,
  validarRecursoPOST,
  validationResultHandler,
  controller.crearRecurso
);

// PUT actualizar recurso existente
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  validarRecursoPUT,
  validationResultHandler,
  controller.actualizarRecurso
);

// DELETE eliminar recurso
router.delete("/:id", authenticate, requireAdmin, controller.eliminarRecurso);

module.exports = router;
